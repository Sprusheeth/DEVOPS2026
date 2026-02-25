import React, { useState } from 'react';
import { HiOutlineMagnifyingGlass, HiOutlineFunnel } from 'react-icons/hi2';

const CATEGORIES = ['All', 'Food', 'Utilities', 'Health', 'Entertainment', 'Transport', 'Employment', 'Freelance', 'Investment', 'Other'];

export default function TransactionFilter({ onFilter }) {
    const [filters, setFilters] = useState({
        type: '',
        category: '',
        search: '',
        startDate: '',
        endDate: '',
    });
    const [expanded, setExpanded] = useState(false);

    const handleChange = (field, value) => {
        const updated = { ...filters, [field]: value };
        setFilters(updated);

        // Build query params (omit empty values)
        const params = {};
        if (updated.type) params.type = updated.type;
        if (updated.category && updated.category !== 'All') params.category = updated.category;
        if (updated.search) params.search = updated.search;
        if (updated.startDate) params.startDate = updated.startDate;
        if (updated.endDate) params.endDate = updated.endDate;
        onFilter(params);
    };

    const clearFilters = () => {
        setFilters({ type: '', category: '', search: '', startDate: '', endDate: '' });
        onFilter({});
    };

    return (
        <div className="glass-card p-4">
            {/* Search + Toggle */}
            <div className="flex items-center gap-3">
                <div className="relative flex-1">
                    <HiOutlineMagnifyingGlass className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                    <input
                        type="text"
                        placeholder="Search transactions..."
                        value={filters.search}
                        onChange={e => handleChange('search', e.target.value)}
                        className="input-field pl-10"
                    />
                </div>
                <button
                    onClick={() => setExpanded(!expanded)}
                    className={`btn-ghost flex items-center gap-2 ${expanded ? 'bg-white/10' : ''}`}
                >
                    <HiOutlineFunnel className="w-4 h-4" />
                    Filters
                </button>
                {Object.values(filters).some(v => v) && (
                    <button onClick={clearFilters} className="btn-ghost text-red-400 hover:text-red-300">
                        Clear
                    </button>
                )}
            </div>

            {/* Expanded Filters */}
            {expanded && (
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-4 pt-4 border-t border-white/5 animate-fade-in">
                    <div>
                        <label className="block text-xs font-semibold text-gray-500 mb-1.5 uppercase tracking-wider">Type</label>
                        <select
                            value={filters.type}
                            onChange={e => handleChange('type', e.target.value)}
                            className="select-field"
                        >
                            <option value="">All Types</option>
                            <option value="income">Income</option>
                            <option value="expense">Expense</option>
                        </select>
                    </div>
                    <div>
                        <label className="block text-xs font-semibold text-gray-500 mb-1.5 uppercase tracking-wider">Category</label>
                        <select
                            value={filters.category}
                            onChange={e => handleChange('category', e.target.value)}
                            className="select-field"
                        >
                            {CATEGORIES.map(c => <option key={c} value={c === 'All' ? '' : c}>{c}</option>)}
                        </select>
                    </div>
                    <div>
                        <label className="block text-xs font-semibold text-gray-500 mb-1.5 uppercase tracking-wider">From</label>
                        <input
                            type="date"
                            value={filters.startDate}
                            onChange={e => handleChange('startDate', e.target.value)}
                            className="input-field"
                        />
                    </div>
                    <div>
                        <label className="block text-xs font-semibold text-gray-500 mb-1.5 uppercase tracking-wider">To</label>
                        <input
                            type="date"
                            value={filters.endDate}
                            onChange={e => handleChange('endDate', e.target.value)}
                            className="input-field"
                        />
                    </div>
                </div>
            )}
        </div>
    );
}
