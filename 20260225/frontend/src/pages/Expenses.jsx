import React, { useState, useEffect } from 'react';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

function Expenses() {
    const [expenses, setExpenses] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetch(`${API_URL}/api/expenses`)
            .then(res => {
                if (!res.ok) throw new Error('Failed to fetch expenses');
                return res.json();
            })
            .then(json => { setExpenses(json); setLoading(false); })
            .catch(err => { setError(err.message); setLoading(false); });
    }, []);

    const total = expenses.reduce((sum, e) => sum + e.amount, 0);

    if (loading) return <div className="loading">Loading expenses</div>;
    if (error) return <div className="error">⚠️ {error}</div>;

    return (
        <div>
            <div className="page-header">
                <h1>Expenses</h1>
                <p>Track all your spending</p>
            </div>

            <div className="cards-grid">
                <div className="card">
                    <div className="card__label">Total Expenses</div>
                    <div className="card__value card__value--red">
                        ${total.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                    </div>
                </div>
                <div className="card">
                    <div className="card__label">Number of Entries</div>
                    <div className="card__value">{expenses.length}</div>
                </div>
            </div>

            <div className="table-container">
                <h2>All Expenses</h2>
                <table>
                    <thead>
                        <tr>
                            <th>Description</th>
                            <th>Category</th>
                            <th>Amount</th>
                            <th>Date</th>
                        </tr>
                    </thead>
                    <tbody>
                        {expenses.map(exp => (
                            <tr key={exp.id}>
                                <td>{exp.description}</td>
                                <td><span className="badge badge--expense">{exp.category}</span></td>
                                <td className="amount--expense">-${exp.amount.toFixed(2)}</td>
                                <td>{exp.date}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default Expenses;
