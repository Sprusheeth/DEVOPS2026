import React from 'react';
import './Profile.css';

const Profile = () => {
    const studentInfo = {
        name: 'Alex Johnson',
        studentId: 'STU2026001',
        email: 'alex.johnson@university.edu',
        phone: '+1 (555) 123-4567',
        department: 'Computer Science',
        year: '3rd Year',
        enrollmentDate: 'August 2023',
        gpa: '3.8',
        advisor: 'Dr. Sarah Johnson',
        address: '123 University Ave, College Town, ST 12345',
    };

    const achievements = [
        { title: "Dean's List", semester: 'Fall 2025', icon: '🏆' },
        { title: 'Hackathon Winner', semester: 'Spring 2025', icon: '💻' },
        { title: 'Perfect Attendance', semester: 'Fall 2024', icon: '⭐' },
    ];

    return (
        <div className="profile">
            <div className="profile-header">
                <h2>👤 Student Profile</h2>
                <p>Your personal information and academic details</p>
            </div>

            <div className="profile-content">
                <div className="profile-card main-info">
                    <div className="avatar-section">
                        <div className="avatar">
                            <span>AJ</span>
                        </div>
                        <h3>{studentInfo.name}</h3>
                        <p className="student-id">{studentInfo.studentId}</p>
                        <span className="year-badge">{studentInfo.year}</span>
                    </div>
                    <div className="quick-stats">
                        <div className="quick-stat">
                            <span className="stat-value">{studentInfo.gpa}</span>
                            <span className="stat-label">GPA</span>
                        </div>
                        <div className="quick-stat">
                            <span className="stat-value">5</span>
                            <span className="stat-label">Courses</span>
                        </div>
                        <div className="quick-stat">
                            <span className="stat-value">95%</span>
                            <span className="stat-label">Attendance</span>
                        </div>
                    </div>
                </div>

                <div className="profile-card details-section">
                    <h3>📋 Personal Information</h3>
                    <div className="info-grid">
                        <div className="info-item">
                            <span className="info-label">📧 Email</span>
                            <span className="info-value">{studentInfo.email}</span>
                        </div>
                        <div className="info-item">
                            <span className="info-label">📱 Phone</span>
                            <span className="info-value">{studentInfo.phone}</span>
                        </div>
                        <div className="info-item">
                            <span className="info-label">🏛️ Department</span>
                            <span className="info-value">{studentInfo.department}</span>
                        </div>
                        <div className="info-item">
                            <span className="info-label">📅 Enrolled</span>
                            <span className="info-value">{studentInfo.enrollmentDate}</span>
                        </div>
                        <div className="info-item">
                            <span className="info-label">👨‍🏫 Advisor</span>
                            <span className="info-value">{studentInfo.advisor}</span>
                        </div>
                        <div className="info-item">
                            <span className="info-label">📍 Address</span>
                            <span className="info-value">{studentInfo.address}</span>
                        </div>
                    </div>
                </div>

                <div className="profile-card achievements-section">
                    <h3>🏅 Achievements</h3>
                    <div className="achievements-list">
                        {achievements.map((achievement, index) => (
                            <div className="achievement-item" key={index}>
                                <span className="achievement-icon">{achievement.icon}</span>
                                <div className="achievement-details">
                                    <span className="achievement-title">{achievement.title}</span>
                                    <span className="achievement-semester">{achievement.semester}</span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            <div className="profile-actions">
                <button className="action-btn edit">✏️ Edit Profile</button>
                <button className="action-btn settings">⚙️ Settings</button>
            </div>
        </div>
    );
};

export default Profile;
