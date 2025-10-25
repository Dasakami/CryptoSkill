from web3 import Web3
from django.conf import settings
import json

CONTRACT_ABI = json.loads('''[
    {
        "inputs": [
            {"internalType": "address", "name": "to", "type": "address"},
            {"internalType": "string", "name": "skillName", "type": "string"},
            {"internalType": "string", "name": "category", "type": "string"},
            {"internalType": "uint256", "name": "verificationScore", "type": "uint256"},
            {"internalType": "string", "name": "metadataURI", "type": "string"}
        ],
        "name": "mintSkill",
        "outputs": [{"internalType": "uint256", "name": "", "type": "uint256"}],
        "stateMutability": "nonpayable",
        "type": "function"
    }
]''')

class Web3Service:
    def __init__(self):
        self.w3 = Web3(Web3.HTTPProvider(settings.WEB3_PROVIDER_URI))
        self.contract = self.w3.eth.contract(
            address=settings.CONTRACT_ADDRESS,
            abi=CONTRACT_ABI
        )
        self.account = self.w3.eth.account.from_key(settings.PRIVATE_KEY)
    
    def mint_skill_nft(self, to_address, skill_name, category, score, metadata_uri):
        try:
            nonce = self.w3.eth.get_transaction_count(self.account.address)
            
            txn = self.contract.functions.mintSkill(
                Web3.to_checksum_address(to_address),
                skill_name,
                category,
                score,
                metadata_uri
            ).build_transaction({
                'from': self.account.address,
                'nonce': nonce,
                'gas': 300000,
                'gasPrice': self.w3.eth.gas_price
            })
            
            signed_txn = self.w3.eth.account.sign_transaction(txn, self.account.key)
            tx_hash = self.w3.eth.send_raw_transaction(signed_txn.rawTransaction)
            receipt = self.w3.eth.wait_for_transaction_receipt(tx_hash)
            
            token_id = self.contract.events.SkillMinted().process_receipt(receipt)[0]['args']['tokenId']
            
            return {
                'token_id': token_id,
                'tx_hash': tx_hash.hex(),
                'success': True
            }
        except Exception as e:
            raise Exception(f"Failed to mint NFT: {str(e)}")

