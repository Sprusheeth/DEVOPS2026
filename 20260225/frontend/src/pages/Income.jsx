import React, { useState, useEffect } from 'react';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

function Income() {
    const [income, setIncome] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetch(`${API_URL}/api/income`)
            .then(res => {
                if (!res.ok) throw new Error('Failed to fetch income data');
                return res.json();
            })
            .then(json => { setIncome(json); setLoading(false); })
            .catch(err => { setError(err.message); setLoading(false); });
    }, []);

    const total = income.reduce((sum, i) => sum + i.amount, 0);

    if (loading) return <div className="loading">Loading income</div>;
    if (error) return <div className="error">⚠️ {error}</div>;

    return (
        <div>
            <div className="page-header">
                <h1>Income</h1>
                <p>Track all your earnings</p>
            </div>

            <div className="cards-grid">
                <div className="card">
                    <div className="card__label">Total Income</div>
                    <div className="card__value card__value--green">
                        ${total.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                    </div>
                </div>
                <div className="card">
                    <div className="card__label">Number of Sources</div>
                    <div className="card__value">{income.length}</div>
                </div>
            </div>

            <div className="table-container">
                <h2>All Income</h2>
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
                        {income.map(item => (
                            <tr key={item.id}>
                                <td>{item.description}</td>
                                <td><span className="badge badge--income">{item.category}</span></td>
                                <td className="amount--income">+${item.amount.toFixed(2)}</td>
                                <td>{item.date}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default Income;
