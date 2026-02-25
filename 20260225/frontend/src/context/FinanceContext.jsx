import React, { createContext, useContext, useState, useCallback } from 'react';
import {
    fetchDashboard,
    fetchTransactions,
    createTransaction,
    updateTransaction,
    deleteTransaction,
} from '../services/api';

const FinanceContext = createContext();

export function useFinance() {
    const context = useContext(FinanceContext);
    if (!context) throw new Error('useFinance must be used within FinanceProvider');
    return context;
}

export function FinanceProvider({ children }) {
    // Dashboard state
    const [dashboard, setDashboard] = useState(null);
    const [dashboardLoading, setDashboardLoading] = useState(false);
    const [dashboardError, setDashboardError] = useState(null);

    // Transactions state
    const [transactions, setTransactions] = useState([]);
    const [txnLoading, setTxnLoading] = useState(false);
    const [txnError, setTxnError] = useState(null);

    // ─── Dashboard Actions ────────────────────────────────
    const loadDashboard = useCallback(async () => {
        setDashboardLoading(true);
        setDashboardError(null);
        try {
            const data = await fetchDashboard();
            setDashboard(data);
        } catch (err) {
            setDashboardError(err.response?.data?.error || err.message);
        } finally {
            setDashboardLoading(false);
        }
    }, []);

    // ─── Transactions Actions ─────────────────────────────
    const loadTransactions = useCallback(async (filters = {}) => {
        setTxnLoading(true);
        setTxnError(null);
        try {
            const data = await fetchTransactions(filters);
            setTransactions(data);
        } catch (err) {
            setTxnError(err.response?.data?.error || err.message);
        } finally {
            setTxnLoading(false);
        }
    }, []);

    const addTransaction = useCallback(async (txnData) => {
        const newTxn = await createTransaction(txnData);
        setTransactions(prev => [newTxn, ...prev]);
        return newTxn;
    }, []);

    const editTransaction = useCallback(async (id, txnData) => {
        const updated = await updateTransaction(id, txnData);
        setTransactions(prev => prev.map(t => (t.id === id ? updated : t)));
        return updated;
    }, []);

    const removeTransaction = useCallback(async (id) => {
        await deleteTransaction(id);
        setTransactions(prev => prev.filter(t => t.id !== id));
    }, []);

    const value = {
        // Dashboard
        dashboard, dashboardLoading, dashboardError, loadDashboard,
        // Transactions
        transactions, txnLoading, txnError,
        loadTransactions, addTransaction, editTransaction, removeTransaction,
    };

    return (
        <FinanceContext.Provider value={value}>
            {children}
        </FinanceContext.Provider>
    );
}
