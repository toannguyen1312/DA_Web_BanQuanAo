import React from 'react';
import { Link } from 'react-router-dom';
import { Button, Col, Container, Form, FormGroup, Input, Row } from 'reactstrap';
import PageHeading from '../Components/PageHeading/PageHeading';
import { useTranslation } from 'react-i18next';

import selectsize1 from "../assets/images/opptionSize/selectsize1.jpg"
import selectsize2 from "../assets/images/opptionSize/selectsize2.jpg"
import selectsize3  from "../assets/images/opptionSize/selectsize3.jpg"



function SelectSize() {
    const { t } = useTranslation();
    const firstBreadcrumb = { label: t('select_size_breadcrumb_home') };
    const secondBreadcrumb = {
        label: t('select_size_breadcrumb_title'),
        active: true,
    };
    const handleSubmit = (e) => {
        e.preventDefault();
    };

    return (
        <div className='page-wrapper'>
            <PageHeading
                title={t('select_size_breadcrumb_title')}
                firstBreadcrumb={firstBreadcrumb}
                secondBreadcrumb={secondBreadcrumb}
            />
             <div className='page-content'>
      <section>
        <Container>
          <Row>
            {/* Form chiếm 2/3 */}
            <Col lg={9} md={12}>
            <h6 className="pd-5">{t('select_size_intro')}</h6>
            <img className="img-fluid" src={selectsize1} alt="" />
            <img className="img-fluid" src={selectsize2} alt="" />
            <img  className="img-fluid d-block mx-auto" src={selectsize3} alt="" />
            <h6 className="pd-5">{t('select_size_note')}</h6>
            <h6 className="pd-5">{t('select_size_contact')}</h6>
            </Col>

            {/* Bên phải 1/3 */}
            <Col lg={3} md={12} className="">
            <div className="d-flex align-items-center mb-3">
              <h5 className="fw-bold me-3 mb-0">{t('select_size_category')}<sup>™</sup></h5>
              <div className="flex-grow-1 border-bottom" style={{ borderColor: '#ccc' }}></div>
            </div>
            <div className="footer-links p-1">
                <ul className="list-unstyled">
                <li><a href="#" className="text-dark d-block py-1 small-text"><span className="text-secondary me-1">•</span> {t('select_size_about')}</a></li>
                  <li><a href="#" className="text-dark d-block py-1 small-text"><span className="text-secondary me-1">•</span> {t('select_size_contact_link')}</a></li>
                  <li><a href="#" className="text-dark d-block py-1 small-text"><span className="text-secondary me-1">•</span> {t('select_size_recruitment')}</a></li>
                  <li><a href="#" className="text-dark d-block py-1 small-text"><span className="text-secondary me-1">•</span> {t('select_size_map')}</a></li>
                  <li><a href="#" className="text-dark d-block py-1 small-text"><span className="text-secondary me-1">•</span> {t('select_size_privacy')}</a></li>
                  <li><a href="#" className="text-dark d-block py-1 small-text"><span className="text-secondary me-1">•</span> {t('select_size_order_guide')}</a></li>
                  <li><a href="#" className="text-dark d-block py-1 small-text"><span className="text-secondary me-1">•</span> {t('select_size_size_guide')}</a></li>
                  <li><a href="#" className="text-dark d-block py-1 small-text"><span className="text-secondary me-1">•</span> {t('select_size_payment_policy')}</a></li>
                  <li><a href="#" className="text-dark d-block py-1 small-text"><span className="text-secondary me-1">•</span> {t('select_size_exchange_policy')}</a></li>
                  <li><a href="#" className="text-dark d-block py-1 small-text"><span className="text-secondary me-1">•</span> {t('select_size_vip_policy')}</a></li>
                  <li><a href="#" className="text-dark d-block py-1 small-text"><span className="text-secondary me-1">•</span> {t('select_size_faq')}</a></li>
                  <li><a href="#" className="text-dark d-block py-1 small-text"><span className="text-secondary me-1">•</span> {t('select_size_cookie_policy')}</a></li>

                </ul>
            </div>

            <div className="d-flex align-items-center mb-3">
              <h5 className="fw-bold me-3 mb-0">{t('select_size_hot_products')}<sup>™</sup></h5>
              <div className="flex-grow-1 border-bottom" style={{ borderColor: '#ccc' }}></div>
            </div>

            <div className="d-flex align-items-center mb-3">
              <h5 className="fw-bold me-3 mb-0">{t('select_size_viewed_products')}<sup>™</sup></h5>
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