import { Link } from "react-router-dom";
import { BsStack, BsFillCalendar2WeekFill } from "react-icons/bs";
import { FaShoppingCart, FaClock, FaCog, FaTruck } from "react-icons/fa";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import DateAndTime from "../../Components/DateAndTime/DateAndTime";

function Dashboard() {

  // গত মাসের ReadyMix প্রোডাক্ট অর্ডার ডেটা
  const productOrderData = [
    { date: "Jan 1", orders: 10 },
    { date: "Jan 5", orders: 20 },
    { date: "Jan 10", orders: 35 },
    { date: "Jan 15", orders: 25 },
    { date: "Jan 20", orders: 50 },
    { date: "Jan 25", orders: 60 },
    { date: "Jan 30", orders: 70 },
  ];

  // গত 7 দিনের ভিজিটর/কাস্টমার ডেটা
  const visitorData = [
    { date: "Jan 1", visitors: 50 },
    { date: "Jan 2", visitors: 75 },
    { date: "Jan 3", visitors: 60 },
    { date: "Jan 4", visitors: 90 },
    { date: "Jan 5", visitors: 80 },
    { date: "Jan 6", visitors: 100 },
    { date: "Jan 7", visitors: 95 },
  ];

  return (
    <>
      {/* ==================== Breadcrumb Start ====================== */}
      <div className="d-flex justify-content-between">
        <nav aria-label="breadcrumb">
          <ol className="breadcrumb">
            <li className="breadcrumb-item">
              <Link to={"/Dashboard"}>Dashboard</Link>
            </li>
            <li className="breadcrumb-item active" aria-current="page">
              Bina ReadyMix
            </li>
          </ol>
        </nav>
        <div className="TodayDate">
          <DateAndTime />
        </div>
      </div>
      {/* ==================== Breadcrumb End ====================== */}

      {/* ==================== Today Overview Start ====================== */}
      <div className="row mx-0 gx-4 gy-4">
        <div className="col-md-3 TodayOverview1">
          <Link to="/Orders">
            <div className="card text-center">
              <div className="card-body">
                <BsStack className="mb-2" style={{ fontSize: "30px" }} />
                <h5 className="card-title">Today's Orders</h5>
                <p className="card-text">50</p>
              </div>
            </div>
          </Link>
        </div>
        <div className="col-md-3 TodayOverview2">
          <Link to="/Orders">
            <div className="card text-center">
              <div className="card-body">
                <BsStack className="mb-2" style={{ fontSize: "30px" }} />
                <h5 className="card-title">Yesterday's Orders</h5>
                <p className="card-text">35</p>
              </div>
            </div>
          </Link>
        </div>
        <div className="col-md-3 TodayOverview3">
          <Link to="/Report">
            <div className="card text-center">
              <div className="card-body">
                <BsFillCalendar2WeekFill
                  className="mb-2"
                  style={{ fontSize: "30px" }}
                />
                <h5 className="card-title">Last Month's Sales</h5>
                <p className="card-text">75,000 SAR</p>
              </div>
            </div>
          </Link>
        </div>
        <div className="col-md-3 TodayOverview4">
          <Link to="/Expenses">
            <div className="card text-center">
              <div className="card-body">
                <BsFillCalendar2WeekFill
                  className="mb-2"
                  style={{ fontSize: "30px" }}
                />
                <h5 className="card-title">Last Month's Expenses</h5>
                <p className="card-text">25,000 SAR</p>
              </div>
            </div>
          </Link>
        </div>
      </div>
      {/* ==================== Today Overview End ====================== */}

      {/* ==================== Order Overview Start ====================== */}
      <div className="row mx-0 gx-4 gy-4 mt-2">
        <div className="col-md-6">
          <div className="d-flex align-items-center p-3 shadow rounded bg-white">
            <div className="me-4">
              <FaShoppingCart size={40} color="#213448" />
            </div>
            <div>
              <h5 className="mb-1">Total Orders</h5>
              <h3 className="fw-bold">500</h3>
            </div>
          </div>
        </div>
        <div className="col-md-6">
          <div className="d-flex align-items-center p-3 shadow rounded bg-white">
            <div className="me-4">
              <FaClock size={40} color="#059669" />
            </div>
            <div>
              <h5 className="mb-1">Orders Pending</h5>
              <h3 className="fw-bold">120</h3>
            </div>
          </div>
        </div>
        <div className="col-md-6">
          <div className="d-flex align-items-center p-3 shadow rounded bg-white">
            <div className="me-4">
              <FaCog size={40} color="#314DA7" />
            </div>
            <div>
              <h5 className="mb-1">Orders Processing</h5>
              <h3 className="fw-bold">80</h3>
            </div>
          </div>
        </div>
        <div className="col-md-6">
          <div className="d-flex align-items-center p-3 shadow rounded bg-white">
            <div className="me-4">
              <FaTruck size={40} color="#0891B2" />
            </div>
            <div>
              <h5 className="mb-1">Orders Delivered</h5>
              <h3 className="fw-bold">300</h3>
            </div>
          </div>
        </div>
      </div>
      {/* ==================== Order Overview End ====================== */}

      {/* ==================== Charts ====================== */}
      <div className="row mx-0 gx-4 gy-4 mt-4">
        <div className="col-md-6 mb-4">
          <div className="card p-3 shadow-sm">
            <h5 className="text-center mb-3">📦 Last Month Product Orders</h5>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={productOrderData}>
                <CartesianGrid stroke="#e0e0e0" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Line
                  type="monotone"
                  dataKey="orders"
                  stroke="#ff5733"
                  strokeWidth={3}
                  dot={{ r: 4 }}
                  activeDot={{ r: 6 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="col-md-6 mb-4">
          <div className="card p-3 shadow-sm">
            <h5 className="text-center mb-3">👥 Visitor Overview</h5>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={visitorData}>
                <CartesianGrid stroke="#e0e0e0" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Line
                  type="monotone"
                  dataKey="visitors"
                  stroke="#007bff"
                  strokeWidth={3}
                  dot={{ r: 4 }}
                  activeDot={{ r: 6 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
      {/* ==================== Charts End ====================== */}
    </>
  );
}

export default Dashboard;
