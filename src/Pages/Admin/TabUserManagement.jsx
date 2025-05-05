import React, { useState, useEffect } from 'react';
import { Button, Input, Table, Modal, ModalHeader, ModalBody, ModalFooter, Form, FormGroup, Label } from 'reactstrap';
import { FaSearch, FaFileExcel, FaEdit, FaTrashAlt, FaBan, FaCheck } from 'react-icons/fa';
import * as XLSX from 'xlsx';
import ReactPaginate from 'react-paginate';

const initialUsers = [
  { id: 1, name: 'John Doe', email: 'john.doe@example.com', phone: '123456789', role: 'Quản trị viên', status: 'Hoạt động' },
  { id: 2, name: 'Jane Smith', email: 'jane.smith@example.com', phone: '987654321', role: 'Người dùng', status: 'Vô hiệu hóa' },
  { id: 3, name: 'Alice Brown', email: 'alice.brown@example.com', phone: '555555555', role: 'Người dùng', status: 'Hoạt động' },
  { id: 4, name: 'Bob White', email: 'bob.white@example.com', phone: '444444444', role: 'Quản trị viên', status: 'Vô hiệu hóa' },
  { id: 5, name: 'Charlie Black', email: 'charlie.black@example.com', phone: '333333333', role: 'Người dùng', status: 'Hoạt động' },
  { id: 6, name: 'David Blue', email: 'david.blue@example.com', phone: '222222222', role: 'Quản trị viên', status: 'Vô hiệu hóa' },
  { id: 7, name: 'Eva Green', email: 'eva.green@example.com', phone: '111111111', role: 'Người dùng', status: 'Hoạt động' },
  { id: 8, name: 'Frank Red', email: 'frank.red@example.com', phone: '999999999', role: 'Quản trị viên', status: 'Hoạt động' },
  { id: 9, name: 'George Yellow', email: 'george.yellow@example.com', phone: '888888888', role: 'Người dùng', status: 'Hoạt động' },
  { id: 10, name: 'Helen Pink', email: 'helen.pink@example.com', phone: '777777777', role: 'Quản trị viên', status: 'Vô hiệu hóa' },
];

