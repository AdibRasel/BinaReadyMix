import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Pagination from '../../Components/Pagination/Pagination';
import DateAndTime from '../../Components/DateAndTime/DateAndTime';
import CreateBrand from './CreateBrand'; // তুমি এই ফাইলটি তৈরি করবে

const Brands = () => {
  const [brands, setBrands] = useState([
    {
      id: 1,
      name: 'Samsung',
      category: 'Electronics',
      createdBy: 'Admin',
      createdAt: '2025-06-10',
    },
    {
      id: 2,
      name: 'Nike',
      category: 'Fashion',
      createdBy: 'Admin',
      createdAt: '2025-06-12',
    },
  ]);

  const [showCreateModal, setShowCreateModal] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const startIdx = (currentPage - 1) * itemsPerPage;
  const currentBrands = brands.slice(startIdx, startIdx + itemsPerPage);

  const deleteBrand = (id: number) => {
    setBrands(prev => prev.filter(brand => brand.id !== id));
  };

  return (
    <>
      {/* Breadcrumb and Date */}
      <div className="d-flex justify-content-between align-items-center mb-3">
        <nav aria-label="breadcrumb">
          <ol className="breadcrumb">
            <li className="breadcrumb-item"><Link to="/Brands">Brands</Link></li>
            <li className="breadcrumb-item active" aria-current="page">Brand List</li>
          </ol>
        </nav>
        <div className="TodayDate">
          <DateAndTime />
        </div>
      </div>

      {/* Create Button */}
      <div className="d-flex justify-content-end mb-2">
        <button className="btn btn-primary" onClick={() => setShowCreateModal(true)}>
          + Create Brand
        </button>
      </div>

      {/* Brand Table */}
      <table className="table table-bordered table-striped table-hover">
        <thead>
          <tr>
            <th>#</th>
            <th>Brand Name</th>
            <th>Main Category</th>
            <th>Created By</th>
            <th>Created Date</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {currentBrands.length > 0 ? currentBrands.map((brand, index) => (
            <tr key={brand.id}>
              <td>{startIdx + index + 1}</td>
              <td>{brand.name}</td>
              <td>{brand.category}</td>
              <td>{brand.createdBy}</td>
              <td>{brand.createdAt}</td>
              <td>
                <button className="btn btn-sm btn-warning me-2">Update</button>
                <button className="btn btn-sm btn-danger" onClick={() => deleteBrand(brand.id)}>
                  Delete
                </button>
              </td>
            </tr>
          )) : (
            <tr>
              <td colSpan={6} className="text-center text-muted">No brands found.</td>
            </tr>
          )}
        </tbody>
      </table>

      {/* Pagination */}
      <Pagination
        totalItems={brands.length}
        itemsPerPage={itemsPerPage}
        currentPage={currentPage}
        onPageChange={setCurrentPage}
        onItemsPerPageChange={() => {}}
      />

      {/* Create Modal */}
      <CreateBrand
        show={showCreateModal}
        onClose={() => setShowCreateModal(false)}
        onCreate={(newBrand) => {
          const newItem = {
            id: Date.now(),
            name: newBrand.name,
            category: newBrand.category,
            createdBy: newBrand.createdBy,
            createdAt: newBrand.createdAt,
          };
          setBrands(prev => [...prev, newItem]);
          setShowCreateModal(false);
        }}
      />
    </>
  );
};

export default Brands;
