import React from 'react';
// import './Pagination.css';

interface PaginationProps {
  totalItems: number;
  itemsPerPage: number;
  currentPage: number;
  onPageChange: (page: number) => void;
  onItemsPerPageChange: (size: number) => void;
  perPageOptions?: number[];
}

const Pagination: React.FC<PaginationProps> = ({
  totalItems,
  itemsPerPage,
  currentPage,
  onPageChange,
  onItemsPerPageChange,
  perPageOptions = [20, 50, 100],
}) => {
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  if (totalPages === 0) return null;

  const handleClick = (page: number) => {
    if (page >= 1 && page <= totalPages && page !== currentPage) {
      onPageChange(page);
    }
  };

  const handlePerPageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    onItemsPerPageChange(Number(e.target.value));
    onPageChange(1); // Reset to first page on per-page change
  };

  const renderPages = () =>
    Array.from({ length: totalPages }, (_, i) => i + 1).map((num) => (
      <li
        key={num}
        className={`page-item ${num === currentPage ? 'active' : ''}`}
        onClick={() => handleClick(num)}
      >
        <a className="page-link" href="#">
          {num}
        </a>
      </li>
    ));

  return (
    <div className="d-flex flex-column flex-md-row justify-content-between align-items-center gap-2">
      {/* Per Page Dropdown */}
      <div className="d-flex align-items-center">
        <label className="me-2 mb-0">Items per page:</label>
        <select
          value={itemsPerPage}
          onChange={handlePerPageChange}
          className="form-select form-select-sm w-auto"
        >
          {perPageOptions.map((opt) => (
            <option key={opt} value={opt}>
              {opt}
            </option>
          ))}
        </select>
      </div>

      {/* Pagination Links */}
      <nav aria-label="Page navigation">
        <ul className="pagination mb-0">
          <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
            <a
              className="page-link"
              href="#"
              onClick={() => handleClick(currentPage - 1)}
            >
              Previous
            </a>
          </li>

          {renderPages()}

          <li className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}>
            <a
              className="page-link"
              href="#"
              onClick={() => handleClick(currentPage + 1)}
            >
              Next
            </a>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Pagination;
