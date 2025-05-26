import React, { useState, useEffect } from 'react';
import { Button, Input, Table, Modal, ModalHeader, ModalBody, ModalFooter, Form, FormGroup, Label } from 'reactstrap';
import { FaSearch, FaFileExcel, FaEdit, FaTrashAlt, FaBan, FaCheck } from 'react-icons/fa';
import * as XLSX from 'xlsx';
import ReactPaginate from 'react-paginate';
import "../../assets/css/Admin/TabUserManagement.css";
import { updateUser, deleteUser } from '../../service/admin';
import { useSelector } from 'react-redux';

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

function TabUserManagement({accountUser}) {
    const token = useSelector(state => state.auth.token);

    useEffect(() => {
      setUsers(accountUser || []);
    }, [accountUser]);

 
  const [users, setUsers] = useState(accountUser);
  const [search, setSearch] = useState('');
  const [filteredUsers, setFilteredUsers] = useState(users);
  const [modal, setModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [editUser, setEditUser] = useState({
    id: '',
    username: '',
    email: '',
    phone: '',
    role: '',
    address: '',
    birthday: ''
  });
  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 5;

  useEffect(() => {
    const results = users.filter(user =>
      user.username?.toLowerCase().includes(search.toLowerCase()) ||
      user.email?.toLowerCase().includes(search.toLowerCase()) ||
      user.phone?.includes(search)
    );
    setFilteredUsers(results);
  }, [search, users]);

  const offset = currentPage * itemsPerPage;
  const paginatedUsers = filteredUsers.slice(offset, offset + itemsPerPage);
  console.log("accountUser: ", paginatedUsers)
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
    setEditUser({
      id: user.userId,
      username: user.username,
      email: user.email,
      phone: user.phone,
      role: user.roles?.[0]?.name || '',
      address: user.address || '',
      birthday: user.birthday || ''
    });
    setSelectedUser(null);
    setModal(true);
  };

  const handleUpdateUser = async () => {
    try {
        const dataToUpdate = {
            userId: editUser.id,
            username: editUser.username,
            email: editUser.email,
            phone: editUser.phone,
            address: editUser.address,
            birthday: editUser.birthday,
        };
        console.log("Sending update data:", dataToUpdate);

        const result = await updateUser(dataToUpdate, token);

        if (result) {
            console.log("Update successful:", result);
            const updated = users.map(user =>
               user.userId === result.userId ? { ...user, ...result } : user
             );
             setUsers(updated);
             alert("Cập nhật người dùng thành công!");
        } else {
            console.error("Update failed or returned no data.");
            alert("Cập nhật người dùng thất bại.");
        }
    } catch (error) {
        console.error("Error updating user:", error);
        alert("Đã xảy ra lỗi khi cập nhật người dùng.");
    } finally {
        setModal(false);
    }
  };

   const handleDeleteUser = async (userId) => {
    const confirmDelete = window.confirm('Bạn có chắc muốn xóa người dùng này không?');
    if (confirmDelete) {
      console.log("Attempting to delete user with userId:", userId);
      try {
          const result = await deleteUser(userId);
          if (result) {
              console.log("Delete successful:", result);
              setUsers(users.filter(user => user.userId !== userId));
              alert("Xóa người dùng thành công!");
          } else {
              console.error("Delete failed or returned no data.");
              alert("Xóa người dùng thất bại.");
          }
      } catch (error) {
          console.error("Error deleting user:", error);
          if (error.response && error.response.status === 404) {
              alert("Không tìm thấy người dùng để xóa.");
          } else {
              alert("Đã xảy ra lỗi khi xóa người dùng.");
          }
      }
    }
  };

  return (
    <div className="user-table-container">
      <div className="text-center">
        <h3 className="page-title">Quản lý khách hàng</h3>
      </div>
      <div className="mb-4 d-flex justify-content-between">
        <div className="search-bar">
          <Input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Tìm kiếm theo tên, email, hoặc số điện thoại"
          />
          <FaSearch />
        </div>
        <Button className="export-btn" color="info" onClick={exportToExcel}>
          <FaFileExcel /> Xuất file
        </Button>
      </div>

      <Table striped bordered hover>
        <thead>
          <tr>
            <th>ID</th>
            <th>Tên đăng nhập</th>
            <th>Email</th>
            <th>Số điện thoại</th>
            <th>Vai trò</th>
            <th>Địa chỉ</th>
            <th>Ngày sinh</th>
            <th>Thao tác</th>  
          
          </tr>
        </thead>
        <tbody>
          {paginatedUsers.map(user => (
            <tr key={user.id}>
              <td className="user-id-cell" data-full-id={user.id}>{user.userId}</td>
              <td>{user.username}</td>
              <td>{user.email}</td>
              <td>{user.phone}</td>
              <td>{user.roles?.[0]?.name || 'N/A'}</td>
              <td>{user.address}</td>
              <td>{user.birthday}</td>
              <td className="d-flex gap-2">
                <Button color="warning" size="sm" onClick={() => handleEditUser(user)}><FaEdit /></Button>
                <Button color="danger" size="sm" onClick={() => handleDeleteUser(user.userId)}><FaTrashAlt /></Button>
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
        <Modal className="custom-modal" isOpen={modal && selectedUser} toggle={() => setModal(false)}>
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
        <Modal className="custom-modal" isOpen={modal} toggle={() => setModal(false)}>
          <ModalHeader toggle={() => setModal(false)}>Chỉnh sửa người dùng</ModalHeader>
          <ModalBody>
            <Form>
              <FormGroup>
                <Label for="id">ID</Label>
                <Input type="text" id="id" disabled value={editUser.id} onChange={(e) => setEditUser({ ...editUser, id: e.target.value })} />
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
                <Label for="address">Địa chỉ</Label>
                <Input type="text" id="address" value={editUser.address} onChange={(e) => setEditUser({ ...editUser, address: e.target.value })} />
              </FormGroup>
              <FormGroup>
                <Label for="birthday">Ngày sinh</Label>
                <Input type="date" id="birthday" value={editUser.birthday} onChange={(e) => setEditUser({ ...editUser, birthday: e.target.value })} />
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
