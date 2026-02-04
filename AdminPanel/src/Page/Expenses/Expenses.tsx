import React, { useState, useMemo, useEffect } from 'react';
import { Link } from 'react-router-dom';
import DateAndTime from '../../Components/DateAndTime/DateAndTime';
import CreateExpenses from './CreateExpenses';
import Pagination from '../../Components/Pagination/Pagination';
import DatePicker from 'react-date-picker';
import 'react-date-picker/dist/DatePicker.css';
import 'react-calendar/dist/Calendar.css';

interface Expense {
  id: number;
  title: string;
  amount: number;
  date: string;
  description?: string;
}

const Expenses = () => {
  const paginationItems = Array.from({ length: 123 }, (_, i) => ({
    id: i + 1,
    title: `Expense Item ${i + 1}`,
    amount: Math.floor(Math.random() * 1000) + 10,
    date: new Date(Date.now() - i * 86400000).toISOString().slice(0, 10),
  }));

  const [expenses, setExpenses] = useState<Expense[]>(paginationItems);
  const [showModal, setShowModal] = useState(false);

  const [paginationCurrentPage, setPaginationCurrentPage] = useState(1);
  const [paginationItemsPerPage, setPaginationItemsPerPage] = useState(20);

  // Date range filter states initialized to last 1 month
  const [fromDate, setFromDate] = useState<Date>(() => {
    const now = new Date();
    const priorMonth = new Date(now.getFullYear(), now.getMonth() - 1, now.getDate());
    return priorMonth;
  });
  const [toDate, setToDate] = useState<Date>(new Date());

  // Local state to trigger filter only on View button click
  const [filterFromDate, setFilterFromDate] = useState<Date>(fromDate);
  const [filterToDate, setFilterToDate] = useState<Date>(toDate);

  // Filter expenses by filterFromDate/filterToDate
  const filteredExpenses = useMemo(() => {
    return expenses.filter(exp => {
      const expDate = new Date(exp.date);
      const expDateOnly = new Date(expDate.getFullYear(), expDate.getMonth(), expDate.getDate());
      const fromDateOnly = new Date(filterFromDate.getFullYear(), filterFromDate.getMonth(), filterFromDate.getDate());
      const toDateOnly = new Date(filterToDate.getFullYear(), filterToDate.getMonth(), filterToDate.getDate());
      return expDateOnly >= fromDateOnly && expDateOnly <= toDateOnly;
    });
  }, [expenses, filterFromDate, filterToDate]);

  const startIdx = (paginationCurrentPage - 1) * paginationItemsPerPage;
  const currentPaginationItems = filteredExpenses.slice(
    startIdx,
    startIdx + paginationItemsPerPage
  );

  const totalFiltered = useMemo(() => {
    return filteredExpenses.reduce((total, exp) => total + exp.amount, 0);
  }, [filteredExpenses]);

  const handleAddExpense = (expense: Omit<Expense, 'id'>) => {
    const newExpense = {
      id: expenses.length ? expenses[expenses.length - 1].id + 1 : 1,
      ...expense,
    };
    setExpenses([...expenses, newExpense]);
    setPaginationCurrentPage(Math.ceil((expenses.length + 1) / paginationItemsPerPage));
  };

  // On filter date change, reset pagination to 1
  useEffect(() => {
    setPaginationCurrentPage(1);
  }, [filterFromDate, filterToDate]);

  // When View button clicked, apply selected fromDate/toDate to filter
  const handleViewClick = () => {
    setFilterFromDate(fromDate);
    setFilterToDate(toDate);
  };

  return (
    <>
      {/* Breadcrumb */}
      <div className="breadcrumb-wrapper d-flex justify-content-between align-items-center mb-3">
        <nav aria-label="breadcrumb" className="mb-0">
          <ol className="breadcrumb mb-0 bg-transparent p-0">
            <li className="breadcrumb-item"><Link to={"/Expenses"}>Expenses</Link></li>
            <li className="breadcrumb-item active" aria-current="page">Expenses</li>
          </ol>
        </nav>
        <div>
          <DateAndTime />
        </div>
      </div>

      {/* Filter and Add Button */}
      <div className="d-flex flex-wrap align-items-center gap-3 mb-4">
        <div className="d-flex align-items-center gap-2">
          <label htmlFor="fromDate" className="mb-0 fw-semibold">From:</label>
          <DatePicker
            id="fromDate"
            // onChange={setFromDate}
            onChange={(val) => {
              if (val instanceof Date) setFromDate(val);
            }}
            value={fromDate}
            maxDate={toDate}
            clearIcon={null}
            calendarIcon={null}
            className="border rounded p-1"
          />
        </div>
        <div className="d-flex align-items-center gap-2">
          <label htmlFor="toDate" className="mb-0 fw-semibold">To:</label>
          <DatePicker
            id="toDate"
            // onChange={setToDate}
            onChange={(val) => {
              if (val instanceof Date) setToDate(val);
            }}
            value={toDate}
            minDate={fromDate}
            maxDate={new Date()}
            clearIcon={null}
            calendarIcon={null}
            className="border rounded p-1"
          />
        </div>
        <button className="btn btn-outline-primary fw-semibold px-4" onClick={handleViewClick}>
          View
        </button>

        <button
          // className="btn btn-primary ms-auto fw-semibold"
           className="btn btn-primary ms-auto"
                    style={{ backgroundColor: 'var(--ColorTwo)', borderColor: 'var(--ColorTwo)' }}
          onClick={() => setShowModal(true)}
        >
          + Add New Expense
        </button>
      </div>

      {/* Summary */}
      <div className="mb-4">
        <div className="p-3 ExpensesSummary rounded text-center">
          <h5 className="mb-1 ExpensesSummaryColor fw-semibold">Total Expense in Selected Range</h5>
          <p className="fs-4 fw-bold ExpensesSummaryColor mb-0">${totalFiltered.toFixed(2)}</p>
          <small className="text-muted">
            ({filterFromDate.toLocaleDateString()} - {filterToDate.toLocaleDateString()})
          </small>
        </div>
      </div>

      {/* Expenses Table */}
      <div className="table-responsive shadow rounded">
        <table className="table table-hover mb-0 align-middle">
          <thead className="table-light">
            <tr>
              <th scope="col">#</th>
              <th scope="col">Title</th>
              <th scope="col">Name</th>
              <th scope="col">Amount ($)</th>
              <th scope="col">Date</th>
              <th scope="col">Created Date</th>
            </tr>
          </thead>
          <tbody>
            {currentPaginationItems.length === 0 && (
              <tr>
                <td colSpan={6} className="text-center py-4 text-muted fst-italic">
                  No expenses found for selected date range.
                </td>
              </tr>
            )}
            {currentPaginationItems.map((exp, index) => (
              <tr key={exp.id}>
                <th scope="row">{startIdx + index + 1}</th>
                <td className="fw-bold">{exp.title}</td>
                <td className="fw-bold">{exp.title}</td>
                <td className="fw-bold">${exp.amount.toFixed(2)}</td>
                <td>{new Date(exp.date).toLocaleDateString()}</td>
                <td>{new Date(exp.date).toLocaleDateString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="mt-3">
        <Pagination
          totalItems={filteredExpenses.length}
          itemsPerPage={paginationItemsPerPage}
          currentPage={paginationCurrentPage}
          onPageChange={setPaginationCurrentPage}
          onItemsPerPageChange={setPaginationItemsPerPage}
        />
      </div>

      {/* Create Expense Modal */}
      <CreateExpenses
        show={showModal}
        onClose={() => setShowModal(false)}
      />
    </>
  );
};

export default Expenses;
