import React, { useState, useEffect } from 'react';
import { Button, Input, Table, Modal, ModalHeader, ModalBody, ModalFooter, Form, FormGroup, Label } from 'reactstrap';
import { FaSearch, FaFileExcel, FaPlus, FaEdit, FaTrashAlt } from 'react-icons/fa';
import * as XLSX from 'xlsx';
import ReactQuill from 'react-quill';

const initialPosts = [
  {
    id: 1,
    title: 'Hướng dẫn sử dụng sản phẩm',
    author: 'Admin',
    date: '2025-05-01',
    status: 'Hiển thị',
    content: '<p>Nội dung bài viết mẫu...</p>',
    displayOrder: 1
  },
  {
    id: 2,
    title: 'Tin khuyến mãi tháng 5',
    author: 'kien',
    date: '2025-05-03',
    status: 'Ẩn',
    content: '<p>Chương trình khuyến mãi lớn trong tháng 5...</p>',
    displayOrder: 2
  },
];

const TabPostManagement = () => {
  const [posts, setPosts] = useState(initialPosts);
  const [search, setSearch] = useState('');
  const [filteredPosts, setFilteredPosts] = useState(posts);
  const [modal, setModal] = useState(false);
  const [selectedPost, setSelectedPost] = useState(null);
  const [newPost, setNewPost] = useState({
    title: '',
    author: '',
    date: '',
    status: 'Hiển thị',
    content: '',
    displayOrder: ''
  });

  useEffect(() => {
    const results = posts.filter(
      (post) =>
        post.title.toLowerCase().includes(search.toLowerCase()) ||
        post.author.toLowerCase().includes(search.toLowerCase())
    );
    setFilteredPosts(results);
  }, [search, posts]);

  const toggleModal = (post = null) => {
    setSelectedPost(post);
    setNewPost(
      post || {
        title: '',
        author: '',
        date: '',
        status: 'Hiển thị',
        content: '',
        displayOrder: ''
      }
    );
    setModal(!modal);
  };

  const handleAddPost = () => {
    if (posts.some(p => p.displayOrder === Number(newPost.displayOrder))) {
      alert('Thứ tự hiển thị đã tồn tại, vui lòng chọn số khác.');
      return;
    }
    setPosts([...posts, { ...newPost, id: posts.length + 1, displayOrder: Number(newPost.displayOrder) }]);
    setModal(false);
  };

  const handleUpdatePost = () => {
    const isDuplicate = posts.some(
      (p) => p.displayOrder === Number(newPost.displayOrder) && p.id !== selectedPost.id
    );
    if (isDuplicate) {
      alert('Thứ tự hiển thị đã tồn tại, vui lòng chọn số khác.');
      return;
    }
    const updated = posts.map((post) =>
      post.id === selectedPost.id ? { ...newPost, id: post.id, displayOrder: Number(newPost.displayOrder) } : post
    );
    setPosts(updated);
    setModal(false);
  };

  const exportToExcel = () => {
    const wb = XLSX.utils.book_new();
    const ws = XLSX.utils.json_to_sheet(filteredPosts);
    XLSX.utils.book_append_sheet(wb, ws, 'Danh sách bài đăng');
    XLSX.writeFile(wb, 'DanhSachBaiDang.xlsx');
  };

  return (
    <div>
      <div className="text-center mb-4">
        <h3 style={{ fontWeight: 'bold' }}>Quản lý Bài đăng</h3>
      </div>

      <div className="d-flex justify-content-between mb-3">
        <Button color="success" onClick={() => toggleModal()}>
          <FaPlus /> Thêm bài đăng
        </Button>
        <div style={{ position: 'relative', width: '60%' }}>
          <Input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Tìm kiếm theo tiêu đề hoặc tác giả"
            style={{ paddingLeft: '30px' }}
          />
          <FaSearch
            style={{
              position: 'absolute',
              left: '10px',
              top: '50%',
              transform: 'translateY(-50%)',
              color: '#888',
            }}
          />
        </div>
        <Button color="info" onClick={exportToExcel}>
          <FaFileExcel /> Xuất file
        </Button>
      </div>

      <Table striped bordered hover responsive>
        <thead>
          <tr>
            <th>ID</th>
            <th>Tiêu đề</th>
            <th>Tác giả</th>
            <th>Ngày đăng</th>
            <th>Thứ tự hiển thị</th>
            <th>Trạng thái</th>
            <th>Thao tác</th>
          </tr>
        </thead>
        <tbody>
          {filteredPosts.map((post) => (
            <tr key={post.id}>
              <td>{post.id}</td>
              <td>{post.title}</td>
              <td>{post.author}</td>
              <td>{post.date}</td>
              <td>{post.displayOrder}</td>
              <td>{post.status}</td>
              <td>
                <Button color="warning" size="sm" onClick={() => toggleModal(post)} className="me-2">
                  <FaEdit className="me-1" />
                </Button>
                <Button color="danger" size="sm">
                  <FaTrashAlt className="me-1" />
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      <Modal isOpen={modal} toggle={toggleModal} size="lg">
        <ModalHeader toggle={toggleModal}>
          {selectedPost ? 'Chỉnh sửa bài đăng' : 'Thêm bài đăng'}
        </ModalHeader>
        <ModalBody>
          <Form>
            <FormGroup>
              <Label for="title">Tiêu đề</Label>
              <Input
                type="text"
                id="title"
                value={newPost.title}
                onChange={(e) => setNewPost({ ...newPost, title: e.target.value })}
              />
            </FormGroup>
            <FormGroup>
              <Label for="author">Tác giả</Label>
              <Input
                type="text"
                id="author"
                value={newPost.author}
                onChange={(e) => setNewPost({ ...newPost, author: e.target.value })}
              />
            </FormGroup>
            <FormGroup>
              <Label for="date">Ngày đăng</Label>
              <Input
                type="date"
                id="date"
                value={newPost.date}
                onChange={(e) => setNewPost({ ...newPost, date: e.target.value })}
              />
            </FormGroup>
            <FormGroup>
              <Label for="displayOrder">Thứ tự hiển thị</Label>
              <Input
                type="number"
                id="displayOrder"
                value={newPost.displayOrder}
                onChange={(e) => setNewPost({ ...newPost, displayOrder: e.target.value })}
              />
            </FormGroup>
            <FormGroup>
              <Label for="status">Trạng thái</Label>
              <Input
                type="select"
                id="status"
                value={newPost.status}
                onChange={(e) => setNewPost({ ...newPost, status: e.target.value })}
              >
                <option>Hiển thị</option>
                <option>Ẩn</option>
              </Input>
            </FormGroup>
            <FormGroup>
              <Label for="content">Nội dung</Label>
              <ReactQuill
                theme="snow"
                value={newPost.content}
                onChange={(value) => setNewPost({ ...newPost, content: value })}
                style={{ height: '300px', marginBottom: '50px' }}
              />
            </FormGroup>
          </Form>
        </ModalBody>
        <ModalFooter>
          <Button color="secondary" onClick={toggleModal}>Hủy</Button>
          <Button color="primary" onClick={selectedPost ? handleUpdatePost : handleAddPost}>
            {selectedPost ? 'Cập nhật' : 'Thêm'}
          </Button>
        </ModalFooter>
      </Modal>
    </div>
  );
};

export default TabPostManagement;
