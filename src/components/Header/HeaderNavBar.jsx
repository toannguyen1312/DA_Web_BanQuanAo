import React from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { jwtDecode } from "jwt-decode"; 
import "../../assets/css/header/HeaderNavBar.css"
import { useState, useEffect } from "react";
import { logout } from "../../store/reducer/authSlice"; 
import { getProductVariant } from "../../service/productService"
import {removeWishListItem} from "../../store/reducer/selectedWishList"
import { getUser } from "../../service/productService";
import { toggleCart } from "../../store/reducer/cartOpen";
import {removeCartItem} from "../../store/reducer/selectedCartItem"
import { resetCartItemState  } from "../../store/reducer/selectedCartItem";
import { resetWishListState  } from "../../store/reducer/selectedWishList";
import { increaseCartIemQuantity, decreaseCartIemQuantity } from "../../service/cartService";
import { fetchCartItem } from "../../store/reducer/selectedCartItem";
import { useNavigate } from 'react-router-dom'
import {
  Button,
  Col,
  Container,
  Modal,
  ModalBody,
  Row
} from "reactstrap";
import "../../assets/css/bootstrap.min.css"
import CatalogDropDown from "./CatalogDropDown";
import ShopDropdown from "./DropDownMenuBarTable";
import DropdownMenuNavBar from "./DropDownMenuNavBar";
import { useTranslation } from "react-i18next";

