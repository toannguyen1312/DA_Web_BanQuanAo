import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import PageHeading from "../../Components/PageHeading/PageHeading";
import { increaseCartIemQuantity,  decreaseCartIemQuantity} from "../../service/cartService";
import { fetchCartItem } from "../../store/reducer/selectedCartItem";
import { removeCartItem } from "../../store/reducer/selectedCartItem";
import { createOrders, createOrderDetails, deleteCartItem } from "../../service/ordersService";
import { useNavigate } from 'react-router-dom'
import {
    Col,
    Row,
    Container,
    Input,
    Table,
    Button
} from "reactstrap";
import { Link } from "react-router-dom";
import '../../assets/css/product/viewCart.css';


function ViewCart() {
    const navigate = useNavigate(); 
    const dispatch = useDispatch();
    const firstBreadcrumb = { label: "Trang", link: "/product-cart" };
    const secondBreadcrumb = {
        label: "Giỏ Hàng",
        link: "/product-cart",
        active: true,
    };

const cartItem = useSelector(state => state.fetchCartItemSlice.SelectedCartItem)
const [cartItemProduct, setCartItemProduct] = useState([]);


useEffect(() => {
    async function fetchProduct() {
      if(cartItem.result) {
        const productMap = {};
        for(const item of cartItem.result) {
          const cartItemId = item.cartItemId;
          productMap[cartItemId] = item; 
        }
        setCartItemProduct(productMap)
      }
    }
  
    fetchProduct();
  }, [cartItem]);
  

   const handleUpdateQuantity = async (variants) => {
      try {
        const currentQuantity = variants.quantity;
        const availableStock = variants.productVariants.stock;
    
        if (currentQuantity >= availableStock) {
          alert("Sản phẩm đã đạt số lượng tối đa trong kho.");
          return;
        }
    
        const result = await increaseCartIemQuantity(
          variants.cart.cartId,
          variants.productVariants.productVariantId
        );
    
        if (result) {
          dispatch(fetchCartItem(variants.cart.cartId));
        } else {
          alert("Không thể tăng số lượng sản phẩm. Vui lòng thử lại.");
        }
      } catch (error) {
        console.error("Lỗi khi tăng số lượng sản phẩm:", error);
        alert("Đã xảy ra lỗi. Vui lòng thử lại sau.");
      }
    };


     const handleDecreaseQuantity = async (variants) => {
        const result = await decreaseCartIemQuantity(
          variants.cart.cartId,
          variants.productVariants.productVariantId
        );
        if (result) {
          dispatch(fetchCartItem(variants.cart.cartId));
    
        }
      }

      const total = Object.values(cartItemProduct).reduce(
        (sum, item) => sum + item.productVariants.price * item.quantity,
        0
      );


      const handleOrders = async (cartItemProduct) => {
        const productsInCart = Object.values(cartItemProduct);
      
        if (productsInCart.length === 0) {
          alert("Giỏ hàng đang trống!");
          return;
        }
      
        const cart = productsInCart[0].cart.cartId;
        const user = productsInCart[0].cart.user.userId;
      
        const totalAmount = productsInCart.reduce(
          (sum, item) => sum + item.productVariants.price * item.quantity,
          0
        );
      
        const order = {
          totalAmount: totalAmount,
          status: "Đang chuẩn bị hàng",
          date: new Date().toISOString().slice(0, 10), // yyyy-mm-dd
          userId: user,
          cartId: cart,
        };

      
        try {
          const orderResponse = await createOrders(order);
          console.log("reponse: ", orderResponse)
      
          if (orderResponse && orderResponse.orderId) {
            const orderId = orderResponse.orderId;
            const orderDetails = productsInCart.map((item) => ({
              quantity: item.quantity,
              order: orderId,
              productVariant: item.productVariants.productVariantId
              
            }));

            const detailResult = await createOrderDetails(orderDetails);
      
            if (detailResult) {
                navigate('/checkout', { state: { orderId } })
            } else {
              alert("Tạo chi tiết đơn hàng thất bại.");
            }
          } else {
            alert("Tạo đơn hàng thất bại.");
          }
        } catch (error) {
          console.error("Lỗi khi đặt hàng:", error);
          alert("Đã xảy ra lỗi khi đặt hàng.");
        }
      };

    return (
        <div className="page-wrapper">
            <PageHeading
                title="Giỏ Hàng"
                firstBreadcrumb={firstBreadcrumb}
                secondBreadcrumb={secondBreadcrumb}
            />
            <div className="page-content">
                <section>
                    <Container>
                        <Row>
                            <Col lg={8}>
                                <div className="table-responsive">
                                    <Table className="cart-table text-center mb-5 table-bordered shadow-sm rounded-4 overflow-hidden">
                                        <thead className="bg-light">
                                            <tr>
                                                <th className="h5 mb-0 py-3 font-w-6" scope="col">
                                                    Product
                                                </th>
                                                <th className="h5 mb-0 py-3 font-w-6" scope="col">
                                                    Price
                                                </th>
                                                <th className="h5 mb-0 py-3 font-w-6" scope="col">
                                                    Size
                                                </th>
                                                <th className="h5 mb-0 py-3 font-w-6" scope="col">
                                                    Quantity
                                                </th>
                                                <th className="h5 mb-0 py-3 font-w-6" scope="col">
                                                    Color
                                                </th>
                                                <th className="h5 mb-0 py-3 font-w-6" scope="col">
                                                    Remove
                                                </th>
                                            </tr>
                                        </thead>

                                        <tbody className="border-top-0">
                                        {Object.entries(cartItemProduct).map(([productId, variants]) => (

                                                <tr className="align-middle" key={productId}>
                                                    <td>
                                                        <div className="d-md-flex align-items-center">
                                                            <Link to="#">
                                                                <img
                                                                    className="img-fluid rounded me-lg-3 mb-2 mb-lg-0 cart-img-hover"
                                                                    style={{ height: "90px", width: "200px", objectFit: "cover", boxShadow: "0 2px 8px rgba(0,0,0,0.10)" }}
                                                                    src={`http://localhost:8080/images/${variants.productVariants.imageUrl}`}
                                                                />
                                                            </Link>
                                                            <div className="text-start ms-2">
                                                                <div
                                                                    className="product-name link-title h6 mb-0"
                                                                    style={{
                                                                        display: "-webkit-box",
                                                                        WebkitLineClamp: 4,
                                                                        WebkitBoxOrient: "vertical",
                                                                        overflow: "hidden",
                                                                        textOverflow: "ellipsis",
                                                                        fontSize: "14px",
                                                                        cursor: "pointer"
                                                                      }}
                                                                >
                                                                    {variants.productVariants.product.name}
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </td>
                                                    <td style={{padding: "0px"}}>
                                                        <h6 className="mb-0 link-title" style={{fontSize: "13px", cursor: "pointer"}}>{variants.productVariants.price.toLocaleString("vi-VN")} ₫</h6>
                                                    </td>
                                                    <td>
                                                        <span className="badge bg-secondary" style={{fontSize: "15px"}}>{variants.productVariants.size}</span>
                                                    </td>
                                                    <td>
                                                        <div className="d-flex justify-content-center align-items-center gap-2">
                                                            <Button
                                                                className="btn-product btn-product-up shadow-sm"
                                                                onClick={() =>
                                                                    handleDecreaseQuantity(variants)
                                                                  }
                                                            >
                                                                <i className="las la-minus"></i>
                                                            </Button>
                                                            <Input
                                                                className="form-product text-center rounded-3 border-0 shadow-sm"
                                                                type="number"
                                                                name="form-product"
                                                                style={{ width: '60px' }}
                                                                disabled
                                                                value={variants.quantity}
                                                            />
                                                            <Button
                                                                className="btn-product btn-product-down shadow-sm"
                                                                onClick={() => handleUpdateQuantity(variants)}
                                                            >
                                                                <i className="las la-plus"></i>
                                                            </Button>
                                                        </div>
                                                    </td>
                                                    <td>
                                                        <h6 className="mb-0">
                                                            {variants.productVariants.color}
                                                        </h6>
                                                    </td>
                                                    <td className="border-right-0">
                                                        <button
                                                            type="submit"
                                                            className="btn btn-danger btn-sm ms-2 rounded-circle shadow-sm"
                                                             onClick={() =>
                                                                dispatch(removeCartItem({
                                                                cartID: variants.cart.cartId,
                                                                CartItemID: variants.cartItemId
                                                                }))
                                                            }
                                                        >
                                                            <i className="las la-times"></i>
                                                        </button>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </Table>
                                </div>
                                <div className="d-md-flex align-items-end justify-content-between border-top pt-5 gap-4 flex-wrap">
                                    <div className="w-100 w-md-50 mb-3 mb-md-0">
                                        <label className="text-black h5 mb-2" htmlFor="coupon">Phiếu giảm giá</label>
                                        <p className="mb-2">Nhập mã phiếu giảm giá nếu bạn có.</p>
                                        <div className="row form-row gx-2">
                                            <div className="col">
                                                <input className="form-control rounded-3 shadow-sm" id="coupon" placeholder="Mã phiếu giảm giá" type="text" />
                                            </div>
                                            <div className="col-auto">
                                                <button className="btn btn-dark btn-animated rounded-3 px-4">Áp dụng phiếu giảm giá</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </Col>
                            <Col lg="4" className="mt-5 mt-lg-0 ps-lg-10">
                                <div className="cart-totals-card bg-light">
                                    <div className="bg-white p-4 rounded-4 shadow-sm">
                                        <h4 className="text-dark text-center mb-3">Tổng số giỏ hàng</h4>
                                        <div className="d-flex justify-content-between align-items-center border-bottom py-3">
                                            <span className="text-muted">Tổng thu</span>
                                            <span className="text-primary">{total.toLocaleString("vi-VN")} ₫</span>
                                        </div>
                                        <div className="d-flex justify-content-between align-items-center border-bottom py-3">
                                            <span className="text-muted">Thếu</span>
                                            <span className="text-dark">0%</span>
                                        </div>
                                        <div className="d-flex justify-content-between align-items-center pt-3 mb-4">
                                            <span className="text-dark h5">Tổng tiền:</span>
                                            <span className="text-primary font-weight-bold h5">
                                            {total.toLocaleString("vi-VN")} ₫
                                            </span>
                                        </div>
                                        <Button className="btn btn-dark btn-lg w-100 rounded-3 mb-2 shadow-sm" 
                                        
                                        onClick={() => {
                                            handleOrders(cartItemProduct)
                                        }}
                                        >
                                           Đặt Hàng
                                        </Button>
                                        
                                    </div>
                                </div>
                            </Col>
                        </Row>
                        <Row className="mt-8">
                            <Col lg={6}>

                            </Col>

                        </Row>
                    </Container>
                </section>
                {/* <Contact /> */}
            </div>
        </div>
    );
}

export default ViewCart;
