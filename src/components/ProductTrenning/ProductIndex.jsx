import React from "react";
import ProductCard from "./ProductCard";
import { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllProducts } from "../../store/reducer/productReducer"
import { useTranslation } from "react-i18next";

function ProductIndex() {
  const dispatch = useDispatch();
  const [hasFetched, setHasFetched] = useState(false);
  const newProducts = useSelector((state) => state.getProduct.GetProduct);
  const { t } = useTranslation();

  // Cắt 2 phần tử đầu tiên
// const slicedObj = Object.fromEntries(
//   Object.entries(obj).slice(0, 2)
// );


  // 👉 Fetch sản phẩm khi component mount
  useEffect(() => {
    dispatch(fetchAllProducts());
  }, []);

  console.log("productIndex: ", newProducts)

  
  return (
    <>
      <section style={{padding:"0px", marginTop: "5rem"}}>
        <div className="container-fluid px-lg-8">
          <div className="row justify-content-center text-center">
            <div className="col-lg-8 col-md-10">
              <div className="mb-8">
                <h6 className="text-primary mb-1">— {t("newCollection")}</h6>
                <h3 className="mb-0">{t("newProducts")}</h3>
              </div>
            </div>
          </div>
          <div className="row">
          {newProducts?.result?.length > 0 ? (
            newProducts.result
              .filter(product => product.colors?.length > 0 && product.colors[0]?.image) // 👈 lọc có ảnh
              .map((product) => {
                const colors = product.colors;
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

export default ProductIndex;
