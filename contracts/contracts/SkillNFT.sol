// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

contract SkillNFT is ERC721, Ownable {
    using Counters for Counters.Counter;
    Counters.Counter private _tokenIds;

    struct Skill {
        string skillName;
        string category;
        uint256 verificationScore;
        uint256 timestamp;
        address verifier;
        string metadataURI;
    }

    mapping(uint256 => Skill) public skills;
    mapping(address => uint256[]) public userSkills;
    mapping(address => bool) public verifiers;

    event SkillMinted(
        uint256 indexed tokenId,
        address indexed owner,
        string skillName,
        uint256 verificationScore
    );
    
    event SkillVerified(
        uint256 indexed tokenId,
        address indexed verifier,
        uint256 score
    );

    constructor() ERC721("SkillNFT", "SKILL") Ownable(msg.sender) {
        verifiers[msg.sender] = true;
    }

    function addVerifier(address _verifier) external onlyOwner {
        verifiers[_verifier] = true;
    }

    function removeVerifier(address _verifier) external onlyOwner {
        verifiers[_verifier] = false;
    }

    function mintSkill(
        address to,
        string memory skillName,
        string memory category,
        uint256 verificationScore,
        string memory metadataURI
    ) external returns (uint256) {
        require(verifiers[msg.sender], "Not authorized verifier");
        require(verificationScore <= 100, "Score must be 0-100");

        _tokenIds.increment();
        uint256 newTokenId = _tokenIds.current();

        _safeMint(to, newTokenId);

        skills[newTokenId] = Skill({
            skillName: skillName,
            category: category,
            verificationScore: verificationScore,
            timestamp: block.timestamp,
            verifier: msg.sender,
            metadataURI: metadataURI
        });

        userSkills[to].push(newTokenId);

        emit SkillMinted(newTokenId, to, skillName, verificationScore);

        return newTokenId;
    }

    function updateVerificationScore(
        uint256 tokenId,
        uint256 newScore
    ) external {
        require(verifiers[msg.sender], "Not authorized verifier");
        require(_ownerOf(tokenId) != address(0), "Token does not exist");
        require(newScore <= 100, "Score must be 0-100");

        skills[tokenId].verificationScore = newScore;
        skills[tokenId].verifier = msg.sender;

        emit SkillVerified(tokenId, msg.sender, newScore);
    }

    function getSkill(uint256 tokenId) external view returns (Skill memory) {
        require(_ownerOf(tokenId) != address(0), "Token does not exist");
        return skills[tokenId];
    }

    function getUserSkills(address user) external view returns (uint256[] memory) {
        return userSkills[user];
    }

    function getTotalSkills() external view returns (uint256) {
        return _tokenIds.current();
    }

    function _update(
        address to,
        uint256 tokenId,
        address auth
    ) internal virtual override returns (address) {
        address from = super._update(to, tokenId, auth);
        
        if (from != address(0) && to != address(0)) {
            uint256[] storage fromSkills = userSkills[from];
            for (uint256 i = 0; i < fromSkills.length; i++) {
                if (fromSkills[i] == tokenId) {
                    fromSkills[i] = fromSkills[fromSkills.length - 1];
                    fromSkills.pop();
                    break;
                }
            }
            userSkills[to].push(tokenId);
        }
        
        return from;
    }
}