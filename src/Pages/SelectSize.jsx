import React from 'react';
import { Link } from 'react-router-dom';
import { Button, Col, Container, Form, FormGroup, Input, Row } from 'reactstrap';
import PageHeading from '../Components/PageHeading/PageHeading';



function SelectSize() {
    const firstBreadcrumb = { label: "Pages" };
    const secondBreadcrumb = {
        label: "Hướng dẫn chọn size",
        active: true,
    };
    const handleSubmit = (e) => {
        e.preventDefault();
    };

    return (
        <div className='page-wrapper'>
            <PageHeading
                title="Hướng dẫn chọn size"
                firstBreadcrumb={firstBreadcrumb}
                secondBreadcrumb={secondBreadcrumb}
            />
             <div className='page-content'>
      <section>
        <Container>
          <Row>
            {/* Form chiếm 2/3 */}
            <Col lg={9} md={12}>
            <h6 className="pd-5">Nếu bạn băn khoăn không biết chọn size nào cho phù hợp với cân nặng và chiều cao của mình, đừng lo lắng! Hãy xem bảng hướng dẫn chọn size bên dưới mà chúng tôi tư vấn riêng dành cho bạn</h6>
            <img className="img-fluid" src="src\assets\image\selectsize1.png" alt="" />
            <img className="img-fluid" src="src\assets\image\selectsize2.png" alt="" />
            <img  className="img-fluid d-block mx-auto" src="src\assets\image\selectsize3.jpg" alt="" />
            <h6 className="pd-5">Bảng hướng dẫn chọn size trên là bảng hướng dẫn dựa trên kinh nghiệm nhiều năm của chúng tôi theo khảo sát nhu cầu sở thích của khách hàng, tất nhiên sẽ không tuyệt đối, sẽ có những trường hợp ngoại lệ phụ thuộc theo vóc dáng, sở thích của từng người. Ví dụ có người thích mặc ôm, có người thích mặc rộng...</h6>
            <h6 className="pd-5">Nếu bạn vẫn còn có những mắc thắc và băn khoăn cần được giải đáp? Hãy liên hệ ngay với Bộ phận Chăm sóc khách hàng của chúng tôi qua Hotline 0999 999 999 để được hỗ trợ thêm.</h6>
            </Col>

            {/* Bên phải 1/3 */}
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

export default SelectSize;