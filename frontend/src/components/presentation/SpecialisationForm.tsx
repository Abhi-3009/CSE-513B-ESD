import React from 'react';

interface SpecialisationFormData {
    code: string;
    title: string;
    credits: number;
    description: string;
    year: number;
}

interface SpecialisationFormProps {
    form: SpecialisationFormData;
    setForm: (form: SpecialisationFormData) => void;
    onSubmit: (e: React.FormEvent) => void;
    loading: boolean;
    onCancel: () => void;
}

const SpecialisationForm: React.FC<SpecialisationFormProps> = ({
    form,
    setForm,
    onSubmit,
    loading,
    onCancel
}) => {
    return (
        <div className="card mb-4 shadow-sm">
            <div className="card-header bg-primary text-white">
                <h5 className="mb-0"><i className="bi bi-plus-circle me-2"></i>Add New Specialisation</h5>
            </div>
            <div className="card-body">
                <form onSubmit={onSubmit}>
                    <div className="row">
                        <div className="col-md-6 mb-3">
                            <label htmlFor="spec-code" className="form-label">
                                Specialisation Code <span className="text-danger">*</span>
                            </label>
                            <input
                                type="text"
                                className="form-control"
                                id="spec-code"
                                placeholder="e.g., AI, DS, SE"
                                value={form.code}
                                onChange={e => setForm({ ...form, code: e.target.value.toUpperCase() })}
                                required
                                maxLength={10}
                            />
                            <small className="text-muted">Short code for the specialisation (max 10 characters)</small>
                        </div>

                        <div className="col-md-6 mb-3">
                            <label htmlFor="spec-title" className="form-label">
                                Specialisation Name <span className="text-danger">*</span>
                            </label>
                            <input
                                type="text"
                                className="form-control"
                                id="spec-title"
                                placeholder="e.g., Artificial Intelligence"
                                value={form.title}
                                onChange={e => setForm({ ...form, title: e.target.value })}
                                required
                            />
                        </div>
                    </div>

                    <div className="row">
                        <div className="col-md-6 mb-3">
                            <label htmlFor="spec-year" className="form-label">
                                Year <span className="text-danger">*</span>
                            </label>
                            <select
                                className="form-select"
                                id="spec-year"
                                value={form.year}
                                onChange={e => setForm({ ...form, year: parseInt(e.target.value) })}
                                required
                            >
                                <option value={1}>1st Year</option>
                                <option value={2}>2nd Year</option>
                                <option value={3}>3rd Year</option>
                                <option value={4}>4th Year</option>
                            </select>
                        </div>

                        <div className="col-md-6 mb-3">
                            <label htmlFor="spec-credits" className="form-label">
                                Credits Required <span className="text-danger">*</span>
                            </label>
                            <input
                                type="number"
                                className="form-control"
                                id="spec-credits"
                                placeholder="e.g., 18"
                                min="1"
                                max="30"
                                value={form.credits}
                                onChange={e => setForm({ ...form, credits: parseInt(e.target.value) })}
                                required
                            />
                            <small className="text-muted">Total credits needed to complete this specialisation</small>
                        </div>
                    </div>

                    <div className="mb-3">
                        <label htmlFor="spec-desc" className="form-label">
                            Description
                        </label>
                        <textarea
                            className="form-control"
                            id="spec-desc"
                            rows={3}
                            placeholder="Enter a detailed description of the specialisation..."
                            value={form.description}
                            onChange={e => setForm({ ...form, description: e.target.value })}
                        />
                    </div>

                    <div className="d-flex justify-content-end gap-2">
                        <button
                            type="button"
                            className="btn btn-secondary"
                            onClick={onCancel}
                            disabled={loading}
                        >
                            <i className="bi bi-x-circle me-2"></i>Cancel
                        </button>
                        <button
                            type="submit"
                            className="btn btn-primary"
                            disabled={loading}
                        >
                            {loading ? (
                                <>
                                    <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                                    Creating...
                                </>
                            ) : (
                                <>
                                    <i className="bi bi-check-circle me-2"></i>Create Specialisation
                                </>
                            )}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default SpecialisationForm;
