import React, { useEffect } from 'react';
import { useFinance } from '../context/FinanceContext';
import SummaryCards from '../components/Dashboard/SummaryCards';
import RecentTransactions from '../components/Dashboard/RecentTransactions';
import CategoryPieChart from '../components/Charts/CategoryPieChart';
import MonthlyTrendChart from '../components/Charts/MonthlyTrendChart';
import LoadingSpinner from '../components/common/LoadingSpinner';

export default function Dashboard() {
    const { dashboard, dashboardLoading, dashboardError, loadDashboard } = useFinance();

    useEffect(() => {
        loadDashboard();
    }, [loadDashboard]);

    if (dashboardLoading) return <LoadingSpinner message="Loading dashboard..." />;
    if (dashboardError) {
        return (
            <div className="bg-red-500/10 border border-red-500/20 text-red-400 text-sm rounded-xl px-5 py-4">
                ⚠️ {dashboardError}
            </div>
        );
    }
    if (!dashboard) return null;

    return (
        <div className="animate-fade-in">
            <div className="mb-8">
                <h1 className="text-2xl font-extrabold tracking-tight bg-gradient-to-r from-gray-100 to-gray-400 bg-clip-text text-transparent">
                    Dashboard
                </h1>
                <p className="text-sm text-gray-500 mt-1">Overview of your personal finances</p>
            </div>

            <SummaryCards data={dashboard} />

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 mt-6">
                <CategoryPieChart data={dashboard.categoryBreakdown} />
                <MonthlyTrendChart data={dashboard.monthlyTrend} />
            </div>

            <div className="mt-6">
                <RecentTransactions transactions={dashboard.recentTransactions} />
            </div>
        </div>
    );
}
