import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Pagination from '../../Components/Pagination/Pagination';
import DateAndTime from '../../Components/DateAndTime/DateAndTime';
import CreateCategory from './CreateCategory';


const Category = () => {
  const [categories, setCategories] = useState([
    {
      id: 1,
      name: 'Electronics',
      createdBy: 'Admin',
      createdAt: '2025-05-01',
    },
    {
      id: 2,
      name: 'Fashion',
      createdBy: 'Admin',
      createdAt: '2025-05-03',
    },
    {
      id: 3,
      name: 'Books',
      createdBy: 'Admin',
      createdAt: '2025-05-05',
    },
  ]);

  const [showCreateModal, setShowCreateModal] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const startIdx = (currentPage - 1) * itemsPerPage;
  const currentCategories = categories.slice(startIdx, startIdx + itemsPerPage);

  const deleteCategory = (id: number) => {
    setCategories(prev => prev.filter(cat => cat.id !== id));
  };

  return (
    <>
      <div className="d-flex justify-content-between align-items-center mb-3">
        <nav aria-label="breadcrumb">
          <ol className="breadcrumb">
            <li className="breadcrumb-item"><Link to="/Category">Category</Link></li>
            <li className="breadcrumb-item active" aria-current="page">Category List</li>
          </ol>
        </nav>
        <div className="TodayDate"><DateAndTime /></div>
      </div>

      <div className="d-flex justify-content-end mb-2">
        <button className="btn btn-primary" onClick={() => setShowCreateModal(true)}>
          + Create Category
        </button>
      </div>

      <table className="table table-bordered table-striped table-hover">
        <thead>
          <tr>
            <th>#</th>
            <th>Category Name</th>
            <th>Created By</th>
            <th>Created Date</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {currentCategories.map((category, index) => (
            <tr key={category.id}>
              <td>{startIdx + index + 1}</td>
              <td>{category.name}</td>
              <td>{category.createdBy}</td>
              <td>{category.createdAt}</td>
              <td>
                <button className="btn btn-sm btn-warning me-2">Update</button>
                <button className="btn btn-sm btn-danger" onClick={() => deleteCategory(category.id)}>
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <Pagination
        totalItems={categories.length}
        itemsPerPage={itemsPerPage}
        currentPage={currentPage}
        onPageChange={setCurrentPage}
        onItemsPerPageChange={() => {}}
      />

      <CreateCategory
        show={showCreateModal}
        onClose={() => setShowCreateModal(false)}
        onCreate={(newCategory) => {
          const newItem = {
            id: Date.now(),
            name: newCategory.name,
            createdBy: newCategory.createdBy,
            createdAt: newCategory.createdAt,
          };
          setCategories(prev => [...prev, newItem]);
          setShowCreateModal(false);
        }}
      />
    </>
  );
};

export default Category;
