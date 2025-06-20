import React from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import '../../assets/css/bootstrap.min.css'
import '../../assets/css/lightslider.min.css'
import '../../assets/css/owl.carousel.css'
import '../../assets/css/spacing.css'
import '../../assets/css/theme-plugin.css'
import '../../assets/css/theme.min.css'
import '../../assets/css/footer.css'



export default function Footer() {
  const { t } = useTranslation();
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
                {t('description')}
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
                  <h5 className="mb-4 text-white">{t('menu')}</h5>
                  <ul className="navbar-nav list-unstyled mb-0">
                    <li className="mb-3 nav-item">
                      <Link className="/#" to="/">
                        {t('home')}
                      </Link>
                    </li>
                    <li className="mb-3 nav-item">
                      <Link className="/about-us" to="about-us">
                        {t('aboutUs')}
                      </Link>
                    </li>
                    <li className="mb-3 nav-item">
                      <Link className="/shop" to="shop-grid-left-sidebar">
                        {t('shop')}
                      </Link>
                    </li>
                    <li className="mb-3 nav-item">
                      <Link className="faq" to="faq">
                        {t('faq')}
                      </Link>
                    </li>
                    <li className="mb-3 nav-item">
                      <Link className="blog" to="blog-card">
                        {t('blogs')}
                      </Link>
                    </li>
                    <li className="nav-item">
                      <Link className="contact-us" to="contact-us">
                        {t('contact')}
                      </Link>
                    </li>
                  </ul>
                </div>
                <div className="col-12 col-sm-4 mt-6 mt-sm-0 navbar-dark">
                  <h5 className="mb-4 text-white">{t('topProducts')}</h5>
                  <ul className="navbar-nav list-unstyled mb-0">
                    <li className="mb-3 nav-item">
                      <Link className="nav-link" to="#">
                        {t('menShirts')}
                      </Link>
                    </li>
                    <li className="mb-3 nav-item">
                      <Link className="nav-link" to="#">
                        {t('menPants')}
                      </Link>
                    </li>
                    <li className="mb-3 nav-item">
                      <Link className="nav-link" to="#">
                        {t('accessories')}
                      </Link>
                    </li>
                    <li className="mb-3 nav-item">
                      <Link className="nav-link" to="#">
                        {t('shoes')}
                      </Link>
                    </li>
                    <li className="mb-3 nav-item">
                      <Link className="nav-link" to="#">
                        {t('bags')}
                      </Link>
                    </li>
                    <li className="mb-3 nav-item">
                      <Link className="nav-link" to="#">
                        {t('hats')}
                      </Link>
                    </li>
                  </ul>
                </div>
                <div className="col-12 col-sm-4 mt-6 mt-sm-0 navbar-dark">
                  <h5 className="mb-4 text-white">{t('features')}</h5>
                  <ul className="navbar-nav list-unstyled mb-0">
                    <li className="mb-3 nav-item">
                      <Link className="nav-link" to="terms-and-conditions">
                      {t('terms')}
                      </Link>
                    </li>
                    <li className="mb-3 nav-item">
                      <Link className="nav-link" to="privacy-policy">
                      {t('privacy')}
                      </Link>
                    </li>
                    <li className="mb-3 nav-item">
                      <Link className="nav-link" to="#">
                      {t('support')}
                      </Link>
                    </li>
                    <li className="mb-3 nav-item">
                      <Link className="nav-link" to="#">
                      {t('shippingReturns')}
                      </Link>
                    </li>
                    <li className="mb-3 nav-item">
                      <Link className="nav-link" to="#">
                      {t('careers')}
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
                  <h6 className="mb-1 text-light">{t('storeAddress')}</h6>
                  <p className="mb-0 text-muted">
                    {t('universityAddress')}
                  </p>
                </div>
              </div>
              <div className="d-flex mb-3">
                <div className="mr-2">
                  {" "}
                  <i className="las la-envelope ic-2x text-primary"></i>
                </div>
                <div>
                  <h6 className="mb-1 text-light">{t('email')}</h6>
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
                  <h6 className="mb-1 text-light">{t('phone')}</h6>
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
                  <h6 className="mb-1 text-light">{t('workingHours')}</h6>
                  <span className="text-muted">{t('workingHoursDetail')}</span>
                </div>
              </div>
            </div>
          </div>
          <hr className="my-8" />
          <div className="row text-muted align-items-center">
            <div className="col-md-7">
              {t('copyright')}
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
