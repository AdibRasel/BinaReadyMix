import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Pagination from '../../Components/Pagination/Pagination';
import DateAndTime from '../../Components/DateAndTime/DateAndTime';
import CreateSubCategory from './CreateSubCategory'; // তুমি এই modal বানাবে

const SubCategory = () => {
  const [subCategories, setSubCategories] = useState([
    {
      id: 1,
      name: 'Mobile Phones',
      category: 'Electronics',
      createdBy: 'Admin',
      createdAt: '2025-06-01',
    },
    {
      id: 2,
      name: 'Men\'s Wear',
      category: 'Fashion',
      createdBy: 'Admin',
      createdAt: '2025-06-03',
    },
    {
      id: 3,
      name: 'Fiction',
      category: 'Books',
      createdBy: 'Admin',
      createdAt: '2025-06-05',
    },
  ]);

  const [showCreateModal, setShowCreateModal] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const startIdx = (currentPage - 1) * itemsPerPage;
  const currentSubCategories = subCategories.slice(startIdx, startIdx + itemsPerPage);

  const deleteSubCategory = (id: number) => {
    setSubCategories(prev => prev.filter(sub => sub.id !== id));
  };

  return (
    <>
      {/* Breadcrumb + Date */}
      <div className="d-flex justify-content-between align-items-center mb-3">
        <nav aria-label="breadcrumb">
          <ol className="breadcrumb">
            <li className="breadcrumb-item"><Link to="/SubCategory">Sub Category</Link></li>
            <li className="breadcrumb-item active" aria-current="page">Sub Category List</li>
          </ol>
        </nav>
        <div className="TodayDate"><DateAndTime /></div>
      </div>

      {/* Create Button */}
      <div className="d-flex justify-content-end mb-2">
        <button className="btn btn-primary" onClick={() => setShowCreateModal(true)}>
          + Create Sub Category
        </button>
      </div>

      {/* Table */}
      <table className="table table-bordered table-striped table-hover">
        <thead>
          <tr>
            <th>#</th>
            <th>Sub Category Name</th>
            <th>Main Category</th>
            <th>Created By</th>
            <th>Created Date</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {currentSubCategories.length > 0 ? currentSubCategories.map((sub, index) => (
            <tr key={sub.id}>
              <td>{startIdx + index + 1}</td>
              <td>{sub.name}</td>
              <td>{sub.category}</td>
              <td>{sub.createdBy}</td>
              <td>{sub.createdAt}</td>
              <td>
                <button className="btn btn-sm btn-warning me-2">Update</button>
                <button className="btn btn-sm btn-danger" onClick={() => deleteSubCategory(sub.id)}>
                  Delete
                </button>
              </td>
            </tr>
          )) : (
            <tr>
              <td colSpan={6} className="text-center text-muted">No sub-categories found.</td>
            </tr>
          )}
        </tbody>
      </table>

      {/* Pagination */}
      <Pagination
        totalItems={subCategories.length}
        itemsPerPage={itemsPerPage}
        currentPage={currentPage}
        onPageChange={setCurrentPage}
        onItemsPerPageChange={() => {}}
      />

      {/* Modal */}
      <CreateSubCategory
        show={showCreateModal}
        onClose={() => setShowCreateModal(false)}
        onCreate={(newSub) => {
          const newItem = {
            id: Date.now(),
            name: newSub.name,
            category: newSub.category,
            createdBy: newSub.createdBy,
            createdAt: newSub.createdAt,
          };
          setSubCategories(prev => [...prev, newItem]);
          setShowCreateModal(false);
        }}
      />
    </>
  );
};

export default SubCategory;
