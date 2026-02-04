import React, { useState } from 'react';
import Config from '../../Config.json';
import { Link } from 'react-router-dom';
import LongLogo from "../Assets/Logo/LongLogo.png"
import { FaBell } from "react-icons/fa6";
import { TbHelpSquareFilled } from "react-icons/tb";
import { FaRegUserCircle } from "react-icons/fa";
import Dropdown from 'react-bootstrap/Dropdown';
import { MdDashboard } from "react-icons/md";
import { MdCategory } from "react-icons/md";
import { SiGooglepubsub } from "react-icons/si";
import { TbBrandSvelte } from "react-icons/tb";
import { VscGroupByRefType } from "react-icons/vsc";
import { TbLogin2 } from "react-icons/tb";
import { HiDocumentReport } from "react-icons/hi";
import { ImOffice } from "react-icons/im";
import { BiSolidOffer } from "react-icons/bi";
import { TfiLayoutSliderAlt } from "react-icons/tfi";
import { MdNotificationsActive } from "react-icons/md";
import { RiLogoutCircleLine } from "react-icons/ri";
import { MdOutlineProductionQuantityLimits } from "react-icons/md";
import { MdReviews } from "react-icons/md"
import { FaAngleRight } from "react-icons/fa6";
import { NavLink } from "react-router-dom";
import { TbWorldBolt } from "react-icons/tb";
import { FaBars, FaTimes } from 'react-icons/fa';
import { SiInfracost } from "react-icons/si";
interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {

  const [isOpen, setIsOpen] = useState(true);

  const toggleDrawer = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>


      {/* ========================== Header Start ========================= */}
      <div className=" row align-items-center mx-0 gx-0 p-2 Header">



        {/* Slide Bar Trogol Button */}
        <div className="col-md-2 text-white">


          <div className="d-flex justify-content-between">
            <div className="">
              <Link to="/">
                <img src={LongLogo} style={{ height: "40px", }} alt="" />
              </Link>
            </div>
            {/* ToggleDrawer আইকন টা মোবাইল রেসপন্সিভ এ সমস্যা করার কারন TrogolContent.TrogolContentOpen যায়গা বেশি নেওয়া */}
            <div style={{ marginRight: "10px" }} className="">
              <span className="ToggleButton" onClick={toggleDrawer}>
                {isOpen ? <FaTimes /> : <FaBars />}
              </span>
            </div>
          </div>



          <div className={`sidebar-drawer text-start ${isOpen ? 'open' : ''}`}>

            <ul className="sidebar-menu">
              <NavLink to="/Dashboard" className={({ isActive }) => isActive ? "sidebar-menu-item active" : "sidebar-menu-item"}>
                <li>
                  <span className="menu-icon"><MdDashboard /></span>
                  <span className="menu-text">Dashboard</span>
                  <span className="menu-arrow"><FaAngleRight /></span>
                </li>
              </NavLink>

              <NavLink to="/EmployeeList" className={({ isActive }) => isActive ? "sidebar-menu-item active" : "sidebar-menu-item"}>
                <li>
                  <span className="menu-icon"><MdDashboard /></span>
                  <span className="menu-text">Employee List</span>
                  <span className="menu-arrow"><FaAngleRight /></span>
                </li>
              </NavLink>

              <NavLink to="/Orders" className={({ isActive }) => isActive ? "sidebar-menu-item active" : "sidebar-menu-item"}>
                <li>
                  <span className="menu-icon"><TbLogin2 /></span>
                  <span className="menu-text">Orders</span>
                  <span className="menu-arrow"><FaAngleRight /></span>
                </li>
              </NavLink>

              <NavLink to="/Report" className={({ isActive }) => isActive ? "sidebar-menu-item active" : "sidebar-menu-item"}>
                <li>
                  <span className="menu-icon"><HiDocumentReport /></span>
                  <span className="menu-text">Report</span>
                  <span className="menu-arrow"><FaAngleRight /></span>
                </li>
              </NavLink>

              <NavLink to="/OfficeAssistant" className={({ isActive }) => isActive ? "sidebar-menu-item active" : "sidebar-menu-item"}>
                <li>
                  <span className="menu-icon"><ImOffice /></span>
                  <span className="menu-text">Office Assistant</span>
                  <span className="menu-arrow"><FaAngleRight /></span>
                </li>
              </NavLink>

              <NavLink to="/Expenses" className={({ isActive }) => isActive ? "sidebar-menu-item active" : "sidebar-menu-item"}>
                <li>
                  <span className="menu-icon"><SiInfracost /></span>
                  <span className="menu-text">Expenses</span>
                  <span className="menu-arrow"><FaAngleRight /></span>
                </li>
              </NavLink>

              <NavLink to="/Product" className={({ isActive }) => isActive ? "sidebar-menu-item active" : "sidebar-menu-item"}>
                <li>
                  <span className="menu-icon"><MdOutlineProductionQuantityLimits /></span>
                  <span className="menu-text">Product</span>
                  <span className="menu-arrow"><FaAngleRight /></span>
                </li>
              </NavLink>

              <NavLink to="/Review" className={({ isActive }) => isActive ? "sidebar-menu-item active" : "sidebar-menu-item"}>
                <li>
                  <span className="menu-icon"><MdReviews /></span>
                  <span className="menu-text">Review</span>
                  <span className="menu-arrow"><FaAngleRight /></span>
                </li>
              </NavLink>

              <NavLink to="/Category" className={({ isActive }) => isActive ? "sidebar-menu-item active" : "sidebar-menu-item"}>
                <li>
                  <span className="menu-icon"><MdCategory /></span>
                  <span className="menu-text">Category</span>
                  <span className="menu-arrow"><FaAngleRight /></span>
                </li>
              </NavLink>

              <NavLink to="/SubCategory" className={({ isActive }) => isActive ? "sidebar-menu-item active" : "sidebar-menu-item"}>
                <li>
                  <span className="menu-icon"><SiGooglepubsub /></span>
                  <span className="menu-text">Sub Category</span>
                  <span className="menu-arrow"><FaAngleRight /></span>
                </li>
              </NavLink>

              <NavLink to="/Brands" className={({ isActive }) => isActive ? "sidebar-menu-item active" : "sidebar-menu-item"}>
                <li>
                  <span className="menu-icon"><TbBrandSvelte /></span>
                  <span className="menu-text">Brands</span>
                  <span className="menu-arrow"><FaAngleRight /></span>
                </li>
              </NavLink>

              <NavLink to="/Variants" className={({ isActive }) => isActive ? "sidebar-menu-item active" : "sidebar-menu-item"}>
                <li>
                  <span className="menu-icon"><VscGroupByRefType /></span>
                  <span className="menu-text">Variants</span>
                  <span className="menu-arrow"><FaAngleRight /></span>
                </li>
              </NavLink>

              <NavLink to="/Coupons" className={({ isActive }) => isActive ? "sidebar-menu-item active" : "sidebar-menu-item"}>
                <li>
                  <span className="menu-icon"><BiSolidOffer /></span>
                  <span className="menu-text">Coupons</span>
                  <span className="menu-arrow"><FaAngleRight /></span>
                </li>
              </NavLink>

              <NavLink to="/Slider" className={({ isActive }) => isActive ? "sidebar-menu-item active" : "sidebar-menu-item"}>
                <li>
                  <span className="menu-icon"><TfiLayoutSliderAlt /></span>
                  <span className="menu-text">Slider</span>
                  <span className="menu-arrow"><FaAngleRight /></span>
                </li>
              </NavLink>

              <NavLink to="/Notifications" className={({ isActive }) => isActive ? "sidebar-menu-item active" : "sidebar-menu-item"}>
                <li>
                  <span className="menu-icon"><MdNotificationsActive /></span>
                  <span className="menu-text">Notifications</span>
                  <span className="menu-arrow"><FaAngleRight /></span>
                </li>
              </NavLink>

              <NavLink to="/logout" className={({ isActive }) => isActive ? "sidebar-menu-item active" : "sidebar-menu-item"}>
                <li>
                  <span className="menu-icon"><RiLogoutCircleLine /></span>
                  <span className="menu-text">Logout</span>
                  <span className="menu-arrow"><FaAngleRight /></span>
                </li>
              </NavLink>
            </ul>
















          </div>




        </div>







        {/* User Icon And Other side  */}
        <div className="col-md-10 UserIconSide">
          <div className="d-flex  justify-content-between align-items-center">
            <div className="HeaderLogo"> </div>

            <div className="HeaderIcon d-flex align-items-center gap-1">
              <Link to="/Orders" className="position-relative">
                <FaBell size={20} />
                <span className="NotificationAlart">12</span>
              </Link>

              <Link to="/Review" className="position-relative">
                <MdReviews size={20} />
                <span className="NotificationAlart">10</span>
              </Link>

              <Link to="/Dashboard" className='position-relative'>
                <TbWorldBolt size={20} />
                <span className="NotificationAlart">154</span>
              </Link>

              <Link to="/">
                <TbHelpSquareFilled size={20} />
              </Link>

              <Dropdown>
                <Dropdown.Toggle
                  as="div"
                  id=""
                  style={{ cursor: 'pointer' }}
                  className="d-inline"
                >
                  <FaRegUserCircle size={24} />
                </Dropdown.Toggle>

                <Dropdown.Menu className='p-2'>
                  <Dropdown.Item>
                    <Link to="/">
                      <h6 className='m-0 HeaderUserTitle'>Profile</h6>
                    </Link>
                  </Dropdown.Item>
                  <Dropdown.Item>
                    <Link to="/">
                      <h6 className='m-0 HeaderUserTitle'>Settings</h6>
                    </Link>
                  </Dropdown.Item>
                  <Dropdown.Item>
                    <Link to="/">
                      <h6 className='m-0 HeaderUserTitle'>Logout</h6>
                    </Link>
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </div>














          </div>
        </div>
      </div>
      {/* ========================== Header End ========================= */}








      {/* ========================== Main Content Start ========================= */}
      <div className={`TrogolContent  ${isOpen ? 'TrogolContentOpen' : ''}`}>
        <div className="MainContent" style={{ paddingTop: "50px" }}>
          <div style={{ padding: "10px" }}>
            {children}




            <footer style={{ textAlign: "center", padding: "20px", fontFamily: "Poppins, sans-serif" }}>
              <p>Developed by <a href="https://www.rasalhossain.com" target="_blank">Rasal Hossain</a></p>
            </footer>


            
          </div>
        </div>
      </div>
      {/* ========================== Main Content End ========================= */}





    </>
  );
};

export default Layout;
