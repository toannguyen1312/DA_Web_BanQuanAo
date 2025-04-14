import React from "react";
import BannerSliderIndex from "../components/Hero Banner/BannerSliderIndex"
import FeatureIndex from "../components/Feature/FeatureIndex"
import ProductIndex from "../components/ProductTrenning/ProductIndex"
import { useState, useEffect } from "react";

export default function Home() {

  
    const feature = [
      {
        icon: "las la-truck ic-2x text-primary",
        title: "Miễn phí vận chuyển",
        description: "Miễn phí giao hàng toàn quốc",
      },
      {
        icon: "las la-hand-holding-usd ic-2x text-primary",
        title: "Hoàn tiền",
        description: "Hoàn tiền dễ dàng trong 7 ngày",
      },
      {
        icon: "las la-lock ic-2x text-primary",
        title: "Thanh toán an toàn",
        description: "Bảo mật thanh toán tuyệt đối",
      },
      {
        icon: "las la-headset ic-2x text-primary",
        title: "Hỗ trợ 24/7",
        description: "Hỗ trợ khách hàng 24/7, kể cả ngày lễ",
      },
    ];


    return (
        <div className="page-wrapper">
          <BannerSliderIndex />
          <div className="page-content">
            <FeatureIndex feature={feature}/>
            <ProductIndex/>
          </div>
        </div>
      );

}