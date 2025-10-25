import React from 'react';
import { Award, Wallet } from 'lucide-react';

interface HeaderProps {
    isConnected: boolean;
    walletAddress: string;
    onConnect: () => void;
}

export const Header: React.FC<HeaderProps> = ({
    isConnected,
    walletAddress,
    onConnect
}) => {
    return (
        <header className="bg-white shadow-sm border-b border-gray-200">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
                <div className="flex justify-between items-center">
                    <div className="flex items-center space-x-3">
                        <Award className="w-8 h-8 text-indigo-600" />
                        <h1 className="text-2xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                            CryptoSkill
                        </h1>
                    </div>

                    {!isConnected ? (
                        <button
                            onClick={onConnect}
                            className="flex items-center space-x-2 px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
                        >
                            <Wallet className="w-5 h-5" />
                            <span>Connect Wallet</span>
                        </button>
                    ) : (
                        <div className="flex items-center space-x-2 px-4 py-2 bg-green-50 rounded-lg border border-green-200">
                            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                            <span className="text-sm font-medium text-gray-700">
                                {walletAddress.slice(0, 6)}...{walletAddress.slice(-4)}
                            </span>
                        </div>
                    )}
                </div>
            </div>
        </header>
    );
};