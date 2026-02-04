import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import DatePicker from 'react-date-picker';
import 'react-date-picker/dist/DatePicker.css';
import 'react-calendar/dist/Calendar.css';

const AdminReport: React.FC = () => {
  const today = new Date();

  // Dummy data: প্রতি মাসের ১ তারিখ ধরে রেভিনিউ
  const reportItems = Array.from({ length: 50 }, (_, i) => {
    const date = new Date();
    date.setMonth(date.getMonth() - i);
    date.setDate(1);
    const revenue = Math.floor(Math.random() * (20000 - 8000 + 1)) + 8000;
    return { id: i + 1, date, revenue };
  });

  // ==== State ====
  const [selectedMonth, setSelectedMonth] = useState<Date | null>(null);
  const [dateRange, setDateRange] = useState<[Date | null, Date | null]>([null, null]);
  const [showRangeResult, setShowRangeResult] = useState(false);

  // ==== Filter for selected month (single month view) ====
  const filteredItems =
    selectedMonth && selectedMonth instanceof Date
      ? reportItems.filter(
          (it) =>
            it.date.getFullYear() === selectedMonth.getFullYear() &&
            it.date.getMonth() === selectedMonth.getMonth()
        )
      : reportItems;

  const totalRevenue = filteredItems.reduce((acc, cur) => acc + cur.revenue, 0);
  const ownerAProfit = (totalRevenue * 70) / 100;
  const ownerBProfit = (totalRevenue * 30) / 100;

  // ==== Range Filter Logic ====
  const [startDate, endDate] = dateRange;
  const filteredByRange =
    startDate && endDate
      ? reportItems.filter(
          (it) => it.date >= startDate && it.date <= endDate
        )
      : [];

  const rangeRevenue = filteredByRange.reduce((acc, cur) => acc + cur.revenue, 0);
  const rangeOwnerA = (rangeRevenue * 70) / 100;
  const rangeOwnerB = (rangeRevenue * 30) / 100;

  return (
    <>
      {/* ===== Breadcrumb ===== */}
      <div className="d-flex justify-content-between align-items-start flex-column flex-md-row mb-4 gap-2">
        <nav aria-label="breadcrumb">
          <ol className="breadcrumb mb-0">
            <li className="breadcrumb-item">
              <Link to="/report">Report</Link>
            </li>
            <li className="breadcrumb-item active" aria-current="page">
              Admin Report
            </li>
          </ol>
        </nav>
        <div className="today-date small fw-medium">
          <span>Today: {today.toLocaleDateString()}</span>&nbsp;|&nbsp;
          <span>Time: {today.toLocaleTimeString()}</span>
        </div>
      </div>

      {/* ===== Month Picker (Single) ===== */}
      <div className="mb-4">
        <label className="form-label fw-semibold">Select a Month</label>
        <DatePicker
          onChange={(value) => setSelectedMonth(value as Date)}
          value={selectedMonth}
          format="MMMM y"
          maxDetail="year"
          clearIcon={null}
          className="border rounded p-1"
        />
      </div>

      {/* ===== Profit For Selected Month ===== */}
      <div className="card mb-4">
        <div className="card-body">
          <h5 className="card-title mb-3">Owner Profit Distribution</h5>
          <div className="row g-3">
            <div className="col-md-4">
              <div className="p-3 border rounded bg-light">
                <strong>Total Revenue:</strong><br />
                <span className="fs-5 fw-bold text-success">
                  ৳ {totalRevenue.toLocaleString()}
                </span>
              </div>
            </div>
            <div className="col-md-4">
              <div className="p-3 border rounded bg-light">
                <strong>Owner A (70%):</strong><br />
                <span className="fs-5 fw-bold text-primary">
                  ৳ {ownerAProfit.toLocaleString()}
                </span>
              </div>
            </div>
            <div className="col-md-4">
              <div className="p-3 border rounded bg-light">
                <strong>Owner B (30%):</strong><br />
                <span className="fs-5 fw-bold text-warning">
                  ৳ {ownerBProfit.toLocaleString()}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ===== Date Range Filter (January - April) ===== */}
      <div className="card mb-4">
        <div className="card-body">
          <h5 className="card-title mb-3">See Profit from Custom Date Range</h5>

          <div className="d-flex flex-column flex-md-row gap-3 align-items-start mb-3">
            <div>
              <label className="form-label fw-semibold">From</label><br />
              <DatePicker
                onChange={(date) => setDateRange([date as Date, dateRange[1]])}
                value={startDate}
                format="dd/MM/y"
                clearIcon={null}
              />
            </div>
            <div>
              <label className="form-label fw-semibold">To</label><br />
              <DatePicker
                onChange={(date) => setDateRange([dateRange[0], date as Date])}
                value={endDate}
                format="dd/MM/y"
                clearIcon={null}
              />
            </div>
            <div className="align-self-end">
              <button
                className="btn btn-primary mt-2"
                onClick={() => setShowRangeResult(true)}
                disabled={!startDate || !endDate}
              >
                See Profit
              </button>
            </div>
          </div>

          {showRangeResult && startDate && endDate && (
            <div className="row g-3 mt-3">
              <div className="col-md-4">
                <div className="p-3 border rounded bg-light">
                  <strong>Total Revenue:</strong><br />
                  <span className="fs-5 fw-bold text-success">
                    ৳ {rangeRevenue.toLocaleString()}
                  </span>
                </div>
              </div>
              <div className="col-md-4">
                <div className="p-3 border rounded bg-light">
                  <strong>Owner A (70%):</strong><br />
                  <span className="fs-5 fw-bold text-primary">
                    ৳ {rangeOwnerA.toLocaleString()}
                  </span>
                </div>
              </div>
              <div className="col-md-4">
                <div className="p-3 border rounded bg-light">
                  <strong>Owner B (30%):</strong><br />
                  <span className="fs-5 fw-bold text-warning">
                    ৳ {rangeOwnerB.toLocaleString()}
                  </span>
                </div>
              </div>

              <div className="col-12 mt-2 text-muted small">
                Showing profit from{' '}
                <strong>{startDate.toLocaleDateString()}</strong> to{' '}
                <strong>{endDate.toLocaleDateString()}</strong>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default AdminReport;
