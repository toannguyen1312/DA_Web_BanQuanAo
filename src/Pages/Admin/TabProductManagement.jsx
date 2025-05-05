import React, { useState, useEffect } from 'react';
import { Button, Input, Table, Modal, ModalHeader, ModalBody, ModalFooter, Form, FormGroup, Label } from 'reactstrap';
import { FaSearch, FaFileExcel, FaPlus, FaEdit, FaTrashAlt } from 'react-icons/fa';
import * as XLSX from 'xlsx';
import ReactPaginate from 'react-paginate';
import '../../assets/css/Admin/Tabproduct.css';

const initialProducts = [
  {
    id: 1,
    image: 'https://th.bing.com/th/id/OIP.0pgO5J6_e6e2e-R02re6SwHaJ6?rs=1&pid=ImgDetMain',
    name: 'áo da',
    category: 'áo nam',
    price: 100000,
    p_discount: 10,
    size: 'M',
    color: 'Red',
    stock: 50
  },
];

function TabProductManagement() {
  const [products, setProducts] = useState(initialProducts);
  const [search, setSearch] = useState('');
  const [filteredProducts, setFilteredProducts] = useState(products);
  const [modal, setModal] = useState(false);
  const [newProduct, setNewProduct] = useState({
    image: '',
    name: '',
    category: '',
    price: '',
    p_discount: '',
    size: '',
    color: '',
    stock: ''
  });
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 5;

  useEffect(() => {
    const searchResults = products.filter(product =>
      product.name.toLowerCase().includes(search.toLowerCase()) ||
      product.category.toLowerCase().includes(search.toLowerCase())
    );
    setFilteredProducts(searchResults);
  }, [search, products]);

  const offset = currentPage * itemsPerPage;
  const paginatedProducts = filteredProducts.slice(offset, offset + itemsPerPage);

  const handlePageChange = (selectedPage) => {
    setCurrentPage(selectedPage.selected);
  };

  const exportToExcel = () => {
    const wb = XLSX.utils.book_new();
    const ws = XLSX.utils.json_to_sheet(filteredProducts);
    XLSX.utils.book_append_sheet(wb, ws, 'Danh sách sản phẩm');
    XLSX.writeFile(wb, 'DanhSachSanPham.xlsx');
  };

  const handleAddProduct = () => {
    if (selectedProduct) {
      const updated = products.map(product =>
        product.id === selectedProduct.id ? newProduct : product
      );
      setProducts(updated);
    } else {
      setProducts([...products, { ...newProduct, id: products.length + 1 }]);
    }
    setModal(false);
    setSelectedProduct(null);
    setNewProduct({
      image: '',
      name: '',
      category: '',
      price: '',
      p_discount: '',
      size: '',
      color: '',
      stock: ''
    });
  };

  const handleDeleteProduct = (id) => {
    if (window.confirm('Bạn có chắc muốn xóa sản phẩm này không?')) {
      setProducts(products.filter(product => product.id !== id));
    }
  };

  const toggleModal = (product = null) => {
    setSelectedProduct(product);
    setNewProduct(product || {
      image: '',
      name: '',
      category: '',
      price: '',
      p_discount: '',
      size: '',
      color: '',
      stock: ''
    });
    setModal(true);
  };

  return (
    <div>
      <div className="text-center">
        <h3 className="page-title" style={{ color: 'black', fontWeight: 'bold', marginBottom: '30px' }}>Quản lý sản phẩm</h3>
      </div>

      <div className="mb-4 d-flex justify-content-between">
        <Button color="success" onClick={() => toggleModal()}>
          <FaPlus /> Thêm sản phẩm
        </Button>
        <div style={{ position: 'relative', width: '60%' }}>
          <Input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Tìm kiếm theo tên hoặc loại sản phẩm"
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
            <th>Hình ảnh</th>
            <th>Tên</th>
            <th>Loại</th>
            <th>Giá</th>
            <th>Giảm giá (%)</th>
            <th>Kích thước</th>
            <th>Màu sắc</th>
            <th>Tồn kho</th>
            <th>Thao tác</th>
          </tr>
        </thead>
        <tbody>
          {paginatedProducts.map(product => (
            <tr key={product.id}>
              <td>{product.id}</td>
              <td><img src={product.image} alt={product.name} style={{ width: '50px' }} /></td>
              <td>{product.name}</td>
              <td>{product.category}</td>
              <td>{product.price.toLocaleString()}</td>
              <td>{product.p_discount}%</td>
              <td>{product.size}</td>
              <td>{product.color}</td>
              <td>{product.stock}</td>
              <td className="d-flex gap-2">
                <Button color="warning" size="sm" onClick={() => toggleModal(product)}>
                  <FaEdit />
                </Button>
                <Button color="danger" size="sm" onClick={() => handleDeleteProduct(product.id)}>
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
        pageCount={Math.ceil(filteredProducts.length / itemsPerPage)}
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
        <ModalHeader toggle={() => setModal(false)}>{selectedProduct ? 'Chỉnh sửa sản phẩm' : 'Thêm sản phẩm'}</ModalHeader>
        <ModalBody>
          <Form>
            <FormGroup>
              <Label for="image">Hình ảnh</Label>
              <Input type="text" id="image" value={newProduct.image} onChange={(e) => setNewProduct({ ...newProduct, image: e.target.value })} required />
            </FormGroup>
            <FormGroup>
              <Label for="name">Tên sản phẩm</Label>
              <Input type="text" id="name" value={newProduct.name} onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })} required />
            </FormGroup>
            <FormGroup>
              <Label for="category">Loại sản phẩm</Label>
              <Input type="text" id="category" value={newProduct.category} onChange={(e) => setNewProduct({ ...newProduct, category: e.target.value })} required />
            </FormGroup>
            <FormGroup>
              <Label for="price">Giá</Label>
              <Input type="number" id="price" value={newProduct.price} onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })} required />
            </FormGroup>
            <FormGroup>
              <Label for="p_discount">Giảm giá (%)</Label>
              <Input type="number" id="p_discount" value={newProduct.p_discount} onChange={(e) => setNewProduct({ ...newProduct, p_discount: e.target.value })} required />
            </FormGroup>
            <FormGroup>
              <Label for="size">Kích thước</Label>
              <Input type="text" id="size" value={newProduct.size} onChange={(e) => setNewProduct({ ...newProduct, size: e.target.value })} required />
            </FormGroup>
            <FormGroup>
              <Label for="color">Màu sắc</Label>
              <Input type="text" id="color" value={newProduct.color} onChange={(e) => setNewProduct({ ...newProduct, color: e.target.value })} required />
            </FormGroup>
            <FormGroup>
              <Label for="stock">Tồn kho</Label>
              <Input type="number" id="stock" value={newProduct.stock} onChange={(e) => setNewProduct({ ...newProduct, stock: e.target.value })} required />
            </FormGroup>
          </Form>
        </ModalBody>
        <ModalFooter>
          <Button color="secondary" onClick={() => setModal(false)}>Hủy</Button>
          <Button color="primary" onClick={handleAddProduct}>
            {selectedProduct ? 'Cập nhật sản phẩm' : 'Thêm sản phẩm'}
          </Button>
        </ModalFooter>
      </Modal>
    </div>
  );
}

export default TabProductManagement;