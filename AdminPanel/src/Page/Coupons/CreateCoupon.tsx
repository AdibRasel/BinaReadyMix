import React, { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';

interface CreateCouponProps {
  show: boolean;
  onClose: () => void;
  onCreate: (coupon: {
    name: string;
    discount: number;
    expiryDate: string;
    createdBy: string;
    createdAt: string;
  }) => void;
}

const CreateCoupon: React.FC<CreateCouponProps> = ({ show, onClose, onCreate }) => {
  const [name, setName] = useState('');
  const [discount, setDiscount] = useState<number | ''>('');
  const [expiryDate, setExpiryDate] = useState('');
  const [createdBy, setCreatedBy] = useState('Admin');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !discount || !expiryDate) {
      alert('Please fill all fields');
      return;
    }

    const newCoupon = {
      name,
      discount: Number(discount),
      expiryDate,
      createdBy,
      createdAt: new Date().toISOString().split('T')[0],
    };

    onCreate(newCoupon);

    // Reset form
    setName('');
    setDiscount('');
    setExpiryDate('');
    setCreatedBy('Admin');
  };

  return (
    <Modal show={show} onHide={onClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>Create Coupon</Modal.Title>
      </Modal.Header>

      <Form onSubmit={handleSubmit}>
        <Modal.Body>
          <Form.Group className="mb-3">
            <Form.Label>Coupon Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter coupon name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Discount (%)</Form.Label>
            <Form.Control
              type="number"
              placeholder="Enter discount percentage"
              value={discount}
              onChange={(e) => setDiscount(e.target.value === '' ? '' : Number(e.target.value))}
              min={0}
              max={100}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Expiry Date</Form.Label>
            <Form.Control
              type="date"
              value={expiryDate}
              onChange={(e) => setExpiryDate(e.target.value)}
              required
            />
          </Form.Group>

          <Form.Group className="mb-0">
            <Form.Label>Created By</Form.Label>
            <Form.Control
              type="text"
              value={createdBy}
              onChange={(e) => setCreatedBy(e.target.value)}
              required
            />
          </Form.Group>
        </Modal.Body>

        <Modal.Footer>
          <Button variant="secondary" onClick={onClose}>Cancel</Button>
          <Button type="submit" variant="primary">Create</Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
};

export default CreateCoupon;
