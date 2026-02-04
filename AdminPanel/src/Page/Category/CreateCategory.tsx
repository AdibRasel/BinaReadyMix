import React, { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';

interface Props {
  show: boolean;
  onClose: () => void;
  onCreate: (data: { name: string; createdBy: string; createdAt: string }) => void;
}

const CreateCategory: React.FC<Props> = ({ show, onClose, onCreate }) => {
  const [name, setName] = useState('');
  const [createdBy, setCreatedBy] = useState('Admin'); // you can make this dynamic later

  const handleSubmit = () => {
    if (!name.trim()) return;

    const newCategory = {
      name,
      createdBy,
      createdAt: new Date().toISOString().split('T')[0], // YYYY-MM-DD
    };

    // 🔁 API CALL CAN BE ADDED HERE

    onCreate(newCategory);
    setName('');
  };

  return (
    <Modal show={show} onHide={onClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>Create Category</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group controlId="categoryName">
            <Form.Label>Category Name</Form.Label>
            <Form.Control
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter category name"
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onClose}>Cancel</Button>
        <Button variant="primary" onClick={handleSubmit}>Create</Button>
      </Modal.Footer>
    </Modal>
  );
};

export default CreateCategory;
