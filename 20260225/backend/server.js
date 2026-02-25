const express = require('express');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5000;

// ─── Middleware ──────────────────────────────────────────
app.use(cors());
app.use(express.json());

// ─── In-Memory Data Store ───────────────────────────────
let nextId = 9;
let transactions = [
    { id: 1, type: 'income', description: 'Salary', amount: 3500.00, date: '2026-02-01', category: 'Employment' },
    { id: 2, type: 'income', description: 'Freelance Work', amount: 800.00, date: '2026-02-10', category: 'Freelance' },
    { id: 3, type: 'income', description: 'Investment Returns', amount: 150.00, date: '2026-02-14', category: 'Investment' },
    { id: 4, type: 'expense', description: 'Groceries', amount: 150.00, date: '2026-02-20', category: 'Food' },
    { id: 5, type: 'expense', description: 'Electric Bill', amount: 85.50, date: '2026-02-18', category: 'Utilities' },
    { id: 6, type: 'expense', description: 'Internet', amount: 49.99, date: '2026-02-15', category: 'Utilities' },
    { id: 7, type: 'expense', description: 'Gym Membership', amount: 30.00, date: '2026-02-10', category: 'Health' },
    { id: 8, type: 'expense', description: 'Movie Tickets', amount: 25.00, date: '2026-02-08', category: 'Entertainment' },
    { id: 9, type: 'income', description: 'Side Project', amount: 450.00, date: '2026-01-25', category: 'Freelance' },
    { id: 10, type: 'expense', description: 'Restaurant', amount: 65.00, date: '2026-01-20', category: 'Food' },
    { id: 11, type: 'expense', description: 'Gas', amount: 45.00, date: '2026-01-15', category: 'Transport' },
    { id: 12, type: 'income', description: 'January Salary', amount: 3500.00, date: '2026-01-01', category: 'Employment' },
];

// ─── Helper ─────────────────────────────────────────────
function computeSummary(txns) {
    const totalIncome = txns.filter(t => t.type === 'income').reduce((s, t) => s + t.amount, 0);
    const totalExpenses = txns.filter(t => t.type === 'expense').reduce((s, t) => s + t.amount, 0);
    return { totalIncome, totalExpenses, balance: totalIncome - totalExpenses };
}

// ─── GET /api/dashboard ─────────────────────────────────
app.get('/api/dashboard', (req, res) => {
    const summary = computeSummary(transactions);
    const recentTransactions = [...transactions]
        .sort((a, b) => new Date(b.date) - new Date(a.date))
        .slice(0, 5);

    // Category breakdown for pie chart
    const categoryMap = {};
    transactions.forEach(t => {
        const key = `${t.category}_${t.type}`;
        if (!categoryMap[key]) categoryMap[key] = { category: t.category, type: t.type, total: 0 };
        categoryMap[key].total += t.amount;
    });

    // Monthly trend for line chart
    const monthlyMap = {};
    transactions.forEach(t => {
        const month = t.date.substring(0, 7); // YYYY-MM
        if (!monthlyMap[month]) monthlyMap[month] = { month, income: 0, expenses: 0 };
        if (t.type === 'income') monthlyMap[month].income += t.amount;
        else monthlyMap[month].expenses += t.amount;
    });
    const monthlyTrend = Object.values(monthlyMap).sort((a, b) => a.month.localeCompare(b.month));

    res.json({
        ...summary,
        recentTransactions,
        categoryBreakdown: Object.values(categoryMap),
        monthlyTrend,
    });
});

// ─── GET /api/transactions ──────────────────────────────
app.get('/api/transactions', (req, res) => {
    let result = [...transactions];

    // Filters
    const { type, category, startDate, endDate, search } = req.query;
    if (type) result = result.filter(t => t.type === type);
    if (category) result = result.filter(t => t.category.toLowerCase() === category.toLowerCase());
    if (startDate) result = result.filter(t => t.date >= startDate);
    if (endDate) result = result.filter(t => t.date <= endDate);
    if (search) result = result.filter(t => t.description.toLowerCase().includes(search.toLowerCase()));

    // Sort newest first
    result.sort((a, b) => new Date(b.date) - new Date(a.date));

    res.json(result);
});

// ─── GET /api/transactions/:id ──────────────────────────
app.get('/api/transactions/:id', (req, res) => {
    const txn = transactions.find(t => t.id === parseInt(req.params.id));
    if (!txn) return res.status(404).json({ error: 'Transaction not found' });
    res.json(txn);
});

// ─── POST /api/transactions ─────────────────────────────
app.post('/api/transactions', (req, res) => {
    const { type, description, amount, date, category } = req.body;

    if (!type || !description || !amount || !date || !category) {
        return res.status(400).json({ error: 'All fields are required: type, description, amount, date, category' });
    }
    if (!['income', 'expense'].includes(type)) {
        return res.status(400).json({ error: 'Type must be "income" or "expense"' });
    }
    if (typeof amount !== 'number' || amount <= 0) {
        return res.status(400).json({ error: 'Amount must be a positive number' });
    }

    const newTxn = { id: ++nextId, type, description, amount, date, category };
    transactions.push(newTxn);
    res.status(201).json(newTxn);
});

// ─── PUT /api/transactions/:id ──────────────────────────
app.put('/api/transactions/:id', (req, res) => {
    const idx = transactions.findIndex(t => t.id === parseInt(req.params.id));
    if (idx === -1) return res.status(404).json({ error: 'Transaction not found' });

    const { type, description, amount, date, category } = req.body;
    if (type && !['income', 'expense'].includes(type)) {
        return res.status(400).json({ error: 'Type must be "income" or "expense"' });
    }
    if (amount !== undefined && (typeof amount !== 'number' || amount <= 0)) {
        return res.status(400).json({ error: 'Amount must be a positive number' });
    }

    transactions[idx] = {
        ...transactions[idx],
        ...(type && { type }),
        ...(description && { description }),
        ...(amount && { amount }),
        ...(date && { date }),
        ...(category && { category }),
    };

    res.json(transactions[idx]);
});

// ─── DELETE /api/transactions/:id ───────────────────────
app.delete('/api/transactions/:id', (req, res) => {
    const idx = transactions.findIndex(t => t.id === parseInt(req.params.id));
    if (idx === -1) return res.status(404).json({ error: 'Transaction not found' });

    const deleted = transactions.splice(idx, 1)[0];
    res.json({ message: 'Transaction deleted', transaction: deleted });
});

// ─── Legacy endpoints (backward compat) ─────────────────
app.get('/api/expenses', (req, res) => {
    res.json(transactions.filter(t => t.type === 'expense'));
});

app.get('/api/income', (req, res) => {
    res.json(transactions.filter(t => t.type === 'income'));
});

// ─── Start Server ───────────────────────────────────────
app.listen(PORT, '0.0.0.0', () => {
    console.log(`✅ Backend API running on http://0.0.0.0:${PORT}`);
});
