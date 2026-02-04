import React, { useState, useEffect } from 'react';
import DatePicker from 'react-date-picker';
import 'react-date-picker/dist/DatePicker.css';
// import 'react-calendar/dist/Calendar.css';
import { IoCalendarNumberSharp } from "react-icons/io5";

interface CreateExpensesProps {
  show: boolean;
  onClose: () => void;
}

const CreateExpenses: React.FC<CreateExpensesProps> = ({ show, onClose }) => {
  const [title, setTitle] = useState('');
  const [amount, setAmount] = useState('');
  const [date, setDate] = useState<Date | null>(new Date());
  const [userName, setUserName] = useState('');

  useEffect(() => {
    // const storedName = localStorage.getItem('userName');
    const storedName = "User Name";
    if (storedName) {
      setUserName(storedName);
    }
  }, []);

  const handleSave = () => {
    if (title && amount && date) {
      const formattedDate = date.toISOString().split('T')[0]; // e.g., 2025-05-19
      const expenseData = {
        title,
        amount: parseFloat(amount),
        date: formattedDate,
        createdBy: userName,
      };

      console.log('Saved Expense:', expenseData);

      // Reset fields
      setTitle('');
      setAmount('');
      setDate(new Date());
      onClose();
    } else {
      alert('Please fill all fields');
    }
  };

  if (!show) return null;

  return (
    <div className="modal fade show d-block" tabIndex={-1} role="dialog" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
      <div className="modal-dialog" role="document">
        <div className="modal-content">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSave();
            }}
          >
            <div className="modal-header">
              <h5 className="modal-title">Add New Expense</h5>
              <button type="button" className="btn-close" aria-label="Close" onClick={onClose}></button>
            </div>
            <div className="modal-body">
              <div className="mb-3">
                <label htmlFor="createdBy" className="form-label">Created By</label>
                <input
                  type="text"
                  id="createdBy"
                  className="form-control"
                  value={userName}
                  readOnly
                />
              </div>
              <div className="mb-3">
                <label htmlFor="expenseTitle" className="form-label">Expense Title</label>
                <input
                  type="text"
                  id="expenseTitle"
                  className="form-control"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  required
                />
              </div>
              <div className="mb-3">
                <label htmlFor="expenseAmount" className="form-label">Amount</label>
                <input
                  type="number"
                  id="expenseAmount"
                  className="form-control"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  required
                  min="0"
                  step="0.01"
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Date</label>
                <DatePicker
                  value={date}
                  onChange={(val) => {
                    if (val instanceof Date) setDate(val);
                  }}
                  format="dd/MM/yyyy"
                  className="form-control custom-date-picker w-100"
                  calendarIcon={<IoCalendarNumberSharp size={20} color="#213448" />}

                  clearIcon={null}
                  required
                />
              </div>
            </div>
            <div className="modal-footer">
              <button
                    type="button"
                    className="btn btn-secondary me-2"
                    onClick={onClose}
                >
                Cancel
                </button>
              <button
                type="submit"
                className="btn btn-success"
                style={{ backgroundColor: 'var(--ColorTwo)', borderColor: 'var(--ColorTwo)' }}
              >
                Save Expense
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreateExpenses;
