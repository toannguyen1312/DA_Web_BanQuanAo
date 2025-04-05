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
import CatalogDropDown from "./CatalogDropDown";
import ShopDropdown from "./DropDownMenuBarTable";
import DropdownMenuNavBar from "./DropDownMenuNavBar";

export default function HeaderNavBar() {

  const dispatch = useDispatch();
  const token = useSelector(state =>state.auth.token)
  let decoded = null;

  try {
    if (token) {
      decoded = jwtDecode(token);
    }else {
      decoded = "";
    }
  } catch (error) {
    console.error("Invalid token:", error);
  }
  
  const handleLogout = () => {
    dispatch(logout({token: token})); 
  };


  const homeLinks = [
    { url: "/", label: "Home - Fashion 1" },
    { url: "/index2", label: "Home - Fashion 2" },
    { url: "/index3", label: "Home - Fashion 3" },
    { url: "/index4", label: "Home - Electronic" },
    { url: "/index5", label: "Home - Furniture" },
    { url: "/index6", label: "Home - Kids" },
  ];

  const catagoryLinks = [
    {
      title: "Clothing",
      links: [
        { title: "All Clothing", url: "/shop-grid-left-sidebar" },
        { title: "Top T-Shirts & Shirts", url: "/shop-grid-left-sidebar" },
        { title: "Lingerie & Sleepwear", url: "/shop-grid-left-sidebar" },
        { title: "Leggings & Jeggings", url: "/shop-grid-left-sidebar" },
        { title: "Kurtas & Kurtis", url: "/shop-grid-left-sidebar" },
        { title: "Dresses & Skirts", url: "/shop-grid-left-sidebar" },
        { title: "Jumpers & Cardigans", url: "/shop-grid-left-sidebar" },
      ],
    },
    // More categories omitted for brevity
  ];

  const shopLinks = [
    {
      title: "Shop Layout",
      links: [
        { title: "Shop Grid - Left Sidebar", url: "/shop-grid-left-sidebar" },
        { title: "Shop Grid - Right Sidebar", url: "/shop-grid-right-sidebar" },
        // More links omitted for brevity
      ],
    },
    // More shop links omitted for brevity
  ];

  const pagesLinks = [
    { label: "About", url: "/about-us" },
    { label: "FAQ", url: "/faq" },
    { label: "Login", url: "/login" },
    { label: "Login 2", url: "/login-2" },
    { label: "Sign Up", url: "/signup" },
    { label: "Coming Soon", url: "/coming-soon" },
    { label: "404", url: "/error-404" },
    { label: "Privacy Policy", url: "/privacy-policy" },
    { label: "Term & Conditions", url: "/terms-and-conditions" },
  ];

  const blogLinks = [
    { label: "Blog Card", url: "/blog-card" },
    { label: "Blog Listing 1", url: "/blog-listing" },
    // { label: "Blog Listing 2", url: "/blog-listing-2" },
    // { label: "Blog Single", url: "/blog-single" },
  ];

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
                  <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav">
                      <DropdownMenuNavBar title={"Home"} links={homeLinks} />
                      <CatalogDropDown title={"Catalog"} catagoryLinks={catagoryLinks} />
                      <ShopDropdown title={"shop"} shopLinks={shopLinks} />
                      <DropdownMenuNavBar title={"Pages"} links={pagesLinks} />
                      <DropdownMenuNavBar title={"Blog"} links={blogLinks} />
                      <li className="nav-item">
                        <Link to="/contact-us" className="nav-link">
                          Contact
                        </Link>
                      </li>
                    </ul>
                  </div>
                  <div className="right-nav align-items-center d-flex justify-content-end">

                    <div className="user-info-wrapper " style={{ paddingRight: "10px" }}>
                    
                      {token ?  (
                         <div className="dropdown login-btn btn-link ms-3 d-flex align-items-center text-dark text-decoration-none">
                            <i className="las la-user-alt me-1" style={{fontSize: "27px"}}></i>
                            <div>{decoded.sub}</div>
                            <div class="dropdown-content">
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
                        <div >{decoded.sub}</div>
                      </Link>
                      )}

                    </div>

                    <Link className="wishlist-btn btn-link ms-3">
                      <i className="lar la-heart"></i>
                    </Link>

                    <Link className="d-flex align-items-center ms-3 mx-1">
                      <span className="bg-white px-2 py-1 rounded">
                        <i className="las la-shopping-cart"  style={{fontSize: "27px"}}></i>
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

      {/* Modal for Cart */}
      <Modal isOpen={false}>
        <ModalBody>
          <h5>Your Cart (0)</h5>
        </ModalBody>
      </Modal>

      {/* Modal for Wishlist */}
      <Modal isOpen={false}>
        <ModalBody>
          <h5>Your Wishlist (0)</h5>
        </ModalBody>
      </Modal>
    </div>
  );
}
