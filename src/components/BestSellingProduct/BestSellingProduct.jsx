import React from "react";
import ProductCard from "../ProductTrenning/ProductCard";
import { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllProducts } from "../../store/reducer/productReducer"
import { useTranslation } from "react-i18next";
import { getBestSellerProduct } from "../../service/productService";

function BestSellingProduct() {
  const { t } = useTranslation();
  const [bestSellers, setBestSellers] = useState([]);

  useEffect(() => {
    const fetchBestSellers = async () => {
      try {
        const response = await getBestSellerProduct();
        console.log("product:", response.resutl)
        // Giả sử kết quả là: { result: [...] }
        const products = response || [];
        setBestSellers(products.slice(0, 8)); // Lấy tối đa 8 sản phẩm đầu
      } catch (error) {
        console.error("Failed to fetch best-selling products", error);
      }
    };

    fetchBestSellers();
  }, []);
  console.log("sản phẩm:", bestSellers)
  
  return (
    <>
      <section style={{padding:"0px", marginTop: "3rem"}}>
        <div className="container-fluid px-lg-8">
          <div className="row justify-content-center text-center">
            <div className="col-lg-8 col-md-10">
              <div className="mb-8">
                <h3 className="mb-0">{t("bestSellProduct")}</h3>
              </div>
            </div>
          </div>
          <div className="row">
          {bestSellers.length > 0 ? (
              bestSellers.map((product) => {
                const colors = product.colors || [];
                const frontImage = colors[0]?.image || "default.jpg";
                const backImage = colors[1]?.image || frontImage;

                return (
                  <div
                    className="col-xl-3 col-lg-4 col-md-6 mb-4"
                    key={product.productId}
                  >
                    <ProductCard
                      id={product.productId}
                      imgFrontSrc={frontImage}
                      imgBackSrc={backImage}
                      title={product.name}
                      price={colors[0]?.discountPrice}
                      actualPrice={colors[0]?.price}
                      discountPercent={Math.round(
                        ((colors[0]?.price - colors[0]?.discountPrice) / colors[0]?.price) * 100
                      )}
                      rating={colors[0]?.rating}
                    />
                  </div>
                );
              })
            ) : (
              <div className="col-12 text-center">
                <p>{t("noProducts")}</p>
              </div>
            )}
          </div>
        </div>
      </section>
    </>
  );
}

export default BestSellingProduct;
