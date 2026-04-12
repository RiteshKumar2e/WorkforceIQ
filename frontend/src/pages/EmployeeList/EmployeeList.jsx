import React, { useState } from 'react'
import Navbar from '../../components/common/Navbar/Navbar'
import Sidebar from '../../components/common/Sidebar/Sidebar'
import Footer from '../../components/common/Footer/Footer'
import Card from '../../components/common/Card/Card'
import Table from '../../components/common/Table/Table'
import Button from '../../components/common/Button/Button'
import Input from '../../components/common/Input/Input'
import './EmployeeList.css'

const EmployeeList = () => {
  const [searchTerm, setSearchTerm] = useState('')
  
  const employees = [
    { id: 1, name: 'Rajesh Kumar', empId: 'E001', department: 'Production', role: 'Operator', status: 'Active' },
    { id: 2, name: 'Priya Singh', empId: 'E002', department: 'Quality', role: 'Inspector', status: 'Active' },
    { id: 3, name: 'Amit Patel', empId: 'E003', department: 'Maintenance', role: 'Technician', status: 'Active' },
    { id: 4, name: 'Neha Gupta', empId: 'E004', department: 'HR', role: 'Specialist', status: 'Active' },
    { id: 5, name: 'Vikesh Sharma', empId: 'E005', department: 'Production', role: 'Supervisor', status: 'Active' },
  ]

  const columns = [
    { key: 'name', label: 'Name' },
    { key: 'empId', label: 'Employee ID' },
    { key: 'department', label: 'Department' },
    { key: 'role', label: 'Role' },
    { key: 'status', label: 'Status', render: (status) => <span style={{color: '#22c55e', fontWeight: '600'}}>{status}</span> },
  ]

  const handleAddEmployee = () => {
    // TODO: Open modal to add new employee
  }

  return (
    <div className="dashboard-layout">
      <Navbar />
      <div className="main-layout">
        <Sidebar />
        <div className="content">
          <div className="page-header">
            <h1>Employees</h1>
            <Button variant="primary" onClick={handleAddEmployee}>+ Add Employee</Button>
          </div>

          <Card>
            <Input
              placeholder="Search by name, ID, or department..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <div style={{marginTop: '1.5rem'}}>
              <Table columns={columns} data={employees} />
            </div>
          </Card>
        </div>
      </div>
      <Footer />
    </div>
  )
}

export default EmployeeList
