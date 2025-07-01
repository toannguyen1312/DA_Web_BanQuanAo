import React from "react";
import BannerSliderIndex from "../components/Hero Banner/BannerSliderIndex"
import FeatureIndex from "../components/Feature/FeatureIndex"
import ProductIndex from "../components/ProductTrenning/ProductIndex"
import BestSellingProduct from "../components/BestSellingProduct/BestSellingProduct";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {fetchWishList} from "../store/reducer/selectedWishList"
import {fetchCartItem} from "../store/reducer/selectedCartItem"
import { jwtDecode } from "jwt-decode"; 
import {  getUser } from "../service/productService"
import { getCart, createCart } from "../service/cartService";
import { useTranslation } from "react-i18next";

export default function Home() {

    const dispatch = useDispatch()
    const { t } = useTranslation();


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
        title: t("feature_free_shipping_title"),
        description: t("feature_free_shipping_description"),
      },
      {
        icon: "las la-hand-holding-usd ic-2x text-primary",
        title: t("feature_refund_title"),
        description: t("feature_refund_description"),
      },
      {
        icon: "las la-lock ic-2x text-primary",
        title: t("feature_secure_payment_title"),
        description: t("feature_secure_payment_description"),
      },
      {
        icon: "las la-headset ic-2x text-primary",
        title: t("feature_support_title"),
        description: t("feature_support_description"),
      },
    ];

    useEffect(() => {
      async function fetchData() {
      let user = null;
      let cart = null;
        if (decoded && decoded.sub) {
          user = await getUser(decoded.sub); 
          cart = await getCart(user.userId)

          if (cart == null) {
            const newCartData = {
              userId: user.userId,
              status: `Giỏ hàng ${decoded.sub}`,
              date: new Date().toISOString().split("T")[0], 
            };
    
            cart = await createCart(newCartData);
          }
        }
        
        if(cart?.cartId) {
          dispatch(fetchCartItem(cart.cartId))
        }
        if(user?.userId) {
          dispatch(fetchWishList(user.userId))
        }
        }
      fetchData()
    }, [])
   
     useEffect(() => {
            window.scrollTo(0, 0); // ✅ Thêm cái này
        }, []);

    return (
        <div className="page-wrapper">
          <BannerSliderIndex />
          <div className="page-content">
            <FeatureIndex feature={feature}/>
            <ProductIndex/>
            <hr/>
            <BestSellingProduct/>
          </div>
        </div>
      );

}