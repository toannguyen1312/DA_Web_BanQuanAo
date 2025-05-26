import React, { useState, useEffect } from 'react';
import { Button, Input, Table, Modal, ModalHeader, ModalBody, ModalFooter, Form, FormGroup, Label } from 'reactstrap';
import { FaSearch, FaFileExcel, FaPlus, FaEdit, FaTrashAlt } from 'react-icons/fa';
import * as XLSX from 'xlsx';
import ReactPaginate from 'react-paginate';
import '../../assets/css/Admin/TabCategoryManagement.css';
import { getAllCategorys, addCategorys, deleteCategorys, updateCategorys } from '../../service/admin';


function TabCategoryManagement() {

  const [modal, setModal] = useState(false);
  const [search, setSearch] = useState('');
  const [filteredCategories, setFilteredCategories] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 5;
  const [newCategory, setNewCategory] = useState({
    name: '',
    description: '',
  });

  const [selectedCategory, setSelectedCategory] = useState(null);

  const handlePageChange = (selectedPage) => {
    setCurrentPage(selectedPage.selected);
  };

  const exportToExcel = () => {
    const wb = XLSX.utils.book_new();
    const ws = XLSX.utils.json_to_sheet(filteredCategories);
    XLSX.utils.book_append_sheet(wb, ws, 'Danh sách danh mục');
    XLSX.writeFile(wb, 'DanhSachDanhMuc.xlsx');
  };

  const handleAddCategory = async () => {
  if (!newCategory.name || !newCategory.description) {
    alert('Vui lòng nhập đầy đủ tên và mô tả danh mục.');
    return;
  }

  try {
    const added = await addCategorys(newCategory);

    if (added) {
      // Cập nhật lại danh sách hiển thị
      const updatedCategories = await getAllCategorys();
      setCategory(updatedCategories);
      setFilteredCategories(updatedCategories);
      setModal(false);
      setSelectedCategory(null);
      setNewCategory({ name: '', description: '' });
      alert('Thêm danh mục thành công!');
    } else {
      alert('Thêm danh mục thất bại.');
    }
  } catch (err) {
    console.error(err);
    alert('Đã xảy ra lỗi khi thêm danh mục.');
  }
};


 const handleDeleteCategory = async (id) => {
  if (window.confirm('Bạn có chắc muốn xóa danh mục này không?')) {
    try {
      const success = await deleteCategorys(id);
      if (success) {
        const updatedCategories = await getAllCategorys();
        setCategory(updatedCategories);
        setFilteredCategories(updatedCategories);
        alert('Xóa danh mục thành công!');
      } else {
        alert('Xóa danh mục thất bại.');
      }
    } catch (error) {
      console.error("Lỗi khi xóa danh mục:", error);
      alert('Đã xảy ra lỗi khi xóa danh mục.');
    }
  }
};


const handleUpdateCategory = async () => {
  if (!newCategory.name || !newCategory.description) {
    alert('Vui lòng nhập đầy đủ tên và mô tả danh mục.');
    return;
  }

  if (!selectedCategory) {
    alert('Không có danh mục nào được chọn để cập nhật.');
    return;
  }

  try {
    const updated = await updateCategorys(selectedCategory.categoryId, newCategory);

    if (updated) {
      const updatedCategories = await getAllCategorys();
      setCategory(updatedCategories);
      setFilteredCategories(updatedCategories);
      setModal(false);
      setSelectedCategory(null);
      setNewCategory({ name: '', description: '' });
      alert('Cập nhật danh mục thành công!');
    } else {
      alert('Cập nhật danh mục thất bại.');
    }
  } catch (err) {
    console.error(err);
    alert('Đã xảy ra lỗi khi cập nhật danh mục.');
  }
};


  const toggleModal = (category = null) => {
    setSelectedCategory(category);
    setNewCategory(category ? { ...category, products: category.products.join(', ') } : { name: '', products: '', status: 'Kích hoạt', displayOrder: 1, manager: '' });
    setModal(true);
  };


  // hiển thị thể loại
  const[category, setCategory] = useState([])
  useEffect(() => {
      const fetchCategory = async () => {
        
        const data = await getAllCategorys();
        setCategory(data)
        console.log("data: ", data)

      }

      fetchCategory()
  }, [])

  useEffect(() => {
    const results = category.filter(c =>
      c.categoryName.toLowerCase().includes(search.toLowerCase())
    );
    setFilteredCategories(results);
    setCurrentPage(0);
  }, [search, category]);

  const offset = currentPage * itemsPerPage;
  const paginatedCategories = filteredCategories.slice(offset, offset + itemsPerPage);

  return (
    <div className="category-management-container">
      <div className="text-center">
        <h3 className="page-title">Quản lý Danh mục</h3>
      </div>

      <div className="top-controls">
        <Button color="success" onClick={() => toggleModal()} className="add-category-btn">
          <FaPlus /> Thêm danh mục
        </Button>
        <div className="search-bar">
          <Input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Tìm kiếm theo tên danh mục hoặc người quản lý"
            className="form-control"
          />
          <FaSearch />
        </div>
        <Button color="info" onClick={exportToExcel} className="export-btn">
          <FaFileExcel /> Xuất file
        </Button>
      </div>

      <Table striped bordered hover>
        <thead>
          <tr>
            <th>ID thể loại</th>
            <th>Tên thể loại</th>
            <th>Danh sách màu</th>
            <th>Danh sách size</th>
            <th>Tồn kho</th>
            <th>Số sao</th>
            <th>Thao tác</th>
          </tr>
        </thead>
        <tbody>
         {category.map(category => (
          <tr key={category.categoryId}>
            <td>{category.categoryId}</td>
            <td>{category.categoryName}</td>
            <td>{category.colorList.join(', ')}</td>
            <td>{category.sizeList.join(', ')}</td>
            <td>{category.totalStock}</td>
            <td>{category.rating.toFixed(1)}</td>
            <td className="d-flex gap-2">
              <Button color="warning" size="sm" onClick={() => toggleModal(category)}>
              <FaEdit />
            </Button>

              <Button color="danger" size="sm" onClick={() => handleDeleteCategory(category.categoryId)}>
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
        <ModalHeader toggle={() => setModal(false)}>{selectedCategory ? 'Chỉnh sửa danh mục' : 'Thêm thể loại'}</ModalHeader>
        <ModalBody>
          <Form>
            <FormGroup>
              <Label for="name">Tên thể loại</Label>
              <Input type="text" id="name" value={newCategory.name} onChange={(e) => setNewCategory({ ...newCategory, name: e.target.value })} required className="form-control" />
            </FormGroup>
            <FormGroup>
              <Label for="description">Mô tả</Label>
              <Input type="text" id="description" value={newCategory.description} onChange={(e) => setNewCategory({ ...newCategory, description: e.target.value })} required className="form-control" />
            </FormGroup>
          </Form>
        </ModalBody>
        <ModalFooter>
          <Button color="secondary" onClick={() => setModal(false)}>Hủy</Button>
          <Button color="primary" onClick={selectedCategory ? handleUpdateCategory : handleAddCategory}>
            {selectedCategory ? 'Cập nhật thể loại' : 'Thêm danh mục'}
          </Button>
        </ModalFooter>
      </Modal>
    </div>
  );
}

export default TabCategoryManagement;