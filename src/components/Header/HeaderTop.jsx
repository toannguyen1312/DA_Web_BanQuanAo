import React, { useState } from "react";
import { Link } from "react-router-dom";
import '../../assets/css/bootstrap.min.css'
import.meta.glob('../../assets/css/*.css')
import "../../assets/css/header/HeaderNavBar.css"

export default function HeaderTop() {
    const languages = [
      { name: "English", value: "en" },
      { name: "Arabic", value: "ar" },
      { name: "French", value: "fr" },
      { name: "Italian", value: "it" },
    ];
    const socialIcons = [
      { name: "Facebook", iconClass: "lab la-facebook-f" },
      { name: "Twitter", iconClass: "lab la-twitter" },
      { name: "LinkedIn", iconClass: "lab la-linkedin-in" },
      { name: "Instagram", iconClass: "lab la-instagram" },
    ];
    const [activeIcon, setActiveIcon] = useState(null);
    const [selectedLanguage, setSelectedLanguage] = useState(languages[0].name);
    function handleLanguageChange(language) {
      setSelectedLanguage(language);
      // You can perform any other action when the language is changed
    }
  
    return (
      <>
        <div className="header-top bg-dark py-1">
          <div className="container">
            <div className="row align-items-center">
              <div className="col-md-12 d-flex align-items-center justify-content-between text-white">
                <div className="d-none d-md-flex align-items-center">
                  <small className="mr-3">
                    <i className="las la-store text-primary mr-1 align-middle"></i>
                    Chào mừng đến với cửa hàng Ekocart
                  </small>{" "}
                  <small>
                    <i className="las la-truck text-primary mr-1 align-middle"></i>
                    Miễn phí vận chuyển toàn cầu
                  </small>
                </div>
                <div className="d-flex align-items-center">
                  <div className="language-selection mr-2">
                    <div className="dropdown">
                      <div
                        className="dropdown-button language"
                      >
                       English
                      </div>
                      <div className="dropdown-content">
                        <a href="#">Arabic</a>
                        <a href="#">French</a>
                        <a href="#">Italian</a>
                      </div>

                      {/* <div className="dropdown-menu">
                        {languages.map((language) => (
                          <Link
                            key={language.value}
                            className="dropdown-item"
                            to="#"
                            onClick={() => handleLanguageChange(language.name)}
                          >
                            {language.name}
                          </Link>
                        ))}
                      </div> */}
                    </div>
                  </div>
                  <div className="social-icons">
                    <ul className="list-inline mb-0">
                      {socialIcons.map((icon) => (
                        <li
                          key={icon.name}
                          className={`list-inline-item ${
                            activeIcon === icon.name ? "active" : ""
                          }`}
                          onMouseEnter={() => setActiveIcon(icon.name)}
                          onMouseLeave={() => setActiveIcon(null)}
                        >
                          <Link className="text-muted" to="#">
                            <i className={icon.iconClass}></i>
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <Link to="/SelectSize" className="option-size">Cách chọn Size</Link>
                  <Link to="/Introduce" className="option-size">Giới thiệu</Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
  