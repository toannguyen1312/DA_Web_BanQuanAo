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
    name: 'Áo da',
    category: 'Áo nam',
    price: 100000,
    p_discount: 10,
    size: 'M',
    color: 'Red',
    customer: 'Nguyễn Văn A',
    quantity: 2
  },
];

function TabOrderManagement() {
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
    customer: '',
    quantity: ''
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
    XLSX.utils.book_append_sheet(wb, ws, 'Danh sách đơn hàng');
    XLSX.writeFile(wb, 'DanhSachDonHang.xlsx');
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
      customer: '',
      quantity: ''
    });
  };

  const handleDeleteProduct = (id) => {
    if (window.confirm('Bạn có chắc muốn xóa đơn hàng này không?')) {
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
      customer: '',
      quantity: ''
    });
    setModal(true);
  };

  return (
    <div>
      <div className="text-center">
        <h3 className="page-title" style={{ color: 'black', fontWeight: 'bold', marginBottom: '30px' }}>Quản lý đơn hàng</h3>
      </div>

      <div className="mb-4 d-flex justify-content-between">
        <Button color="success" onClick={() => toggleModal()}>
          <FaPlus /> Thêm đơn hàng
        </Button>
        <div style={{ position: 'relative', width: '60%' }}>
          <Input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Tìm kiếm theo tên hoặc loại sản phẩm"
            style={{ paddingLeft: '30px' }}
          />
          <FaSearch
            style={{
              position: 'absolute',
              left: '10px',
              top: '50%',
              transform: 'translateY(-50%)',
              color: '#888'
            }}
          />
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
            <th>Khách hàng</th>
            <th>Số lượng</th>
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
              <td>{product.customer}</td>
              <td>{product.quantity}</td>
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
        <ModalHeader toggle={() => setModal(false)}>{selectedProduct ? 'Chỉnh sửa đơn hàng' : 'Thêm đơn hàng'}</ModalHeader>
        <ModalBody>
          <Form>
            <FormGroup>
              <Label for="image">Hình ảnh</Label>
              <Input
                type="text"
                id="image"
                value={newProduct.image}
                onChange={(e) => setNewProduct({ ...newProduct, image: e.target.value })}
                placeholder="Nhập đường dẫn hình ảnh"
                required
              />
            </FormGroup>
            <FormGroup>
              <Label for="name">Tên sản phẩm</Label>
              <Input
                type="text"
                id="name"
                value={newProduct.name}
                onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
                placeholder="Nhập tên sản phẩm"
                required
              />
            </FormGroup>
            <FormGroup>
              <Label for="category">Loại sản phẩm</Label>
              <Input
                type="text"
                id="category"
                value={newProduct.category}
                onChange={(e) => setNewProduct({ ...newProduct, category: e.target.value })}
                placeholder="Nhập loại sản phẩm"
                required
              />
            </FormGroup>
            <FormGroup>
              <Label for="price">Giá</Label>
              <Input
                type="number"
                id="price"
                value={newProduct.price}
                onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })}
                placeholder="Nhập giá sản phẩm"
                required
              />
            </FormGroup>
            <FormGroup>
              <Label for="p_discount">Giảm giá (%)</Label>
              <Input
                type="number"
                id="p_discount"
                value={newProduct.p_discount}
                onChange={(e) => setNewProduct({ ...newProduct, p_discount: e.target.value })}
                placeholder="Nhập % giảm giá"
                required
              />
            </FormGroup>
            <FormGroup>
              <Label for="size">Kích thước</Label>
              <Input
                type="text"
                id="size"
                value={newProduct.size}
                onChange={(e) => setNewProduct({ ...newProduct, size: e.target.value })}
                placeholder="Nhập kích thước"
                required
              />
            </FormGroup>
            <FormGroup>
              <Label for="color">Màu sắc</Label>
              <Input
                type="text"
                id="color"
                value={newProduct.color}
                onChange={(e) => setNewProduct({ ...newProduct, color: e.target.value })}
                placeholder="Nhập màu sắc"
                required
              />
            </FormGroup>
            <FormGroup>
              <Label for="customer">Khách hàng</Label>
              <Input
                type="text"
                id="customer"
                value={newProduct.customer}
                onChange={(e) => setNewProduct({ ...newProduct, customer: e.target.value })}
                placeholder="Nhập tên khách hàng"
                required
              />
            </FormGroup>
            <FormGroup>
              <Label for="quantity">Số lượng</Label>
              <Input
                type="number"
                id="quantity"
                value={newProduct.quantity}
                onChange={(e) => setNewProduct({ ...newProduct, quantity: e.target.value })}
                placeholder="Nhập số lượng"
                required
              />
            </FormGroup>
          </Form>
        </ModalBody>
        <ModalFooter>
          <Button color="secondary" onClick={() => setModal(false)}>Hủy</Button>
          <Button color="primary" onClick={handleAddProduct}>
            {selectedProduct ? 'Cập nhật đơn hàng' : 'Thêm đơn hàng'}
          </Button>
        </ModalFooter>
      </Modal>
    </div>
  );
}

export default TabOrderManagement;
