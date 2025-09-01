
import React from 'react';
import { useAuth } from '../contexts/AuthContext';
import { Icon } from '../components/Icon';
import { ICONS } from '../constants';
import { mockTransactions } from '../data';

const BillingPage: React.FC = () => {
    const { user } = useAuth();
    
    if (!user) {
        return (
            <div className="flex flex-col items-center justify-center h-full text-center text-gray-500">
                <h1 className="text-2xl font-bold">Please log in to view your billing information.</h1>
            </div>
        );
    }
    
    return (
        <div className="max-w-6xl mx-auto animate-fade-in">
            <h1 className="text-4xl font-bold mb-8">Billing & Subscriptions</h1>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Left Column: Balance & Actions */}
                <div className="lg:col-span-1 space-y-8">
                    <div className="bg-gray-800 rounded-lg p-6 text-center">
                        <p className="text-sm font-semibold text-gray-400">Current Balance</p>
                        <div className="flex items-center justify-center space-x-2 my-2">
                            <Icon svg={ICONS.currency} className="h-10 w-10 text-yellow-400" />
                            <p className="text-5xl font-bold text-white">{user.currency.toLocaleString()}</p>
                        </div>
                        <button className="w-full bg-green-500 hover:bg-green-600 text-white font-bold py-3 rounded-full transition-colors mt-4">
                            Add Funds
                        </button>
                    </div>

                    <div className="bg-gray-800 rounded-lg p-6">
                        <h3 className="text-xl font-bold mb-4">My Subscription</h3>
                        <p className="text-lg font-semibold text-indigo-400">ATLAX Premium</p>
                        <p className="text-gray-400 text-sm">Renews on August 20, 2024.</p>
                        <button className="w-full mt-4 bg-gray-700 hover:bg-gray-600 text-white font-bold py-2 rounded-full transition-colors">
                            Manage Subscription
                        </button>
                    </div>
                </div>

                {/* Right Column: Transaction History */}
                <div className="lg:col-span-2 bg-gray-800 rounded-lg p-6">
                    <h3 className="text-xl font-bold mb-4">Transaction History</h3>
                    <div className="overflow-x-auto">
                        <table className="w-full text-left">
                            <thead>
                                <tr className="border-b border-gray-700 text-sm text-gray-400">
                                    <th className="py-2 px-4">Date</th>
                                    <th className="py-2 px-4">Description</th>
                                    <th className="py-2 px-4 text-right">Amount</th>
                                </tr>
                            </thead>
                            <tbody>
                                {mockTransactions.map(tx => (
                                    <tr key={tx.id} className="border-b border-gray-700/50 hover:bg-gray-700/30">
                                        <td className="py-3 px-4 text-gray-300">{tx.date}</td>
                                        <td className="py-3 px-4 text-white">{tx.description}</td>
                                        <td className={`py-3 px-4 text-right font-semibold ${tx.amount > 0 ? 'text-green-400' : 'text-red-400'}`}>
                                            {tx.amount > 0 ? '+' : ''}{tx.amount.toFixed(2)}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BillingPage;
