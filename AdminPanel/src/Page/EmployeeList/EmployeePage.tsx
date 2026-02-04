import React, { useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import DateAndTime from "../../Components/DateAndTime/DateAndTime";
import { Link } from 'react-router-dom';

interface Employee {
  empId: number;
  name: string;
  department: string;
  position: string;
  salary: number;
  branchCity: string;
  iqamaNo: string;
  joiningYear: number;
  status: string;
}

const initialEmployees: Employee[] = [
  { empId: 3001, name: "Rasal Hossain", department: "IT", position: "Software developers", salary: 2600, branchCity: "Riyadh", iqamaNo: "IQA112233", joiningYear: 2026, status: "Active" },
  { empId: 3002, name: "Rafiq Islam", department: "Cleaning", position: "Cleaner", salary: 2300, branchCity: "Jeddah", iqamaNo: "IQA223344", joiningYear: 2022, status: "Active" },
  { empId: 3003, name: "Jamal Hossain", department: "Security", position: "Security Guard", salary: 3000, branchCity: "Riyadh", iqamaNo: "IQA334455", joiningYear: 2021, status: "Active" },
];

const EmployeePage = () => {
  const [employees, setEmployees] = useState<Employee[]>(initialEmployees);
  const [searchTerm, setSearchTerm] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [editEmployeeId, setEditEmployeeId] = useState<number | null>(null);
  const [newEmployee, setNewEmployee] = useState<Employee>({
    empId: 0,
    name: "",
    department: "",
    position: "",
    salary: 0,
    branchCity: "",
    iqamaNo: "",
    joiningYear: new Date().getFullYear(),
    status: "Active",
  });

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const filteredEmployees = employees.filter((emp) => {
    const term = searchTerm.toLowerCase();
    return (
      emp.empId.toString().includes(term) ||
      emp.name.toLowerCase().includes(term) ||
      emp.department.toLowerCase().includes(term) ||
      emp.position.toLowerCase().includes(term) ||
      emp.branchCity.toLowerCase().includes(term)
    );
  });

  const handleModalOpen = (employee?: Employee) => {
    if (employee) {
      setEditEmployeeId(employee.empId);
      setNewEmployee(employee);
    } else {
      setEditEmployeeId(null);
      setNewEmployee({
        empId: 0,
        name: "",
        department: "",
        position: "",
        salary: 0,
        branchCity: "",
        iqamaNo: "",
        joiningYear: new Date().getFullYear(),
        status: "Active",
      });
    }
    setShowModal(true);
  };
  const handleModalClose = () => setShowModal(false);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setNewEmployee((prev) => ({
      ...prev,
      [name]: name === "salary" || name === "joiningYear" ? Number(value) : value,
    }));
  };

  const handleAddOrUpdateEmployee = () => {
    if (editEmployeeId !== null) {
      // Update existing employee
      setEmployees((prev) =>
        prev.map((emp) => (emp.empId === editEmployeeId ? newEmployee : emp))
      );
    } else {
      // Add new employee
      setEmployees((prev) => [
        ...prev,
        { ...newEmployee, empId: prev.length ? prev[prev.length - 1].empId + 1 : 3001 },
      ]);
    }
    setShowModal(false);
    setEditEmployeeId(null);
    setNewEmployee({
      empId: 0,
      name: "",
      department: "",
      position: "",
      salary: 0,
      branchCity: "",
      iqamaNo: "",
      joiningYear: new Date().getFullYear(),
      status: "Active",
    });
  };

  const handleDeleteEmployee = (empId: number) => {
    if (window.confirm("Are you sure you want to delete this employee?")) {
      setEmployees((prev) => prev.filter((emp) => emp.empId !== empId));
    }
  };

  return (
    <div className="">
      {/* Breadcrumb */}
      <div className="d-flex justify-content-between align-items-center mb-4">
        <nav aria-label="breadcrumb">
          <ol className="breadcrumb mb-0">
            <li className="breadcrumb-item"><Link to="/EmployeeList">Employees</Link></li>
            <li className="breadcrumb-item active" aria-current="page">Employees List</li>
          </ol>
        </nav>
        <div className="TodayDate">
          <DateAndTime />
        </div>
      </div>

      <div className="d-flex justify-content-between mb-3">
        <h3>Bina ReadyMix Employees</h3>
        <button
          className="btn btn-primary"
          style={{ backgroundColor: 'var(--ColorTwo)', borderColor: 'var(--ColorTwo)' }}
          onClick={() => handleModalOpen()}
        >
          Add New Employee
        </button>
      </div>

      <Form.Control
        type="text"
        placeholder="Search by Emp ID, Name, Department, Position, Branch City"
        className="mb-3"
        value={searchTerm}
        onChange={handleSearch}
      />

      <div className="table-responsive">
        <table className="table table-striped table-bordered">
          <thead style={{ backgroundColor: 'var(--ColorTwo)', color: 'white' }} className="table-dark">
            <tr>
              <th>Emp ID</th>
              <th>Name</th>
              <th>Department</th>
              <th>Position</th>
              <th>Salary (SAR)</th>
              <th>Branch City</th>
              <th>Iqama No</th>
              <th>Joining Year</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredEmployees.map((emp, index) => (
              <tr key={emp.empId} style={{ backgroundColor: index % 2 === 0 ? '#f2f2f2' : 'white' }}>
                <td>{emp.empId}</td>
                <td>{emp.name}</td>
                <td>{emp.department}</td>
                <td>{emp.position}</td>
                <td>{emp.salary}</td>
                <td>{emp.branchCity}</td>
                <td>{emp.iqamaNo}</td>
                <td>{emp.joiningYear}</td>
                <td>{emp.status}</td>
                <td>
                  <Button
                    size="sm"
                    variant="warning"
                    className="me-2"
                    onClick={() => handleModalOpen(emp)}
                  >
                    Edit
                  </Button>
                  <Button
                    size="sm"
                    variant="danger"
                    onClick={() => handleDeleteEmployee(emp.empId)}
                  >
                    Delete
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>





     <Modal 
  show={showModal} 
  onHide={handleModalClose} 
  centered
  size="lg"
  backdrop="static"
  keyboard={false}
  className="employee-modal"
>
  <Modal.Header closeButton style={{ borderBottom: "1px solid #dee2e6" }}>
    <Modal.Title style={{ fontWeight: 600, fontSize: "1.4rem", color: "#343a40" }}>
      {editEmployeeId !== null ? "Edit Employee" : "Add New Employee"}
    </Modal.Title>
  </Modal.Header>

  <Modal.Body style={{ backgroundColor: "#f9f9f9", padding: "2rem" }}>
    <Form>
      <div className="row g-3">
        <div className="col-md-6">
          <Form.Group>
            <Form.Label>Name</Form.Label>
            <Form.Control 
              name="name" 
              value={newEmployee.name} 
              onChange={handleInputChange} 
              placeholder="Enter employee name"
              className="shadow-sm"
            />
          </Form.Group>
        </div>

        <div className="col-md-6">
          <Form.Group>
            <Form.Label>Department</Form.Label>
            <Form.Control 
              name="department" 
              value={newEmployee.department} 
              onChange={handleInputChange} 
              placeholder="Enter department"
              className="shadow-sm"
            />
          </Form.Group>
        </div>

        <div className="col-md-6">
          <Form.Group>
            <Form.Label>Position</Form.Label>
            <Form.Control 
              name="position" 
              value={newEmployee.position} 
              onChange={handleInputChange} 
              placeholder="Enter position"
              className="shadow-sm"
            />
          </Form.Group>
        </div>

        <div className="col-md-6">
          <Form.Group>
            <Form.Label>Salary (SAR)</Form.Label>
            <Form.Control 
              type="number" 
              name="salary" 
              value={newEmployee.salary} 
              onChange={handleInputChange} 
              placeholder="Enter salary"
              className="shadow-sm"
            />
          </Form.Group>
        </div>

        <div className="col-md-6">
          <Form.Group>
            <Form.Label>Branch City</Form.Label>
            <Form.Control 
              name="branchCity" 
              value={newEmployee.branchCity} 
              onChange={handleInputChange} 
              placeholder="Enter branch city"
              className="shadow-sm"
            />
          </Form.Group>
        </div>

        <div className="col-md-6">
          <Form.Group>
            <Form.Label>Iqama No</Form.Label>
            <Form.Control 
              name="iqamaNo" 
              value={newEmployee.iqamaNo} 
              onChange={handleInputChange} 
              placeholder="Enter Iqama number"
              className="shadow-sm"
            />
          </Form.Group>
        </div>

        <div className="col-md-6">
          <Form.Group>
            <Form.Label>Joining Year</Form.Label>
            <Form.Control 
              type="number" 
              name="joiningYear" 
              value={newEmployee.joiningYear} 
              onChange={handleInputChange} 
              placeholder="Enter joining year"
              className="shadow-sm"
            />
          </Form.Group>
        </div>

        <div className="col-md-6">
          <Form.Group>
            <Form.Label>Status</Form.Label>
            <Form.Select 
              name="status" 
              value={newEmployee.status} 
              onChange={handleInputChange} 
              className="shadow-sm"
            >
              <option>Active</option>
              <option>Inactive</option>
            </Form.Select>
          </Form.Group>
        </div>
      </div>
    </Form>
  </Modal.Body>

  <Modal.Footer style={{ borderTop: "1px solid #dee2e6", justifyContent: "space-between" }}>
    <Button variant="outline-secondary" onClick={handleModalClose} style={{ borderRadius: "0.4rem" }}>
      Close
    </Button>
    <Button 
      variant="primary" 
      onClick={handleAddOrUpdateEmployee} 
      style={{ backgroundColor: "#007bff", borderColor: "#007bff", borderRadius: "0.4rem", padding: "0.5rem 1.5rem" }}
    >
      {editEmployeeId !== null ? "Update Employee" : "Add Employee"}
    </Button>
  </Modal.Footer>
</Modal>










    </div>
  );
};

export default EmployeePage;
