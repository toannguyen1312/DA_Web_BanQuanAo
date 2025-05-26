import React, { useState, useEffect } from 'react';
import { Button, Input, Table, Modal, ModalHeader, ModalBody, ModalFooter, Form, FormGroup, Label } from 'reactstrap';
import { FaSearch, FaFileExcel, FaPlus, FaEdit, FaTrashAlt } from 'react-icons/fa';
import * as XLSX from 'xlsx';
import ReactPaginate from 'react-paginate';
import '../../assets/css/Admin/Tabproduct.css';
import { getAllCategorys, getAllProductVariant} from '../../service/admin';



function TabProductManagement() {
   const [search, setSearch] = useState('');
  const [productVariant, setProductVariant] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [modal, setModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
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

  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 10;

  // Fetch data from API
  useEffect(() => {
    const fetchProducts = async () => {
      const data = await getAllProductVariant();
      setProductVariant(data);
      setFilteredProducts(data); // initialize
    };
    fetchProducts();
  }, []);

  // Handle search
  useEffect(() => {
    const results = productVariant.filter((product) =>
      product.product.name.toLowerCase().includes(search.toLowerCase()) ||
      product.product.category.name.toLowerCase().includes(search.toLowerCase())
    );
    setFilteredProducts(results);
    setCurrentPage(0); // reset to first page on new search
  }, [search, productVariant]);

  const offset = currentPage * itemsPerPage;
  const paginatedProducts = filteredProducts.slice(offset, offset + itemsPerPage);

  const handlePageChange = (selectedPage) => {
    setCurrentPage(selectedPage.selected);
  };

  const exportToExcel = () => {
    const wb = XLSX.utils.book_new();
    const ws = XLSX.utils.json_to_sheet(filteredProducts.map((p) => ({
      ID: p.product.productId,
      Name: p.product.name,
      Category: p.product.category.name,
      Price: p.price,
      Discount: p.discount,
      Size: p.size,
      Color: p.color,
      Stock: p.stock[0],
    })));
    XLSX.utils.book_append_sheet(wb, ws, 'Danh sách sản phẩm');
    XLSX.writeFile(wb, 'DanhSachSanPham.xlsx');
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
            <th>ID sản phẩm</th>
            <th>Hình ảnh</th>
            <th>Tên sản phẩm</th>
            <th>Thể loại</th>
            <th>Giá</th>
            <th>Giảm giá (%)</th>
            <th>Ngày thêm</th>
            <th>Size</th>
            <th>Màu sắc</th>
            <th>Tồn kho</th>
            <th>Thao tác</th>
          </tr>
        </thead>
        <tbody>
          {paginatedProducts.map((product, index) => (
            <tr key={offset + index}>
              <td>{offset + index + 1}</td>
              <td><img src={product.imageUrl} alt={product.product.name} style={{ width: '50px' }} /></td>
              <td>{product.product.name.length > 10 ? product.product.name.substring(0, 10) + '...' : product.product.name}</td>
              <td>{product.product.category.categoryId}</td>
              <td>{product.price.toLocaleString()}</td>
              <td>{product.discount}%</td>
               <td>{product.product.date}</td>
              <td>{product.sizes}</td>
              <td>{product.color}</td>
              <td>{product.stock[0]}</td>
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
  marginPagesDisplayed={1}
  pageRangeDisplayed={3}
  onPageChange={(page) => setCurrentPage(page.selected)}
  forcePage={currentPage}
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
          {/* <Button color="primary" onClick={handleAddProduct}>
            {selectedProduct ? 'Cập nhật sản phẩm' : 'Thêm sản phẩm'}
          </Button> */}
        </ModalFooter>
      </Modal>
    </div>
  );
}

export default TabProductManagement;