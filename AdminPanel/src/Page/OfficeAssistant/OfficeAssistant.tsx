// OfficeAssistant.tsx
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import DateAndTime from '../../Components/DateAndTime/DateAndTime';
import CreateOfficeAssistant from './CreateOfficeAssistant';
import Pagination from '../../Components/Pagination/Pagination';

const OfficeAssistant = () => {
    const [showModal, setShowModal] = useState(false);

    const handleModalToggle = () => {
        setShowModal(!showModal);
    };


    // Pagination start
    const paginationItems = Array.from({ length: 123 }, (_, i) => `Item ${i + 1}`);
    const [paginationCurrentPage, setPaginationCurrentPage] = useState(1);
    const [paginationItemsPerPage, setPaginationItemsPerPage] = useState(20);

    const startIdx = (paginationCurrentPage - 1) * paginationItemsPerPage;
    const currentPaginationItems = paginationItems.slice(
        startIdx,
        startIdx + paginationItemsPerPage
    );
    // Pagination End

    return (
        <>
            {/* Breadcrumb */}
            <div className="d-flex justify-content-between align-items-center mb-4">
                <nav aria-label="breadcrumb">
                    <ol className="breadcrumb mb-0">
                        <li className="breadcrumb-item"><Link to="/OfficeAssistant">Office Assistant</Link></li>
                        <li className="breadcrumb-item active" aria-current="page">Office Assistant</li>
                    </ol>
                </nav>
                <div className="TodayDate">
                    <DateAndTime />
                </div>
            </div>

            {/* Header */}
            <div className="d-flex justify-content-between align-items-center mb-3">
                <h4 className="text-uppercase fw-bold" style={{ color: 'var(--ColorOne)' }}>Office Assistant List</h4>
                <button
                    className="btn btn-primary"
                    style={{ backgroundColor: 'var(--ColorTwo)', borderColor: 'var(--ColorTwo)' }}
                    onClick={handleModalToggle}
                >
                    + Add Assistant
                </button>
            </div>

            {/* Table */}
            <div className="table-responsive shadow-sm rounded" style={{ backgroundColor: '#fff' }}>
                <table className="table table-hover align-middle">
                    <thead style={{ backgroundColor: 'var(--ColorThree)', color: '#fff' }}>
                        <tr>
                            <th>#</th>
                            <th>Image</th>
                            <th>Name</th>
                            <th>Mobile</th>
                            <th>Email</th>
                            <th>Position</th>
                            <th>Role</th>
                            <th>Joining Date</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>1</td>
                            <td>
                                <img
                                    src="https://i.pravatar.cc/100?img=12"
                                    alt="Office Manager"
                                    className="rounded-circle"
                                    style={{ width: '50px', height: '50px', objectFit: 'cover' }}
                                />
                            </td>
                            <td>Mohammed Ali</td>
                            <td>+966138125555</td>
                            <td>mohammed.ali@binareadymix.com</td>
                            <td>Office Manager</td>
                            <td>Administration</td>
                            <td>01/01/2026</td>
                            <td>
                                <button className="btn btn-sm btn-warning me-2">Edit</button>
                                <button className="btn btn-sm btn-danger">Delete</button>
                            </td>
                        </tr>
                        <tr>
                            <td>2</td>
                            <td>
                                <img
                                    src="https://i.pravatar.cc/100?img=45"
                                    alt="Sales Officer"
                                    className="rounded-circle"
                                    style={{ width: '50px', height: '50px', objectFit: 'cover' }}
                                />
                            </td>
                            <td>Sara Khan</td>
                            <td>+966138125556</td>
                            <td>sara.khan@binareadymix.com</td>
                            <td>Sales Officer</td>
                            <td>Sales</td>
                            <td>02/01/2026</td>
                            <td>
                                <button className="btn btn-sm btn-warning me-2">Edit</button>
                                <button className="btn btn-sm btn-danger">Delete</button>
                            </td>
                        </tr>
                        <tr>
                            <td>3</td>
                            <td>
                                <img
                                    src="https://i.pravatar.cc/100?img=65"
                                    alt="Technical Officer"
                                    className="rounded-circle"
                                    style={{ width: '50px', height: '50px', objectFit: 'cover' }}
                                />
                            </td>
                            <td>Ahmed Hossain</td>
                            <td>+966138125557</td>
                            <td>ahmed.hossain@binareadymix.com</td>
                            <td>Technical Officer</td>
                            <td>Production</td>
                            <td>03/01/2026</td>
                            <td>
                                <button className="btn btn-sm btn-warning me-2">Edit</button>
                                <button className="btn btn-sm btn-danger">Delete</button>
                            </td>
                        </tr>
                        <tr>
                            <td>4</td>
                            <td>
                                <img
                                    src="https://i.pravatar.cc/100?img=78"
                                    alt="Customer Support"
                                    className="rounded-circle"
                                    style={{ width: '50px', height: '50px', objectFit: 'cover' }}
                                />
                            </td>
                            <td>Fatima Begum</td>
                            <td>+966138125558</td>
                            <td>fatima.begum@binareadymix.com</td>
                            <td>Customer Support</td>
                            <td>Support</td>
                            <td>04/01/2026</td>
                            <td>
                                <button className="btn btn-sm btn-warning me-2">Edit</button>
                                <button className="btn btn-sm btn-danger">Delete</button>
                            </td>
                        </tr>
                    </tbody>

                </table>
            </div>

            {/* Modal */}
            {showModal && (
                <div className="modal show fade d-block" tabIndex={-1} style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>
                    <div className="modal-dialog modal-lg">
                        <div className="modal-content">
                            <div className="modal-header" style={{ backgroundColor: 'var(--ColorOne)', color: '#fff' }}>
                                <h5 className="modal-title">Add New Office Assistant</h5>
                                <button type="button" className="btn-close" onClick={handleModalToggle}></button>
                            </div>
                            <div className="modal-body">
                                <CreateOfficeAssistant onClose={handleModalToggle} />
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Pagination Component */}
            <Pagination
                totalItems={paginationItems.length}
                itemsPerPage={paginationItemsPerPage}
                currentPage={paginationCurrentPage}
                onPageChange={setPaginationCurrentPage}
                onItemsPerPageChange={setPaginationItemsPerPage}
            />
            {/* Pagination Component End */}


        </>
    );
};

export default OfficeAssistant;
