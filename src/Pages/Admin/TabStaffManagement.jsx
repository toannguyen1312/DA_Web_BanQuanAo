import React, { useState, useEffect } from 'react';
import { Button, Input, Table, Modal, ModalHeader, ModalBody, ModalFooter, Form, FormGroup, Label } from 'reactstrap';
import { FaSearch, FaFileExcel, FaUserPlus, FaEdit, FaTrashAlt, FaBan, FaCheck } from 'react-icons/fa';
import * as XLSX from 'xlsx';
import ReactPaginate from 'react-paginate';
import '../../assets/css/Admin/Tabstaff.css';

const initialUsers = [
  { id: 1, name: 'John Doe', email: 'john.doe@example.com', phone: '123456789', role: 'Quản trị viên', status: 'Hoạt động' },
];

function TabStaffManagement() {
  const [users, setUsers] = useState(initialUsers);
  const [search, setSearch] = useState('');
  const [filteredUsers, setFilteredUsers] = useState(users);
  const [modal, setModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [editUser, setEditUser] = useState(null);
  const [newUser, setNewUser] = useState({ name: '', email: '', phone: '', role: 'Người dùng', status: 'Hoạt động' });
  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 5;

  useEffect(() => {
    const searchResults = users.filter(user =>
      user.name.toLowerCase().includes(search.toLowerCase()) ||
      user.email.toLowerCase().includes(search.toLowerCase()) ||
      user.phone.includes(search)
    );
    setFilteredUsers(searchResults);
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
    XLSX.writeFile(wb, 'DanhSachNhanVien.xlsx');
  };

  const handleDeleteUser = (id) => {
    if (window.confirm('Bạn có chắc chắn muốn xóa người dùng này không?')) {
      setUsers(users.filter(user => user.id !== id));
    }
  };

  const handleEditUser = (user) => {
    setEditUser(user);
    setNewUser(user);
    setModal(true);
  };

  const toggleModal = () => {
    setModal(!modal);
    if (modal) {
      setEditUser(null);
      setNewUser({ name: '', email: '', phone: '', role: 'Người dùng', status: 'Hoạt động' });
    }
  };

  const handleAddUser = () => {
    if (editUser) {
      const updated = users.map(user => user.id === editUser.id ? newUser : user);
      setUsers(updated);
    } else {
      setUsers([...users, { ...newUser, id: users.length + 1 }]);
    }
    setModal(false);
    setEditUser(null);
    setNewUser({ name: '', email: '', phone: '', role: 'Người dùng', status: 'Hoạt động' });
  };

  const toggleStatus = (id) => {
    const updated = users.map(user =>
      user.id === id ? { ...user, status: user.status === 'Hoạt động' ? 'Vô hiệu hóa' : 'Hoạt động' } : user
    );
    setUsers(updated);
  };

  return (
    <div>
      <div className="text-center">
        <h3 className="page-title" style={{ color: 'black', fontWeight: 'bold', marginBottom: '30px' }}>Quản lý nhân viên</h3>
      </div>

      <div className="mb-4 d-flex justify-content-between">
        <Button color="success" onClick={toggleModal}>
          <FaUserPlus /> Thêm Người Dùng
        </Button>
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
                  onClick={() => toggleStatus(user.id)}
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

      {/* Modal thêm / chỉnh sửa nhân viên */}
      <Modal isOpen={modal} toggle={toggleModal}>
        <ModalHeader toggle={toggleModal}>{editUser ? 'Chỉnh sửa người dùng' : 'Thêm Người Dùng'}</ModalHeader>
        <ModalBody>
          <Form>
            <FormGroup>
              <Label for="name">Tên</Label>
              <Input
                type="text"
                id="name"
                value={newUser.name}
                onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
                placeholder="Nhập tên"
                required
              />
            </FormGroup>
            <FormGroup>
              <Label for="email">Email</Label>
              <Input
                type="email"
                id="email"
                value={newUser.email}
                onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
                placeholder="Nhập email"
                required
              />
            </FormGroup>
            <FormGroup>
              <Label for="phone">Số điện thoại</Label>
              <Input
                type="text"
                id="phone"
                value={newUser.phone}
                onChange={(e) => setNewUser({ ...newUser, phone: e.target.value })}
                placeholder="Nhập số điện thoại"
                required
              />
            </FormGroup>
            <FormGroup>
              <Label for="role">Vai trò</Label>
              <Input
                type="select"
                id="role"
                value={newUser.role}
                onChange={(e) => setNewUser({ ...newUser, role: e.target.value })}
              >
                <option>Người dùng</option>
                <option>Quản trị viên</option>
              </Input>
            </FormGroup>
            <FormGroup>
              <Label for="status">Trạng thái</Label>
              <Input
                type="select"
                id="status"
                value={newUser.status}
                onChange={(e) => setNewUser({ ...newUser, status: e.target.value })}
              >
                <option>Hoạt động</option>
                <option>Vô hiệu hóa</option>
              </Input>
            </FormGroup>
          </Form>
        </ModalBody>
        <ModalFooter>
          <Button color="secondary" onClick={toggleModal}>Hủy</Button>
          <Button color="primary" onClick={handleAddUser}>{editUser ? 'Cập nhật' : 'Thêm Người Dùng'}</Button>
        </ModalFooter>
      </Modal>
    </div>
  );
}

export default TabStaffManagement;
