import React, { useState, useEffect } from 'react';
import { Button, Input, Table, Modal, ModalHeader, ModalBody, ModalFooter, Form, FormGroup, Label } from 'reactstrap';
import { FaSearch, FaFileExcel, FaPlus, FaEdit, FaTrashAlt } from 'react-icons/fa';
import * as XLSX from 'xlsx';
import ReactPaginate from 'react-paginate';
// import '../../assets/css/Admin/Tabproduct.css';
import '../../assets/css/Admin/TabOrderManagement.css';
import { jwtDecode } from "jwt-decode"; 
import { useDispatch, useSelector } from "react-redux";
import { getOrderDetailsByOrderId, getPayments, getAllPayments, deleteOrder } from "../../service/ordersService";
import { updateStatus, updatePaymentStatus, addReview, getReviewUser } from "../../service/purchase";
import { getUser } from "../../service/productService";


function TabOrderManagement() {
  const [search, setSearch] = useState('');
  const [filteredPayments, setFilteredPayments] = useState([]);
  const [modal, setModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 5;


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


  const token = useSelector(state =>state.auth.token)
  const [decoded, setDecoded] = useState(null);
  const [user, setUser] = useState(null);
  const [earliestPayments, setEarliestPayments] = useState([]);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        if (token) {
          const decodedToken = jwtDecode(token);
          setDecoded(decodedToken);
          if (decodedToken.sub !== null) {
            const userData = await getUser(decodedToken.sub);
            setUser(userData);
          }
        }
      } catch (error) {
        console.error("Invalid token:", error);
        setDecoded(null);
        setUser(null);
      }
    };

    fetchUser();
  }, [token]);

 useEffect(() => {
   const fetchPaymentsAndDetails = async () => {
     try {

         const payments = await getAllPayments();
         const sortedPayments = payments
           .filter(p => p.paymentDate)
           .sort((a, b) => b.paymentId - a.paymentId);

         const detailPromises = sortedPayments.map(payment =>
           getOrderDetailsByOrderId(payment.order.orderId)
         );


         const orderDetailsList = await Promise.all(detailPromises);

         const combined = sortedPayments.map((payment, index) => ({
           payment,
           products: orderDetailsList[index],
         }));
         setEarliestPayments(combined);
     } catch (error) {
       console.error("Lỗi khi lấy thanh toán và sản phẩm:", error);
     }
   };

   fetchPaymentsAndDetails();
 }, [user]);



  useEffect(() => {
    const searchResults = earliestPayments.filter(paymentItem =>
      paymentItem.products.some(product =>
        product.productVariant.product.name.toLowerCase().includes(search.toLowerCase())
      )
    );
    setFilteredPayments(searchResults);
    // Reset pagination to the first page when search results change
    setCurrentPage(0);
  }, [search, earliestPayments]);

  const offset = currentPage * itemsPerPage;
  const paginatedPayments = filteredPayments.slice(offset, offset + itemsPerPage);
         console.log("dữ liệu alolo: ", paginatedPayments)

  const handlePageChange = (selectedPage) => {
    setCurrentPage(selectedPage.selected);
  };

  const exportToExcel = () => {
    const wb = XLSX.utils.book_new();
    const ws = XLSX.utils.json_to_sheet(filteredPayments);
    XLSX.utils.book_append_sheet(wb, ws, 'Danh sách đơn hàng');
    XLSX.writeFile(wb, 'DanhSachDonHang.xlsx');
  };

  // This function seems to be for adding/editing initialProducts, might not be needed anymore
  // const handleAddProduct = () => {
  //   if (selectedProduct) {
  //     const updated = products.map(product =>
  //       product.id === selectedProduct.id ? newProduct : product
  //     );
  //     setProducts(updated);
  //   } else {
  //     setProducts([...products, { ...newProduct, id: products.length + 1 }]);
  //   }
  //   setModal(false);
  //   setSelectedProduct(null);
  //   setNewProduct({
  //     image: '',
  //     name: '',
  //     category: '',
  //     price: '',
  //     p_discount: '',
  //     size: '',
  //     color: '',
  //     customer: '',
  //     quantity: ''
  //   });
  // };

  const handleChangePaymentStatus = async (orderId, newStatus) => {
    try {
      // Call the API to update the payment status
      await updatePaymentStatus(orderId, newStatus);
      // Update the local state to reflect the change immediately
      setEarliestPayments(prevPayments =>
        prevPayments.map(paymentItem => {
          if (paymentItem.payment.order.orderId === orderId) {
            return {
              ...paymentItem,
              payment: {
                ...paymentItem.payment,
                paymentStatus: newStatus,
              },
            };
          }
          return paymentItem;
        })
      );
      console.log(`Payment status for Order ID ${orderId} updated to ${newStatus}`);
    } catch (error) {
      console.error(`Error updating payment status for Order ID ${orderId}:`, error);
      // Handle errors, e.g., show a notification to the user
    }
  };

  const handleChangeOrderStatus = async (orderId, newStatus) => {
    try {
      // Call the API to update the order status
      await updateStatus(orderId, newStatus);
      // Update the local state to reflect the change immediately
      setEarliestPayments(prevPayments =>
        prevPayments.map(paymentItem => ({
          ...paymentItem,
          products: paymentItem.products.map(product => {
            if (product.order.orderId === orderId) {
              return {
                ...product,
                order: {
                  ...product.order,
                  status: newStatus,
                },
              };
            }

             
            return product;
          }),
        }))
      );
      console.log(`Order status for Order ID ${orderId} updated to ${newStatus}`);
    } catch (error) {
      console.error(`Error updating order status for Order ID ${orderId}:`, error);
      // Handle errors
    }
  };

  const handleDeleteProduct = async (orderId) => {
    if (window.confirm('Bạn có chắc muốn xóa đơn hàng này không?')) {
      try {
        // Call the API to delete the order
        await deleteOrder(orderId);
        // Update the local state by removing the deleted order
        setEarliestPayments(prevPayments =>
          prevPayments.filter(paymentItem => paymentItem.payment.order.orderId !== orderId)
        );
        console.log(`Order with ID ${orderId} deleted successfully`);
      } catch (error) {
        console.error(`Error deleting order with ID ${orderId}:`, error);
        // Handle errors
      }
    }
  };

  const toggleModal = (product = null) => {
    console.log("product: ", product)
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

  const paymentStatusOptions = [
    { value: 'Đã thanh toán', label: 'Đã thanh toán' },
    { value: 'Chưa thanh toán', label: 'Chưa thanh toán' },
    { value: 'Đã huỷ', label: 'Đã huỷ' }
  ];

  const orderStatusOptions = [
    {
      value: 'Đã huỷ', label: 'Đã huỷ'
    },

    {
      value: 'Đang chuẩn bị', label: 'Đang chuẩn bị'
    },

    {
      value: 'Đang vận chuyển', label: 'Đang vận chuyển'
    },

    {
      value: 'Chờ giao hàng', label: 'Chờ giao hàng'
    },

    {
      value: 'Hoàn thành', label: 'Hoàn thành'
    },
  ]

  return (
    <div className="order-management-container">
      <div className="text-center">
        <h3 className="page-title">Quản lý đơn hàng</h3>
      </div>

      <div className="top-controls">
        {/* Removed Add order button as add/edit modal is commented out */}
        {/* <Button color="success" onClick={() => toggleModal()} className="add-order-btn">
          <FaPlus /> Thêm đơn hàng
        </Button> */}
        <div className="search-bar">
          <Input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Tìm kiếm theo tên hoặc loại sản phẩm"
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
            <th>OrderId</th>
            <th>Sản phẩm</th>
            <th>Tên sản phẩm</th>
            <th>Ngày mua</th>
            <th>Người dùng</th>
            <th>Tổng giá</th>
            <th>Trạng thái thanh toán</th>
            <th>Trang thái giao hạng</th>
            <th>Thao tác</th>
          </tr>
        </thead>
        <tbody>
            {/* Use paginatedPayments for rendering */}
            {paginatedPayments.map((paymentItem, index) =>
              
              paymentItem.products.map((product, idx) => (
                <tr key={product.productVariant.product.productId || `${index}-${idx}`}>
                  <td>{product.order.orderId}</td>
                  <td>
                    <img src={"http://localhost:8080/images/" + product.productVariant.imageUrl || "https://via.placeholder.com/100"}  alt={product.productVariant.productName} className="order-product-img" style={{ width: '50px' }} />
                  </td>
                  <td>{product.productVariant.product.name.length > 10 ? product.productVariant.product.name.substring(0, 10) + '...' : product.productVariant.product.name}</td>
                  <td>{product.order.orderDate}</td>
                  <td>{product.order.user.username}</td>
                  <td>{product.order.totalAmount.toLocaleString()}</td>
                      <td>
                        <select
                          value={paymentItem.payment.paymentStatus} 
                          onChange={(e) =>
                            handleChangePaymentStatus(product.order.orderId, e.target.value)
                          }
                          className="payment-status-select"
                        >
                          {paymentStatusOptions.map((option) => (
                            <option key={option.value} value={option.value}>
                              {option.label}
                            </option>
                          ))}
                        </select>
                      </td>
                  <td>
                    <select
                    value={product.order.status}
                    className="payment-status-select"
                    onChange={(e) =>
                           handleChangeOrderStatus(product.order.orderId, e.target.value)
                         }
                    >
                      {orderStatusOptions.map((option) => (
                        <option key={option.value} value={option.value}>
                          {option.label}
                        </option>
                      ))}
                    </select>
                    </td>
                
                  <td style={{display:"flex"}}>
                    <Button color="warning" size="sm" onClick={() => toggleModal(product)}>
                      <FaEdit />
                    </Button>
                    <Button color="danger" size="sm" onClick={() => handleDeleteProduct(product.order.orderId)} style={{marginLeft: '10px'}}>
                      <FaTrashAlt />
                    </Button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
      </Table>

      <ReactPaginate
        previousLabel={'<<'}
        nextLabel={'>>'}
        breakLabel={'...'}
        // Use filteredPayments.length for page count calculation
        pageCount={Math.ceil(filteredPayments.length / itemsPerPage)}
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

      <Modal isOpen={modal} toggle={() => setModal(false)} className="custom-modal">
        <ModalHeader toggle={() => setModal(false)}>
          {selectedProduct ? 'Chỉnh sửa đơn hàng' : 'Thêm đơn hàng'}
          </ModalHeader>
        <ModalBody>
          <Form>
           
            <FormGroup>
              <Label for="name">Tên sản phẩm</Label>
              <Input
                type="text"
                id="name"
                // value={newProduct.name}
                // onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
                placeholder="Nhập tên sản phẩm"
                required
              />
            </FormGroup>
           
            <FormGroup>
              <Label for="price">Giá</Label>
              <Input
                type="number"
                id="price"
                // value={newProduct.price}
                // onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })}
                placeholder="Nhập giá sản phẩm"
                required
              />
            </FormGroup>
            <FormGroup>
              <Label for="p_discount">Giảm giá (%)</Label>
              <Input
                type="number"
                id="p_discount"
                // value={newProduct.p_discount}
                // onChange={(e) => setNewProduct({ ...newProduct, p_discount: e.target.value })}
                placeholder="Nhập % giảm giá"
                required
              />
            </FormGroup>
            <FormGroup>
              <Label for="size">Kích thước</Label>
              <Input
                type="text"
                id="size"
                // value={newProduct.size}
                // onChange={(e) => setNewProduct({ ...newProduct, size: e.target.value })}
                placeholder="Nhập kích thước"
                required
              />
            </FormGroup>
            <FormGroup>
              <Label for="color">Màu sắc</Label>
              <Input
                type="text"
                id="color"
                // value={newProduct.color}
                // onChange={(e) => setNewProduct({ ...newProduct, color: e.target.value })}
                placeholder="Nhập màu sắc"
                required
              />
            </FormGroup>
            <FormGroup>
              <Label for="customer">Khách hàng</Label>
              <Input
                type="text"
                id="customer"
                // value={newProduct.customer}
                // onChange={(e) => setNewProduct({ ...newProduct, customer: e.target.value })}
                placeholder="Nhập tên khách hàng"
                required
              />
            </FormGroup>
            <FormGroup>
              <Label for="quantity">Số lượng</Label>
              <Input
                type="number"
                id="quantity"
                // value={newProduct.quantity}
                // onChange={(e) => setNewProduct({ ...newProduct, quantity: e.target.value })}
                placeholder="Nhập số lượng"
                required
              />
            </FormGroup>
          </Form>
        </ModalBody>
        <ModalFooter>
          <Button color="secondary" 
          // onClick={() => setModal(false)          }
          >Hủy</Button>
          <Button color="primary" 
          // onClick={handleAddProduct}
          >
            {selectedProduct ? 'Cập nhật đơn hàng' : 'Thêm đơn hàng'}
          </Button>
        </ModalFooter>
      </Modal>
    </div>
  );
}

export default TabOrderManagement;
