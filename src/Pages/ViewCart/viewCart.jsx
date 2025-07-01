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
import { getVoucher } from "../../service/purchase";
import { useTranslation } from "react-i18next";


function ViewCart() {
    const navigate = useNavigate(); 
    const dispatch = useDispatch();
    const { t } = useTranslation();
    const [showVoucherModal, setShowVoucherModal] = useState(false);
    const [availableVouchers, setAvailableVouchers] = useState([]);
    const [selectedVoucherCode, setSelectedVoucherCode] = useState("");
    const [discount, setDiscount] = useState(0); 
    const firstBreadcrumb = { label: t("breadcrumb_home"), link: "/product-cart" };
    const secondBreadcrumb = {
        label: t("breadcrumb_cart"),
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

  console.log("selectedVoucherCode: ", selectedVoucherCode)
  
   const handleUpdateQuantity = async (variants) => {
      try {
        const currentQuantity = variants.quantity;
        const availableStock = variants.productVariants.stock;
    
        if (currentQuantity >= availableStock) {
          alert(t("product_max_quantity_reached"));
          return;
        }
    
        const result = await increaseCartIemQuantity(
          variants.cart.cartId,
          variants.productVariants.productVariantId
        );
    
        if (result) {
          dispatch(fetchCartItem(variants.cart.cartId));
        } else {
          alert(t("increase_quantity_failed"));
        }
      } catch (error) {
        console.error(t("increase_quantity_error"), error);
        alert(t("try_again_later"));
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

      
  useEffect(() => {
  if (selectedVoucherCode && selectedVoucherCode.code) {
    if (total >= selectedVoucherCode.minDiscount) {
      const discountAmount = Math.min(
        (selectedVoucherCode.discount / 100) * total,
        selectedVoucherCode.maxDiscount
      );
      setDiscount(discountAmount);
    } else {
      setDiscount(0); // Không đủ điều kiện để áp dụng voucher
    }
  } else {
    setDiscount(0); // Không có voucher nào được chọn
  }
}, [selectedVoucherCode, total]);



    
      const handleOrders = async (cartItemProduct) => {
        const productsInCart = Object.values(cartItemProduct);
      
        if (productsInCart.length === 0) {
          alert(t("empty_cart_alert"));
          return;
        }
      
        const cart = productsInCart[0].cart.cartId;
        const user = productsInCart[0].cart.user.userId;
      
        const totalAmount = productsInCart.reduce(
          (sum, item) => sum + item.productVariants.price * item.quantity,
          0
        );
      
        const order = {
          totalAmount: totalAmount - discount,
          status: "Đang chuẩn bị",
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
                navigate('/checkout', { state: { orderId, discount, totalAmount } })
            } else {
              alert(t("create_order_details_failed_alert"));
            }
          } else {
            alert(t("create_order_failed_alert"));
          }
        } catch (error) {
          console.error("Lỗi khi đặt hàng:", error);
          alert(t("place_order_error_alert"));
        }
      };

    const handleOpenVoucherModal = async () => {
        try {
            const data = await getVoucher();
            const activeVouchers = data.filter(item => item.active === true);
            setAvailableVouchers(activeVouchers);
            setShowVoucherModal(true);
        } catch (error) {
            console.error(t("error_fetching_vouchers"), error);
            alert(t("cannot_fetch_vouchers_alert"));
        }
    };

    const handleCloseVoucherModal = () => {
        setShowVoucherModal(false);
    };

    

    return (
        <div className="page-wrapper">
            <PageHeading
                title={t("page_title_cart")}
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
                                                    {t("table_header_product")}
                                                </th>
                                                <th className="h5 mb-0 py-3 font-w-6" scope="col">
                                                    {t("table_header_price")}
                                                </th>
                                                <th className="h5 mb-0 py-3 font-w-6" scope="col">
                                                    {t("table_header_size")}
                                                </th>
                                                <th className="h5 mb-0 py-3 font-w-6" scope="col">
                                                    {t("table_header_quantity")}
                                                </th>
                                                <th className="h5 mb-0 py-3 font-w-6" scope="col">
                                                    {t("table_header_color")}
                                                </th>
                                                <th className="h5 mb-0 py-3 font-w-6" scope="col">
                                                    {t("table_header_remove")}
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
                                        <label className="text-black h5 mb-2" htmlFor="coupon">{t("voucher_label")}</label>
                                        <p className="mb-2">{t("voucher_text")}</p>
                                        <div className="row form-row gx-2">
                                            <div className="col">
                                                <input className="form-control rounded-3 shadow-sm" id="coupon" placeholder={t("voucher_placeholder")} type="text"  value={selectedVoucherCode.code}onChange={(e) => setSelectedVoucherCode(e.target.value)}/>
                                            </div>
                                            <div className="col-auto">
                                                <button className="btn btn-dark btn-animated rounded-3 px-4" onClick={handleOpenVoucherModal}>
                                                    {t("apply_voucher_button")}
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </Col>
                            <Col lg="4" className="mt-5 mt-lg-0 ps-lg-10">
                                <div className="cart-totals-card bg-light">
                                    <div className="bg-white p-4 rounded-4 shadow-sm">
                                        <h4 className="text-dark text-center mb-3">{t("cart_summary_title")}</h4>
                                        <div className="d-flex justify-content-between align-items-center border-bottom py-3">
                                            <span className="text-muted">{t("cart_summary_subtotal")}</span>
                                            <span className="text-primary">{total.toLocaleString("vi-VN")} ₫</span>
                                        </div>
                                        <div className="d-flex justify-content-between align-items-center border-bottom py-3">
                                            <span className="text-muted">{t("cart_summary_discount")}</span>
                                            <span className="text-dark">{discount.toLocaleString("vi-VN")} ₫</span>
                                            </div>
                                            <div className="d-flex justify-content-between align-items-center pt-3 mb-4">
                                            <span className="text-dark h5">{t("cart_summary_total")}</span>
                                            <span className="text-primary font-weight-bold h5">
                                                {(total - discount).toLocaleString("vi-VN")} ₫
                                            </span>
                                            </div>

                                        <Button className="btn btn-dark btn-lg w-100 rounded-3 mb-2 shadow-sm" 
                                        
                                        onClick={() => {
                                            handleOrders(cartItemProduct)
                                        }}
                                        >
                                           {t("place_order_button")}
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
            {/* modal voucher */}
            {showVoucherModal && (
                <div className="modal-overlay">
                    <div className="modal-content_2">
                        <button className="modal-close-btn" onClick={handleCloseVoucherModal}>{t("voucher_modal_close")}</button>
                        <h2>{t("voucher_modal_title")}</h2>
                        <div className="voucher-list">
                            {availableVouchers.length === 0 ? (
                                <div className="empty-order" style={{marginTop: "20px"}}>
                                    <div>{t("no_vouchers_available")}</div>
                                </div>
                            ) : (
                                availableVouchers.map((v, index) => (
                                  <div className="voucher-item" key={index}>
                                    <div className="voucher-left">
                                      <div className="voucher-logo">
                                        <span>LOGO</span>
                                      </div>
                                      <div className="voucher-shop-name">{v.voucherName || "Shopee Style"}</div>
                                    </div>
                                    <div className="voucher-right">
                                      <div className="voucher-details">
                                        <span className="voucher-title" style={{fontSize: "12px"}}>{v.description || (v.discountPercentage ? `Giảm ${v.discountPercentage}% Giảm tối đa` : t("voucher_discount_placeholder"))}</span>
                                        <div className="voucher-discount" style={{fontSize: "12px"}}>₫{v.maxDiscount || v.discountAmount || 'N/A'}k</div>
                                        <div className="voucher-min-spend">{t("min_spend")} {v.maxDiscount || 0}k</div>
                                        <div className="voucher-expiry">{t("expires")}: {v.startDate ? new Date(v.startDate).toLocaleDateString('vi-VN') : 'N/A'}</div>

                                      </div>
                                      <div className="voucher-actions">
                                         <button className="voucher-apply-btn"  onClick={() => {
                                                setSelectedVoucherCode(v); 
                                                setShowVoucherModal(false); 
                                            }}>{t("use_button")}</button>
                                         {v.usageLimit && <span className="voucher-usage-limit">x {v.usageLimit}</span>}
                                      </div>
                                    </div>
                                  </div>
                                ))
                            )}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default ViewCart;
