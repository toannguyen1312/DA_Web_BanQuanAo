import React, { useState, useEffect } from 'react';
import { Button, Input, Table, Modal, ModalHeader, ModalBody, ModalFooter, Form, FormGroup, Label } from 'reactstrap';
import { FaSearch, FaFileExcel, FaPlus, FaEdit, FaTrashAlt } from 'react-icons/fa';
import * as XLSX from 'xlsx';
import ReactPaginate from 'react-paginate';
import '../../assets/css/Admin/Tabproduct.css';

const initialCategories = [
  {
    id: 1,
    name: 'Áo Nam',
    products: ['Áo da', 'Áo sơ mi', 'Áo khoác'],
    status: 'Kích hoạt',
    displayOrder: 1,
    manager: 'toàn'
  },
];

function TabCategoryManagement() {
  const [categories, setCategories] = useState(initialCategories);
  const [search, setSearch] = useState('');
  const [filteredCategories, setFilteredCategories] = useState(categories);
  const [modal, setModal] = useState(false);
  const [newCategory, setNewCategory] = useState({
    name: '',
    products: '',
    status: 'Kích hoạt',
    displayOrder: 1,
    manager: ''
  });
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 5;

  useEffect(() => {
    const searchResults = categories.filter(category =>
      category.name.toLowerCase().includes(search.toLowerCase()) ||
      category.manager.toLowerCase().includes(search.toLowerCase())
    );
    setFilteredCategories(searchResults);
  }, [search, categories]);

  const offset = currentPage * itemsPerPage;
  const paginatedCategories = filteredCategories.slice(offset, offset + itemsPerPage);

  const handlePageChange = (selectedPage) => {
    setCurrentPage(selectedPage.selected);
  };

  const exportToExcel = () => {
    const wb = XLSX.utils.book_new();
    const ws = XLSX.utils.json_to_sheet(filteredCategories);
    XLSX.utils.book_append_sheet(wb, ws, 'Danh sách danh mục');
    XLSX.writeFile(wb, 'DanhSachDanhMuc.xlsx');
  };

  const handleAddCategory = () => {
    if (selectedCategory) {
      const updated = categories.map(category =>
        category.id === selectedCategory.id ? newCategory : category
      );
      setCategories(updated);
    } else {
      setCategories([...categories, { ...newCategory, id: categories.length + 1, products: newCategory.products.split(',').map(p => p.trim()) }]);
    }
    setModal(false);
    setSelectedCategory(null);
    setNewCategory({ name: '', products: '', status: 'Kích hoạt', displayOrder: 1, manager: '' });
  };

  const handleDeleteCategory = (id) => {
    if (window.confirm('Bạn có chắc muốn xóa danh mục này không?')) {
      setCategories(categories.filter(category => category.id !== id));
    }
  };

  const toggleModal = (category = null) => {
    setSelectedCategory(category);
    setNewCategory(category ? { ...category, products: category.products.join(', ') } : { name: '', products: '', status: 'Kích hoạt', displayOrder: 1, manager: '' });
    setModal(true);
  };

  return (
    <div>
      <div className="text-center">
        <h3 className="page-title" style={{ color: 'black', fontWeight: 'bold', marginBottom: '30px' }}>Quản lý Danh mục</h3>
      </div>

      <div className="mb-4 d-flex justify-content-between">
        <Button color="success" onClick={() => toggleModal()}>
          <FaPlus /> Thêm danh mục
        </Button>
        <div style={{ position: 'relative', width: '60%' }}>
          <Input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Tìm kiếm theo tên danh mục hoặc người quản lý"
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
            <th>Tên danh mục</th>
            <th>Danh sách sản phẩm</th>
            <th>Trạng thái</th>
            <th>Thứ tự hiển thị</th>
            <th>Người quản lý</th>
            <th>Thao tác</th>
          </tr>
        </thead>
        <tbody>
          {paginatedCategories.map(category => (
            <tr key={category.id}>
              <td>{category.id}</td>
              <td>{category.name}</td>
              <td>{category.products.join(', ')}</td>
              <td>{category.status}</td>
              <td>{category.displayOrder}</td>
              <td>{category.manager}</td>
              <td className="d-flex gap-2">
                <Button color="warning" size="sm" onClick={() => toggleModal(category)}>
                  <FaEdit />
                </Button>
                <Button color="danger" size="sm" onClick={() => handleDeleteCategory(category.id)}>
                  <FaTrashAlt />
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
        pageCount={Math.ceil(filteredCategories.length / itemsPerPage)}
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

      <Modal isOpen={modal} toggle={() => setModal(false)}>
        <ModalHeader toggle={() => setModal(false)}>{selectedCategory ? 'Chỉnh sửa danh mục' : 'Thêm danh mục'}</ModalHeader>
        <ModalBody>
          <Form>
            <FormGroup>
              <Label for="name">Tên danh mục</Label>
              <Input type="text" id="name" value={newCategory.name} onChange={(e) => setNewCategory({ ...newCategory, name: e.target.value })} required />
            </FormGroup>
            <FormGroup>
              <Label for="products">Danh sách sản phẩm</Label>
              <Input type="text" id="products" value={newCategory.products} onChange={(e) => setNewCategory({ ...newCategory, products: e.target.value })} required />
            </FormGroup>
            <FormGroup>
              <Label for="status">Trạng thái</Label>
              <Input type="select" id="status" value={newCategory.status} onChange={(e) => setNewCategory({ ...newCategory, status: e.target.value })}>
                <option>Kích hoạt</option>
                <option>Vô hiệu</option>
              </Input>
            </FormGroup>
            <FormGroup>
              <Label for="displayOrder">Thứ tự hiển thị</Label>
              <Input type="number" id="displayOrder" value={newCategory.displayOrder} onChange={(e) => setNewCategory({ ...newCategory, displayOrder: e.target.value })} required />
            </FormGroup>
            <FormGroup>
              <Label for="manager">Người quản lý</Label>
              <Input type="text" id="manager" value={newCategory.manager} onChange={(e) => setNewCategory({ ...newCategory, manager: e.target.value })} required />
            </FormGroup>
          </Form>
        </ModalBody>
        <ModalFooter>
          <Button color="secondary" onClick={() => setModal(false)}>Hủy</Button>
          <Button color="primary" onClick={handleAddCategory}>
            {selectedCategory ? 'Cập nhật danh mục' : 'Thêm danh mục'}
          </Button>
        </ModalFooter>
      </Modal>
    </div>
  );
}

export default TabCategoryManagement;