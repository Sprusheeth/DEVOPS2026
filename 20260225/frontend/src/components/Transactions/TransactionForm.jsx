import React, { useState, useEffect } from 'react';

const CATEGORIES_EXPENSE = ['Food', 'Utilities', 'Health', 'Entertainment', 'Transport', 'Other'];
const CATEGORIES_INCOME = ['Employment', 'Freelance', 'Investment', 'Other'];

const initialForm = {
    type: 'expense',
    description: '',
    amount: '',
    date: new Date().toISOString().split('T')[0],
    category: 'Food',
};

export default function TransactionForm({ onSubmit, editData, onCancel }) {
    const [form, setForm] = useState(initialForm);
    const [error, setError] = useState('');
    const [submitting, setSubmitting] = useState(false);

    useEffect(() => {
        if (editData) {
            setForm({
                type: editData.type,
                description: editData.description,
                amount: editData.amount.toString(),
                date: editData.date,
                category: editData.category,
            });
        } else {
            setForm(initialForm);
        }
    }, [editData]);

    const categories = form.type === 'income' ? CATEGORIES_INCOME : CATEGORIES_EXPENSE;

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        if (!form.description.trim()) return setError('Description is required');
        if (!form.amount || parseFloat(form.amount) <= 0) return setError('Enter a valid amount');
        if (!form.date) return setError('Date is required');

        setSubmitting(true);
        try {
            await onSubmit({
                type: form.type,
                description: form.description.trim(),
                amount: parseFloat(form.amount),
                date: form.date,
                category: form.category,
            });
            if (!editData) setForm(initialForm);
        } catch (err) {
            setError(err.response?.data?.error || err.message);
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            {error && (
                <div className="bg-red-500/10 border border-red-500/20 text-red-400 text-sm rounded-xl px-4 py-2.5">
                    {error}
                </div>
            )}

            {/* Type Toggle */}
            <div className="flex rounded-xl overflow-hidden border border-white/10">
                {['expense', 'income'].map(type => (
                    <button
                        key={type}
                        type="button"
                        onClick={() => {
                            setForm(prev => ({
                                ...prev,
                                type,
                                category: type === 'income' ? 'Employment' : 'Food',
                            }));
                        }}
                        className={`flex-1 py-2.5 text-sm font-semibold capitalize transition-all duration-200
              ${form.type === type
                                ? type === 'income'
                                    ? 'bg-emerald-500/20 text-emerald-400'
                                    : 'bg-red-500/20 text-red-400'
                                : 'bg-dark-800 text-gray-500 hover:text-gray-300'
                            }`}
                    >
                        {type}
                    </button>
                ))}
            </div>

            {/* Description */}
            <div>
                <label className="block text-xs font-semibold text-gray-500 mb-1.5 uppercase tracking-wider">Description</label>
                <input
                    type="text"
                    value={form.description}
                    onChange={e => setForm(prev => ({ ...prev, description: e.target.value }))}
                    placeholder="e.g. Monthly groceries"
                    className="input-field"
                />
            </div>

            {/* Amount + Date */}
            <div className="grid grid-cols-2 gap-3">
                <div>
                    <label className="block text-xs font-semibold text-gray-500 mb-1.5 uppercase tracking-wider">Amount ($)</label>
                    <input
                        type="number"
                        step="0.01"
                        min="0"
                        value={form.amount}
                        onChange={e => setForm(prev => ({ ...prev, amount: e.target.value }))}
                        placeholder="0.00"
                        className="input-field"
                    />
                </div>
                <div>
                    <label className="block text-xs font-semibold text-gray-500 mb-1.5 uppercase tracking-wider">Date</label>
                    <input
                        type="date"
                        value={form.date}
                        onChange={e => setForm(prev => ({ ...prev, date: e.target.value }))}
                        className="input-field"
                    />
                </div>
            </div>

            {/* Category */}
            <div>
                <label className="block text-xs font-semibold text-gray-500 mb-1.5 uppercase tracking-wider">Category</label>
                <select
                    value={form.category}
                    onChange={e => setForm(prev => ({ ...prev, category: e.target.value }))}
                    className="select-field"
                >
                    {categories.map(c => <option key={c} value={c}>{c}</option>)}
                </select>
            </div>

            {/* Actions */}
            <div className="flex gap-3 pt-2">
                <button type="submit" disabled={submitting} className="btn-primary flex-1">
                    {submitting ? 'Saving...' : editData ? 'Update Transaction' : 'Add Transaction'}
                </button>
                {onCancel && (
                    <button type="button" onClick={onCancel} className="btn-ghost">
                        Cancel
                    </button>
                )}
            </div>
        </form>
    );
}
