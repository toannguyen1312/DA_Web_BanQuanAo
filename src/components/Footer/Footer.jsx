import React from "react";
import { Link } from "react-router-dom";
import '../../assets/css/bootstrap.min.css'
import '../../assets/css/lightslider.min.css'
import '../../assets/css/owl.carousel.css'
import '../../assets/css/spacing.css'
import '../../assets/css/theme-plugin.css'
import '../../assets/css/theme.min.css'
import '../../assets/css/footer.css'



export default function Footer() {
  return (
    <>
      <footer className="py-11 bg-dark cusfooter">
        <div className="container">
          <div className="row">
            <div className="col-12 col-lg-3">
              {" "}
              <Link className="footer-logo text-white h2 mb-0" to="/">
                Eko<span className="text-primary">cart</span>
              </Link>
              <p className="my-3 text-muted">
                Ekocart - Chúng tôi mang đến cho bạn những mẫu áo đẹp, đa dạng về kiểu dáng, mẫu mã và màu sắc, phù hợp với từng đối tượng.
              </p>
              <ul className="list-inline mb-0">
                <li className="list-inline-item">
                  <Link className="text-light ic-2x" to="#">
                    <i className="la la-facebook"></i>
                  </Link>
                </li>
                <li className="list-inline-item">
                  <Link className="text-light ic-2x" to="#">
                    <i className="la la-dribbble"></i>
                  </Link>
                </li>
                <li className="list-inline-item">
                  <Link className="text-light ic-2x" to="#">
                    <i className="la la-instagram"></i>
                  </Link>
                </li>
                <li className="list-inline-item">
                  <Link className="text-light ic-2x" to="#">
                    <i className="la la-twitter"></i>
                  </Link>
                </li>
                <li className="list-inline-item">
                  <Link className="text-light ic-2x" to="#">
                    <i className="la la-linkedin"></i>
                  </Link>
                </li>
              </ul>
            </div>
            <div className="col-12 col-lg-6 mt-6 mt-lg-0">
              <div className="row">
                <div className="col-12 col-sm-4 navbar-dark">
                  <h5 className="mb-4 text-white">Mục lục</h5>
                  <ul className="navbar-nav list-unstyled mb-0">
                    <li className="mb-3 nav-item">
                      <Link className="/#" to="/">
                        Trang chủ
                      </Link>
                    </li>
                    <li className="mb-3 nav-item">
                      <Link className="/about-us" to="about-us">
                        Về chúng tôi
                      </Link>
                    </li>
                    <li className="mb-3 nav-item">
                      <Link className="/shop" to="shop-grid-left-sidebar">
                        Cửa hàng
                      </Link>
                    </li>
                    <li className="mb-3 nav-item">
                      <Link className="faq" to="faq">
                        Câu hỏi và giải đáp
                      </Link>
                    </li>
                    <li className="mb-3 nav-item">
                      <Link className="blog" to="blog-card">
                        Blogs
                      </Link>
                    </li>
                    <li className="nav-item">
                      <Link className="contact-us" to="contact-us">
                        Liên hệ 
                      </Link>
                    </li>
                  </ul>
                </div>
                <div className="col-12 col-sm-4 mt-6 mt-sm-0 navbar-dark">
                  <h5 className="mb-4 text-white">Top sản phẩm</h5>
                  <ul className="navbar-nav list-unstyled mb-0">
                    <li className="mb-3 nav-item">
                      <Link className="nav-link" to="#">
                        Áo nam
                      </Link>
                    </li>
                    <li className="mb-3 nav-item">
                      <Link className="nav-link" to="#">
                        Quần nam
                      </Link>
                    </li>
                    <li className="mb-3 nav-item">
                      <Link className="nav-link" to="#">
                        Phụ kiện
                      </Link>
                    </li>
                    <li className="mb-3 nav-item">
                      <Link className="nav-link" to="#">
                        Giày dép
                      </Link>
                    </li>
                    <li className="mb-3 nav-item">
                      <Link className="nav-link" to="#">
                        Túi xách
                      </Link>
                    </li>
                    <li className="mb-3 nav-item">
                      <Link className="nav-link" to="#">
                        Mũ nón
                      </Link>
                    </li>
                  </ul>
                </div>
                <div className="col-12 col-sm-4 mt-6 mt-sm-0 navbar-dark">
                  <h5 className="mb-4 text-white">Tính năng</h5>
                  <ul className="navbar-nav list-unstyled mb-0">
                    <li className="mb-3 nav-item">
                      <Link className="nav-link" to="terms-and-conditions">
                      Điều khoản dịch vụ
                      </Link>
                    </li>
                    <li className="mb-3 nav-item">
                      <Link className="nav-link" to="privacy-policy">
                      Chính sách bảo mật
                      </Link>
                    </li>
                    <li className="mb-3 nav-item">
                      <Link className="nav-link" to="#">
                      Hỗ trợ
                      </Link>
                    </li>
                    <li className="mb-3 nav-item">
                      <Link className="nav-link" to="#">
                      Vận chuyển & Trả hàng
                      </Link>
                    </li>
                    <li className="mb-3 nav-item">
                      <Link className="nav-link" to="#">
                      Tuyển dụng
                      </Link>
                    </li>

                  </ul>
                </div>
              </div>
            </div>
            <div className="col-12 col-lg-3 mt-6 mt-lg-0">
              <div className="d-flex mb-3">
                <div className="mr-2">
                  {" "}
                  <i className="las la-map ic-2x text-primary"></i>
                </div>
                <div>
                  <h6 className="mb-1 text-light">Địa chỉ cửa hàng</h6>
                  <p className="mb-0 text-muted">
                    Đại học nông lâm TP Hồ Chí Minh
                  </p>
                </div>
              </div>
              <div className="d-flex mb-3">
                <div className="mr-2">
                  {" "}
                  <i className="las la-envelope ic-2x text-primary"></i>
                </div>
                <div>
                  <h6 className="mb-1 text-light">Email</h6>
                  <Link className="text-muted" to="mailto:skytouchinfotech01@gmail.com">
                    {" "}
                    sinhviennlu@gmail.com                  </Link>
                </div>
              </div>
              <div className="d-flex mb-3">
                <div className="mr-2">
                  {" "}
                  <i className="las la-mobile ic-2x text-primary"></i>
                </div>
                <div>
                  <h6 className="mb-1 text-light">Số điện thoại</h6>
                  <Link className="text-muted" to="tel:+987654321">
                    +91-234-567-8900
                  </Link>
                </div>
              </div>
              <div className="d-flex">
                <div className="mr-2">
                  {" "}
                  <i className="las la-clock ic-2x text-primary"></i>
                </div>
                <div>
                  <h6 className="mb-1 text-light">Thời gian làm việc</h6>
                  <span className="text-muted">Mon - Fri: 10AM - 7PM</span>
                </div>
              </div>
            </div>
          </div>
          <hr className="my-8" />
          <div className="row text-muted align-items-center">
            <div className="col-md-7">
              Copyright ©2025 All rights reserved | This Template is made by{" "}
              <i className="lar la-heart text-primary heartBeat2"></i>{" "}
              <u>
                <Link className="text-primary" to="#">
                  SinhvienNongLam
                </Link>
              </u>
            </div>
            <div className="col-md-5 text-md-right mt-3 mt-md-0">
              <ul className="list-inline mb-0">
                <li className="list-inline-item">
                  <Link to="#">
                    <img
                      className="img-fluid"
                      src="assets/images/pay-icon/01.png"
                      alt=""
                    />
                  </Link>
                </li>
                <li className="list-inline-item">
                  <Link to="#">
                    <img
                      className="img-fluid"
                      src="assets/images/pay-icon/02.png"
                      alt=""
                    />
                  </Link>
                </li>
                <li className="list-inline-item">
                  <Link to="#">
                    <img
                      className="img-fluid"
                      src="assets/images/pay-icon/03.png"
                      alt=""
                    />
                  </Link>
                </li>
                <li className="list-inline-item">
                  <Link to="#">
                    <img
                      className="img-fluid"
                      src="assets/images/pay-icon/04.png"
                      alt=""
                    />
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}
