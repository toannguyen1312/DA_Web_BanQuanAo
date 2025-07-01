import React, { useState, useEffect } from 'react';
import { Button, Input, Table, Modal, ModalHeader, ModalBody, ModalFooter, Form, FormGroup, Label } from 'reactstrap';
import { FaSearch, FaFileExcel, FaPlus, FaEdit, FaTrashAlt } from 'react-icons/fa';
import * as XLSX from 'xlsx';
import ReactPaginate from 'react-paginate';
import '../../assets/css/Admin/Tabproduct.css';
import { getAllCategory, getAllProductVariant, createProductVariant, createProduct, getAllProductID, deleteProductVariant, deleteProduct} from '../../service/admin';



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

  // Function to toggle the modal
  const toggleModal = (product = null) => {
    setModal(!modal);
    setSelectedProduct(product);
    if (product) {
      const p = {
        name: product.product.name,
        description: product.product.description,
        date: product.product.date,
        categoryId: product.product.category.categoryId,
        // variants: [
        //   {
        //     color: product.color,
        //     imageUrl: product.imageUrl,
        //     price: product.price,
        //     size: product.sizes,
        //     stock: product.stock[0],
        //     discount: product.discount,
        //     rating: product.rating || 0,
        //   },
        // ],
      };
      setProduct(p);
    } else {
      // Reset product fields when adding new product
      setProduct({
        name: "",
        description: "",
        date: new Date().toISOString().split("T")[0],
        categoryId: "",
        // variants: [],
      });
      // setVariant({
      //   color: "",
      //   imageUrl: "",
      //   price: "",
      //   size: "",
      //   stock: "",
      //   discount: "",
      //   rating: "",
      // });
    }
  };

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

  console.log("tất cả dữ liệu: ", filteredProducts)

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


  // getAllCategory
  const[categorys, setCategorys] = useState([])
  useEffect(() => {
     const fetchCategory = async() =>{
        const data = await getAllCategory();
        setCategorys(data)
    }
    fetchCategory()
  },[])

  // getAllProduct
  const[getAllProduct, setAllProduct] = useState([])
 useEffect(() => {
  const fetchProducts = async () => {
    const data = await getAllProductID();
    setAllProduct(data);
  };
  fetchProducts(); // ← Gọi hàm ở đây
}, []);


  console.log("getAllproduct: ", getAllProduct)




  // modal 

  const [product, setProduct] = useState({
  name: "",
  description: "",
  date: new Date().toISOString().split("T")[0],
  categoryId: "",
});

 const [variant, setVariant] = useState({
  productId: "",   
  color: "",
  imageUrl: "",
  price: "",
  size: "",
  stock: "",
  discount: "",
  rating: "",
});


  const handleProductChange = (e) => {
    setProduct({ ...product, [e.target.name]: e.target.value });
  };

  const handleVariantChange = (e) => {
    setVariant({ ...variant, [e.target.name]: e.target.value });
  };

  async function handleAddProduct() {
 
    // const newProductData = {
    //   ...product,
    //   variants: [{ ...variant}],
    // };

    try {
      console.log("dữ liệu: ", product)
      const result = await createProduct(product);
      
      console.log("product: ", result)
      if(result) {
        console.log("thêm thành công: ", result)
      }else {
        console.log("lỗi khi thêm: ", result)
      }
    } catch (error) {
      console.error("Error adding product:", error);
      // TODO: Show an error message to the user
    }

    // Reset form state and close modal
    setProduct({
      name: "",
      description: "",
      date: new Date().toISOString().split("T")[0],
      categoryId: "",
    });
    toggleModal(); 
  }


 const handleImageChange = (e) => {
  const file = e.target.files[0];
  if (file) {
    setVariant((prev) => ({
      ...prev,
      imageUrl: e.target.files, // giữ lại FileList
    }));
  }
};


  const [modalVariant, setModalVariant] = useState(false);

  const toggleModalVariant = () => {
    setModalVariant(!modalVariant);
  };

// thêm biến thể 
async function handleAddVariant() {
  try {
    const formData = new FormData();
    formData.append("productId", variant.productId);
    formData.append("color", variant.color);
    formData.append("price", variant.price);
    formData.append("size", variant.size);
    formData.append("stock", variant.stock);
    formData.append("discount", variant.discount);
    formData.append("rating", variant.rating);
    formData.append("imageUrl", variant.imageUrl[0]); // chỉ lấy 1 ảnh

     for (let [key, value] of formData.entries()) {
      console.log(`${key}:`, value);
    }
     const data = await createProductVariant(formData);

      if (data) {
      console.log("Biến thể thêm thành công:", data);
      setVariant({
        productId: "",
        color: "",
        imageUrl: "",
        price: "",
        size: "",
        stock: "",
        discount: "",
        rating: "",
      });
      toggleModalVariant();
    } else {
      console.error("Lỗi khi thêm biến thể.");
    }
  } catch (error) {
    console.error("Lỗi kết nối:", error);
  }
}

