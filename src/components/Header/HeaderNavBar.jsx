import React from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { jwtDecode } from "jwt-decode"; 
import "../../assets/css/header/HeaderNavBar.css"
import { useState } from "react";
import { logout } from "../../store/reducer/authSlice"; 
import {
  Button,
  Col,
  Container,
  Modal,
  ModalBody,
  Row
} from "reactstrap";
// import "../../assets/css/bootstrap.min.css"
import CatalogDropDown from "./CatalogDropDown";
import ShopDropdown from "./DropDownMenuBarTable";
import DropdownMenuNavBar from "./DropDownMenuNavBar";

export default function HeaderNavBar() {

  const dispatch = useDispatch();
  const token = useSelector(state =>state.auth.token)
  let decoded = null;
  const [wishListOpen, setWishListOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const togglewWishList = () => setWishListOpen(!wishListOpen);
  const toggleCartList = () => setCartOpen(!cartOpen);

  try {
    if (token) {
      decoded = jwtDecode(token);
    } else {
      decoded = null;
    }
  } catch (error) {
    console.error("Invalid token:", error);
    decoded = null;
  }
  
  const handleLogout = () => {
    dispatch(logout({token: token})); 
  };


  // const cartItems1 = useSelector((state) => state.products.cart);
  // const calculateTotal = () => {
  //   return cartItems1.reduce((total, item) => {
  //     const itemTotal = item.quantity * item.salePrice;
  //     return total + itemTotal;
  //   }, 0);
  // };
 
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
                      <li className="nav-item">HÀNG MỚI VỀ</li>
                        <span className="hot-badge">Hot</span>
                      </div>
                      <li className="nav-item dropdown">
                        BỘ SƯU TẬP
                        <div className="dropdown-content">
                          <a href="#">Bộ sưu tập 2025</a>
                          <a href="#">Bộ sưu tập 2024</a>
                          <a href="#">Bộ sưu tập 2023</a>
                        </div>
                      </li>

                      <li className="nav-item dropdown">
                        ÁO NAM
                        <div className="dropdown-content">
                          <a href="#">Áo thun</a>
                          <a href="#">Áo sơ mi</a>
                          <a href="#">Áo khoác</a>
                        </div>
                      </li>

                      <li className="nav-item dropdown">
                          QUẦN NAM
                          <div className="dropdown-content">
                            <a href="#">Quần jeans</a>
                            <a href="#">Quần short</a>
                            <a href="#">Quần tây</a>
                          </div>
                        </li>

                        <li className="nav-item dropdown">
                          PHỤ KIỆN
                          <div className="dropdown-content">
                            <a href="#">Ba lo</a>
                            <a href="#">Túi xách</a>
                            <a href="#">Giày</a>
                          </div>
                        </li>
                        <div className="position-relative">
                          <li className="nav-item">OUTLET SALE</li>
                        <span className="hot-badge">Hot</span>
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
                              <a href="#">Tài Khoản Của Tôi</a>
                              <a href="#">Đơn Mua</a>
                              <a href="#"onClick={handleLogout}>Đăng Xuất</a>
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
                        <span className="badge">0</span>
                      </div>
                    </Link>

                    <Link className="d-flex align-items-center ms-3 mx-1"
                      onClick={toggleCartList}
                    >
                      <span className="bg-white px-2 py-1 rounded">
                        <div className="icon-with-badge">
                          <i className="las la-shopping-cart"  style={{fontSize: "27px"}}></i>
                          <span className="badge">0</span>
                          </div>
                      </span>
                    
                    </Link>

                    <div>
                      <div className="ml-4 d-none d-md-block"> 
                        <small className="d-block text-muted">My Cart</small>
                        <span className="text-dark">0 Items - $0.00</span>
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
        <div>
          <Row>
           
            <Col xs={9} className="py-4 align-item-center">
              {" "}
              <h5 className=" px-4">
                    Giỏ Hàng (0)
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
          {/* {cartItems.map((product) => { */}
            {/* if (product) { */}
              {/* return ( */}
                <div>
                  <Row className="align-items-center my-5">
                    <Col xs="5" className="d-flex align-items-center">
                      <div className="mr-4">
                        {/* <Button
                          type="submit"
                          className="btn btn-primary btn-sm"
                          onClick={() => {
                            dispatch(removeCartItem(product.id));
                          }}
                        > */}
                          {/* <i className="las la-times"></i> */}
                        {/* </Button> */}
                      </div>
                      <Link>
                        {/* <img
                          className="img-fluid"
                          src={`assets/images/${product.pictures[0]}`}
                          alt="..."
                        /> */}
                      </Link>
                    </Col>
                    <Col xs="5">
                      <h6>
                        <div className="link-title">
                          {/* {product.name} */}
                        </div>
                      </h6>
                      <div className="product-meta">
                        <span className="mr-2 text-primary">
                          {/* ${product.salePrice.toFixed(2)} */}
                        </span>
                        {/* <span className="text-muted">x {product.quantity}</span> */}
                      </div>
                    </Col>
                  </Row>
                </div>
              {/* ); */}
            {/* } */}

            {/* return null; */}
          {/* })} */}
          <hr className="my-5" />
          <div className="d-flex justify-content-between align-items-center mb-8">
            <span className="text-muted">Subtotal:</span>
            <span className="text-dark">$0.00</span>
          </div>
          <div  className="d-flex justify-content-between align-items-center">
          <Link
            to="/product-cart"
            className="btn btn-primary btn-animated mr-2"
          >
            <i className="las la-shopping-cart mr-1"></i>View Cart
          </Link>
          <Link to="/product-checkout" className="btn btn-dark">
            <i className="las la-money-check mr-1"></i>Continue To Checkout
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
                Sản Phẩm Yêu Thích (0)
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
          {/* {wishListItems.map((product) => { */}
            {/* if (product) { */}
              {/* return ( */}
                <div>
                  <Row className="align-items-center my-4">
                    <Col xs={5} className="d-flex align-items-center">

                      <div className="mr-4">
                        <Button
                          type="submit"
                          className="btn btn-primary btn-sm"
                          // onClick={() => {
                          //   dispatch(removeWishListItem(product.id));
                          // }}
                        >
                          {/* <AiOutlineCloseCircle /> */}
                          <i className="las la-times"></i>
                        </Button>
                      </div>
                      <div>
                        <img
                          className="img-fluid"
                          // src={`assets/images/${product.pictures[0]}`}
                          alt="..."
                        />
                      </div>
                    </Col>
                    <Col xs={5}>
                      <h6>
                        <div className="link-title">
                          {/* {product.name}{" "} */}
                        </div>
                      </h6>
                      <div className="product-meta">
                        <span className="mx-2 text-primary">
                          {/* ${product.salePrice.toFixed(2)} */}
                        </span>
                        {/* <span className="text-muted">x {product.quantity}</span> */}
                      </div>
                      <div className="product-meta"></div>
                    </Col>
                    <Col xs={2} className="d-flex align-items-center mt-4">
                      <span
                        // onClick={() => handleAddToCart(product)}
                        className="mx-2 btn text-white fs-1 ms-auto "
                      >
                        {/* <BsFillCartCheckFill /> */}
                        <i className="las la-shopping-cart"></i>

                      </span>
                    </Col>
                  </Row>
                </div>
              {/* ); */}
            {/* } */}

            {/* return null; */}
          {/* })} */}
          <hr className="my-5" />
          <div className="d-flex justify-content-between align-items-center mb-8">
            <span className="text-muted">Subtotal:</span>
            {/* <span className="text-white">${subtotal.toFixed(2)}</span> */}
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
          </div>
        </ModalBody>
      </Modal>
     
    </div>
  );
}
