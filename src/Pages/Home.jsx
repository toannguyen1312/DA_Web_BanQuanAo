import React from "react";
import BannerSliderIndex from "../components/Hero Banner/BannerSliderIndex"
import FeatureIndex from "../components/Feature/FeatureIndex"
import ProductIndex from "../components/ProductTrenning/ProductIndex"
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {fetchWishList} from "../store/reducer/selectedWishList"
import { jwtDecode } from "jwt-decode"; 
import { getProduct, getUser } from "../service/productService"
export default function Home() {

    const dispatch = useDispatch()


     const token = useSelector(state =>state.auth.token)
        let decoded = null;
         try {
            if (token) {
              decoded = jwtDecode(token);
            } else {
              decoded = null;
            }
          } catch (error) {
            console.error("Invalid token:", error);
            decoded = null;
          }
     
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

    useEffect(() => {
      async function fetchData() {
      let user = null;
            if (decoded.sub !== null) {
              user = await getUser(decoded.sub); // gọi đúng hàm getUser
            }
        dispatch(fetchWishList(user.userId))
          }
      fetchData()
    })
    

     useEffect(() => {
            window.scrollTo(0, 0); // ✅ Thêm cái này
        }, []);

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