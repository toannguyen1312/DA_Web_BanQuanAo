import React from 'react';
import { Col, Container, Row } from 'reactstrap';
import { useSelector } from 'react-redux';
// import AboutUsTestimonial from '../Components/AboutUsTestimonial';
// import BlogSection from '../Components/Blog/BlogSection';
// import InstagramSection from '../Components/InstagramSection/InstagramSection';
// import LogoSection from '../Components/LogoSection/LogoSection';
// import NewsletterSection from '../Components/News/NewsLetterSection';
import PageHeading from '../Components/PageHeading/PageHeading';

import aboutImage1 from '../assets/image/about/01.jpg';
import aboutImage2 from '../assets/image/about/02.jpg';
import aboutImage3 from '../assets/image/about/03.jpg';

function AboutUs() {
    const firstBreadcrumb = { label: "Trang" }; // 'Pages' -> 'Trang'
    const secondBreadcrumb = {
        label: "Về Chúng Tôi", // 'About Us' -> 'Về Chúng Tôi'
        active: true,
    };
    const logos = [
        "assets/images/client/01.png",
        "assets/images/client/02.png",
        "assets/images/client/03.png",
        "assets/images/client/04.png",
        "assets/images/client/05.png",
        "assets/images/client/06.png",
        "assets/images/client/07.png",
        "assets/images/client/08.png",
    ];
    const blogs = useSelector(
        (state) => state.blog ? state.blog.blogItems : [] //check này để tránh lỗi
    );
    const filteredBlogs = blogs.filter(
        (blog) => blog.category.includes("Cloth") || blog.category.includes("Fashion")
    ).slice(0, 3);
    const reasonsData = [
        {
            icon: <i className="las la-credit-card ic-3x text-primary"></i>,
            title: 'Thẻ Tín Dụng',
            description: 'Serspiciatis unde omnis iste natus error sit.',
        },
        {
            icon: <i className="las la-shipping-fast ic-3x text-primary"></i>,
            title: 'Vận Chuyển Miễn Phí', 
            description: 'Serspiciatis unde omnis iste natus error sit.',
        },
        {
            icon: <i className="las la-history ic-3x text-primary"></i>,
            title: 'Hỗ Trợ 24/7', 
            description: 'Serspiciatis unde omnis iste natus error sit.',
        },
        {
            icon: <i className="las la-undo-alt ic-3x text-primary"></i>,
            title: 'Hoàn Trả Trong 30 Ngày', 
            description: 'Serspiciatis unde omnis iste natus error sit.',
        },
    ];
    return (
        <div className='page-wrapper'>
            <PageHeading
                title="Về Chúng Tôi" 
                firstBreadcrumb={firstBreadcrumb}
                secondBreadcrumb={secondBreadcrumb}
            />
            <div className='page-content'>
                <section className="p-0">
                    <Container>
                        <div className="row align-items-center justify-content-between">
                            <Col lg="7" mb="6" mbLg="0">
                                <Row className="align-items-center">
                                    <Col md="6">
                                    <img src={aboutImage1} className="img-fluid rounded shadow" alt="..." />
                                    </Col>
                                    <Col md="6">
                                        <img src={aboutImage2} className="img-fluid rounded shadow mb-5" alt="..." />
                                        <img src={aboutImage3} className="img-fluid rounded shadow" alt="..." />
                                    </Col>
                                </Row>
                            </Col>
                            <Col lg="5">
                                <div>
                                    <h6 className="text-primary mb-1">— Về Chúng Tôi</h6> 
                                    <h2 className="mt-3 font-w-5">Chúng Tôi Có Những Tài Năng Mới</h2> 
                                    <p className="lead">Chúng tôi sử dụng các công nghệ mới nhất để phát triển và cải tiến trải nghiệm của bạn.</p>
                                    <p className="mb-0">Chúng tôi sử dụng các công nghệ mới nhất để phát triển và cải tiến trải nghiệm của bạn.</p>
                                </div>
                            </Col>
                        </div>
                        <Row className="mt-8">
                            <Col lg="4" md="4">
                                <h5>
                                    <span className="text-primary font-w-7">01.</span> Sứ Mệnh Của Chúng Tôi 
                                </h5>
                                <p>Nhiều gói xuất bản desktop và trình chỉnh sửa trang web hiện nay sử dụng Lorem Ipsum làm mô hình mặc định.</p>
                            </Col>
                            <Col lg="4" md="4">
                                <h5>
                                    <span className="text-primary font-w-7">02.</span> Tầm Nhìn Của Chúng Tôi 
                                </h5>
                                <p>
                                    Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia Neque porro est.
                                </p>
                            </Col>
                            <Col lg="4" md="4">
                                <h5>
                                    <span className="text-primary font-w-7">03.</span> Giá Trị Của Chúng Tôi 
                                </h5>
                                <p>
                                    Officiis debitis aut rerum necessitatibus saepe eveniet ut et voluptates repudiandae sint et non recusandae.
                                </p>
                            </Col>
                        </Row>
                    </Container>
                </section>
                <section>
                    <Container>
                        <Row className="align-items-end mb-5">
                            <Col lg="6">
                                <div>
                                    <h6 className="text-primary mb-1">— Tại Sao Lựa Chọn Chúng Tôi</h6> 
                                    <h2 className="mb-0">Chúng Tôi Nổi Bật Với Những Thị Trường Năng Lực.</h2> 
                                </div>
                            </Col>
                            <Col lg="6">
                                <div>
                                    <p className="lead mb-0">Tất cả các loại hình kinh doanh đều cần tài nguyên phát triển, vì vậy chúng tôi cung cấp cho bạn sự lựa chọn về cách thức và mức độ sử dụng tài nguyên.</p>
                                </div>
                            </Col>
                        </Row>
                        <Row className="align-items-center">
                            {reasonsData.map((reason, index) => (
                                <Col lg="3" md="6" key={index}>
                                    <div className="px-4 py-7 rounded text-center border">
                                        {reason.icon}
                                        <h5 className="mt-2 mb-1">{reason.title}</h5>
                                        <p className="mb-0">{reason.description}</p>
                                    </div>
                                </Col>
                            ))}
                        </Row>
                    </Container>
                </section>
              
                {/* <AboutUsTestimonial /> */}
                {/* <NewsletterSection /> */}
                {/* <LogoSection logos={logos} /> */}
                {/* <BlogSection blogs={filteredBlogs} title={"Fashion Blogs"} /> */}
                {/* <InstagramSection /> */}
            </div>
        </div>
    )
}

export default AboutUs;
