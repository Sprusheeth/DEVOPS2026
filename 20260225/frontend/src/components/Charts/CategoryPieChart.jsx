import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';

const COLORS = ['#7c6fff', '#34d399', '#f87171', '#fbbf24', '#60a5fa', '#f472b6', '#a78bfa', '#fb923c'];

const CustomTooltip = ({ active, payload }) => {
    if (!active || !payload?.length) return null;
    const d = payload[0];
    return (
        <div className="bg-dark-800 border border-white/10 rounded-xl px-4 py-2.5 shadow-xl">
            <p className="text-sm font-semibold text-white">{d.name}</p>
            <p className="text-sm text-gray-400">${d.value.toFixed(2)}</p>
        </div>
    );
};

export default function CategoryPieChart({ data }) {
    if (!data || data.length === 0) {
        return (
            <div className="glass-card p-6">
                <h3 className="text-sm font-bold uppercase tracking-widest text-gray-500 mb-4">Spending by Category</h3>
                <p className="text-gray-500 text-sm text-center py-8">No data available</p>
            </div>
        );
    }

    const expenseData = data
        .filter(d => d.type === 'expense')
        .map(d => ({ name: d.category, value: d.total }));

    return (
        <div className="glass-card p-6">
            <h3 className="text-sm font-bold uppercase tracking-widest text-gray-500 mb-4">Spending by Category</h3>
            <ResponsiveContainer width="100%" height={280}>
                <PieChart>
                    <Pie
                        data={expenseData}
                        cx="50%"
                        cy="50%"
                        innerRadius={60}
                        outerRadius={100}
                        paddingAngle={3}
                        dataKey="value"
                        stroke="none"
                    >
                        {expenseData.map((_, i) => (
                            <Cell key={i} fill={COLORS[i % COLORS.length]} />
                        ))}
                    </Pie>
                    <Tooltip content={<CustomTooltip />} />
                    <Legend
                        wrapperStyle={{ fontSize: '12px', color: '#94a3b8' }}
                        iconType="circle"
                        iconSize={8}
                    />
                </PieChart>
            </ResponsiveContainer>
        </div>
    );
}
