import React, { useState } from "react";
import { Link } from "react-router-dom";
import.meta.glob('../../assets/css/*.css')
import { searchProducts } from "../../service/productService";
import { useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next';

export default function HeaderMiddle(props) {

  
  const { options } = props;
  const [searchValue, setSearchValue] = useState("");
  const [selectedOption, setSelectedOption] = useState(options[0]?.value || "");
  const navigate = useNavigate(); 
  const { t } = useTranslation();

  const handleSearch = async (e) => {
    e.preventDefault();

    const queryParams = new URLSearchParams();

    if (searchValue) queryParams.append("name", searchValue);
    if (selectedOption) queryParams.append("categoryId", selectedOption);

    navigate(`/search-item?${queryParams.toString()}`);
   
  };

  return (
    <>
      <div className="py-md-3 py-2">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-md-6 d-none d-md-flex align-items-center">
              <Link className="navbar-brand logo d-none d-lg-block" to="/">
                <img className="img-fluid" src="src\assets\images\image.png" alt="" />
              </Link>
              <div className="media ml-lg-11">
                <i className="las la-mobile-alt ic-2x bg-white rounded p-2 shadow-sm mr-2 text-primary"></i>
                <div className="media-body">
                  <span className="mb-0 d-block">{t("call_us")}</span>
                  <Link className="text-muted" to="tel:+912345678900">
                    +84-039-444-1312
                  </Link>
                </div>
              </div>
            </div>

            <div className="col-md-6">
              <div className="right-nav align-items-center d-flex justify-content-end">
                <form
                  className="form-inline border rounded w-100"
                  onSubmit={handleSearch}
                >
                  <select
                    className="custom-select border-0 rounded-0 bg-light form-control d-none d-lg-inline"
                    value={selectedOption}
                    onChange={e => setSelectedOption(e.target.value)}
                  >
                    {options.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                  <input
                    className="form-control border-0 border-left col"
                    type="search"
                    placeholder={t("search_placeholder")}
                    aria-label="Search"
                    value={searchValue}
                    onChange={e => setSearchValue(e.target.value)}
                  />
                  <button
                    className="btn btn-primary text-white col-auto"
                    type="submit"
                  >
                    <i className="las la-search"></i>
                  </button>
                </form>
              </div>
            </div>
            {/* <!--menu end--> */}
          </div>
        </div>
      </div>
    </>
  );
}