function TabUserManagement() {
  const [users, setUsers] = useState(initialUsers);
  const [search, setSearch] = useState('');
  const [filteredUsers, setFilteredUsers] = useState(users);
  const [modal, setModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [editUser, setEditUser] = useState({
    id: '',
    name: '',
    email: '',
    phone: '',
    role: '',
    status: ''
  });
  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 5;

  useEffect(() => {
    const results = users.filter(user =>
      user.name.toLowerCase().includes(search.toLowerCase()) ||
      user.email.toLowerCase().includes(search.toLowerCase()) ||
      user.phone.includes(search)
    );
    setFilteredUsers(results);
  }, [search, users]);

  const offset = currentPage * itemsPerPage;
  const paginatedUsers = filteredUsers.slice(offset, offset + itemsPerPage);

  const handlePageChange = (selectedPage) => {
    setCurrentPage(selectedPage.selected);
  };

  const exportToExcel = () => {
    const wb = XLSX.utils.book_new();
    const ws = XLSX.utils.json_to_sheet(filteredUsers);
    XLSX.utils.book_append_sheet(wb, ws, 'Danh sách người dùng');
    XLSX.writeFile(wb, 'DanhSachNguoiDung.xlsx');
  };

  const toggleStatusModal = (user) => {
    setSelectedUser(user);
    setModal(true);
  };

  const toggleUserStatus = () => {
    const updated = users.map(user =>
      user.id === selectedUser.id
        ? { ...user, status: user.status === 'Hoạt động' ? 'Vô hiệu hóa' : 'Hoạt động' }
        : user
    );
    setUsers(updated);
    setModal(false);
  };

  const handleEditUser = (user) => {
    setEditUser(user);
    setSelectedUser(null);
    setModal(true);
  };

  const handleUpdateUser = () => {
    const updated = users.map(user =>
      user.id === editUser.id ? editUser : user
    );
    setUsers(updated);
    setModal(false);
  };

  const handleDeleteUser = (id) => {
    const confirmDelete = window.confirm('Bạn có chắc muốn xóa người dùng này không?');
    if (confirmDelete) {
      setUsers(users.filter(user => user.id !== id));
    }
  };

  return (
    <div>
      <div className="text-center">
        <h3 className="page-title" style={{ color: 'black', fontWeight: 'bold', marginBottom: '30px' }}>Quản lý khách hàng</h3>
      </div>
      <div className="mb-4 d-flex justify-content-between">
        <div style={{ position: 'relative', width: '60%' }}>
          <Input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Tìm kiếm theo tên, email, hoặc số điện thoại"
            style={{ paddingLeft: '30px' }}
          />
          <FaSearch style={{ position: 'absolute', left: '10px', top: '50%', transform: 'translateY(-50%)', color: '#888' }} />
        </div>
        <Button color="info" onClick={exportToExcel}>
          <FaFileExcel /> Xuất file
        </Button>
      </div>

      <Table striped bordered hover>
        <thead>
          <tr>
            <th>ID</th>
            <th>Tên</th>
            <th>Email</th>
            <th>Số điện thoại</th>
            <th>Vai trò</th>
            <th>Trạng thái</th>
            <th>Thao tác</th>
          </tr>
        </thead>
        <tbody>
          {paginatedUsers.map(user => (
            <tr key={user.id}>
              <td>{user.id}</td>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>{user.phone}</td>
              <td>{user.role}</td>
              <td>{user.status}</td>
              <td className="d-flex gap-2">
                <Button color="warning" size="sm" onClick={() => handleEditUser(user)}><FaEdit /></Button>
                <Button color="danger" size="sm" onClick={() => handleDeleteUser(user.id)}><FaTrashAlt /></Button>
                <Button
                  color={user.status === 'Hoạt động' ? 'secondary' : 'success'}
                  size="sm"
                  onClick={() => toggleStatusModal(user)}
                >
                  {user.status === 'Hoạt động' ? <FaBan /> : <FaCheck />}
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      <ReactPaginate
        previousLabel={'<<'}
        nextLabel={'>>'}
        breakLabel={'...'}
        pageCount={Math.ceil(filteredUsers.length / itemsPerPage)}
        marginPagesDisplayed={2}
        pageRangeDisplayed={5}
        onPageChange={handlePageChange}
        containerClassName={'pagination'}
        activeClassName={'active'}
        pageClassName={'page-item'}
        pageLinkClassName={'page-link'}
        previousClassName={'page-item'}
        previousLinkClassName={'page-link'}
        nextClassName={'page-item'}
        nextLinkClassName={'page-link'}
      />

      {/* Modal kích hoạt / vô hiệu hóa */}
      {selectedUser && (
        <Modal isOpen={modal && selectedUser} toggle={() => setModal(false)}>
          <ModalHeader toggle={() => setModal(false)}>
            {selectedUser.status === 'Hoạt động' ? 'Vô hiệu hóa người dùng' : 'Kích hoạt người dùng'}
          </ModalHeader>
          <ModalBody>
            Bạn có chắc muốn {selectedUser.status === 'Hoạt động' ? 'vô hiệu hóa' : 'kích hoạt'} người dùng <strong>{selectedUser.name}</strong>?
          </ModalBody>
          <ModalFooter>
            <Button color="secondary" onClick={() => setModal(false)}>Hủy</Button>
            <Button color={selectedUser.status === 'Hoạt động' ? 'danger' : 'success'} onClick={toggleUserStatus}>
              {selectedUser.status === 'Hoạt động' ? 'Vô hiệu hóa' : 'Kích hoạt'}
            </Button>
          </ModalFooter>
        </Modal>
      )}

      {/* Modal chỉnh sửa */}
      {!selectedUser && (
        <Modal isOpen={modal} toggle={() => setModal(false)}>
          <ModalHeader toggle={() => setModal(false)}>Chỉnh sửa người dùng</ModalHeader>
          <ModalBody>
            <Form>
              <FormGroup>
                <Label for="name">Tên</Label>
                <Input type="text" id="name" value={editUser.name} onChange={(e) => setEditUser({ ...editUser, name: e.target.value })} />
              </FormGroup>
              <FormGroup>
                <Label for="email">Email</Label>
                <Input type="email" id="email" value={editUser.email} onChange={(e) => setEditUser({ ...editUser, email: e.target.value })} />
              </FormGroup>
              <FormGroup>
                <Label for="phone">Số điện thoại</Label>
                <Input type="text" id="phone" value={editUser.phone} onChange={(e) => setEditUser({ ...editUser, phone: e.target.value })} />
              </FormGroup>
              <FormGroup>
                <Label for="role">Vai trò</Label>
                <Input type="select" id="role" value={editUser.role} onChange={(e) => setEditUser({ ...editUser, role: e.target.value })}>
                  <option>Quản trị viên</option>
                  <option>Người dùng</option>
                </Input>
              </FormGroup>
              <FormGroup>
                <Label for="status">Trạng thái</Label>
                <Input type="select" id="status" value={editUser.status} onChange={(e) => setEditUser({ ...editUser, status: e.target.value })}>
                  <option>Hoạt động</option>
                  <option>Vô hiệu hóa</option>
                </Input>
              </FormGroup>
            </Form>
          </ModalBody>
          <ModalFooter>
            <Button color="secondary" onClick={() => setModal(false)}>Hủy</Button>
            <Button color="primary" onClick={handleUpdateUser}>Cập nhật</Button>
          </ModalFooter>
        </Modal>
      )}
    </div>
  );
}

export default TabUserManagement;
