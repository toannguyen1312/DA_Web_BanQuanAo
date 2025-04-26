import React, { useState } from 'react';
import { Card, Collapse, Container } from 'reactstrap';
import PageHeading from '../Components/PageHeading/PageHeading';

function Faq() {
    const firstBreadcrumb = { label: "Trang" };
    const secondBreadcrumb = {
        label: "Câu Hỏi Thường Gặp",
        active: true,
    };
    const [activeAccordion, setActiveAccordion] = useState(0);

    const toggleAccordion = (index) => {
        setActiveAccordion(activeAccordion === index ? -1 : index);
    };

    const faqData = [
        {
            question: 'Phí Vận Chuyển Là Bao Nhiêu?',
            answer:
                'Tìm một trong những từ Latin ít phổ biến hơn, consectetur, từ một đoạn Lorem Ipsum, và khi duyệt qua các trích dẫn của từ này trong văn học cổ điển, phát hiện ra rằng nhiều gói xuất bản desktop và trình chỉnh sửa trang web hiện nay đều sử dụng. Chưa bao giờ có ai yêu thích hoặc theo đuổi hay mong muốn đạt được sự đau đớn của chính nó.',
        },
        {
            question: 'Thời Gian Giao Hàng Ước Tính Là Bao Lâu?',
            answer:
                'Tìm một trong những từ Latin ít phổ biến hơn, consectetur, từ một đoạn Lorem Ipsum, và khi duyệt qua các trích dẫn của từ này trong văn học cổ điển, phát hiện ra rằng nhiều gói xuất bản desktop và trình chỉnh sửa trang web hiện nay đều sử dụng. Chưa bao giờ có ai yêu thích hoặc theo đuổi hay mong muốn đạt được sự đau đớn của chính nó.',
        },
        {
            question: 'Làm Thế Nào Để Theo Dõi Đơn Hàng?',
            answer:
                'Tìm một trong những từ Latin ít phổ biến hơn, consectetur, từ một đoạn Lorem Ipsum, và khi duyệt qua các trích dẫn của từ này trong văn học cổ điển, phát hiện ra rằng nhiều gói xuất bản desktop và trình chỉnh sửa trang web hiện nay đều sử dụng. Chưa bao giờ có ai yêu thích hoặc theo đuổi hay mong muốn đạt được sự đau đớn của chính nó.',
        },
        {
            question: 'Gói Hàng Của Tôi Có Bị Tính Phí Hải Quan Và Phí Nhập Khẩu Không?',
            answer:
                'Tìm một trong những từ Latin ít phổ biến hơn, consectetur, từ một đoạn Lorem Ipsum, và khi duyệt qua các trích dẫn của từ này trong văn học cổ điển, phát hiện ra rằng nhiều gói xuất bản desktop và trình chỉnh sửa trang web hiện nay đều sử dụng. Chưa bao giờ có ai yêu thích hoặc theo đuổi hay mong muốn đạt được sự đau đớn của chính nó.',
        },
        {
            question: 'Bạn Có Gửi Hàng Quốc Tế Không?',
            answer:
                'Tìm một trong những từ Latin ít phổ biến hơn, consectetur, từ một đoạn Lorem Ipsum, và khi duyệt qua các trích dẫn của từ này trong văn học cổ điển, phát hiện ra rằng nhiều gói xuất bản desktop và trình chỉnh sửa trang web hiện nay đều sử dụng. Chưa bao giờ có ai yêu thích hoặc theo đuổi hay mong muốn đạt được sự đau đớn của chính nó.',
        },
        {
            question: 'Cái Này Cũng Giống Như Nói Qua Phải Không?',
            answer:
                'Tìm một trong những từ Latin ít phổ biến hơn, consectetur, từ một đoạn Lorem Ipsum, và khi duyệt qua các trích dẫn của từ này trong văn học cổ điển, phát hiện ra rằng nhiều gói xuất bản desktop và trình chỉnh sửa trang web hiện nay đều sử dụng. Chưa bao giờ có ai yêu thích hoặc theo đuổi hay mong muốn đạt được sự đau đớn của chính nó.',
        },
    ];
    return (
        <div className='page-wrapper'>
            <PageHeading
                title="Câu Hỏi Thường Gặp"
                firstBreadcrumb={firstBreadcrumb}
                secondBreadcrumb={secondBreadcrumb}
            />
            <div className="page-content">
                <section>
                    <Container>
                        <div className="row align-items-center justify-content-center">
                            <div className="col-12 col-lg-10">
                                <div id="accordion" className="accordion">
                                    {faqData.map((faq, index) => (
                                        <Card key={index} className="border-0 mb-4">
                                            <div className='card-header bg-transparent border-0'>
                                                <h6 className="mb-0">
                                                    <button
                                                        style={{ background: 'transparent', border: 'none' }}
                                                        className="text-dark"
                                                        onClick={() => toggleAccordion(index)}
                                                        aria-expanded={activeAccordion === index}
                                                    >
                                                        {faq.question}
                                                    </button>
                                                </h6>
                                            </div>
                                            <Collapse isOpen={activeAccordion === index}>
                                                <div className="text-muted card-body ml-3" style={{ textColor: '#8090b5' }}>{faq.answer}</div>
                                            </Collapse>
                                        </Card>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </Container>
                </section>
            </div>
        </div>
    )
}

export default Faq;
