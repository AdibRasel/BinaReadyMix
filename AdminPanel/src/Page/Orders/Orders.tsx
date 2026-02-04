import React, { useState } from "react";
import { Link } from 'react-router-dom'
import { FiRefreshCw } from "react-icons/fi";
import DateAndTime from "../../Components/DateAndTime/DateAndTime";
import { FaEye, FaSave, FaWindowClose } from 'react-icons/fa';
import { IoIosPrint } from "react-icons/io";
import PaymentReceipt from "../../Components/PaymentReceipt/PaymentReceipt";
import { createRoot } from 'react-dom/client';
import Pagination from "../../Components/Pagination/Pagination";


interface Order {
  title: string;
  products: string[];
  qty: number;
  userName: string;
  userNumber: string;
  address: string;
  paymentStatus: string;
  orderStatus: string;
  date: string;
  price: string;
  total: string;
  badgeClassPayment: string;
  badgeClassOrder: string;
}


const sampleOrder: Order = {
  title: 'Sample Product',
  products: ['https://via.placeholder.com/80'],
  qty: 2,
  userName: 'Rasel Adib',
  userNumber: '0123456789',
  address: 'Dhaka, Bangladesh',
  paymentStatus: 'Paid',
  orderStatus: 'Delivered',
  date: '2025-05-16',
  price: '100',
  total: '200',
  badgeClassPayment: 'bg-success text-white',
  badgeClassOrder: 'bg-info text-dark'
};

