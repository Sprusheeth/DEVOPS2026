import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

const api = axios.create({
    baseURL: API_URL,
    headers: { 'Content-Type': 'application/json' },
    timeout: 10000,
});

// ─── Dashboard ──────────────────────────────────────────
export const fetchDashboard = () => api.get('/api/dashboard').then(res => res.data);

// ─── Transactions ───────────────────────────────────────
export const fetchTransactions = (params = {}) =>
    api.get('/api/transactions', { params }).then(res => res.data);

export const createTransaction = (data) =>
    api.post('/api/transactions', data).then(res => res.data);

export const updateTransaction = (id, data) =>
    api.put(`/api/transactions/${id}`, data).then(res => res.data);

export const deleteTransaction = (id) =>
    api.delete(`/api/transactions/${id}`).then(res => res.data);

export default api;
