// import React, { useState, useEffect } from 'react';
// import { Button, Input, Table, Modal, ModalHeader, ModalBody, ModalFooter, Form, FormGroup, Label } from 'reactstrap';
// import { FaSearch, FaFileExcel, FaUserPlus } from 'react-icons/fa';
// import * as XLSX from 'xlsx';
// import ReactPaginate from 'react-paginate';
// import '../../assets/css/Admin/Tabstaff.css';

// const initialUsers = [
//   { id: 1, name: 'John Doe', email: 'john.doe@example.com', phone: '123456789', role: 'Quản trị viên', status: 'Hoạt động' },
// ];

// function TabHistoryManagament() {
//   const [users, setUsers] = useState(initialUsers);
//   const [search, setSearch] = useState('');
//   const [filteredUsers, setFilteredUsers] = useState(users);
//   const [modal, setModal] = useState(false);
//   const [selectedUser, setSelectedUser] = useState(null);
//   const [newUser, setNewUser] = useState({ name: '', email: '', phone: '', role: 'Người dùng', status: 'Hoạt động' });
//   const [passwordType, setPasswordType] = useState('password');
//   const [currentPage, setCurrentPage] = useState(0);
//   const itemsPerPage = 5;

//   // Lọc người dùng
//   useEffect(() => {
//     const searchResults = users.filter(user =>
//       user.name.toLowerCase().includes(search.toLowerCase()) ||
//       user.email.toLowerCase().includes(search.toLowerCase()) ||
//       user.phone.includes(search)
//     );
//     setFilteredUsers(searchResults); // cập nhật lại
//   }, [search, users]);

//   // Phân trang
//   const offset = currentPage * itemsPerPage;
//   const paginatedUsers = filteredUsers.slice(offset, offset + itemsPerPage);

//   const handlePageChange = (selectedPage) => {
//     setCurrentPage(selectedPage.selected);
//   };

//   const exportToExcel = () => {
//     const wb = XLSX.utils.book_new();
//     const ws = XLSX.utils.json_to_sheet(filteredUsers);
//     XLSX.utils.book_append_sheet(wb, ws, 'Danh sách người dùng');
//     XLSX.writeFile(wb, 'DanhSáchNguoiDung.xlsx');
//   };

//   // Xử lý thêm người dùng
//   const handleAddUser = () => {
//     setUsers([...users, { ...newUser, id: users.length + 1 }]); // Thêm người dùng mới
//     setModal(false);
//     setNewUser({ name: '', email: '', phone: '', role: 'Người dùng', status: 'Hoạt động' }); // Reset form
//   };

//   // Xử lý mở modal
//   const toggleModal = () => {
//     setModal(!modal);
//   };

//   return (
//     <div>
//       <div className="text-center">
//         <h3 className="page-title" style={{ color: 'black', fontWeight: 'bold', marginBottom: '30px' }}>Lịch sử hoạt động</h3>
//       </div>
      
  
//       <div className="mb-4 d-flex justify-content-between">
//         <Button color="success" onClick={toggleModal}>
//           <FaUserPlus /> Thêm Người Dùng
//         </Button>
//         <div style={{ position: 'relative', width: '60%' }}>
//           <Input
//             type="text"
//             value={search}
//             onChange={(e) => setSearch(e.target.value)}
//             placeholder="Tìm kiếm theo tên, email, hoặc số điện thoại"
//             style={{
//               display: 'inline-block',
//               paddingLeft: '30px',
//             }}
//           />
//           <FaSearch 
//             style={{
//               position: 'absolute',
//               left: '10px',
//               top: '50%',
//               transform: 'translateY(-50%)',
//               color: '#888',
//             }}
//           />
//         </div>
//         <Button color="info" onClick={exportToExcel}>
//           <FaFileExcel /> Xuất file
//         </Button>
//       </div>

   
//       <Table striped bordered hover>
//         <thead>
//           <tr>
//             <th>ID</th>
//             <th>Tên</th>
//             <th>Email</th>
//             <th>Số điện thoại</th>
//             <th>Vai trò</th>
//             <th>Trạng thái</th>
//             <th>Thao tác</th>
//           </tr>
//         </thead>
//         <tbody>
//           {paginatedUsers.map(user => (
//             <tr key={user.id}>
//               <td>{user.id}</td>
//               <td>{user.name}</td>
//               <td>{user.email}</td>
//               <td>{user.phone}</td>
//               <td>{user.role}</td>
//               <td>{user.status}</td>
//               <td>
//                 <Button
//                   color={user.status === 'Hoạt động' ? 'warning' : 'success'}
//                 >
//                   <i className={`fas ${user.status === 'Hoạt động' ? 'fa-ban' : 'fa-check'}`}></i>
//                 </Button>
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </Table>

//       {/* Pagination */}
//       <ReactPaginate
//         previousLabel={'<<'}
//         nextLabel={'>>'}
//         breakLabel={'...'}
//         pageCount={Math.ceil(filteredUsers.length / itemsPerPage)}
//         marginPagesDisplayed={2}
//         pageRangeDisplayed={5}
//         onPageChange={handlePageChange}
//         containerClassName={'pagination'}
//         activeClassName={'active'}
//         pageClassName={'page-item'}
//         pageLinkClassName={'page-link'}
//         previousClassName={'page-item'}
//         previousLinkClassName={'page-link'}
//         nextClassName={'page-item'}
//         nextLinkClassName={'page-link'}
//       />

//      {/* Modal add thên nv */}
//      <Modal isOpen={modal} toggle={toggleModal}>
//         <ModalHeader toggle={toggleModal}>Thêm Người Dùng</ModalHeader>
//         <ModalBody>
//           <Form>
//             <FormGroup>
//               <Label for="name">Tên</Label>
//               <Input
//                 type="text"
//                 id="name"
//                 value={newUser.name}
//                 onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
//                 placeholder="Nhập tên"
//                 required
//               />
//             </FormGroup>
//             <FormGroup>
//               <Label for="email">Email</Label>
//               <Input
//                 type="email"
//                 id="email"
//                 value={newUser.email}
//                 onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
//                 placeholder="Nhập email"
//                 required
//               />
//             </FormGroup>
//             <FormGroup>
//               <Label for="phone">Số điện thoại</Label>
//               <Input
//                 type="text"
//                 id="phone"
//                 value={newUser.phone}
//                 onChange={(e) => setNewUser({ ...newUser, phone: e.target.value })}
//                 placeholder="Nhập số điện thoại"
//                 required
//               />
//             </FormGroup>
//             <FormGroup>
//               <Label for="role">Vai trò</Label>
//               <Input
//                 type="select"
//                 id="role"
//                 value={newUser.role}
//                 onChange={(e) => setNewUser({ ...newUser, role: e.target.value })}
//               >
//                 <option>Người dùng</option>
//                 <option>Quản trị viên</option>
//               </Input>
//             </FormGroup>
//             <FormGroup>
//               <Label for="status">Trạng thái</Label>
//               <Input
//                 type="select"
//                 id="status"
//                 value={newUser.status}
//                 onChange={(e) => setNewUser({ ...newUser, status: e.target.value })}
//               >
//                 <option>Hoạt động</option>
//                 <option>Vô hiệu hóa</option>
//               </Input>
//             </FormGroup>
//           </Form>
//         </ModalBody>
//         <ModalFooter>
//           <Button color="secondary" onClick={toggleModal}>Hủy</Button>
//           <Button color="primary" onClick={handleAddUser}>Thêm Người Dùng</Button>
//         </ModalFooter>
//       </Modal>
//     </div>
//   );
// }

// export default TabHistoryManagament;