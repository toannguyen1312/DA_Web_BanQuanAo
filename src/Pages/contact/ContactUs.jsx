import React from "react";
import PageHeading from "../../Components/PageHeading/PageHeading";
import { Link } from "react-router-dom";

function ContatctUs() {
  const firstBreadcrumb = { label: "Trang", link: "/contact-us" };
  const secondBreadcrumb = {
    label: "Liên Hệ Với Chúng Tôi",
    link: "/contact-us",
    active: true,
  };
  return (
    <div className="page-wrapper">
      <PageHeading
        title="Liên Hệ Với Chúng Tôi"
        firstBreadcrumb={firstBreadcrumb}
        secondBreadcrumb={secondBreadcrumb}
      />
      <section>
        <div className="container">
          <div className="row mb-5">
            <div className="col-lg-8">
              <div className="mb-5">
                <h6 className="text-primary mb-1">— Liên Hệ Với Chúng Tôi</h6>
                <h2 className="mb-0">Chúng tôi rất muốn nghe ý kiến từ bạn.</h2>
              </div>
              <form id="contact-form" className="row" method="post" action="php/contact.php">
                <div className="messages"></div>
                <div className="form-group col-md-6">
                  <label>Họ <span className="text-danger">*</span></label>
                  <input id="form_name" type="text" name="name" className="form-control" placeholder="Họ" required="required" data-error="Tên là bắt buộc." />
                  <div className="help-block with-errors"></div>
                </div>
                <div className="form-group col-md-6">
                  <label>Tên <span className="text-danger">*</span></label>
                  <input id="form_name1" type="text" name="name" className="form-control" placeholder="Tên" required="required" data-error="Tên là bắt buộc." />
                  <div className="help-block with-errors"></div>
                </div>
                <div className="form-group col-md-6">
                  <label>Địa Chỉ Email <span className="text-danger">*</span></label>
                  <input id="form_email" type="email" name="email" className="form-control" placeholder="Email" required="required" data-error="Email hợp lệ là bắt buộc." />
                  <div className="help-block with-errors"></div>
                </div>
                <div className="form-group col-md-6">
                  <label>Số Điện Thoại <span className="text-danger">*</span></label>
                  <input id="form_phone" type="tel" name="phone" className="form-control" placeholder="Điện thoại" required="required" data-error="Số điện thoại là bắt buộc." />
                  <div className="help-block with-errors"></div>
                </div>
                <div className="form-group col-md-12">
                  <label>Thông Điệp <span className="text-danger">*</span></label>
                  <textarea id="form_message" name="message" className="form-control" placeholder="Thông điệp" rows="4" required="required" data-error="Vui lòng để lại thông điệp cho chúng tôi."></textarea>
                  <div className="help-block with-errors"></div>
                </div>
                <div className="col-md-12 mt-4">
                  <button className="btn btn-primary btn-animated"><span>Gửi Thông Điệp</span></button>
                </div>
              </form>
            </div>
            <div className="col-lg-4 mt-6 mt-lg-0">
              <div className="shadow-sm rounded p-5">
                <div className="mb-5">
                  <h6 className="text-primary mb-1">— Thông Tin Liên Hệ</h6>
                  <h4 className="mb-0">Chúng Tôi Sẵn Sàng Giúp Bạn</h4>
                </div>
                <div className="d-flex mb-3">
                  <div className="mr-2">
                    <i className="las la-map ic-2x text-primary"></i>
                  </div>
                  <div>
                    <h6 className="mb-1 text-dark">Địa Chỉ Cửa Hàng</h6>
                    <p className="mb-0 text-muted">423B, Đường Worldwide, USA</p>
                  </div>
                </div>
                <div className="d-flex mb-3">
                  <div className="mr-2">
                    <i className="las la-envelope ic-2x text-primary"></i>
                  </div>
                  <div>
                    <h6 className="mb-1 text-dark">Email Cho Chúng Tôi</h6>
                    <Link className="text-muted" href="mailto:themeht23@gmail.com"> themeht23@gmail.com</Link>
                  </div>
                </div>
                <div className="d-flex mb-3">
                  <div className="mr-2">
                    <i className="las la-mobile ic-2x text-primary"></i>
                  </div>
                  <div>
                    <h6 className="mb-1 text-dark">Số Điện Thoại</h6>
                    <Link className="text-muted" href="tel:+912345678900">+91-234-567-8900</Link>
                  </div>
                </div>
                <div className="d-flex mb-5">
                  <div className="mr-2">
                    <i className="las la-clock ic-2x text-primary"></i>
                  </div>
                  <div>
                    <h6 className="mb-1 text-dark">Giờ Làm Việc</h6>
                    <span className="text-muted">Từ Thứ Hai đến Thứ Sáu: 10AM - 7PM</span>
                  </div>
                </div>
                <ul className="list-inline">
                  <li className="list-inline-item">
                    <Link className="bg-white shadow-sm rounded p-2" href="#"><i className="la la-facebook"></i></Link>
                  </li>
                  <li className="list-inline-item">
                    <Link className="bg-white shadow-sm rounded p-2" href="#"><i className="la la-dribbble"></i></Link>
                  </li>
                  <li className="list-inline-item">
                    <Link className="bg-white shadow-sm rounded p-2" href="#"><i className="la la-instagram"></i></Link>
                  </li>
                  <li className="list-inline-item">
                    <Link className="bg-white shadow-sm rounded p-2" href="#"><i className="la la-twitter"></i></Link>
                  </li>
                  <li className="list-inline-item">
                    <Link className="bg-white shadow-sm rounded p-2" href="#"><i className="la la-linkedin"></i></Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="pt-0">
        <div className="container">
          <hr className="mt-0 mb-10" />
          <div className="row justify-content-center text-center mb-5">
            <div className="col-lg-8">
              <div>
                <h6 className="text-primary mb-1">— Dễ Dàng Tìm Thấy</h6>
                <h2 className="mb-0">Vị Trí Cửa Hàng Của Chúng Tôi</h2>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col">
              <div className="map" style={{ height: '500px' }}>
                <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3918.2145947051063!2d106.78918677469856!3d10.871276389283322!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3175276398969f7b%3A0x9672b7efd0893fc4!2zVHLGsOG7nW5nIMSQ4bqhaSBo4buNYyBOw7RuZyBMw6JtIFRQLiBI4buTIENow60gTWluaA!5e0!3m2!1svi!2s!4v1745593182515!5m2!1svi!2s" allowfullscreen="" title="Contact Map" className="w-100 h-100 border-0"></iframe>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default ContatctUs;
