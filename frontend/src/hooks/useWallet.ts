import { useState, useEffect } from 'react';

declare global {
    interface Window {
        ethereum?: any;
    }
}

export const useWallet = () => {
    const [walletAddress, setWalletAddress] = useState<string>('');
    const [isConnected, setIsConnected] = useState<boolean>(false);

    useEffect(() => {
        checkIfWalletIsConnected();
    }, []);

    const checkIfWalletIsConnected = async () => {
        if (typeof window.ethereum !== 'undefined') {
            try {
                const accounts = await window.ethereum.request({
                    method: 'eth_accounts'
                });
                if (accounts.length > 0) {
                    setWalletAddress(accounts[0]);
                    setIsConnected(true);
                }
            } catch (error) {
                console.error('Error checking wallet connection:', error);
            }
        }
    };

    const connectWallet = async () => {
        if (typeof window.ethereum !== 'undefined') {
            try {
                const accounts = await window.ethereum.request({
                    method: 'eth_requestAccounts'
                });
                setWalletAddress(accounts[0]);
                setIsConnected(true);
                return accounts[0];
            } catch (error) {
                console.error('Failed to connect wallet:', error);
                throw error;
            }
        } else {
            alert('Please install MetaMask to use this app');
            throw new Error('MetaMask not installed');
        }
    };

    const disconnectWallet = () => {
        setWalletAddress('');
        setIsConnected(false);
    };

    return {
        walletAddress,
        isConnected,
        connectWallet,
        disconnectWallet
    };
};