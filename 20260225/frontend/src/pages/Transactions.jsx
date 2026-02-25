import React, { useEffect, useState } from 'react';
import { useFinance } from '../context/FinanceContext';
import TransactionList from '../components/Transactions/TransactionList';
import TransactionFilter from '../components/Transactions/TransactionFilter';
import TransactionForm from '../components/Transactions/TransactionForm';
import Modal from '../components/common/Modal';
import LoadingSpinner from '../components/common/LoadingSpinner';
import { HiOutlinePlusCircle } from 'react-icons/hi2';

export default function Transactions() {
    const {
        transactions, txnLoading, txnError,
        loadTransactions, addTransaction, editTransaction, removeTransaction,
        loadDashboard,
    } = useFinance();

    const [showForm, setShowForm] = useState(false);
    const [editData, setEditData] = useState(null);
    const [deleteConfirm, setDeleteConfirm] = useState(null);

    useEffect(() => {
        loadTransactions();
    }, [loadTransactions]);

    const handleAdd = async (data) => {
        await addTransaction(data);
        setShowForm(false);
        loadDashboard(); // Refresh dashboard data
    };

    const handleEdit = async (data) => {
        await editTransaction(editData.id, data);
        setEditData(null);
        loadDashboard();
    };

    const handleDelete = async (id) => {
        await removeTransaction(id);
        setDeleteConfirm(null);
        loadDashboard();
    };

    const handleFilter = (params) => {
        loadTransactions(params);
    };

    return (
        <div className="animate-fade-in">
            {/* Header */}
            <div className="flex items-center justify-between mb-8">
                <div>
                    <h1 className="text-2xl font-extrabold tracking-tight bg-gradient-to-r from-gray-100 to-gray-400 bg-clip-text text-transparent">
                        Transactions
                    </h1>
                    <p className="text-sm text-gray-500 mt-1">Manage your income and expenses</p>
                </div>
                <button onClick={() => setShowForm(true)} className="btn-primary flex items-center gap-2">
                    <HiOutlinePlusCircle className="w-5 h-5" />
                    Add Transaction
                </button>
            </div>

            {/* Filter */}
            <div className="mb-5">
                <TransactionFilter onFilter={handleFilter} />
            </div>

            {/* Error */}
            {txnError && (
                <div className="bg-red-500/10 border border-red-500/20 text-red-400 text-sm rounded-xl px-5 py-4 mb-5">
                    ⚠️ {txnError}
                </div>
            )}

            {/* List */}
            {txnLoading ? (
                <LoadingSpinner message="Loading transactions..." />
            ) : (
                <TransactionList
                    transactions={transactions}
                    onEdit={(txn) => setEditData(txn)}
                    onDelete={(id) => setDeleteConfirm(id)}
                />
            )}

            {/* Add Modal */}
            <Modal isOpen={showForm} onClose={() => setShowForm(false)} title="Add Transaction">
                <TransactionForm onSubmit={handleAdd} onCancel={() => setShowForm(false)} />
            </Modal>

            {/* Edit Modal */}
            <Modal isOpen={!!editData} onClose={() => setEditData(null)} title="Edit Transaction">
                <TransactionForm
                    editData={editData}
                    onSubmit={handleEdit}
                    onCancel={() => setEditData(null)}
                />
            </Modal>

            {/* Delete Confirm Modal */}
            <Modal isOpen={!!deleteConfirm} onClose={() => setDeleteConfirm(null)} title="Delete Transaction">
                <p className="text-gray-400 text-sm mb-6">
                    Are you sure you want to delete this transaction? This action cannot be undone.
                </p>
                <div className="flex gap-3">
                    <button
                        onClick={() => handleDelete(deleteConfirm)}
                        className="btn-danger flex-1"
                    >
                        Delete
                    </button>
                    <button onClick={() => setDeleteConfirm(null)} className="btn-ghost flex-1">
                        Cancel
                    </button>
                </div>
            </Modal>
        </div>
    );
}