export default function HeaderNavBar() {

  const dispatch = useDispatch();
  const { t } = useTranslation();
  const navigate = useNavigate(); 
  const token = useSelector(state =>state.auth.token)
  const wishList = useSelector(state => state.fetchWishListSlice.SelectedWishList)
  const cartItem = useSelector(state => state.fetchCartItemSlice.SelectedCartItem)

  const [wishListOpen, setWishListOpen] = useState(false);
  const cartOpen = useSelector((state) => state.cartUi.isCartOpen);
  const togglewWishList = () => setWishListOpen(!wishListOpen);
  const toggleCartList = () => dispatch(toggleCart());
  const [wishListProduct, setWishListProduct] = useState([]);
  const [cartItemProduct, setCartItemProduct] = useState([]);
  
  useEffect(() => {
    async function fetchProduct() {
      if (wishList.result) {
        const productMap = {};
        for (const item of wishList.result) {
          const productId = item.product.productId;
          const variants = await getProductVariant(productId);
  
          productMap[productId] = variants; // gán theo từng ID
        }
        setWishListProduct(productMap); // object có key là productId
      }

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
  }, [wishList, cartItem]);
  
  const [decoded, setDecoded] = useState(null);
  const [user, setUser] = useState(null);

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




  const handleLogout = async () => {
    dispatch(resetCartItemState());
    dispatch(resetWishListState());
    setWishListProduct([])
    setCartItemProduct([])
    dispatch(logout({token: token})); 
    setUser(null);    
    setDecoded(null);   
  };

  // const cartItems1 = useSelector((state) => state.products.cart);
  // const calculateTotal = () => {
  //   return cartItems1.reduce((total, item) => {
  //     const itemTotal = item.quantity * item.salePrice;
  //     return total + itemTotal;
  //   }, 0);
  // };

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

const handleLinkYear = (e, year) => {
  e.preventDefault(); // chặn reload nếu cần
  const queryParams = new URLSearchParams();
  queryParams.set("year", year);

  navigate(`/search-year?${queryParams.toString()}`);
};


  return (
    <div>
      <header className="site-header">
        <div id="header-wrap" className="shadow-sm">
          <Container className="container">
            <Row>
              {/* <!--menu start--> */}
              <Col>
                <nav className="navbar navbar-expand-lg navbar-light position-static">
                  <Link className="navbar-brand logo d-lg-none" to="/">
                    <img className="img-fluid" src="assets/images/logo.png" alt="" />
                  </Link>
                  <button
                    className="navbar-toggler"
                    type="button"
                    data-toggle="collapse"
                    data-target="#navbarNav"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                  >
                    <span className="navbar-toggler-icon"></span>
                  </button>
                  <div className="collapse navbar-collapse" id="navbarNav" style={{cursor: "pointer"}}>
                    <ul className="navbar-nav" >
                      <div className="position-relative">
                        <Link className="nav-item" to="/" style={{color: "black"}}>{t("new_arrivals")}</Link>
                        <span className="hot-badge">{t("hot")}</span>
                      </div>
                      <li className="nav-item dropdown">
                        {t("collection")}
                        <div className="dropdown-content">
                          <Link onClick={(e) => handleLinkYear(e, "2025")}>{t("collection_2025")}</Link>
                          <Link onClick={(e) => handleLinkYear(e, "2024")}>{t("collection_2024")}</Link>
                          <Link onClick={(e) => handleLinkYear(e, "2023")}>{t("collection_2023")}</Link>
                        </div>
                      </li>

                      <li className="nav-item dropdown">
                        {t("menShirts")}
                        <div className="dropdown-content">

                          <Link to="shop-grid-left-sidebar" state={{ title: "Áo Sơ Mi", categoryID: "2" }}>{t("men_shirts_dress")}</Link>
                          {/* <a href="#">Áo thun</a> */}
                          <Link to="shop-grid-left-sidebar" state={{ title: "Áo Khoác",  categoryID: "3" }}>{t("men_shirts_jacket")}</Link>
                        </div>
                      </li>

                      <li className="nav-item dropdown">
                          {t("menPants")}
                          <div className="dropdown-content">
                          <Link to="shop-grid-left-sidebar" state={{ title: "Quần Jeans",  categoryID: "4" }}>{t("men_pants_jeans")}</Link>
                          <Link to="shop-grid-left-sidebar" state={{ title: "Quần Short",  categoryID: "5" }}>{t("men_pants_short")}</Link>
                            <a href="#">{t("men_pants_trousers")}</a>
                          </div>
                        </li>

                        <li className="nav-item dropdown">
                          {t("accessories")}
                          {/* <div className="dropdown-content">
                            <a href="#">{t("accessories_backpack")}</a>
                            <a href="#">{t("accessories_handbag")}</a>
                            <a href="#">{t("shoes")}</a>
                          </div> */}
                        </li>
                        <div className="position-relative">
                          <Link className="nav-item" style={{color:"black"}} to="selectProductDiscounted">{t("outlet_sale")}</Link>
                        <span className="hot-badge">{t("hot")}</span>
                        </div>
                    </ul>
                  </div>
                  <div className="right-nav align-items-center d-flex justify-content-end">

                    <div className="user-info-wrapper " style={{ paddingRight: "10px" }}>
                      {token ?  (
                         <div className="dropdown login-btn btn-link ms-3 d-flex align-items-center text-dark text-decoration-none">
                            <i className="las la-user-alt me-1" style={{fontSize: "27px"}}></i>
                            <div>{decoded?.sub}</div>
                            <div className="dropdown-content">
                              <a href="#">{t("my_account")}</a>
                              <Link to="my-purchase">{t("my_purchases")}</Link>
                              <a href="#"onClick={handleLogout}>{t("logout")}</a>
                            </div>
                        </div>
                      ) : ( 
                      <Link
                        className="login-btn btn-link ms-3 d-flex align-items-center text-dark text-decoration-none"
                        to="/login"
                      >
                        <i className="las la-user-alt me-1"></i>
                        {/* <div >{decoded.sub}</div> */}
                      </Link>
                      )}

                    </div>

                    <Link className="wishlist-btn btn-link ms-3"
                     onClick={togglewWishList}
                    >
                      <div className="icon-with-badge">
                        <i className="lar la-heart"></i>
                        <span className="badge">{wishList?.result?.length || 0}</span>
                      </div>
                    </Link>

                    <Link className="d-flex align-items-center ms-3 mx-1"
                      onClick={toggleCartList}
                    >
                      <span className="bg-white px-2 py-1 rounded">
                        <div className="icon-with-badge">
                          <i className="las la-shopping-cart"  style={{fontSize: "27px"}}></i>
                          <span className="badge">{cartItem?.result?.length || 0}</span>
                          </div>
                      </span>
                    
                    </Link>

                    <div>
                      <div className="ml-4 d-none d-md-block"> 
                        <small className="d-block text-muted">{t("cart")}</small>
                        <span className="text-dark">{cartItem?.result?.length || 0} {t("products")} - <span className="text-primary"  style={{fontSize: "14px"}}>{total.toLocaleString("vi-VN")} ₫</span></span>
                      </div>
                    </div>
                  </div>              
                </nav>
              </Col>
            </Row>
          </Container>
        </div>
      </header>

      <Modal
        isOpen={cartOpen}
        toggle={toggleCartList}
        className="cart-modal"
       
      >
        <div style={{width: "none"}}>
          <Row>
            <Col xs={9} className="py-4 align-item-center">
              {" "}
              <h5 className=" px-4">
                    {t("cart_modal_title")} ({cartItem?.result?.length || 0})
              </h5>
            </Col>
            <Col xs={2} className=" align-items-center justify-content-end ">
              {" "}
              <Button
                className="btn btn-primary btn-sm ml-6 mt-4 fs-3"
                onClick={toggleCartList}
              >
                <i className="las la-times"></i>
              </Button>
            </Col>
    
          </Row>
        </div>
        <ModalBody>
        {Object.entries(cartItemProduct).map(([productId, variants]) => (
          
            <div key={productId}>
              <Row className="align-items-center mb-5">
                {/* Image + Remove Button */}
                <Col xs="4" className="d-flex align-items-center">
                  <Button
                    type="button"
                    color="danger"
                    size="sm"
                    className="mr-3"
                    onClick={() =>
                      dispatch(removeCartItem({
                        cartID: variants.cart.cartId,
                        CartItemID: variants.cartItemId
                      }))
                    }
                  >
                    <i className="las la-times"></i>
                  </Button>
                  <Link>
                    <img
                      className="img-fluid rounded"
                      src={`http://localhost:8080/images/${variants.productVariants.imageUrl}`}
                      alt="..."
                      style={{ width: "80px", height: "80px", objectFit: "cover" }}
                    />
                  </Link>
                </Col>

                {/* Product Info */}
                <Col xs="8">
                  <h6 className="mb-2">
                    <div
                      className="link-title"
                      style={{
                        display: "-webkit-box",
                        WebkitLineClamp: 2,
                        WebkitBoxOrient: "vertical",
                        overflow: "hidden",
                        textOverflow: "ellipsis"
                      }}
                    >
                      {variants.productVariants.product.name}
                    </div>
                  </h6>
                  
                  <div className="d-flex justify-content-between align-items-center">
                    {/* Price */}
                    <span className="text-primary font-weight-bold">
                      {variants.productVariants.price.toLocaleString("vi-VN")} ₫
                    </span>

                    {/* Quantity controls */}
                    <div className="d-flex align-items-center">
                      <Button
                        size="sm"
                        color="light"
                        className="px-2"
                        onClick={() =>
                          handleDecreaseQuantity(variants)
                        }
                      >
                        <i className="las la-minus"></i>
                      </Button>
                      <span className="mx-2">{variants.quantity}</span>
                      <Button
                        size="sm"
                        color="light"
                        className="px-2"
                        onClick={() => handleUpdateQuantity(variants)}
                      >
                        <i className="las la-plus"></i>
                      </Button>
                    </div>
                  </div>
                </Col>
              </Row>
            </div>
          ))}

          <hr className="my-5" />
          <div className="d-flex justify-content-between align-items-center mb-8">
            <span className="text-muted">{t("total_amount")}:</span>
            <span className="text-dark text-primary">{total.toLocaleString("vi-VN")} ₫</span>
          </div>
          <div  className="d-flex justify-content-between align-items-center">
          <Link
            to="/view-cart"
            className="btn btn-primary btn-animated mr-2"
          >
            <i className="las la-shopping-cart mr-1"></i>{t("view_cart")}
          </Link>
          <Link to="/product-checkout" className="btn btn-dark">
            <i className="las la-money-check mr-1"></i>{t("continue_to_checkout")}
          </Link>
          </div>
        </ModalBody>
      </Modal>



      <Modal
        className="cart-modal"
        direction="end"
        isOpen={wishListOpen}
        toggle={togglewWishList}
      >
        <div>
          <Row>
            <Col xs={9} className="py-4 align-items-center">
              {" "}
              <h5 className=" px-4">
                {t("wishlist_modal_title")} ({wishList?.result?.length || 0})
              </h5>
            </Col>
            <Col xs={3} className="align-items-center">
              {" "}

              <Button
                className="btn btn-primary btn-sm ml-6 mt-4 fs-3"
                onClick={togglewWishList}
              >
                <i className="las la-times"></i>
              </Button>
            </Col>
          </Row>
        </div>



        <ModalBody className="">
          {Object.entries(wishListProduct).map(([productId, variants]) => {
           if (variants.length > 0) {
            const firstVariant = variants[0]; // Lấy 1 biến thể làm đại diện
              return (
                <div key={productId}>
                  <Row className="align-items-center my-4">
                    <Col xs={5} className="d-flex align-items-center">

                      <div className="mr-4">
                        <Button
                          type="submit"
                          className="btn btn-primary btn-sm"
                          onClick={() => {

                            if (!user || !token) {
                              alert(t("wishlist_login_required"));
                              return;
                            }

                            dispatch(
                              removeWishListItem({
                              productId: firstVariant.product.productId,
                              userId: user.userId,
                              
                            })
                          );
                          }}
                        >
                          <i className="las la-times"></i>
                        </Button>
                      </div>
                      <div>
                        <img
                          className="img-fluid"
                          src={firstVariant.imageUrl}
                          alt="..."
                        />
                      </div>
                    </Col>
                    <Col xs={5}>
                    <h6>
                      <div
                        className="link-title"
                        style={{
                          display: "-webkit-box",
                          WebkitLineClamp: 2,
                          WebkitBoxOrient: "vertical",
                          overflow: "hidden",
                          textOverflow: "ellipsis"
                        }}
                      >
                        {firstVariant.product.name}
                      </div>
                    </h6>

                      <div className="product-meta">
                        <span className="mx-2 text-primary">
                          {firstVariant.price.toLocaleString('vi-VN')} ₫
                        </span>
                        <span className="text-muted">x 1</span>
                      </div>
                      <div className="product-meta"></div>
                    </Col>
                    <Col xs={2} className="d-flex align-items-center mt-4">
                      <span
                        // onClick={() => handleAddToCart(product)}
                        className="mx-2 btn text-white fs-1 ms-auto "
                      >
                        <i className="las la-shopping-cart"></i>
                      </span>
                    </Col>
                  </Row>
                </div>
              );
            }

             return null;
           })} 
          {/* <hr className="my-5" />
          <div className="d-flex justify-content-between align-items-center mb-8">
            <span className="text-muted">Subtotal:</span>
            <span className="text-white">${subtotal.toFixed(2)}</span>
          </div>
          <div className="d-flex justify-content-between align-items-center">
            <Link
              to="/product-cart"
              className="btn btn-primary btn-animated mr-2"
            >
              <i className="las la-shopping-cart mr-1"></i>View Cart
            </Link>
            <Link to="/product-checkout" className="btn btn-dark">
              <i className="las la-money-check mr-1"></i>Continue To Checkout
            </Link>
          </div> */}
        </ModalBody>
      </Modal>
     
    </div>
  );
}
