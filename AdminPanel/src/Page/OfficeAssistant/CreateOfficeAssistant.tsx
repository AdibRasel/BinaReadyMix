// CreateOfficeAssistant.tsx
import React from 'react';

interface Props {
    onClose: () => void;
}

const CreateOfficeAssistant: React.FC<Props> = ({ onClose }) => {
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // TODO: Handle form submission logic here
        alert("Assistant created!");
        onClose(); // Close modal after create
    };

    return (
        <form onSubmit={handleSubmit}>
            <div className="row g-3">
                <div className="col-md-6 text-center">
                    <label className="form-label d-block">Profile Image</label>
                    <img
                        src="https://i.pravatar.cc/100?img=33"
                        alt="Preview"
                        className="rounded-circle mb-2"
                        style={{ width: '100px', height: '100px', objectFit: 'cover' }}
                    />
                    <input type="file" className="form-control" accept="image/*" />
                </div>
                <div className="col-md-6">
                    <label className="form-label">Full Name</label>
                    <input type="text" className="form-control" placeholder="Enter name" required />
                </div>
                <div className="col-md-6">
                    <label className="form-label">Mobile Number</label>
                    <input type="text" className="form-control" placeholder="+880..." required />
                </div>
                <div className="col-md-6">
                    <label className="form-label">Email Address</label>
                    <input type="email" className="form-control" placeholder="Email" />
                </div>
                <div className="col-md-6">
                    <label className="form-label">Position</label>
                    <input type="text" className="form-control" placeholder="e.g. Assistant Officer" />
                </div>
                <div className="col-md-6">
                    <label className="form-label">Role</label>
                    <select className="form-select">
                        <option value="">Select Role</option>
                        <option value="Admin">Admin</option>
                        <option value="Uploader">Product Uploader</option>
                        <option value="Viewer">Viewer</option>
                        <option value="Custom">Custom Role</option>
                    </select>
                </div>
                <div className="col-md-6">
                    <label className="form-label">Joining Date</label>
                    <input type="date" className="form-control" />
                </div>
            </div>

            <div className="mt-4 text-end">
                <button
                    type="button"
                    className="btn btn-secondary me-2"
                    onClick={onClose}
                >
                    Close
                </button>
                <button
                    type="submit"
                    className="btn btn-success"
                    style={{ backgroundColor: 'var(--ColorTwo)', borderColor: 'var(--ColorTwo)' }}
                >
                    Create
                </button>
            </div>
        </form>
    );
};

export default CreateOfficeAssistant;
