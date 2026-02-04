import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import DateAndTime from '../../Components/DateAndTime/DateAndTime';
import Pagination from '../../Components/Pagination/Pagination';
import { FaStar } from 'react-icons/fa';
import { Button, Table, Modal } from 'react-bootstrap';
import EditReview from './EditReview';

interface ReviewItem {
  id: number;
  productName: string;
  ProductID: string;
  productImage: string;
  review: string;
  rating: number;
  userName: string;
  date: string;
}

const dummyData: ReviewItem[] = [
  {
    id: 1,
    productName: 'Ready Mix Concrete',
    ProductID: 'bina-rmc-001',
    productImage: 'https://mirreadymixconcrete.com/wp-content/uploads/2022/02/construction-worker-pouring-wet-concret-road-construction-site.jpg',
    review: 'High quality and easy to use for construction.',
    rating: 5,
    userName: 'Mohammed Ali',
    date: '2026-01-10',
  },
  {
    id: 2,
    productName: 'Foam Concrete',
    ProductID: 'bina-fc-002',
    productImage: 'https://fountechbd.com/wp-content/uploads/2025/11/unnamed-1.jpg',
    review: 'Lightweight and great for insulation purposes.',
    rating: 4,
    userName: 'Sara Khan',
    date: '2026-01-11',
  },
  {
    id: 3,
    productName: 'Shot Blasting Concrete',
    ProductID: 'bina-sbc-003',
    productImage: 'https://www.concretedecor.net/wp-content/uploads/images/Feature_Photos/CD305/cd305_shotblast04.jpg',
    review: 'Perfect for leveling floors, very effective.',
    rating: 5,
    userName: 'Ahmed Hossain',
    date: '2026-01-12',
  },
  {
    id: 4,
    productName: 'Ready Mix Concrete',
    ProductID: 'bina-rmc-001',
    productImage: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTbPY4vx1fWV82BgULjOH1yCRzG6Y6GBm34-A&s',
    review: 'Delivered on time and consistent quality.',
    rating: 4,
    userName: 'Rashidul Islam',
    date: '2026-01-13',
  },
  {
    id: 5,
    productName: 'Foam Concrete',
    ProductID: 'bina-fc-002',
    productImage: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQNgickjfde-HQzPhwa_a0D73j9noJ2O_7RuA&s',
    review: 'Very light and easy to handle for small projects.',
    rating: 3,
    userName: 'Fatima Begum',
    date: '2026-01-14',
  },
];





const Review = () => {
  const [reviews, setReviews] = useState<ReviewItem[]>(dummyData);
  const [paginationCurrentPage, setPaginationCurrentPage] = useState(1);
  const [paginationItemsPerPage, setPaginationItemsPerPage] = useState(5);
  const [showModal, setShowModal] = useState(false);
  const [selectedReview, setSelectedReview] = useState<ReviewItem | null>(null);
  const [showImageModal, setShowImageModal] = useState(false);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const startIndex = (paginationCurrentPage - 1) * paginationItemsPerPage;
  const currentItems = reviews.slice(startIndex, startIndex + paginationItemsPerPage);

  const handleDelete = (id: number) => {
    const confirmDelete = window.confirm('Are you sure you want to delete this review?');
    if (confirmDelete) {
      setReviews(reviews.filter((review) => review.id !== id));
    }
  };

  const handleEditClick = (review: ReviewItem) => {
    setSelectedReview(review);
    setShowModal(true);
  };

  const handleReviewUpdated = (updated: { id: number; review: string; rating: number }) => {
    setReviews((prev) =>
      prev.map((r) =>
        r.id === updated.id ? { ...r, review: updated.review, rating: updated.rating } : r
      )
    );
  };

  return (
    <>
      {/* Breadcrumb and Date */}
      <div className="d-flex justify-content-between align-items-center mb-3">
        <nav aria-label="breadcrumb">
          <ol className="breadcrumb">
            <li className="breadcrumb-item">
              <Link to="/Review">Review</Link>
            </li>
            <li className="breadcrumb-item active" aria-current="page">
              Review
            </li>
          </ol>
        </nav>
        <div className="TodayDate">
          <DateAndTime />
        </div>
      </div>

      {/* Review Table */}
      <div className="table-responsive ">
        <Table bordered hover striped >
          <thead style={{ backgroundColor: 'var(--ColorOne)', color: 'white' }}>
            <tr>
              <th>Image</th>
              <th>Product Name</th>
              <th>Product ID</th>
              <th>Review</th>
              <th>Rating</th>
              <th>User</th>
              <th>Date</th>
              <th style={{ textAlign: 'center' }}>Action</th>
            </tr>
          </thead>
          <tbody>
            {currentItems.map((review) => (
              <tr key={review.id}>
                <td>
                  <img
                    src={review.productImage}
                    alt="product"
                    width={60}
                    style={{ cursor: 'pointer' }}
                    onClick={() => {
                      setSelectedImage(review.productImage);
                      setShowImageModal(true);
                    }}
                  />
                </td>
                <td>{review.productName}</td>
                <td>{review.ProductID}</td>
                <td>{review.review}</td>
                <td>
                  {[...Array(review.rating)].map((_, idx) => (
                    <FaStar key={idx} style={{ color: 'gold' }} />
                  ))}
                </td>
                <td>{review.userName}</td>
                <td>{review.date}</td>
                <td className="text-center">
                  <Button
                    size="sm"
                    className="me-2"
                    style={{ backgroundColor: 'var(--ColorTwo)', border: 'none' }}
                    onClick={() => handleEditClick(review)}
                  >
                    Edit
                  </Button>
                  <Button
                    size="sm"
                    variant="danger"
                    onClick={() => handleDelete(review.id)}
                  >
                    Delete
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>

      {/* Pagination */}
      <Pagination
        totalItems={reviews.length}
        itemsPerPage={paginationItemsPerPage}
        currentPage={paginationCurrentPage}
        onPageChange={setPaginationCurrentPage}
        onItemsPerPageChange={setPaginationItemsPerPage}
      />

      {/* Edit Modal */}
      {selectedReview && (
        <EditReview
          show={showModal}
          onClose={() => setShowModal(false)}
          initialReview={selectedReview}
          onReviewUpdated={handleReviewUpdated}
        />
      )}

      {/* Image Preview Modal */}
      <Modal show={showImageModal} onHide={() => setShowImageModal(false)} centered size="lg">
        <Modal.Body className="text-center p-0">
          {selectedImage && (
            <img
              src={selectedImage}
              alt="Large preview"
              style={{
                width: '100%',
                height: 'auto',
                maxHeight: '80vh',
                objectFit: 'contain',
                borderRadius: '8px',
              }}
            />
          )}
        </Modal.Body>
      </Modal>
    </>
  );
};

export default Review;
