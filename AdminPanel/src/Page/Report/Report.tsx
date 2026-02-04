import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Pagination from '../../Components/Pagination/Pagination';

const Report: React.FC = () => {
    const today = new Date();

    // Dummy data
    const reportItems = Array.from({ length: 50 }, (_, i) => ({
        id: i + 1,
        sku: `SKU‑00${i + 1}`,
        name: `Product Name ${i + 1}`,
        category: 'Category',
        stock: 120,
        sold: 80,
        revenue: 12500,
    }));

    const [paginationCurrentPage, setPaginationCurrentPage] = useState(1);
    const [paginationItemsPerPage, setPaginationItemsPerPage] = useState(10);

    const startIndex = (paginationCurrentPage - 1) * paginationItemsPerPage;
    const currentItems = reportItems.slice(startIndex, startIndex + paginationItemsPerPage);

    return (
        <>
            {/* ======= Breadcrumb ======= */}
            <div className="d-flex justify-content-between align-items-start flex-column flex-md-row mb-4 gap-2">
                <nav aria-label="breadcrumb">
                    <ol className="breadcrumb mb-0">
                        <li className="breadcrumb-item">
                            <Link to="/report">Report</Link>
                        </li>
                        <li className="breadcrumb-item active" aria-current="page">
                            Dashboard
                        </li>
                    </ol>
                </nav>
                <div className="today-date small fw-medium">
                    <span>Today: {today.toLocaleDateString()}</span>&nbsp;|&nbsp;
                    <span>Time: {today.toLocaleTimeString()}</span>
                </div>
            </div>

            {/* ======= Filters ======= */}
            <div className="row g-3 mb-4">
                <div className="col-sm-6 col-md-4 col-lg-3">
                    <input type="text" className="form-control" placeholder="Search product / SKU" />
                </div>
                <div className="col-sm-6 col-md-4 col-lg-3">
                    <select className="form-select">
                        <option value="">Category (All)</option>
                        <option>Electronics</option>
                        <option>Fashion</option>
                        <option>Grocery</option>
                    </select>
                </div>
                <div className="col-sm-6 col-md-4 col-lg-3">
                    <select className="form-select">
                        <option value="">Status (All)</option>
                        <option>In‑Stock</option>
                        <option>Low‑Stock</option>
                        <option>Out‑of‑Stock</option>
                    </select>
                </div>
                <div className="col-sm-6 col-md-4 col-lg-3 d-grid">
                    <button className="btn btn-primary">Filter</button>
                </div>
            </div>

            {/* ======= Summary Cards ======= */}
            <div className="row g-3 mb-4">
                <div className="col-6 col-lg-3">
                    <div className="card summary-card border-start border-4 border-primary">
                        <div className="card-body">
                            <h6 className="card-title mb-1">Total Products</h6>
                            <h4 className="fw-bold mb-0">1,280</h4>
                        </div>
                    </div>
                </div>

                <div className="col-6 col-lg-3">
                    <div className="card summary-card border-start border-4 border-success">
                        <div className="card-body">
                            <h6 className="card-title mb-1">In‑Stock</h6>
                            <h4 className="fw-bold mb-0">1,050</h4>
                        </div>
                    </div>
                </div>

                <div className="col-6 col-lg-3">
                    <div className="card summary-card border-start border-4 border-danger">
                        <div className="card-body">
                            <h6 className="card-title mb-1">Out‑of‑Stock</h6>
                            <h4 className="fw-bold mb-0">180</h4>
                        </div>
                    </div>
                </div>

                <div className="col-6 col-lg-3">
                    <Link to="/AdminReport" style={{ cursor: 'pointer' }}>
                        <div className="card summary-card border-start border-4 border-dark">
                            <div className="card-body">
                                <h6 className="card-title mb-1">Admin Report</h6>
                                <h4 className="fw-bold mb-0">.</h4>
                            </div>
                        </div>
                    </Link>

                </div>
            </div>

            {/* ======= Data Table ======= */}
            <div className="card">
                <div className="table-responsive">
                    <table className="table table-hover align-middle mb-0">
                        <thead className="table-light">
                            <tr>
                                <th>#</th>
                                <th>SKU</th>
                                <th>Product</th>
                                <th>Category</th>
                                <th className="text-end">Stock</th>
                                <th className="text-end">Sold</th>
                                <th className="text-end">Revenue</th>
                            </tr>
                        </thead>
                        <tbody>
                            {currentItems.map((item, i) => (
                                <tr key={item.id}>
                                    <td>{startIndex + i + 1}</td>
                                    <td>{item.sku}</td>
                                    <td>{item.name}</td>
                                    <td>{item.category}</td>
                                    <td className="text-end">{item.stock}</td>
                                    <td className="text-end">{item.sold}</td>
                                    <td className="text-end">৳ {item.revenue.toLocaleString()}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {/* ======= Pagination Component ======= */}
                <div className="card-footer ">
                    <Pagination
                        totalItems={reportItems.length}
                        itemsPerPage={paginationItemsPerPage}
                        currentPage={paginationCurrentPage}
                        onPageChange={setPaginationCurrentPage}
                        onItemsPerPageChange={setPaginationItemsPerPage}
                    />
                </div>
            </div>
        </>
    );
};

export default Report;
