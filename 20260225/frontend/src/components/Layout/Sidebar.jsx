import React from 'react';
import { NavLink } from 'react-router-dom';
import { HiOutlineChartPie, HiOutlineCurrencyDollar, HiOutlineArrowTrendingUp } from 'react-icons/hi2';

const navItems = [
    { to: '/', label: 'Dashboard', icon: HiOutlineChartPie },
    { to: '/transactions', label: 'Transactions', icon: HiOutlineCurrencyDollar },
];

export default function Sidebar() {
    return (
        <aside className="fixed top-0 left-0 h-screen w-64 bg-dark-800/95 backdrop-blur-xl border-r border-white/5 flex flex-col p-6 gap-8 z-50">
            {/* Logo */}
            <div className="text-center pb-5 border-b border-white/5">
                <h1 className="text-xl font-bold">
                    <span className="bg-gradient-to-r from-accent-light to-emerald-400 bg-clip-text text-transparent">
                        💰 Finance
                    </span>
                    <span className="text-white">Tracker</span>
                </h1>
                <p className="text-[0.7rem] text-gray-500 mt-1 tracking-widest uppercase">Personal Dashboard</p>
            </div>

            {/* Navigation */}
            <nav className="flex flex-col gap-1.5">
                {navItems.map(({ to, label, icon: Icon }) => (
                    <NavLink
                        key={to}
                        to={to}
                        end={to === '/'}
                        className={({ isActive }) =>
                            `flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-300 group
               ${isActive
                                ? 'bg-gradient-to-r from-accent to-accent-light text-white shadow-lg shadow-accent/25'
                                : 'text-gray-400 hover:text-white hover:bg-white/5 hover:translate-x-1'
                            }`
                        }
                    >
                        <Icon className="w-5 h-5" />
                        {label}
                    </NavLink>
                ))}
            </nav>

            {/* Bottom info */}
            <div className="mt-auto glass-card p-4">
                <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-full bg-gradient-to-br from-accent to-emerald-400 flex items-center justify-center text-white text-sm font-bold">
                        U
                    </div>
                    <div>
                        <p className="text-sm font-semibold text-gray-200">User</p>
                        <p className="text-xs text-gray-500">Free Plan</p>
                    </div>
                </div>
            </div>
        </aside>
    );
}