const Orders = () => {

  const [isRefreshing, setIsRefreshing] = useState(false);

  const handleReload = () => {
    if (isRefreshing) return; // prevent multiple clicks
    setIsRefreshing(true);

    // Simulate refresh logic (like re-fetching data)
    setTimeout(() => {
      setIsRefreshing(false);
    }, 1000); // 1 second animation
  };

  const orders: Order[] = [
  {
    title: 'Ready Mix Concrete',
    products: [
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRUIIc1H6phvirT6X5Tb6WB_JBnsFEi0eXUig&s'
    ],
    qty: 1,
    userName: 'Bina ReadyMix',
    userNumber: '+966 (13) 812 5555 (Ext. 757)',
    address: "2nd Industrial Area, P.O. Box 1594, Al Khobar 31952, Dammam, Saudi Arabia",
    paymentStatus: 'Paid',
    orderStatus: 'Available',
    date: 'Jan 1, 2026',
    price: '500', // estimated per cubic meter or unit
    total: '500',
    badgeClassPayment: 'bg-success',
    badgeClassOrder: 'bg-primary',
  },
  {
    title: 'Foam Concrete',
    products: [
      'https://fountechbd.com/wp-content/uploads/2025/11/unnamed-1.jpg'
    ],
    qty: 1,
    userName: 'Bina ReadyMix',
    userNumber: '+966 (13) 812 5555 (Ext. 757)',
    address: "2nd Industrial Area, P.O. Box 1594, Al Khobar 31952, Dammam, Saudi Arabia",
    paymentStatus: 'Paid',
    orderStatus: 'Available',
    date: 'Jan 1, 2026',
    price: '400',
    total: '400',
    badgeClassPayment: 'bg-success',
    badgeClassOrder: 'bg-primary',
  },
  {
    title: 'Shot Blasting Concrete',
    products: [
      'https://www.concretedecor.net/wp-content/uploads/images/Feature_Photos/CD305/cd305_shotblast04.jpg'
    ],
    qty: 1,
    userName: 'Bina ReadyMix',
    userNumber: '+966 (13) 812 5555 (Ext. 757)',
    address: "2nd Industrial Area, P.O. Box 1594, Al Khobar 31952, Dammam, Saudi Arabia",
    paymentStatus: 'Paid',
    orderStatus: 'Available',
    date: 'Jan 1, 2026',
    price: '450',
    total: '450',
    badgeClassPayment: 'bg-success',
    badgeClassOrder: 'bg-primary',
  },
];



  const [selectedProduct, setSelectedProduct] = useState<any>(null);
  const [editedPaymentStatus, setEditedPaymentStatus] = useState('');
  const [editedOrderStatus, setEditedOrderStatus] = useState('');

  const handleSaveChanges = () => {
    // Example: update your product/order state or make API call here
    if (selectedProduct) {
      const updatedProduct = {
        ...selectedProduct,
        paymentStatus: editedPaymentStatus,
        orderStatus: editedOrderStatus,
        badgeClassPayment: getPaymentBadgeClass(editedPaymentStatus),
        badgeClassOrder: getOrderBadgeClass(editedOrderStatus),
      };
      // Update the order list here if needed
      console.log('Saved:', updatedProduct);
      setSelectedProduct(null);
    }
  };


  const handlePaymentReceipt = (order: Order) => {
    return (
      <>
        <PaymentReceipt order={order} />
      </>
    );
  };


  const handlePrintOrder = (order: Order) => {
    const container = document.createElement('div');
    document.body.appendChild(container);
    const root = createRoot(container);
    root.render(<PaymentReceipt order={order} />);

    setTimeout(() => {
      window.print();
      root.unmount();
      document.body.removeChild(container);
    }, 500);
  };



  const getPaymentBadgeClass = (status: string) => {
    if (status === 'Paid') return 'bg-success';
    else if (status === 'Unpaid') return 'bg-danger';
    else if (status === 'Cash On Delivery') return 'bg-secondary';
    else if (status === 'Refunded') return 'bg-warning';
    else return 'bg-light text-dark';
  };

  const getOrderBadgeClass = (status: string) => {
    if (status === 'Pending') return 'bg-warning text-dark';
    else if (status === 'Processing') return 'bg-primary';
    else if (status === 'Shipped') return 'bg-info';
    else if (status === 'Delivered') return 'bg-success';
    else if (status === 'Cancelled') return 'bg-danger';
    else return 'bg-light text-dark';
  };


  const [modalImage, setModalImage] = useState<string | null>(null);

  // Pagination start
  const paginationItems = Array.from({ length: 123 }, (_, i) => `Item ${i + 1}`);
  const [paginationCurrentPage, setPaginationCurrentPage] = useState(1);
  const [paginationItemsPerPage, setPaginationItemsPerPage] = useState(20);

  const startIdx = (paginationCurrentPage - 1) * paginationItemsPerPage;
  const currentPaginationItems = paginationItems.slice(
    startIdx,
    startIdx + paginationItemsPerPage
  );
  // Pagination End

  return (

    <>


      {/* ==================== Breadcrumb (Sub Menu Map) Start ====================== */}
      <div className="d-flex  justify-content-between">
        <nav aria-label="breadcrumb">
          <ol className="breadcrumb">
            <li className="breadcrumb-item"><Link to={"/Orders"}> Orders</Link> </li>
            <li className="breadcrumb-item active" aria-current="page">New Orders</li>
          </ol>
        </nav>
        <div className="TodayDate">
          <DateAndTime />
        </div>
      </div>
      {/* ==================== Breadcrumb (Sub Menu Map) End ====================== */}



      {/* ==================== Main Content Start > Card ====================== */}
      <div className="card">


        {/* ==================== Orders Menu Start ====================== */}
        <nav className="nav SubMenu px-2 py-2">
          <div className="container-fluid">
            <div className="d-flex flex-wrap justify-content-between align-items-center">

              {/* Left Side Menu Items */}
              <div className="SubmenuLeft d-flex flex-wrap gap-2">
                <Link className="nav-link SubMenuItem active" to={"/Orders"}>
                  New Orders <span className="badgeBox">10</span>
                </Link>
                <Link className="nav-link SubMenuItem" to={"/OrdersPending"}>
                  Pending <span className="badgeBox">10</span>
                </Link>
                <Link className="nav-link SubMenuItem" to={"/OrdersProcessing"}>
                  Processing <span className="badgeBox">10</span>
                </Link>
                <Link className="nav-link SubMenuItem" to={"/OrdersDelivered"}>
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





        {/* ==================== Orders Table And card-body Start ====================== */}
        <div className="card-body">
          <h5 className="card-title">Manage Order</h5>

          <div className="table-responsive">
            <table className="table table-bordered table-hover align-middle">
              <thead className="table-light">
                <tr>
                  <th>Product Title</th>
                  <th>Product Images</th>
                  <th>User Name</th>
                  <th>User Number</th>
                  <th>Address</th>
                  <th>Payment Status</th>
                  <th>Order Status</th>
                  <th>Date</th>
                  <th>Price</th>
                  <th>Qty</th>
                  <th>Total</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {orders.map((order, idx) => (
                  <tr key={idx}>
                    <td>{order.title}</td>
                    <td>
                      <div className="d-flex flex-wrap gap-2">
                        {order.products.map((img, imgIdx) => (
                          <img
                            key={imgIdx}
                            src={img}
                            alt={`Product ${imgIdx + 1}`}
                            className="img-fluid"
                            style={{
                              width: 40,
                              height: 40,
                              objectFit: 'cover',
                              borderRadius: '5px',
                              cursor: 'pointer',
                            }}
                            onClick={() => setModalImage(img)}
                          />
                        ))}
                      </div>
                    </td>
                    <td>{order.userName}</td>
                    <td>{order.userNumber}</td>
                    <td>{order.address}</td>
                    <td>
                      <span className={`badge ${order.badgeClassPayment}`}>{order.paymentStatus}</span>
                    </td>
                    <td>
                      <span className={`badge ${order.badgeClassOrder}`}>{order.orderStatus}</span>
                    </td>
                    <td>{order.date}</td>
                    <td>${Number(order.price).toLocaleString()}</td>
                    <td>{order.qty}</td>
                    <td>${Number(order.total).toLocaleString()}</td>
                    <td>
                      <button
                        data-toggle="modal"
                        data-target="#ModalProductDetails"
                        className="ActionButton d-flex align-items-center gap-1"
                        onClick={() => setSelectedProduct(order)}
                      >
                        <FaEye />
                        See
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Full Image Modal */}
          {modalImage && (
            <div
              onClick={() => setModalImage(null)}
              style={{
                position: 'fixed',
                inset: 0,
                backgroundColor: 'rgba(0,0,0,0.7)',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                zIndex: 1050,
                cursor: 'pointer',
              }}
            >
              <img
                src={modalImage}
                alt="Large View"
                style={{
                  maxWidth: '90%',
                  maxHeight: '90%',
                  borderRadius: '10px',
                  boxShadow: '0 0 20px rgba(255,255,255,0.5)',
                }}
                onClick={(e) => e.stopPropagation()}
              />
            </div>
          )}



          {/*============= Product Details Modal =============*/}
          {selectedProduct && (
            <div
              style={{
                position: 'fixed',
                inset: 0,
                backgroundColor: 'rgba(0,0,0,0.6)',
                zIndex: 1050,
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
              }}
              onClick={() => setSelectedProduct(null)}
            >
              <div
                className="bg-white rounded shadow p-4"
                style={{ width: '90%', maxWidth: '800px' }}
                onClick={(e) => e.stopPropagation()}
              >
                <div className="d-flex justify-content-between align-items-center mb-3">
                  <h5 className="mb-0">Product Details</h5>
                  <button
                    className="btn btn-sm btn-danger"
                    onClick={() => setSelectedProduct(null)}
                  >
                    ×
                  </button>
                </div>

                <div className="row">
                  <div className="col-md-4 text-center">
                    <img
                      src={selectedProduct.products[0]}
                      alt={selectedProduct.title}
                      className="img-fluid rounded"
                      style={{ maxHeight: '200px', objectFit: 'cover' }}
                    />
                  </div>

                  <div className="col-md-8">
                    <h5>{selectedProduct.title}</h5>
                    <p><strong>User Name:</strong> {selectedProduct.userName}</p>
                    <p><strong>User Number:</strong> {selectedProduct.userNumber}</p>
                    <p><strong>Address:</strong> {selectedProduct.address}</p>
                    <p><strong>Price:</strong> ${Number(selectedProduct.price).toLocaleString()}</p>
                    <p><strong>Quantity:</strong> {selectedProduct.qty}</p>
                    <p><strong>Total:</strong> ${Number(selectedProduct.total).toLocaleString()}</p>

                    {/* Payment Status Dropdown */}
                    <div className="mb-2">
                      <strong>Payment Status:</strong>
                      <select
                        className="form-select form-select-sm mt-1 text-white"
                        style={{
                          backgroundColor:
                            editedPaymentStatus === 'Paid' ? '#198754' :
                              editedPaymentStatus === 'Unpaid' ? '#dc3545' :
                                editedPaymentStatus === 'Cash On Delivery' ? '#6c757d' :
                                  editedPaymentStatus === 'Refunded' ? '#ffc107' :
                                    '#213448',
                        }}
                        value={editedPaymentStatus}
                        onChange={(e) => setEditedPaymentStatus(e.target.value)}
                      >
                        <option value="Paid">Paid</option>
                        <option value="Unpaid">Unpaid</option>
                        <option value="Cash On Delivery">Cash On Delivery</option>
                        <option value="Refunded">Refunded</option>
                      </select>
                    </div>

                    {/* Order Status Dropdown */}
                    <div className="mb-2">
                      <strong>Order Status:</strong>
                      <select
                        className="form-select form-select-sm mt-1 text-white"
                        style={{
                          backgroundColor:
                            editedOrderStatus === 'Pending' ? '#ffc107' :
                              editedOrderStatus === 'Processing' ? '#0d6efd' :
                                editedOrderStatus === 'Shipped' ? '#0dcaf0' :
                                  editedOrderStatus === 'Delivered' ? '#198754' :
                                    editedOrderStatus === 'Cancelled' ? '#dc3545' :
                                      '#213448',
                        }}
                        value={editedOrderStatus}
                        onChange={(e) => setEditedOrderStatus(e.target.value)}
                      >
                        <option value="Pending">Pending</option>
                        <option value="Processing">Processing</option>
                        <option value="Delivered">Delivered</option>
                        <option value="Shipped">Shipped</option>
                        <option value="Cancelled">Cancelled</option>
                      </select>
                    </div>

                    <p><strong>Date:</strong> {selectedProduct.date}</p>
                  </div>
                </div>

                <div className="mt-4 d-flex justify-content-start justify-content-between">
                  <div className="">


                    <button
                      className="btn btn-success me-2"
                      onClick={() => handleSaveChanges()}
                    >
                      Save Changes <FaSave />
                    </button>



                    <button
                      className="btn btn-primary "
                      //  onClick={() => handlePaymentReceipt(selectedProduct)}
                      onClick={() => handlePrintOrder(selectedProduct)}
                    >
                      Payment Receipt <IoIosPrint />
                    </button>





                  </div>

                  <div className="">

                    <button
                      className="btn btn-danger"
                      onClick={() => setSelectedProduct(null)}
                    >
                      Close <FaWindowClose />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
          {/*============= Product Details End =============*/}





          {/* Pagination Component */}
          <Pagination
            totalItems={paginationItems.length}
            itemsPerPage={paginationItemsPerPage}
            currentPage={paginationCurrentPage}
            onPageChange={setPaginationCurrentPage}
            onItemsPerPageChange={setPaginationItemsPerPage}
          />
          {/* Pagination Component End */}


        </div>
        {/* ==================== Orders Table And card-body End ====================== */}




      </div>
      {/* ==================== Main Content Edn > Card ====================== */}

    </>
  )
}

export default Orders
