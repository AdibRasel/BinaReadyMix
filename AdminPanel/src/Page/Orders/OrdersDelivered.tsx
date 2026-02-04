import React, { useState } from "react";
import { Link } from 'react-router-dom'
import { FiRefreshCw } from "react-icons/fi";
import DateAndTime from "../../Components/DateAndTime/DateAndTime";



const OrdersDelivered = () => {

  const [isRefreshing, setIsRefreshing] = useState(false);

  const handleReload = () => {
    if (isRefreshing) return; // prevent multiple clicks
    setIsRefreshing(true);

    // Simulate refresh logic (like re-fetching data)
    setTimeout(() => {
      setIsRefreshing(false);
    }, 1000); // 1 second animation
  };

  return (
    <>

      {/* ==================== Breadcrumb (Sub Menu Map) Start ====================== */}
      <div className="d-flex  justify-content-between">
        <nav aria-label="breadcrumb">
          <ol className="breadcrumb">
            <li className="breadcrumb-item"><Link to={"/Orders"}> Orders</Link> </li>
            <li className="breadcrumb-item active" aria-current="page">Orders Delivered</li>
          </ol>
        </nav>
        <div className="TodayDate">
          <DateAndTime />
        </div>
      </div>
      {/* ==================== Breadcrumb (Sub Menu Map) End ====================== */}



      {/* ==================== Main Content Start ====================== */}
      <div className="card">


        {/* ==================== Orders Menu Start ====================== */}
        <nav className="nav SubMenu px-2 py-2">
          <div className="container-fluid">
            <div className="d-flex flex-wrap justify-content-between align-items-center">

              {/* Left Side Menu Items */}
              <div className="SubmenuLeft d-flex flex-wrap gap-2">
                <Link className="nav-link SubMenuItem " to={"/Orders"}>
                  New Orders <span className="badgeBox">10</span>
                </Link>
                <Link className="nav-link SubMenuItem" to={"/OrdersPending"}>
                  Pending <span className="badgeBox">10</span>
                </Link>
                <Link className="nav-link SubMenuItem" to={"/OrdersProcessing"}>
                  Processing <span className="badgeBox">10</span>
                </Link>
                <Link className="nav-link SubMenuItem active" to={"/OrdersDelivered"}>
                  Delivered <span className="badgeBox">10</span>
                </Link>
              </div>

              {/* Right Side Reload Icon */}
              <div className="SubmenuRight mt-2 mt-sm-0">
                <button className="reload-btn" onClick={handleReload}>
                  <FiRefreshCw className={isRefreshing ? "spin-icon" : ""} size={20} />
                </button>
              </div>

            </div>
          </div>
        </nav>
        {/* ==================== Orders Menu Start ====================== */}










        <div className="card-body">
          <h5 className="card-title">Card title</h5>
          <h6 className="card-subtitle mb-2 text-muted">Card subtitle</h6>
          <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
          <a href="#" className="card-link">Card link</a>
          <a href="#" className="card-link">Another link</a>
        </div>



      </div>
      {/* ==================== Main Content Edn ====================== */}

    </>
  )
}

export default OrdersDelivered
