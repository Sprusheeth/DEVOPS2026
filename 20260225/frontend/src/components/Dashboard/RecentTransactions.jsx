import React from 'react';

export default function RecentTransactions({ transactions }) {
    if (!transactions || transactions.length === 0) {
        return (
            <div className="glass-card p-6">
                <h3 className="text-sm font-bold uppercase tracking-widest text-gray-500 mb-4">Recent Transactions</h3>
                <p className="text-gray-500 text-sm text-center py-4">No transactions yet</p>
            </div>
        );
    }

    return (
        <div className="glass-card overflow-hidden">
            <h3 className="text-sm font-bold uppercase tracking-widest text-gray-500 px-6 pt-5 pb-4">
                Recent Transactions
            </h3>
            <div className="divide-y divide-white/5">
                {transactions.map(txn => (
                    <div key={txn.id} className="flex items-center justify-between px-6 py-3.5 hover:bg-white/[0.02] transition-colors">
                        <div className="flex items-center gap-3.5">
                            <div className={`w-9 h-9 rounded-xl flex items-center justify-center text-lg
                ${txn.type === 'income'
                                    ? 'bg-emerald-500/10 text-emerald-400'
                                    : 'bg-red-500/10 text-red-400'
                                }`}
                            >
                                {txn.type === 'income' ? '↗' : '↘'}
                            </div>
                            <div>
                                <p className="text-sm font-semibold text-gray-200">{txn.description}</p>
                                <p className="text-xs text-gray-500">{txn.category} · {txn.date}</p>
                            </div>
                        </div>
                        <span className={`text-sm font-bold tabular-nums ${txn.type === 'income' ? 'text-emerald-400' : 'text-red-400'
                            }`}>
                            {txn.type === 'income' ? '+' : '-'}${txn.amount.toFixed(2)}
                        </span>
                    </div>
                ))}
            </div>
        </div>
    );
}
