import React, { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';

interface CreateSubCategoryProps {
  show: boolean;
  onClose: () => void;
  onCreate: (subCategory: {
    name: string;
    category: string;
    createdBy: string;
    createdAt: string;
  }) => void;
}

const CreateSubCategory: React.FC<CreateSubCategoryProps> = ({ show, onClose, onCreate }) => {
  const [name, setName] = useState('');
  const [category, setCategory] = useState('');
  const [createdBy, setCreatedBy] = useState('Admin');

  // মেইন ক্যাটাগরি লিস্ট
  const mainCategories = ['Electronics', 'Fashion', 'Books'];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !category) return alert('Please fill all fields');

    const newSubCategory = {
      name,
      category,
      createdBy,
      createdAt: new Date().toISOString().split('T')[0],
    };

    onCreate(newSubCategory);
    setName('');
    setCategory('');
  };

  return (
    <Modal show={show} onHide={onClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>Create Sub Category</Modal.Title>
      </Modal.Header>
      <Form onSubmit={handleSubmit}>
        <Modal.Body>
          <Form.Group className="mb-3">
            <Form.Label>Main Category</Form.Label>
            <Form.Select value={category} onChange={(e) => setCategory(e.target.value)} required>
              <option value="">-- Select Category --</option>
              {mainCategories.map((cat, index) => (
                <option key={index} value={cat}>{cat}</option>
              ))}
            </Form.Select>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Sub Category Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter sub category name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3">
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

export default CreateSubCategory;
