import React from 'react';
import { HiOutlinePencilSquare, HiOutlineTrash } from 'react-icons/hi2';

export default function TransactionList({ transactions, onEdit, onDelete }) {
    if (!transactions || transactions.length === 0) {
        return (
            <div className="glass-card p-8 text-center">
                <p className="text-gray-500 text-sm">No transactions found</p>
            </div>
        );
    }

    return (
        <div className="glass-card overflow-hidden">
            {/* Desktop Table */}
            <div className="hidden md:block overflow-x-auto">
                <table className="w-full">
                    <thead>
                        <tr className="bg-white/[0.02]">
                            <th className="text-left px-6 py-3 text-[0.7rem] font-bold uppercase tracking-widest text-gray-500">Description</th>
                            <th className="text-left px-6 py-3 text-[0.7rem] font-bold uppercase tracking-widest text-gray-500">Category</th>
                            <th className="text-left px-6 py-3 text-[0.7rem] font-bold uppercase tracking-widest text-gray-500">Date</th>
                            <th className="text-right px-6 py-3 text-[0.7rem] font-bold uppercase tracking-widest text-gray-500">Amount</th>
                            <th className="text-right px-6 py-3 text-[0.7rem] font-bold uppercase tracking-widest text-gray-500">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-white/5">
                        {transactions.map(txn => (
                            <tr key={txn.id} className="hover:bg-white/[0.02] transition-colors group">
                                <td className="px-6 py-3.5">
                                    <div className="flex items-center gap-3">
                                        <div className={`w-8 h-8 rounded-lg flex items-center justify-center text-sm
                      ${txn.type === 'income'
                                                ? 'bg-emerald-500/10 text-emerald-400'
                                                : 'bg-red-500/10 text-red-400'
                                            }`}
                                        >
                                            {txn.type === 'income' ? '↗' : '↘'}
                                        </div>
                                        <span className="text-sm font-medium text-gray-200">{txn.description}</span>
                                    </div>
                                </td>
                                <td className="px-6 py-3.5">
                                    <span className={`inline-flex px-2.5 py-1 rounded-full text-xs font-semibold
                    ${txn.type === 'income'
                                            ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/15'
                                            : 'bg-red-500/10 text-red-400 border border-red-500/15'
                                        }`}
                                    >
                                        {txn.category}
                                    </span>
                                </td>
                                <td className="px-6 py-3.5 text-sm text-gray-400">{txn.date}</td>
                                <td className={`px-6 py-3.5 text-right text-sm font-bold tabular-nums
                  ${txn.type === 'income' ? 'text-emerald-400' : 'text-red-400'}`}
                                >
                                    {txn.type === 'income' ? '+' : '-'}${txn.amount.toFixed(2)}
                                </td>
                                <td className="px-6 py-3.5 text-right">
                                    <div className="flex items-center justify-end gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                                        <button
                                            onClick={() => onEdit(txn)}
                                            className="p-2 rounded-lg hover:bg-accent/10 text-gray-400 hover:text-accent transition-colors"
                                            title="Edit"
                                        >
                                            <HiOutlinePencilSquare className="w-4 h-4" />
                                        </button>
                                        <button
                                            onClick={() => onDelete(txn.id)}
                                            className="p-2 rounded-lg hover:bg-red-500/10 text-gray-400 hover:text-red-400 transition-colors"
                                            title="Delete"
                                        >
                                            <HiOutlineTrash className="w-4 h-4" />
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Mobile Cards */}
            <div className="md:hidden divide-y divide-white/5">
                {transactions.map(txn => (
                    <div key={txn.id} className="p-4 flex items-center justify-between">
                        <div className="flex items-center gap-3 flex-1">
                            <div className={`w-10 h-10 rounded-xl flex items-center justify-center text-lg
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
                        <div className="flex items-center gap-2">
                            <span className={`text-sm font-bold tabular-nums
                ${txn.type === 'income' ? 'text-emerald-400' : 'text-red-400'}`}
                            >
                                {txn.type === 'income' ? '+' : '-'}${txn.amount.toFixed(2)}
                            </span>
                            <button onClick={() => onEdit(txn)} className="p-1.5 text-gray-400 hover:text-accent">
                                <HiOutlinePencilSquare className="w-4 h-4" />
                            </button>
                            <button onClick={() => onDelete(txn.id)} className="p-1.5 text-gray-400 hover:text-red-400">
                                <HiOutlineTrash className="w-4 h-4" />
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
