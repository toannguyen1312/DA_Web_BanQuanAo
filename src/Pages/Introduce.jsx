import React from 'react';
import { Link } from 'react-router-dom';
import { Button, Col, Container, Form, FormGroup, Input, Row } from 'reactstrap';
import PageHeading from '../Components/PageHeading/PageHeading';
import { useTranslation } from 'react-i18next';

function Introduce() {
    const { t } = useTranslation();
    const firstBreadcrumb = { label: t('introduce_breadcrumb_home') };
    const secondBreadcrumb = {
        label: t('introduce_breadcrumb_title'),
        active: true,
    };
    const handleSubmit = (e) => {
        e.preventDefault();
    };

    return (
        <div className='page-wrapper'>
            <PageHeading
                title={t('introduce_breadcrumb_title')}
                firstBreadcrumb={firstBreadcrumb}
                secondBreadcrumb={secondBreadcrumb}
            />
             <div className='page-content'>
      <section>
        <Container>
          <Row>
            <Col lg={9} md={12}>
            <p className="pd-5 text-dark">{t('introduce_brand_desc')}</p>
            <h5 className="fw-bold">{t('introduce_mission_title')}</h5>
            <p className="pd-5 text-dark">{t('introduce_mission_desc')}</p>
           
            <h5 className="fw-bold">{t('introduce_vision_title')}</h5>
            <p className="pd-5 text-dark">{t('introduce_vision_desc')}</p>
           
            <h5 className="fw-bold">{t('introduce_message_title')}</h5>
            <p className="pd-5 text-dark">{t('introduce_message_desc')}</p>
           
            <h5 className="fw-bold">{t('introduce_perfect_choice')}</h5>
           
            </Col>

            <Col lg={3} md={12} className="">
            <div className="d-flex align-items-center mb-3">
              <h5 className="fw-bold me-3 mb-0">{t('introduce_category')}<sup>™</sup></h5>
              <div className="flex-grow-1 border-bottom" style={{ borderColor: '#ccc' }}></div>
            </div>
            <div className="footer-links p-1">
                <ul className="list-unstyled">
                <li><a href="#" className="text-dark d-block py-1 small-text"><span className="text-secondary me-1">•</span> {t('introduce_about')}</a></li>
                  <li><a href="#" className="text-dark d-block py-1 small-text"><span className="text-secondary me-1">•</span> {t('introduce_contact')}</a></li>
                  <li><a href="#" className="text-dark d-block py-1 small-text"><span className="text-secondary me-1">•</span> {t('introduce_recruitment')}</a></li>
                  <li><a href="#" className="text-dark d-block py-1 small-text"><span className="text-secondary me-1">•</span> {t('introduce_map')}</a></li>
                  <li><a href="#" className="text-dark d-block py-1 small-text"><span className="text-secondary me-1">•</span> {t('introduce_privacy')}</a></li>
                  <li><a href="#" className="text-dark d-block py-1 small-text"><span className="text-secondary me-1">•</span> {t('introduce_order_guide')}</a></li>
                  <li><a href="#" className="text-dark d-block py-1 small-text"><span className="text-secondary me-1">•</span> {t('introduce_size_guide')}</a></li>
                  <li><a href="#" className="text-dark d-block py-1 small-text"><span className="text-secondary me-1">•</span> {t('introduce_payment_policy')}</a></li>
                  <li><a href="#" className="text-dark d-block py-1 small-text"><span className="text-secondary me-1">•</span> {t('introduce_exchange_policy')}</a></li>
                  <li><a href="#" className="text-dark d-block py-1 small-text"><span className="text-secondary me-1">•</span> {t('introduce_vip_policy')}</a></li>
                  <li><a href="#" className="text-dark d-block py-1 small-text"><span className="text-secondary me-1">•</span> {t('introduce_faq')}</a></li>
                  <li><a href="#" className="text-dark d-block py-1 small-text"><span className="text-secondary me-1">•</span> {t('introduce_cookie_policy')}</a></li>

                </ul>
            </div>

            <div className="d-flex align-items-center mb-3">
              <h5 className="fw-bold me-3 mb-0">{t('introduce_hot_products')}<sup>™</sup></h5>
              <div className="flex-grow-1 border-bottom" style={{ borderColor: '#ccc' }}></div>
            </div>

            <div className="d-flex align-items-center mb-3">
              <h5 className="fw-bold me-3 mb-0">{t('introduce_viewed_products')}<sup>™</sup></h5>
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