import React from 'react';
import './Courses.css';

const Courses = () => {
    const courses = [
        {
            id: 1,
            name: 'Web Development',
            code: 'CS301',
            instructor: 'Dr. Sarah Johnson',
            credits: 4,
            schedule: 'Mon, Wed, Fri - 10:00 AM',
            progress: 85,
            status: 'In Progress',
        },
        {
            id: 2,
            name: 'Database Systems',
            code: 'CS302',
            instructor: 'Prof. Michael Chen',
            credits: 3,
            schedule: 'Tue, Thu - 2:00 PM',
            progress: 72,
            status: 'In Progress',
        },
        {
            id: 3,
            name: 'Data Structures & Algorithms',
            code: 'CS201',
            instructor: 'Dr. Emily Williams',
            credits: 4,
            schedule: 'Mon, Wed - 1:00 PM',
            progress: 90,
            status: 'In Progress',
        },
        {
            id: 4,
            name: 'DevOps Fundamentals',
            code: 'CS401',
            instructor: 'Prof. David Kumar',
            credits: 3,
            schedule: 'Fri - 9:00 AM',
            progress: 45,
            status: 'In Progress',
        },
        {
            id: 5,
            name: 'Machine Learning Basics',
            code: 'CS450',
            instructor: 'Dr. Lisa Park',
            credits: 4,
            schedule: 'Tue, Thu - 11:00 AM',
            progress: 60,
            status: 'In Progress',
        },
    ];

    return (
        <div className="courses">
            <div className="courses-header">
                <h2>📚 My Enrolled Courses</h2>
                <p>You are currently enrolled in {courses.length} courses this semester</p>
            </div>

            <div className="courses-grid">
                {courses.map((course) => (
                    <div className="course-card" key={course.id}>
                        <div className="course-header">
                            <span className="course-code">{course.code}</span>
                            <span className={`course-status ${course.status.toLowerCase().replace(' ', '-')}`}>
                                {course.status}
                            </span>
                        </div>
                        <h3 className="course-name">{course.name}</h3>
                        <div className="course-details">
                            <div className="detail-item">
                                <span className="detail-icon">👨‍🏫</span>
                                <span>{course.instructor}</span>
                            </div>
                            <div className="detail-item">
                                <span className="detail-icon">⏰</span>
                                <span>{course.schedule}</span>
                            </div>
                            <div className="detail-item">
                                <span className="detail-icon">📊</span>
                                <span>{course.credits} Credits</span>
                            </div>
                        </div>
                        <div className="course-progress">
                            <div className="progress-label">
                                <span>Course Progress</span>
                                <span>{course.progress}%</span>
                            </div>
                            <div className="progress-track">
                                <div
                                    className="progress-indicator"
                                    style={{ width: `${course.progress}%` }}
                                ></div>
                            </div>
                        </div>
                        <button className="view-course-btn">View Details</button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Courses;
