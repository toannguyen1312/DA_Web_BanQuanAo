import React from "react";
import { Link } from "react-router-dom";
import.meta.glob('../../assets/css/*.css')

export default function HeaderMiddle(props) {
  const { options } = props;

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
                  <span className="mb-0 d-block">Gọi cho chúng tôi</span>
                  <Link className="text-muted" to="tel:+912345678900">
                    +84-039-444-1312
                  </Link>
                </div>
              </div>
            </div>

            <div className="col-md-6">
              <div className="right-nav align-items-center d-flex justify-content-end">
                <form className="form-inline border rounded w-100">
                  <select className="custom-select border-0 rounded-0 bg-light form-control d-none d-lg-inline">
                    {options.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                  <input
                    className="form-control border-0 border-left col"
                    type="search"
                    placeholder="Nhập từ khóa của bạn"
                    aria-label="Search"
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
