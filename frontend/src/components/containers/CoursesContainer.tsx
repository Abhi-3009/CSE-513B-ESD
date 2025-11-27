import React, { useState, useEffect } from 'react';
import API, { Course, CourseRequest } from '../../api';
import { useAuth } from '../../context/AuthContext';
import Navbar from '../presentation/Navbar';
import CourseCard from '../presentation/CourseCard';
import SearchBar from '../presentation/SearchBar';

interface CoursesContainerProps {
  onNavigateToSpecialisations: () => void;
}

const CoursesContainer: React.FC<CoursesContainerProps> = ({ onNavigateToSpecialisations }) => {
  const { token, role } = useAuth();
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [showCreateModal, setShowCreateModal] = useState<boolean>(false);
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [newCourse, setNewCourse] = useState<CourseRequest>({
    courseId: 0,
    courseCode: '',
    name: '',
    description: '',
    year: 2,
    term: 'Fall',
    faculty: 'Computer Science',
    credits: 3,
    capacity: 50
  });

  useEffect(() => {
    loadCourses();
  }, []);

  const loadCourses = async () => {
    setLoading(true);
    if (token) {
      try {
        const data = await API.listCourses(token);
        if (Array.isArray(data)) {
          setCourses(data);
        } else {
          console.error('Expected array of courses but got:', data);
          setCourses([]);
        }
      } catch (error) {
        console.error('Failed to load courses:', error);
        setCourses([]);
      }
    }
    setLoading(false);
  };

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (token) {
      if (isEditing) {
        await API.updateCourse(token, newCourse.courseId, newCourse);
      } else {
        await API.createCourse(token, newCourse);
      }
      setShowCreateModal(false);
      setIsEditing(false);
      setNewCourse({
        courseId: 0,
        courseCode: '',
        name: '',
        description: '',
        year: 2,
        term: 'Fall',
        faculty: 'Computer Science',
        credits: 3,
        capacity: 50
      });
      loadCourses();
    }
  };

  const handleEdit = (course: Course) => {
    setNewCourse({
      courseId: course.courseId,
      courseCode: course.courseCode,
      name: course.name,
      description: course.description,
      year: course.year,
      term: course.term,
      faculty: course.faculty,
      credits: course.credits,
      capacity: course.capacity
    });
    setIsEditing(true);
    setShowCreateModal(true);
  };

  const handleDelete = async (id: number) => {
    if (window.confirm('Are you sure you want to delete this course?')) {
      if (token) {
        await API.deleteCourse(token, id);
        loadCourses();
      }
    }
  };

  const filteredCourses = courses.filter(course =>
    (course.name?.toLowerCase() || '').includes(searchQuery.toLowerCase()) ||
    (course.courseCode?.toLowerCase() || '').includes(searchQuery.toLowerCase()) ||
    (course.description?.toLowerCase() || '').includes(searchQuery.toLowerCase()) ||
    (course.faculty?.toLowerCase() || '').includes(searchQuery.toLowerCase())
  );

  return (
    <div style={{ display: 'flex', minHeight: '100vh' }}>
      {/* Sidebar */}
      <Navbar currentPage="courses" onNavigate={(page) => {
        if (page === 'specialisations') {
          onNavigateToSpecialisations();
        }
      }} />

      {/* Main Content */}
      <div style={{ padding: '2rem', maxWidth: '1200px', margin: '0 auto', paddingTop: '80px' }}>
        {/* Header */}
        <div className="mb-4">
          <h1 className="text-2xl font-bold text-primary mb-2">
            Course Management
          </h1>
          <p className="text-secondary">
            Manage and organize your academic courses
          </p>
        </div>

        {/* Stats */}
        {/* Stats */}
        <div className="grid grid-cols-3 gap-4 mb-4">
          <div className="stat-card">
            <div className="stat-value">{courses.length}</div>
            <div className="stat-label">Total Courses</div>
          </div>
          <div className="stat-card">
            <div className="stat-value">{courses.reduce((sum, c) => sum + c.credits, 0)}</div>
            <div className="stat-label">Total Credits</div>
          </div>
          <div className="stat-card">
            <div className="stat-value">{courses.reduce((sum, c) => sum + c.capacity, 0)}</div>
            <div className="stat-label">Total Capacity</div>
          </div>
        </div>

        {/* Actions Bar */}
        <div className="flex justify-between items-center mb-4">
          <SearchBar
            value={searchQuery}
            onChange={setSearchQuery}
            placeholder="Search courses..."
          />
          <button
            onClick={() => {
              setNewCourse({
                courseId: 0,
                courseCode: '',
                name: '',
                description: '',
                year: 2,
                term: 'Fall',
                faculty: 'Computer Science',
                credits: 3,
                capacity: 50
              });
              setIsEditing(false);
              setShowCreateModal(true);
            }}
            className="btn-primary"
            style={{ display: role === 'admin' ? 'block' : 'none' }}
          >
            Add Course
          </button>
        </div>

        {/* Courses Grid */}
        {loading ? (
          <div className="flex justify-center items-center" style={{ padding: '4rem' }}>
            <div className="spinner" />
          </div>
        ) : filteredCourses.length === 0 ? (
          <div className="glass-card text-center" style={{ padding: '4rem' }}>
            <div style={{ fontSize: '4rem', marginBottom: '1rem' }}>📭</div>
            <h3 style={{ color: 'var(--text-secondary)' }}>
              {searchQuery ? 'No courses found' : 'No courses yet'}
            </h3>
            <p style={{ color: 'var(--text-secondary)' }}>
              {searchQuery ? 'Try a different search term' : 'Click "Add Course" to create your first course'}
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-3 gap-4">
            {filteredCourses.map(course => (
              <CourseCard key={course.courseId} course={course} onDelete={handleDelete} onEdit={handleEdit} isAdmin={role === 'admin'} />
            ))}
          </div>
        )}
      </div>

      {/* Create Modal */}
      {
        showCreateModal && (
          <div className="modal-overlay" onClick={() => setShowCreateModal(false)}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()} style={{ padding: '2rem' }}>
              <div className="modal-header">
                <h2 className="modal-title">{isEditing ? 'Edit Course' : 'Create New Course'}</h2>
                <button
                  onClick={() => setShowCreateModal(false)}
                  className="modal-close"
                >
                  ✕
                </button>
              </div>

              <form onSubmit={handleCreate}>
                <div className="form-group">
                  <label className="form-label">Course ID</label>
                  <input
                    type="number"
                    className="form-input"
                    value={newCourse.courseId || ''}
                    onChange={(e) => setNewCourse({ ...newCourse, courseId: parseInt(e.target.value) })}
                    required
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Course Code</label>
                  <input
                    type="text"
                    className="form-input"
                    value={newCourse.courseCode}
                    onChange={(e) => setNewCourse({ ...newCourse, courseCode: e.target.value })}
                    required
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Course Name</label>
                  <input
                    type="text"
                    className="form-input"
                    value={newCourse.name}
                    onChange={(e) => setNewCourse({ ...newCourse, name: e.target.value })}
                    required
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Description</label>
                  <textarea
                    className="form-input"
                    value={newCourse.description}
                    onChange={(e) => setNewCourse({ ...newCourse, description: e.target.value })}
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
                      value={newCourse.year}
                      onChange={(e) => setNewCourse({ ...newCourse, year: parseInt(e.target.value) })}
                      required
                    />
                  </div>

                  <div>
                    <label className="form-label">Term</label>
                    <select
                      className="form-input"
                      value={newCourse.term}
                      onChange={(e) => setNewCourse({ ...newCourse, term: e.target.value })}
                      required
                    >
                      <option value="Fall">Fall</option>
                      <option value="Spring">Spring</option>
                    </select>
                  </div>

                  <div>
                    <label className="form-label">Credits</label>
                    <input
                      type="number"
                      className="form-input"
                      value={newCourse.credits}
                      onChange={(e) => setNewCourse({ ...newCourse, credits: parseInt(e.target.value) })}
                      required
                    />
                  </div>

                  <div>
                    <label className="form-label">Capacity</label>
                    <input
                      type="number"
                      className="form-input"
                      value={newCourse.capacity}
                      onChange={(e) => setNewCourse({ ...newCourse, capacity: parseInt(e.target.value) })}
                      required
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label className="form-label">Faculty</label>
                  <input
                    type="text"
                    className="form-input"
                    value={newCourse.faculty}
                    onChange={(e) => setNewCourse({ ...newCourse, faculty: e.target.value })}
                    required
                  />
                </div>

                <button type="submit" className="btn-primary w-full mt-4">
                  {isEditing ? 'Update Course' : 'Create Course'}
                </button>
              </form>
            </div>
          </div>
        )
      }
    </div >
  );
};

export default CoursesContainer;
