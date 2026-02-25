import React from 'react';
import { HiOutlineArrowTrendingUp, HiOutlineArrowTrendingDown, HiOutlineBanknotes } from 'react-icons/hi2';

const cards = [
    {
        key: 'totalIncome',
        label: 'Total Income',
        icon: HiOutlineArrowTrendingUp,
        color: 'text-emerald-400',
        glow: 'shadow-emerald-500/10',
        gradient: 'from-emerald-500/10 to-transparent',
        border: 'border-emerald-500/20',
    },
    {
        key: 'totalExpenses',
        label: 'Total Expenses',
        icon: HiOutlineArrowTrendingDown,
        color: 'text-red-400',
        glow: 'shadow-red-500/10',
        gradient: 'from-red-500/10 to-transparent',
        border: 'border-red-500/20',
    },
    {
        key: 'balance',
        label: 'Net Balance',
        icon: HiOutlineBanknotes,
        color: 'text-accent-light',
        glow: 'shadow-accent/10',
        gradient: 'from-accent/10 to-transparent',
        border: 'border-accent/20',
    },
];

export default function SummaryCards({ data }) {
    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {cards.map(({ key, label, icon: Icon, color, glow, gradient, border }) => (
                <div
                    key={key}
                    className={`glass-card-hover p-6 relative overflow-hidden border ${border}`}
                >
                    {/* Glow background */}
                    <div className={`absolute inset-0 bg-gradient-to-br ${gradient} opacity-50`} />

                    <div className="relative">
                        <div className="flex items-center justify-between mb-3">
                            <span className="text-[0.72rem] font-semibold uppercase tracking-widest text-gray-500">
                                {label}
                            </span>
                            <Icon className={`w-5 h-5 ${color}`} />
                        </div>
                        <p className={`text-3xl font-extrabold tracking-tight ${color}`}>
                            ${(data[key] || 0).toLocaleString('en-US', { minimumFractionDigits: 2 })}
                        </p>
                    </div>
                </div>
            ))}
        </div>
    );
}
