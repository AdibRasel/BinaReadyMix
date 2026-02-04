import React, { useEffect } from "react";
import Logo from "../../Assets/Logo/LongLogo.png";
import Config from "../../../Config.json";

export type Order = {
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
};

type Props = {
  order: Order;
};

const PaymentReceipt: React.FC<Props> = ({ order }) => {
  useEffect(() => {
    const originalTitle = document.title;
    document.title = `${order.title} - ${order.userName}`;
    return () => {
      document.title = originalTitle;
    };
  }, [order.title, order.userName]);

  return (
    <div
      className="receipt p-4 bg-white shadow rounded"
      style={{
        maxWidth: 700,
        margin: "20px auto",
        fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
        color: "#2c3e50",
        border: "1px solid #ddd",
      }}
    >
      <style>
        {`
        @media print {
          body * {
            visibility: hidden;
          }
          .receipt, .receipt * {
            visibility: visible;
          }
          .receipt {
            position: absolute;
            left: 0;
            top: 0;
            width: 100%;
            padding: 20px;
            font-family: Arial, sans-serif;
            color: #000;
            border: none !important;
            box-shadow: none !important;
            background: white !important;
          }
          .no-print {
            display: none !important;
          }
        }

        .receipt-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          border-bottom: 3px solid #3498db;
          padding-bottom: 15px;
          margin-bottom: 25px;
        }

        .company-info h4 {
          margin: 0 0 5px;
          font-size: 1.8rem;
          color: #2980b9;
          font-weight: 700;
        }

        .company-info span {
          display: block;
          font-size: 0.9rem;
          color: #7f8c8d;
        }

        .date {
          font-weight: 600;
          font-size: 1rem;
          color: #34495e;
        }

        h5 {
          font-weight: 700;
          color: #34495e;
          border-bottom: 2px solid #ecf0f1;
          padding-bottom: 5px;
          margin-bottom: 15px;
          font-size: 1.1rem;
        }

        .customer-info p {
          margin: 5px 0;
          font-size: 0.95rem;
        }

        .customer-info strong {
          color: #2c3e50;
        }

        table {
          width: 100%;
          border-collapse: separate;
          border-spacing: 0 8px;
        }

        thead tr th {
          background-color: #2c3e50;
          color: #ffffff;
          padding: 10px;
          text-align: left;
          font-weight: 700;
          border-radius: 6px;
          font-size: 1rem;
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }

        tbody tr {
          background-color: #f8f9fa;
        }

        tbody tr td {
          padding: 12px 10px;
          color: #34495e;
        }

        tfoot tr th {
          padding-top: 15px;
          text-align: right;
          font-size: 1.1rem;
          color: #2980b9;
          font-weight: 700;
          border-top: 3px solid #3498db;
        }

        .status-badges {
          margin-top: 30px;
          display: flex;
          gap: 20px;
          justify-content: space-between;
        }

        .status-badges div {
          flex: 1;
          background: #f4f6f8;
          padding: 15px;
          border-radius: 12px;
          border: 1px solid #dcdde1;
          text-align: center;
        }

        .status-badges small {
          font-size: 0.9rem;
          font-weight: 600;
          color: #2c3e50;
          margin-bottom: 8px;
          display: block;
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }

        .badge {
          padding: 10px 22px;
          border-radius: 50px;
          font-weight: 700;
          font-size: 0.95rem;
          text-transform: uppercase;
          color: #fff;
          display: inline-block;
        }

        .badge-success {
          background-color: #27ae60;
        }

        .badge-warning {
          background-color: #f39c12;
        }

        .badge-danger {
          background-color: #e74c3c;
        }

        .thank-you {
          margin-top: 40px;
          text-align: center;
          font-style: italic;
          font-size: 1.2rem;
          color: #2c3e50;
          background: #ecf0f1;
          padding: 15px;
          border-radius: 8px;
          border-left: 5px solid #3498db;
        }

        @media (max-width: 480px) {
          .receipt-header {
            flex-direction: column;
            align-items: flex-start;
            gap: 10px;
          }
          .date {
            align-self: flex-end;
          }
        }
      `}
      </style>

      {/* Header */}
      <div className="receipt-header">
        <div style={{ display: "flex", alignItems: "center" }}>
          {/* <img src={Logo} alt="Company Logo" className="logo" /> */}
          <div className="company-info">
            <h4>{Config.Name}</h4>
            <span>{Config.Address}</span>
            <span>{Config.Phone}</span>
            <span>{Config.Email}</span>
          </div>
        </div>
        <div className="date">
          <strong>Date:</strong> {order.date}
        </div>
      </div>

      {/* Customer Info */}
      <div className="customer-info">
        <h5>Customer Information</h5>
        <p><strong>Name:</strong> {order.userName}</p>
        <p><strong>Address:</strong> {order.address}</p>
        <p><strong>Mobile:</strong> {order.userNumber}</p>
      </div>

      {/* Order Table */}
      <div className="order-summary mt-4">
        <h5>Order Summary</h5>
        <table>
          <thead>
            <tr>
              <th>Product Name</th>
              <th>Price</th>
              <th>Qty</th>
              <th>Total</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>{order.title}</td>
              <td>${order.price}</td>
              <td>{order.qty}</td>
              <td>${order.total}</td>
            </tr>
          </tbody>
          <tfoot>
            <tr>
              <th colSpan={3}>Grand Total</th>
              <th>${order.total}</th>
            </tr>
          </tfoot>
        </table>
      </div>

      {/* Status Badges */}
      <div className="status-badges">
        <div>
          <small>Payment Status</small>
          <span className={`badge ${order.badgeClassPayment}`}>
            {order.paymentStatus}
          </span>
        </div>
        <div>
          <small>Order Status</small>
          <span className={`badge ${order.badgeClassOrder}`}>
            {order.orderStatus}
          </span>
        </div>
      </div>

      {/* Thank you message */}
      <p className="thank-you">Thank you for your purchase!</p>
    </div>
  );
};

export default PaymentReceipt;
