import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import "../../assets/css/bootstrap.min.css";
import.meta.glob('../../assets/css/*.css');
import "../../assets/css/header/HeaderNavBar.css";

export default function HeaderTop() {
  const { t, i18n } = useTranslation();

  const languages = [
    { name: "Vietnamese", value: "vn" },
    { name: "English", value: "en" },
  ];

  const socialIcons = [
    { name: "Facebook", iconClass: "lab la-facebook-f" },
    { name: "Twitter", iconClass: "lab la-twitter" },
    { name: "LinkedIn", iconClass: "lab la-linkedin-in" },
    { name: "Instagram", iconClass: "lab la-instagram" },
  ];

  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [activeIcon, setActiveIcon] = useState(null);

  function handleLanguageChange(language) {
    i18n.changeLanguage(language); // change app language
    setDropdownOpen(false);
  }

  return (
    <div className="header-top bg-dark py-1">
      <div className="container">
        <div className="row align-items-center">
          <div className="col-md-12 d-flex align-items-center justify-content-between text-white">
            <div className="d-none d-md-flex align-items-center">
              <small className="mr-3">
                <i className="las la-store text-primary mr-1 align-middle"></i>
                {t("welcome")}
              </small>
              <small>
                <i className="las la-truck text-primary mr-1 align-middle"></i>
                {t("freeShipping")}
              </small>
            </div>
            <div className="d-flex align-items-center">
              {/* Dropdown */}
              <div className="language-selection mr-3">
                <div className="dropdown" onMouseLeave={() => setDropdownOpen(false)}>
                  <div
                    className="dropdown-button language text-white"
                    onClick={() => setDropdownOpen(!dropdownOpen)}
                    onMouseEnter={() => setDropdownOpen(true)}
                    style={{ cursor: 'pointer' }}
                  >
                    {i18n.language === "en" ? "English" : "Tiếng Việt"}{" "}
                    <i className="las la-angle-down ml-1"></i>
                  </div>
                  {dropdownOpen && (
                    <div className="dropdown-menu show" style={{ display: "block" }}>
                      {languages.map((lang) => (
                        <Link
                          key={lang.value}
                          className="dropdown-item"
                          to="#"
                          onClick={() => handleLanguageChange(lang.value)}
                        >
                          {lang.name}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              {/* Social Icons */}
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

              {/* Links */}
              <Link to="/SelectSize" className="option-size ml-3">{t("selectSize")}</Link>
              <Link to="/Introduce" className="option-size ml-3">{t("aboutUs")}</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