const handleDeleteProductVariant = async (productId, size, color) => {
  if (window.confirm("Bạn có chắc chắn muốn xóa biến thể này không?")) {
    try {
      const selectedSize = Array.isArray(size) ? size[0] : size;
      console.log("productID:", productId, "size:", selectedSize, "color:", color);

      await deleteProductVariant(productId, selectedSize, color);
      alert("Xóa biến thể thành công!");

      const updatedProducts = await getAllProductVariant();
      setProductVariant(updatedProducts);
      setFilteredProducts(updatedProducts);
    } catch (error) {
      alert("Lỗi khi xóa biến thể!");
    }
  }
};

const handleDeleteProduct = async (productId) => {
  if (window.confirm("Bạn có chắc chắn muốn xóa toàn bộ sản phẩm này không?")) {
    try {
      await deleteProduct(productId);
      alert("Xóa sản phẩm thành công!");

      const updatedProducts = await getAllProductVariant(); // Cập nhật danh sách sản phẩm sau khi xóa
      setProductVariant(updatedProducts);
      setFilteredProducts(updatedProducts);
    } catch (error) {
      console.error("Lỗi khi xóa sản phẩm:", error);
      alert("Xóa sản phẩm thất bại!");
    }
  }
};

  return (
    <div>
      <div className="text-center">
        <h3 className="page-title" style={{ color: 'black', fontWeight: 'bold', marginBottom: '30px' }}>Quản lý sản phẩm</h3>
      </div>

      <div className="mb-4 d-flex justify-content-between">
        <Button color="success" onClick={() => toggleModal()} style={{fontSize:"14px"}}>
          <FaPlus /> Thêm sản phẩm
        </Button>
         <Button color="primary" onClick={toggleModalVariant} style={{fontSize:"14px"}}>
            <FaPlus /> Thêm biến thể
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

      <Table striped bordered hover className='product_table'>
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
                <Button
                  color="success"
                  size="sm"
                  onClick={() => handleDeleteProduct(product.product.productId)}
                >
                  <FaTrashAlt />
                </Button>

                <Button
                  color="primary"
                  size="sm"
                  onClick={() => handleDeleteProductVariant(product.product.productId, product.sizes, product.color)}
                >
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

    <Modal isOpen={modalVariant} toggle={toggleModalVariant}>
  <ModalHeader toggle={toggleModalVariant}>Thêm biến thể sản phẩm</ModalHeader>
  <ModalBody>
    <Form>

      <FormGroup>
      <Label>Chọn ID sản phẩm</Label>
      <Input
        type="select"
        name="productId"
        value={variant.productId}
        onChange={handleVariantChange}
      >
        <option value="">-- Chọn ID sản phẩm --</option>
        {getAllProduct.map((pv) => (
          <option key={pv.productId} value={pv.productId}>
             (ID: {pv.productId})
          </option>
        ))}
      </Input>
    </FormGroup>

      <FormGroup>
        <Label>Màu sắc</Label>
        <Input name="color" value={variant.color} onChange={handleVariantChange} />
      </FormGroup>
      <FormGroup>
        <Label>Kích thước</Label>
        <Input name="size" value={variant.size} onChange={handleVariantChange} />
      </FormGroup>
      <FormGroup>
        <Label>Giá</Label>
        <Input name="price" type="number" value={variant.price} onChange={handleVariantChange} />
      </FormGroup>
      <FormGroup>
        <Label>Giảm giá (%)</Label>
        <Input name="discount" type="number" value={variant.discount} onChange={handleVariantChange} />
      </FormGroup>
      <FormGroup>
        <Label>Tồn kho</Label>
        <Input name="stock" type="number" value={variant.stock} onChange={handleVariantChange} />
      </FormGroup>
       <FormGroup>
        <Label>số sao</Label>
        <Input name="rating" type="number" value={variant.rating} onChange={handleVariantChange} />
      </FormGroup>
      <FormGroup>
        <Label>Hình ảnh</Label>
        <Input type="file" onChange={handleImageChange} />
      </FormGroup>
    </Form>
  </ModalBody>
  <ModalFooter>
    <Button color="secondary" onClick={toggleModalVariant}>Hủy</Button>
    <Button color="primary" onClick={handleAddVariant}>Thêm biến thể</Button>
  </ModalFooter>
</Modal>


      <Modal isOpen={modal} toggle={() => toggleModal()}>
        <ModalHeader toggle={() => toggleModal()}>{selectedProduct ? 'Chỉnh sửa sản phẩm' : 'Thêm sản phẩm'}</ModalHeader>
         <ModalBody>
          <FormGroup>
            <Label>Tên sản phẩm</Label>
            <Input name="name" value={product.name} onChange={handleProductChange} required />
          </FormGroup>
          <FormGroup>
            <Label>Mô tả</Label>
            <Input type="textarea" name="description" value={product.description} onChange={handleProductChange} required />
          </FormGroup>
          <FormGroup>
            <Label>Ngày</Label>
            <Input type="date" name="date" value={product.date} onChange={handleProductChange} required />
          </FormGroup>
          <FormGroup>
            <Input
              type="select"
              name="categoryId"
              value={product.categoryId}
              onChange={handleProductChange}
              required
            >
              <option value="">-- Chọn thể loại --</option>
              {categorys.map((cat) => (
                <option key={cat.categoryId} value={cat.categoryId}>
                  {cat.name}
                </option>
              ))}
            </Input>
          </FormGroup>
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