import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Pagination from '../../Components/Pagination/Pagination';
import DateAndTime from '../../Components/DateAndTime/DateAndTime';
import CreateCoupon from './CreateCoupon';

interface Coupon {
  id: number;
  name: string;
  discount: number; // percentage
  expiryDate: string;
  createdBy: string;
  createdAt: string;
}

const Coupons = () => {
  const [coupons, setCoupons] = useState<Coupon[]>([
    {
      id: 1,
      name: 'SUMMER21',
      discount: 15,
      expiryDate: '2025-12-31',
      createdBy: 'Admin',
      createdAt: '2025-06-01',
    },
    {
      id: 2,
      name: 'WELCOME10',
      discount: 10,
      expiryDate: '2025-11-30',
      createdBy: 'Admin',
      createdAt: '2025-06-05',
    },
  ]);

  const [showCreateModal, setShowCreateModal] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const startIdx = (currentPage - 1) * itemsPerPage;
  const currentCoupons = coupons.slice(startIdx, startIdx + itemsPerPage);

  const deleteCoupon = (id: number) => {
    if (window.confirm('Are you sure you want to delete this coupon?')) {
      setCoupons(prev => prev.filter(coupon => coupon.id !== id));
    }
  };

  return (
    <>
      {/* Breadcrumb & Date */}
      <div className="d-flex justify-content-between align-items-center mb-3">
        <nav aria-label="breadcrumb">
          <ol className="breadcrumb">
            <li className="breadcrumb-item"><Link to="/Coupons">Coupons</Link></li>
            <li className="breadcrumb-item active" aria-current="page">Coupon List</li>
          </ol>
        </nav>
        <div className="TodayDate"><DateAndTime /></div>
      </div>

      {/* Create Button */}
      <div className="d-flex justify-content-end mb-2">
        <button className="btn btn-primary" onClick={() => setShowCreateModal(true)}>
          + Create Coupon
        </button>
      </div>

      {/* Coupons Table */}
      <table className="table table-bordered table-striped table-hover">
        <thead>
          <tr>
            <th>#</th>
            <th>Coupon Name</th>
            <th>Discount (%)</th>
            <th>Expiry Date</th>
            <th>Created By</th>
            <th>Created Date</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {currentCoupons.length > 0 ? currentCoupons.map((coupon, index) => (
            <tr key={coupon.id}>
              <td>{startIdx + index + 1}</td>
              <td>{coupon.name}</td>
              <td>{coupon.discount}</td>
              <td>{coupon.expiryDate}</td>
              <td>{coupon.createdBy}</td>
              <td>{coupon.createdAt}</td>
              <td>
                {/* Update button placeholder */}
                <button className="btn btn-sm btn-warning me-2" disabled>Update</button>
                <button
                  className="btn btn-sm btn-danger"
                  onClick={() => deleteCoupon(coupon.id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          )) : (
            <tr>
              <td colSpan={7} className="text-center text-muted">No coupons found.</td>
            </tr>
          )}
        </tbody>
      </table>

      {/* Pagination */}
      <Pagination
        totalItems={coupons.length}
        itemsPerPage={itemsPerPage}
        currentPage={currentPage}
        onPageChange={setCurrentPage}
        onItemsPerPageChange={() => {}}
      />

      {/* Create Coupon Modal */}
      <CreateCoupon
        show={showCreateModal}
        onClose={() => setShowCreateModal(false)}
        onCreate={(newCoupon) => {
          const newItem: Coupon = {
            id: Date.now(),
            name: newCoupon.name,
            discount: newCoupon.discount,
            expiryDate: newCoupon.expiryDate,
            createdBy: newCoupon.createdBy,
            createdAt: newCoupon.createdAt,
          };
          setCoupons(prev => [...prev, newItem]);
          setShowCreateModal(false);
        }}
      />
    </>
  );
};

export default Coupons;
