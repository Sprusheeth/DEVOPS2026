import React from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';

const CustomTooltip = ({ active, payload, label }) => {
    if (!active || !payload?.length) return null;
    return (
        <div className="bg-dark-800 border border-white/10 rounded-xl px-4 py-3 shadow-xl">
            <p className="text-xs font-semibold text-gray-400 mb-1">{label}</p>
            {payload.map((p, i) => (
                <p key={i} className="text-sm font-semibold" style={{ color: p.color }}>
                    {p.name}: ${p.value.toFixed(2)}
                </p>
            ))}
        </div>
    );
};

export default function MonthlyTrendChart({ data }) {
    if (!data || data.length === 0) {
        return (
            <div className="glass-card p-6">
                <h3 className="text-sm font-bold uppercase tracking-widest text-gray-500 mb-4">Monthly Trend</h3>
                <p className="text-gray-500 text-sm text-center py-8">No data available</p>
            </div>
        );
    }

    return (
        <div className="glass-card p-6">
            <h3 className="text-sm font-bold uppercase tracking-widest text-gray-500 mb-4">Monthly Trend</h3>
            <ResponsiveContainer width="100%" height={280}>
                <AreaChart data={data} margin={{ top: 5, right: 20, left: 0, bottom: 5 }}>
                    <defs>
                        <linearGradient id="incomeGrad" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="0%" stopColor="#34d399" stopOpacity={0.3} />
                            <stop offset="95%" stopColor="#34d399" stopOpacity={0} />
                        </linearGradient>
                        <linearGradient id="expenseGrad" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="0%" stopColor="#f87171" stopOpacity={0.3} />
                            <stop offset="95%" stopColor="#f87171" stopOpacity={0} />
                        </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" />
                    <XAxis
                        dataKey="month"
                        tick={{ fill: '#64748b', fontSize: 12 }}
                        axisLine={{ stroke: 'rgba(255,255,255,0.06)' }}
                        tickLine={false}
                    />
                    <YAxis
                        tick={{ fill: '#64748b', fontSize: 12 }}
                        axisLine={false}
                        tickLine={false}
                        tickFormatter={v => `$${v}`}
                    />
                    <Tooltip content={<CustomTooltip />} />
                    <Legend
                        wrapperStyle={{ fontSize: '12px', color: '#94a3b8' }}
                        iconType="circle"
                        iconSize={8}
                    />
                    <Area
                        type="monotone"
                        dataKey="income"
                        name="Income"
                        stroke="#34d399"
                        strokeWidth={2.5}
                        fill="url(#incomeGrad)"
                    />
                    <Area
                        type="monotone"
                        dataKey="expenses"
                        name="Expenses"
                        stroke="#f87171"
                        strokeWidth={2.5}
                        fill="url(#expenseGrad)"
                    />
                </AreaChart>
            </ResponsiveContainer>
        </div>
    );
}
