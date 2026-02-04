import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Pagination from '../../Components/Pagination/Pagination';
import DateAndTime from '../../Components/DateAndTime/DateAndTime';
import CreateVariant from './CreateVariant';

interface ColorValue {
  name: string;
  code: string;
}

interface Variant {
  id: number;
  name: string;
  createdBy: string;
  createdAt: string;
  values: (ColorValue | string)[];
}

const Variants = () => {
  const [variants, setVariants] = useState<Variant[]>([
    {
      id: 1,
      name: 'Color',
      createdBy: 'Admin',
      createdAt: '2025-06-15',
      values: [
        { name: 'Red', code: '#ff0000' },
        { name: 'Green', code: '#00ff00' },
        { name: 'Blue', code: '#0000ff' },
        { name: 'Black', code: '#000000' },
      ],
    },
    {
      id: 2,
      name: 'Size',
      createdBy: 'Admin',
      createdAt: '2025-06-16',
      values: ['S', 'M', 'L'], // size গুলো এখানে string হিসেবে রাখা হলো
    },
  ]);

  const [showCreateModal, setShowCreateModal] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const startIdx = (currentPage - 1) * itemsPerPage;
  const currentVariants = variants.slice(startIdx, startIdx + itemsPerPage);

  const deleteVariant = (id: number) => {
    setVariants(prev => prev.filter(variant => variant.id !== id));
  };

  return (
    <>
      {/* Breadcrumb & Date */}
      <div className="d-flex justify-content-between align-items-center mb-3">
        <nav aria-label="breadcrumb">
          <ol className="breadcrumb">
            <li className="breadcrumb-item"><Link to="/Variants">Variants</Link></li>
            <li className="breadcrumb-item active" aria-current="page">Variant List</li>
          </ol>
        </nav>
        <div className="TodayDate"><DateAndTime /></div>
      </div>

      {/* Create Button */}
      <div className="d-flex justify-content-end mb-2">
        <button className="btn btn-primary" onClick={() => setShowCreateModal(true)}>
          + Create Variant
        </button>
      </div>

      {/* Table */}
      <table className="table table-bordered table-striped table-hover">
        <thead>
          <tr>
            <th>#</th>
            <th>Variant Name</th>
            <th>Created By</th>
            <th>Created Date</th>
            <th>Values</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {currentVariants.length > 0 ? currentVariants.map((variant, index) => (
            <tr key={variant.id}>
              <td>{startIdx + index + 1}</td>
              <td>{variant.name}</td>
              <td>{variant.createdBy}</td>
              <td>{variant.createdAt}</td>
              <td>
                {variant.name.toLowerCase() === 'color' ? (
                  <div className="d-flex gap-2 align-items-center">
                    {(variant.values as ColorValue[]).map((colorObj, i) => (
                      <div key={i} className="d-flex flex-column align-items-center">
                        <div
                          title={colorObj.name}
                          style={{
                            width: '30px',
                            height: '30px',
                            borderRadius: '50%',
                            backgroundColor: colorObj.code,
                            opacity: 0.5,
                            border: '1px solid #ccc',
                            marginBottom: '2px',
                            cursor: 'default',
                          }}
                        />
                        <small style={{ fontSize: '10px' }}>{colorObj.name}</small>
                      </div>
                    ))}
                  </div>
                ) : (
                  <span>{variant.values.map(v => typeof v === 'string' ? v : v.name).join(', ')}</span>
                )}
              </td>
              <td>
                <button className="btn btn-sm btn-warning me-2">Update</button>
                <button className="btn btn-sm btn-danger" onClick={() => deleteVariant(variant.id)}>
                  Delete
                </button>
              </td>
            </tr>
          )) : (
            <tr>
              <td colSpan={6} className="text-center text-muted">No variants found.</td>
            </tr>
          )}
        </tbody>
      </table>

      {/* Pagination */}
      <Pagination
        totalItems={variants.length}
        itemsPerPage={itemsPerPage}
        currentPage={currentPage}
        onPageChange={setCurrentPage}
        onItemsPerPageChange={() => {}}
      />

      {/* Create Variant Modal */}
      <CreateVariant
        show={showCreateModal}
        onClose={() => setShowCreateModal(false)}
        onCreate={(newVariant) => {
          const newItem: Variant = {
            id: Date.now(),
            name: newVariant.name,
            createdBy: newVariant.createdBy,
            createdAt: newVariant.createdAt,
            values: newVariant.values || [],
          };
          setVariants(prev => [...prev, newItem]);
          setShowCreateModal(false);
        }}
      />
    </>
  );
};

export default Variants;
