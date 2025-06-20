import '../../lib/jquery-global';
import React from "react";
import OwlCarousel from "react-owl-carousel";
import "owl.carousel/dist/assets/owl.carousel.css";
import "owl.carousel/dist/assets/owl.theme.default.css";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import bg1 from "../../assets/images/bg/01.jpg"
import bg2 from "../../assets/images/bg/03.png"

const Banner = () => {
  const { t } = useTranslation();
  const options = {
    items: 1,
    nav: true,
    dots: false,
    autoplay: true,
    loop: true,
  };

  const slides = [
    {
      bgImg: bg1,
      title: t("banner_slide1_title"),
      subtitle: t("banner_slide1_subtitle"),
      button: t("banner_slide1_button"),
    },
    {
      bgImg: bg2,
      title: t("banner_slide2_title"),
      subtitle: t("banner_slide2_subtitle"),
      button: t("banner_slide2_button"),
    },
  ];

  const insertLineBreakAfterWords = (text, wordCount) => {
    const words = text.split(" ");
    if (words.length <= wordCount) return text;
    return (
      words.slice(0, wordCount).join(" ") +
      "<br/>" +
      words.slice(wordCount).join(" ")
    );
  };
  

  return (
    <div>
      <OwlCarousel
        className="banner-slider owl-carousel no-pb owl-2"
        {...options}
        navText={["<span class='las la-arrow-left'><span></span></span>","<span class='las la-arrow-right'><span></span></span>"]}
      >
        {slides.map((slide, index) => (
          <div
            key={index}
            className="item bg-pos-rt"
            style={{ backgroundImage: `url(${slide.bgImg})` }}
          >
            <div className="container h-100">
              <div className="row h-100 align-items-center">
                <div className="col-lg-7 col-md-12 custom-py-1 position-relative z-index-1">
                  <h4 className="font-w-6 text-primary animated3">
                    {slide.subtitle}
                  </h4>
                  <h5
                    className="mb-4 animated3 text-primary"
                    dangerouslySetInnerHTML={{
                      __html: insertLineBreakAfterWords(slide.title, 5),
                    }}
                  ></h5>
                  <div className="animated3">
                    <Link className="btn btn-primary btn-animated" to="#">
                      {slide.button}
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </OwlCarousel>
    </div>
  );
};

export default Banner;
