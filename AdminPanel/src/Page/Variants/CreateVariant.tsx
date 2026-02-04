import React, { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';

interface CreateVariantProps {
  show: boolean;
  onClose: () => void;
  onCreate: (variant: {
    name: string;
    createdBy: string;
    createdAt: string;
    values: string[];
  }) => void;
}

const CreateVariant: React.FC<CreateVariantProps> = ({ show, onClose, onCreate }) => {
  const [name, setName] = useState('');
  const [createdBy, setCreatedBy] = useState('Admin');
  const [variantType, setVariantType] = useState('');
  const [customValue, setCustomValue] = useState('');
  const [values, setValues] = useState<string[]>([]);

  const handleColorChange = (index: number, value: string) => {
    const updatedValues = [...values];
    updatedValues[index] = value;
    setValues(updatedValues);
  };

  const handleCustomAdd = () => {
    if (customValue && !values.includes(customValue)) {
      setValues([...values, customValue]);
      setCustomValue('');
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || values.length === 0) return alert('Please fill all fields');

    const newVariant = {
      name,
      createdBy,
      createdAt: new Date().toISOString().split('T')[0],
      values,
    };

    onCreate(newVariant);
    setName('');
    setCreatedBy('Admin');
    setVariantType('');
    setValues([]);
  };

  return (
    <Modal show={show} onHide={onClose} size="lg" centered>
      <Modal.Header closeButton>
        <Modal.Title>Create Variant</Modal.Title>
      </Modal.Header>

      <Form onSubmit={handleSubmit}>
        <Modal.Body>
          {/* Variant Name */}
          <Form.Group className="mb-3">
            <Form.Label>Variant Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Variant Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </Form.Group>

          {/* Variant Type (Only Color & Custom) */}
          <Form.Group className="mb-3">
            <Form.Label>Variant Type</Form.Label>
            <Form.Select
              value={variantType}
              onChange={(e) => {
                setVariantType(e.target.value);
                setValues([]);
              }}
              required
            >
              <option value="">Select Type</option>
              <option value="color">Color</option>
              <option value="custom">Custom</option>
            </Form.Select>
          </Form.Group>

          {/* Color Inputs */}
          {variantType === 'color' && (
            <Form.Group className="mb-3">
              <Form.Label>Select 4 Colors</Form.Label>
              <div className="d-flex flex-wrap gap-3">
                {[0, 1, 2, 3].map((index) => (
                  <input
                    key={index}
                    type="color"
                    value={values[index] || '#000000'}
                    onChange={(e) => handleColorChange(index, e.target.value)}
                    style={{ width: '60px', height: '40px', border: 'none', cursor: 'pointer' }}
                  />
                ))}
              </div>
            </Form.Group>
          )}

          {/* Custom Inputs */}
          {variantType === 'custom' && (
            <Form.Group className="mb-3">
              <Form.Label>Add Custom Values</Form.Label>
              <div className="d-flex gap-2 mb-2">
                <Form.Control
                  type="text"
                  placeholder="Custom value"
                  value={customValue}
                  onChange={(e) => setCustomValue(e.target.value)}
                />
                <Button variant="secondary" onClick={handleCustomAdd}>Add</Button>
              </div>
              <div className="mt-2">
                {values.map((v, i) => (
                  <span key={i} className="badge bg-primary me-1">{v}</span>
                ))}
              </div>
            </Form.Group>
          )}

          {/* Created By */}
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

export default CreateVariant;
