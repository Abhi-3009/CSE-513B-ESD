import React from 'react';
import type { Course } from '../../api';

interface CourseCardProps {
    course: Course;
    onDelete: (id: number) => void;
    onEdit?: (course: Course) => void;
    isAdmin: boolean;
}

const CourseCard: React.FC<CourseCardProps> = ({ course, onDelete, onEdit, isAdmin }) => {
    return (
        <div className="professional-card flex flex-col h-full">
            <div className="flex justify-between items-start mb-3">
                <div>
                    <h3 className="text-xl font-bold text-primary mb-1">{course.name}</h3>
                    <p className="text-sm text-secondary font-medium">{course.courseCode}</p>
                </div>
                <span className="badge badge-primary">{course.credits} Credits</span>
            </div>

            <p className="text-secondary text-sm mb-4" style={{ minHeight: '3rem', lineHeight: '1.5' }}>
                {course.description}
            </p>

            <div className="grid grid-cols-2 gap-2 mb-4">
                <div className="text-xs text-secondary">
                    <span className="font-semibold text-primary">Year:</span> {course.year}
                </div>
                <div className="text-xs text-secondary">
                    <span className="font-semibold text-primary">Term:</span> {course.term}
                </div>
                <div className="text-xs text-secondary">
                    <span className="font-semibold text-primary">Faculty:</span> {course.faculty}
                </div>
                <div className="text-xs text-secondary">
                    <span className="font-semibold text-primary">Capacity:</span> {course.capacity}
                </div>
            </div>

            {isAdmin && (
                <div className="flex justify-end pt-3 border-t border-gray-200 gap-2 mt-auto">
                    <button
                        onClick={() => onEdit && onEdit(course)}
                        className="btn-secondary text-xs py-2 px-3"
                        style={{ marginRight: '0.5rem' }}
                    >
                        Edit
                    </button>
                    <button
                        onClick={() => onDelete(course.courseId)}
                        className="btn-danger text-xs py-2 px-3"
                    >
                        Delete
                    </button>
                </div>
            )}
        </div>
    );
};

export default CourseCard;
