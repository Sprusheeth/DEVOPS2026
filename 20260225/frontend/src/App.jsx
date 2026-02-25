import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { FinanceProvider } from './context/FinanceContext';
import Sidebar from './components/Layout/Sidebar';
import Dashboard from './pages/Dashboard';
import Transactions from './pages/Transactions';

function App() {
    return (
        <FinanceProvider>
            <Router>
                <div className="flex min-h-screen">
                    <Sidebar />
                    <main className="flex-1 ml-64 p-8 lg:p-10">
                        <Routes>
                            <Route path="/" element={<Dashboard />} />
                            <Route path="/transactions" element={<Transactions />} />
                        </Routes>
                    </main>
                </div>
            </Router>
        </FinanceProvider>
    );
}

export default App;
