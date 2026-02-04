import React, { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';

interface CreateBrandProps {
  show: boolean;
  onClose: () => void;
  onCreate: (brand: {
    name: string;
    category: string;
    createdBy: string;
    createdAt: string;
  }) => void;
}

const CreateBrand: React.FC<CreateBrandProps> = ({ show, onClose, onCreate }) => {
  const [name, setName] = useState('');
  const [category, setCategory] = useState('');
  const [createdBy, setCreatedBy] = useState('Admin');

  const categories = ['Electronics', 'Fashion', 'Books']; // Static list

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const newBrand = {
      name,
      category,
      createdBy,
      createdAt: new Date().toISOString().split('T')[0],
    };

    onCreate(newBrand);
    setName('');
    setCategory('');
    setCreatedBy('Admin');
  };

  return (
    <Modal show={show} onHide={onClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>Create Brand</Modal.Title>
      </Modal.Header>

      <Form onSubmit={handleSubmit}>
        <Modal.Body>
          <Form.Group className="mb-3">
            <Form.Label>Category</Form.Label>
            <Form.Select value={category} onChange={(e) => setCategory(e.target.value)} required>
              <option value="">Select Category</option>
              {categories.map((cat, index) => (
                <option key={index} value={cat}>{cat}</option>
              ))}
            </Form.Select>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Brand Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Brand name"
              value={name}
              onChange={(e) => setName(e.target.value)}
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

export default CreateBrand;
