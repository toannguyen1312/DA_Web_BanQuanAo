import React from 'react';
import { Link } from 'react-router-dom';
import { Button, Col, Container, Form, FormGroup, Input, Row } from 'reactstrap';
import PageHeading from '../Components/PageHeading/PageHeading';



function Introduce() {
    const firstBreadcrumb = { label: "Pages" };
    const secondBreadcrumb = {
        label: "Giới thiệu",
        active: true,
    };
    const handleSubmit = (e) => {
        e.preventDefault();
    };

    return (
        <div className='page-wrapper'>
            <PageHeading
                title="Giới thiệu"
                firstBreadcrumb={firstBreadcrumb}
                secondBreadcrumb={secondBreadcrumb}
            />
             <div className='page-content'>
      <section>
        <Container>
          <Row>
            <Col lg={9} md={12}>
            <p className="pd-5 text-dark">Thương hiệu thời trang nam 4MEN được thành lập từ tháng 3 năm 2010, là thương hiệu thời trang uy tín hàng đầu tại Việt Nam dành riêng cho phái mạnh.
            </p>
            <h5 className="fw-bold">SỨ MỆNH</h5>
            <p className="pd-5 text-dark">Không ngừng sáng tạo và tỉ mỉ từ công đoạn sản xuất đến các khâu dịch vụ, nhằm mang đến cho Quý Khách Hàng những trải nghiệm mua sắm đặc biệt nhất: sản phẩm chất lượng - dịch vụ hoàn hảo - xu hướng thời trang mới mẻ và tinh tế. Thông qua các sản phẩm thời trang, 4MEN luôn mong muốn truyền tải đến bạn những thông điệp tốt đẹp cùng với nguồn cảm hứng trẻ trung và tích cực.</p>
           
            <h5 className="fw-bold">TẦM NHÌN</h5>
            <p className="pd-5 text-dark">Với mục tiêu xây dựng và phát triển những giá trị bền vững, trong 10 năm tới, 4MEN sẽ trở thành thương hiệu dẫn đầu về thời trang phái mạnh trên thị trường Việt Nam.</p>
           
            <h5 className="fw-bold">THÔNG ĐIỆP 4MEN GỬI ĐẾN BẠN</h5>
            <p className="pd-5 text-dark">muốn truyền cảm hứng tích cực đến các chàng trai: Việc mặc đẹp rất quan trọng, nó thể hiện được cá tính, sự tự tin và cả một phần lối sống, cách suy nghĩ của bản thân. Mặc thanh lịch, sống thanh lịch.</p>
           
            <h5 className="fw-bold">Chọn chúng tôi, bạn đang lựa chọn sự hoàn hảo cho điểm nhấn thời trang của chính mình!</h5>

           
            </Col>

            <Col lg={3} md={12} className="">
            <div className="d-flex align-items-center mb-3">
              <h5 className="fw-bold me-3 mb-0">DANH MỤC<sup>™</sup></h5>
              <div className="flex-grow-1 border-bottom" style={{ borderColor: '#ccc' }}></div>
            </div>
            <div className="footer-links p-1">
                <ul className="list-unstyled">
                <li><a href="#" className="text-dark d-block py-1 small-text"><span className="text-secondary me-1">•</span> Giới thiệu</a></li>
                  <li><a href="#" className="text-dark d-block py-1 small-text"><span className="text-secondary me-1">•</span> Liên hệ</a></li>
                  <li><a href="#" className="text-dark d-block py-1 small-text"><span className="text-secondary me-1">•</span> Tuyển dụng</a></li>
                  <li><a href="#" className="text-dark d-block py-1 small-text"><span className="text-secondary me-1">•</span> Bản đồ</a></li>
                  <li><a href="#" className="text-dark d-block py-1 small-text"><span className="text-secondary me-1">•</span> Chính sách bảo mật</a></li>
                  <li><a href="#" className="text-dark d-block py-1 small-text"><span className="text-secondary me-1">•</span> Hướng dẫn đặt hàng</a></li>
                  <li><a href="#" className="text-dark d-block py-1 small-text"><span className="text-secondary me-1">•</span> Hướng dẫn chọn size</a></li>
                  <li><a href="#" className="text-dark d-block py-1 small-text"><span className="text-secondary me-1">•</span> Chính sách thanh toán - Giao hàng</a></li>
                  <li><a href="#" className="text-dark d-block py-1 small-text"><span className="text-secondary me-1">•</span> Chính sách đổi hàng</a></li>
                  <li><a href="#" className="text-dark d-block py-1 small-text"><span className="text-secondary me-1">•</span> Chính sách khách vip</a></li>
                  <li><a href="#" className="text-dark d-block py-1 small-text"><span className="text-secondary me-1">•</span> Câu hỏi thường gặp</a></li>
                  <li><a href="#" className="text-dark d-block py-1 small-text"><span className="text-secondary me-1">•</span> Chính sách cookie</a></li>

                </ul>
            </div>

            <div className="d-flex align-items-center mb-3">
              <h5 className="fw-bold me-3 mb-0">Sản phẩm hot<sup>™</sup></h5>
              <div className="flex-grow-1 border-bottom" style={{ borderColor: '#ccc' }}></div>
            </div>

            <div className="d-flex align-items-center mb-3">
              <h5 className="fw-bold me-3 mb-0">Sản phẩm đã xem<sup>™</sup></h5>
              <div className="flex-grow-1 border-bottom" style={{ borderColor: '#ccc' }}></div>
            </div>

            </Col>
          </Row>
        </Container>
      </section>
    </div>
        </div>
    )
}

export default Introduce;