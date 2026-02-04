import React, { useEffect, useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';

interface EditReviewModalProps {
  show: boolean;
  onClose: () => void;
  initialReview: {
    id: number;
    productName: string;
    review: string;
    rating: number;
  };
  onReviewUpdated: (updated: { id: number; review: string; rating: number }) => void;
}

const EditReview: React.FC<EditReviewModalProps> = ({ show, onClose, initialReview, onReviewUpdated }) => {
  const [reviewText, setReviewText] = useState('');
  const [rating, setRating] = useState(1);

  useEffect(() => {
    setReviewText(initialReview.review);
    setRating(initialReview.rating);
  }, [initialReview]);

  const handleSubmit = () => {
    // ✅ Directly handle submit inside modal
    const updatedReview = {
      id: initialReview.id,
      review: reviewText,
      rating: rating
    };
    onReviewUpdated(updatedReview); // Send back to parent
    onClose(); // Close modal
  };

  return (
    <Modal show={show} onHide={onClose}>
      <Modal.Header closeButton style={{ backgroundColor: 'var(--ColorTwo)', color: 'white' }}>
        <Modal.Title>Edit Review - {initialReview.productName}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group className="mb-3">
            <Form.Label>Review</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              value={reviewText}
              onChange={(e) => setReviewText(e.target.value)}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Rating</Form.Label>
            <Form.Select value={rating} onChange={(e) => setRating(parseInt(e.target.value))}>
              {[1, 2, 3, 4, 5].map((val) => (
                <option key={val} value={val}>
                  {val} Star{val > 1 && 's'}
                </option>
              ))}
            </Form.Select>
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onClose}>Cancel</Button>
        <Button style={{ backgroundColor: 'var(--ColorOne)', border: 'none' }} onClick={handleSubmit}>
          Save Changes
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default EditReview;
