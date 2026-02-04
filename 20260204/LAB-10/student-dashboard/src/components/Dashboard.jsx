import React from 'react';
import './Dashboard.css';

const Dashboard = () => {
    const performanceData = [
        { label: 'Overall GPA', value: '3.8', icon: '📈', color: '#667eea' },
        { label: 'Courses Enrolled', value: '5', icon: '📚', color: '#764ba2' },
        { label: 'Assignments Due', value: '3', icon: '📝', color: '#f093fb' },
        { label: 'Attendance', value: '95%', icon: '✅', color: '#4facfe' },
    ];

    const recentActivity = [
        { title: 'Submitted Assignment - Web Development', time: '2 hours ago', type: 'assignment' },
        { title: 'Attended Lecture - Database Systems', time: '5 hours ago', type: 'lecture' },
        { title: 'Quiz Score: 92% - React Fundamentals', time: '1 day ago', type: 'quiz' },
        { title: 'Enrolled in New Course - DevOps 2026', time: '2 days ago', type: 'enrollment' },
    ];

    return (
        <div className="dashboard">
            <div className="dashboard-header">
                <h2>Welcome Back, Student! 👋</h2>
                <p>Here's an overview of your academic performance</p>
            </div>

            <div className="stats-grid">
                {performanceData.map((stat, index) => (
                    <div className="stat-card" key={index} style={{ '--accent-color': stat.color }}>
                        <div className="stat-icon">{stat.icon}</div>
                        <div className="stat-info">
                            <h3>{stat.value}</h3>
                            <p>{stat.label}</p>
                        </div>
                    </div>
                ))}
            </div>

            <div className="dashboard-content">
                <div className="activity-section">
                    <h3>📅 Recent Activity</h3>
                    <div className="activity-list">
                        {recentActivity.map((activity, index) => (
                            <div className="activity-item" key={index}>
                                <div className={`activity-dot ${activity.type}`}></div>
                                <div className="activity-details">
                                    <p className="activity-title">{activity.title}</p>
                                    <span className="activity-time">{activity.time}</span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="progress-section">
                    <h3>📊 Semester Progress</h3>
                    <div className="progress-items">
                        <div className="progress-item">
                            <div className="progress-header">
                                <span>Web Development</span>
                                <span>85%</span>
                            </div>
                            <div className="progress-bar">
                                <div className="progress-fill" style={{ width: '85%' }}></div>
                            </div>
                        </div>
                        <div className="progress-item">
                            <div className="progress-header">
                                <span>Database Systems</span>
                                <span>72%</span>
                            </div>
                            <div className="progress-bar">
                                <div className="progress-fill" style={{ width: '72%' }}></div>
                            </div>
                        </div>
                        <div className="progress-item">
                            <div className="progress-header">
                                <span>Data Structures</span>
                                <span>90%</span>
                            </div>
                            <div className="progress-bar">
                                <div className="progress-fill" style={{ width: '90%' }}></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
