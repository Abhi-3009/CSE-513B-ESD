import React from 'react';

interface SpecialisationDisplay {
    id: number;
    code: string;
    title: string;
    credits: number;
    year: number;
    description?: string;
}

interface SpecialisationTableProps {
    specialisations: SpecialisationDisplay[];
    onDelete: (id: number) => void;
}

const SpecialisationTable: React.FC<SpecialisationTableProps> = ({
    specialisations,
    onDelete
}) => {
    if (specialisations.length === 0) {
        return (
            <div className="card shadow-sm">
                <div className="card-body text-center py-5">
                    <i className="bi bi-inbox" style={{ fontSize: '4rem', color: '#ccc' }}></i>
                    <h5 className="mt-3 text-muted">No Specialisations Found</h5>
                    <p className="text-muted">Click "Add New Specialisation" to create your first specialisation.</p>
                </div>
            </div>
        );
    }

    return (
        <div className="card shadow-sm">
            <div className="card-header bg-white">
                <h5 className="mb-0">
                    <i className="bi bi-list-ul me-2"></i>
                    All Specialisations ({specialisations.length})
                </h5>
            </div>
            <div className="card-body p-0">
                <div className="table-responsive">
                    <table className="table table-hover mb-0">
                        <thead className="table-light">
                            <tr>
                                <th style={{ width: '10%' }}>Code</th>
                                <th style={{ width: '30%' }}>Name</th>
                                <th style={{ width: '10%' }}>Year</th>
                                <th style={{ width: '10%' }}>Credits</th>
                                <th style={{ width: '30%' }}>Description</th>
                                <th style={{ width: '10%' }} className="text-center">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {specialisations.map((spec) => (
                                <tr key={spec.id}>
                                    <td>
                                        <span className="badge bg-primary" style={{ fontSize: '0.9rem' }}>
                                            {spec.code}
                                        </span>
                                    </td>
                                    <td className="fw-semibold">{spec.title}</td>
                                    <td>
                                        <span className="badge bg-info text-dark">
                                            Year {spec.year}
                                        </span>
                                    </td>
                                    <td>
                                        <span className="badge bg-success">
                                            {spec.credits} credits
                                        </span>
                                    </td>
                                    <td>
                                        <small className="text-muted">
                                            {spec.description && spec.description.length > 80
                                                ? `${spec.description.substring(0, 80)}...`
                                                : spec.description || 'No description'}
                                        </small>
                                    </td>
                                    <td className="text-center">
                                        <button
                                            className="btn btn-sm btn-outline-danger"
                                            onClick={() => onDelete(spec.id)}
                                            title="Delete specialisation"
                                        >
                                            <i className="bi bi-trash"></i>
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
            <div className="card-footer bg-white text-muted">
                <small>
                    <i className="bi bi-info-circle me-1"></i>
                    Total: {specialisations.length} specialisation{specialisations.length !== 1 ? 's' : ''}
                </small>
            </div>
        </div>
    );
};

export default SpecialisationTable;
