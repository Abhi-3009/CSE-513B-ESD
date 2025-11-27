import React, { useState, useEffect } from 'react';
import API, { Specialisation, SpecialisationRequest, Course } from '../../api';
import { useAuth } from '../../context/AuthContext';
import Navbar from '../presentation/Navbar';
import SpecialisationCard from '../presentation/SpecialisationCard';
import SearchBar from '../presentation/SearchBar';

interface SpecialisationsContainerProps {
    onNavigateToCourses: () => void;
}

const SpecialisationsContainer: React.FC<SpecialisationsContainerProps> = ({ onNavigateToCourses }) => {
    const { token, role } = useAuth();
    const [specialisations, setSpecialisations] = useState<Specialisation[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [searchQuery, setSearchQuery] = useState<string>('');
    const [showCreateModal, setShowCreateModal] = useState<boolean>(false);
    const [isEditing, setIsEditing] = useState<boolean>(false);
    const [showCoursesModal, setShowCoursesModal] = useState<boolean>(false);
    const [selectedSpecialisation, setSelectedSpecialisation] = useState<Specialisation | null>(null);
    const [specialisationCourses, setSpecialisationCourses] = useState<Course[]>([]);
    const [newSpecialisation, setNewSpecialisation] = useState<SpecialisationRequest>({
        specialisationId: 0,
        code: '',
        name: '',
        description: '',
        year: 2,
        creditsRequired: 18
    });

    useEffect(() => {
        loadSpecialisations();
    }, []);

    const loadSpecialisations = async () => {
        setLoading(true);
        if (token) {
            try {
                const data = await API.listSpecialisations(token);
                if (Array.isArray(data)) {
                    setSpecialisations(data);
                } else {
                    console.error('Expected array of specialisations but got:', data);
                    setSpecialisations([]);
                }
            } catch (error) {
                console.error('Failed to load specialisations:', error);
                setSpecialisations([]);
            }
        }
        setLoading(false);
    };

    const handleCreate = async (e: React.FormEvent) => {
        e.preventDefault();
        if (token) {
            if (isEditing) {
                await API.updateSpecialisation(token, newSpecialisation.specialisationId, newSpecialisation);
            } else {
                await API.createSpecialisation(token, newSpecialisation);
            }
            setShowCreateModal(false);
            setIsEditing(false);
            setNewSpecialisation({
                specialisationId: 0,
                code: '',
                name: '',
                description: '',
                year: 2,
                creditsRequired: 18
            });
            loadSpecialisations();
        }
    };

    const handleEditClick = (spec: Specialisation) => {
        setNewSpecialisation({
            specialisationId: spec.specialisationId,
            code: spec.code,
            name: spec.name,
            description: spec.description,
            year: spec.year,
            creditsRequired: spec.creditsRequired
        });
        setIsEditing(true);
        setShowCreateModal(true);
    };

    const handleViewCoursesClick = async (spec: Specialisation) => {
        setSelectedSpecialisation(spec);
        setShowCoursesModal(true);
        if (token) {
            try {
                const courses = await API.getSpecialisationCourses(token, spec.specialisationId);
                setSpecialisationCourses(Array.isArray(courses) ? courses : []);
            } catch (error) {
                console.error('Failed to load courses for specialisation:', error);
                setSpecialisationCourses([]);
            }
        }
    };

    const handleDelete = async (id: number) => {
        if (window.confirm('Are you sure you want to delete this specialisation?')) {
            if (token) {
                await API.deleteSpecialisation(token, id);
                loadSpecialisations();
            }
        }
    };

    const filteredSpecialisations = specialisations.filter(spec =>
        (spec.name?.toLowerCase() || '').includes(searchQuery.toLowerCase()) ||
        (spec.code?.toLowerCase() || '').includes(searchQuery.toLowerCase()) ||
        (spec.description?.toLowerCase() || '').includes(searchQuery.toLowerCase())
    );

    return (
        <div style={{ display: 'flex', minHeight: '100vh' }}>
            {/* Sidebar */}
            <Navbar currentPage="specialisations" onNavigate={(page) => {
                if (page === 'courses') {
                    onNavigateToCourses();
                }
            }} />

            {/* Main Content */}
            <div style={{ padding: '2rem', maxWidth: '1200px', margin: '0 auto', paddingTop: '80px' }}>
                {/* Header */}
                <div className="mb-4">
                    <h1 className="text-2xl font-bold text-primary mb-2">
                        Specialisation Management
                    </h1>
                    <p className="text-secondary">
                        Manage and organize academic specialisations
                    </p>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-3 gap-4 mb-4">
                    <div className="stat-card">
                        <div className="stat-value">{specialisations.length}</div>
                        <div className="stat-label">Total Specialisations</div>
                    </div>
                    <div className="stat-card">
                        <div className="stat-value">{specialisations.reduce((sum, s) => sum + s.creditsRequired, 0)}</div>
                        <div className="stat-label">Total Credits Required</div>
                    </div>
                    <div className="stat-card">
                        <div className="stat-value">{specialisations.length > 0 ? Math.round(specialisations.reduce((sum, s) => sum + s.creditsRequired, 0) / specialisations.length) : 0}</div>
                        <div className="stat-label">Avg Credits</div>
                    </div>
                </div>

                {/* Actions Bar */}
                <div className="flex justify-between items-center mb-4">
                    <SearchBar
                        value={searchQuery}
                        onChange={setSearchQuery}
                        placeholder="Search specialisations..."
                    />
                    <button
                        onClick={() => {
                            setIsEditing(false);
                            setNewSpecialisation({
                                specialisationId: 0,
                                code: '',
                                name: '',
                                description: '',
                                year: 2,
                                creditsRequired: 18
                            });
                            setShowCreateModal(true);
                        }}
                        className="btn-primary"
                        style={{ display: role === 'admin' ? 'block' : 'none' }}
                    >
                        Add Specialisation
                    </button>
                </div>

                {/* Specialisations Grid */}
                {loading ? (
                    <div className="flex justify-center items-center" style={{ padding: '4rem' }}>
                        <div className="spinner" />
                    </div>
                ) : filteredSpecialisations.length === 0 ? (
                    <div className="glass-card text-center" style={{ padding: '4rem' }}>
                        <div style={{ fontSize: '4rem', marginBottom: '1rem' }}>📭</div>
                        <h3 style={{ color: 'var(--text-secondary)' }}>
                            {searchQuery ? 'No specialisations found' : 'No specialisations yet'}
                        </h3>
                        <p style={{ color: 'var(--text-secondary)' }}>
                            {searchQuery ? 'Try a different search term' : 'Click "Add Specialisation" to create your first specialisation'}
                        </p>
                    </div>
                ) : (
                    <div className="grid grid-cols-3 gap-4">
                        {filteredSpecialisations.map(spec => (
                            <SpecialisationCard
                                key={spec.specialisationId}
                                specialisation={spec}
                                onDelete={handleDelete}
                                onEdit={handleEditClick}
                                onViewCourses={handleViewCoursesClick}
                                isAdmin={role === 'admin'}
                            />
                        ))}
                    </div>
                )}
            </div>

            {/* Create Modal */}
            {showCreateModal && (
                <div className="modal-overlay" onClick={() => setShowCreateModal(false)}>
                    <div className="modal-content" onClick={(e) => e.stopPropagation()} style={{ padding: '2rem' }}>
                        <div className="modal-header">
                            <h2 className="modal-title">{isEditing ? 'Edit Specialisation' : 'Create New Specialisation'}</h2>
                            <button
                                onClick={() => setShowCreateModal(false)}
                                className="modal-close"
                            >
                                ✕
                            </button>
                        </div>

                        <form onSubmit={handleCreate}>
                            <div className="form-group">
                                <label className="form-label">Specialisation ID</label>
                                <input
                                    type="number"
                                    className="form-input"
                                    value={newSpecialisation.specialisationId || ''}
                                    onChange={(e) => setNewSpecialisation({ ...newSpecialisation, specialisationId: parseInt(e.target.value) })}
                                    required
                                    disabled={isEditing}
                                />
                            </div>

                            <div className="form-group">
                                <label className="form-label">Code</label>
                                <input
                                    type="text"
                                    className="form-input"
                                    value={newSpecialisation.code}
                                    onChange={(e) => setNewSpecialisation({ ...newSpecialisation, code: e.target.value })}
                                    required
                                />
                            </div>

                            <div className="form-group">
                                <label className="form-label">Name</label>
                                <input
                                    type="text"
                                    className="form-input"
                                    value={newSpecialisation.name}
                                    onChange={(e) => setNewSpecialisation({ ...newSpecialisation, name: e.target.value })}
                                    required
                                />
                            </div>

                            <div className="form-group">
                                <label className="form-label">Description</label>
                                <textarea
                                    className="form-input"
                                    value={newSpecialisation.description}
                                    onChange={(e) => setNewSpecialisation({ ...newSpecialisation, description: e.target.value })}
                                    rows={3}
                                    required
                                />
                            </div>

                            <div className="grid grid-cols-2 gap-4 mb-4">
                                <div>
                                    <label className="form-label">Year</label>
                                    <input
                                        type="number"
                                        className="form-input"
                                        value={newSpecialisation.year}
                                        onChange={(e) => setNewSpecialisation({ ...newSpecialisation, year: parseInt(e.target.value) })}
                                        required
                                    />
                                </div>

                                <div>
                                    <label className="form-label">Credits Required</label>
                                    <input
                                        type="number"
                                        className="form-input"
                                        value={newSpecialisation.creditsRequired}
                                        onChange={(e) => setNewSpecialisation({ ...newSpecialisation, creditsRequired: parseInt(e.target.value) })}
                                        required
                                    />
                                </div>
                            </div>

                            <button type="submit" className="btn-primary w-full mt-4">
                                {isEditing ? 'Update Specialisation' : 'Create Specialisation'}
                            </button>
                        </form>
                    </div>
                </div>
            )}

            {/* View Courses Modal */}
            {showCoursesModal && selectedSpecialisation && (
                <div className="modal-overlay" onClick={() => setShowCoursesModal(false)}>
                    <div className="modal-content" onClick={(e) => e.stopPropagation()} style={{ padding: '2rem', maxWidth: '800px' }}>
                        <div className="modal-header">
                            <h2 className="modal-title">Courses in {selectedSpecialisation.name}</h2>
                            <button
                                onClick={() => setShowCoursesModal(false)}
                                className="modal-close"
                            >
                                ✕
                            </button>
                        </div>

                        <div className="mt-4">
                            {specialisationCourses.length === 0 ? (
                                <p className="text-secondary text-center py-4">No courses registered under this specialisation.</p>
                            ) : (
                                <div className="grid grid-cols-1 gap-4">
                                    {specialisationCourses.map(course => (
                                        <div key={course.courseId} className="p-4 border border-gray-200 rounded-lg flex justify-between items-center">
                                            <div>
                                                <h4 className="font-bold text-primary">{course.name}</h4>
                                                <p className="text-sm text-secondary">{course.courseCode} • {course.credits} Credits</p>
                                            </div>
                                            <div className="text-sm text-secondary">
                                                {course.term}, Year {course.year}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default SpecialisationsContainer;
