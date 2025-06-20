import React from 'react';
import { Col, Container, Row } from 'reactstrap';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import PageHeading from '../Components/PageHeading/PageHeading';

import aboutImage1 from '../assets/image/about/01.jpg';
import aboutImage2 from '../assets/image/about/02.jpg';
import aboutImage3 from '../assets/image/about/03.jpg';

function AboutUs() {
    const { t } = useTranslation();
    const firstBreadcrumb = { label: t('about_breadcrumb_home') };
    const secondBreadcrumb = {
        label: t('about_breadcrumb_title'),
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
        (state) => state.blog ? state.blog.blogItems : []
    );
    const filteredBlogs = blogs.filter(
        (blog) => blog.category.includes("Cloth") || blog.category.includes("Fashion")
    ).slice(0, 3);
    const reasonsData = [
        {
            icon: <i className="las la-credit-card ic-3x text-primary"></i>,
            title: t('about_reason_card'),
            description: t('about_reason_card_desc'),
        },
        {
            icon: <i className="las la-shipping-fast ic-3x text-primary"></i>,
            title: t('about_reason_shipping'),
            description: t('about_reason_shipping_desc'),
        },
        {
            icon: <i className="las la-history ic-3x text-primary"></i>,
            title: t('about_reason_support'),
            description: t('about_reason_support_desc'),
        },
        {
            icon: <i className="las la-undo-alt ic-3x text-primary"></i>,
            title: t('about_reason_return'),
            description: t('about_reason_return_desc'),
        },
    ];
    return (
        <div className='page-wrapper'>
            <PageHeading
                title={t('about_breadcrumb_title')}
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
                                    <h6 className="text-primary mb-1">— {t('about_breadcrumb_title')}</h6>
                                    <h2 className="mt-3 font-w-5">{t('about_talents_title')}</h2>
                                    <p className="lead">{t('about_talents_lead')}</p>
                                    <p className="mb-0">{t('about_talents_lead')}</p>
                                </div>
                            </Col>
                        </div>
                        <Row className="mt-8">
                            <Col lg="4" md="4">
                                <h5>
                                    <span className="text-primary font-w-7">01.</span> {t('about_mission_title')}
                                </h5>
                                <p>{t('about_mission_desc')}</p>
                            </Col>
                            <Col lg="4" md="4">
                                <h5>
                                    <span className="text-primary font-w-7">02.</span> {t('about_vision_title')}
                                </h5>
                                <p>
                                    {t('about_vision_desc')}
                                </p>
                            </Col>
                            <Col lg="4" md="4">
                                <h5>
                                    <span className="text-primary font-w-7">03.</span> {t('about_value_title')}
                                </h5>
                                <p>
                                    {t('about_value_desc')}
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
                                    <h6 className="text-primary mb-1">— {t('about_why_choose_us')}</h6>
                                    <h2 className="mb-0">{t('about_why_choose_us_title')}</h2>
                                </div>
                            </Col>
                            <Col lg="6">
                                <div>
                                    <p className="lead mb-0">{t('about_why_choose_us_lead')}</p>
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
            </div>
        </div>
    )
}

export default AboutUs;
