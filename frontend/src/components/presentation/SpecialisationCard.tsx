import React from 'react';
import type { Specialisation } from '../../api';

interface SpecialisationCardProps {
    specialisation: Specialisation;
    onDelete: (id: number) => void;
    onEdit?: (specialisation: Specialisation) => void;
    onViewCourses?: (specialisation: Specialisation) => void;
    isAdmin: boolean;
}

const SpecialisationCard: React.FC<SpecialisationCardProps> = ({ specialisation, onDelete, onEdit, onViewCourses, isAdmin }) => {
    return (
        <div className="professional-card flex flex-col h-full">
            <div className="flex justify-between items-start mb-3">
                <div className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-xl">
                        ⭐
                    </div>
                    <div>
                        <h3 className="text-lg font-semibold text-primary">{specialisation.name}</h3>
                        <p className="text-sm text-secondary">{specialisation.code}</p>
                    </div>
                </div>
                <span className="badge badge-secondary">{specialisation.creditsRequired} Credits</span>
            </div>

            <p className="text-gray-500 text-sm mb-4 line-clamp-2">
                {specialisation.description}
            </p>

            <div className="flex gap-2 pt-3 border-t border-gray-200 mt-auto">
                <button
                    onClick={() => onViewCourses && onViewCourses(specialisation)}
                    className="btn-secondary text-xs py-2 px-3 bg-blue-50 text-blue-600 border-blue-200 hover:bg-blue-100 flex-1"
                    style={{ backgroundColor: '#eff6ff', color: '#2563eb', border: '1px solid #bfdbfe' }}
                >
                    Courses
                </button>

                {isAdmin && (
                    <>
                        <button
                            onClick={() => onEdit && onEdit(specialisation)}
                            className="btn-secondary text-xs py-2 px-3 flex-1"
                        >
                            Edit
                        </button>
                        <button
                            onClick={() => onDelete(specialisation.specialisationId)}
                            className="btn-danger text-xs py-2 px-3 flex-1"
                        >
                            Delete
                        </button>
                    </>
                )}
            </div>
        </div>
    );
};

export default SpecialisationCard;
