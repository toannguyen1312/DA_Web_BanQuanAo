import React, { useState, useEffect } from "react";
import { Button, Col, Input, Modal, ModalBody, Row } from 'reactstrap';
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import "../../assets/css/product/productCart.css"
import { setSelectedProduct } from "../../store/reducer/selectedProduct"
import { getProduct, getUser } from "../../service/productService"
import { jwtDecode } from "jwt-decode"; 
import {createWishList} from "../../store/reducer/wishlistReducer"
import {fetchWishList} from "../../store/reducer/selectedWishList"
import { toast } from "react-toastify";
import { getCart, getVariantProduct } from "../../service/cartService";
import { toggleCart, openCart } from "../../store/reducer/cartOpen";
import { createCartIem } from "../../store/reducer/cartItem"
import { fetchCartItem } from "../../store/reducer/selectedCartItem";
function ProductCard({ id, imgBackSrc, imgFrontSrc, title, price, actualPrice, discountPercent, rating }) {

    const dispatch = useDispatch();
    const [modalOpen, setModalOpen] = useState(false);
    const [quantity, setQuantity] = useState(1);
    const [selectProduct, setSelectProduct] = useState(null); // quản lý sản phẩm
    const [selectedVariant, setVariant] = useState(null); // chứa tất cả các màu
    const [selectedSize, setSelectedSize] = useState(null); // chọn size

  

    const selectedProduct = useSelector((state) => state.selectProduct.selectedProduct)
    const wishList = useSelector(state => state.fetchWishListSlice.SelectedWishList);
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

    useEffect(() => {
      if (selectedProduct !== null) {
        const first = selectedProduct.result[0];
        setSelectProduct(first);
        setVariant(first);
        setSelectedSize(first.sizes[0]);
      }
    }, [selectedProduct]);
    
  
    const toggleModal = () => {
        setModalOpen(!modalOpen);
      };
// size
      const handleSizeChange = (event) => {
        setSelectedSize(event.target.value);
      };
// color
      const handleColorClick = (color) => {
        const matched = selectedProduct.result.find(item => item.color === color);
        if (matched) {
          setSelectProduct(matched);
          setVariant(matched); 
        }
      };

      const renderSelectedRating = () => {
        const stars = [];
        if(selectProduct !== null) {
          for (let i = 0; i < selectProduct.rating; i++) {
            stars.push(<i key={i} className="las la-star"></i>);
          }
        }
        return stars;
      };
    
      // lấy ra stock hiện có theo size
      const getStockBySize = () => {
        if (!selectProduct || !selectedSize) return 0;
        const index = selectProduct.sizes.indexOf(selectedSize);
        return selectProduct.stock[index] || 0;
      };

        // sửa lý khi thêm vào sản phẩm yêu thích
        const handleAddToWishList = async (id) => {
          try {
            let user = null;
            const product = await getProduct(id);
            
            if (decoded.sub !== null) {
              user = await getUser(decoded.sub); // gọi đúng hàm getUser
            }
        
            const today = new Date();
            const formattedDate = today.toISOString().split('T')[0]; // YYYY-MM-DD
        
            if (product && user) {
              const wishlistData = {
                userId: user.userId,
                productId: product.productId,
                wishlistDate: formattedDate,
              };

              const exists = wishList?.result?.some(item => item.product?.productId === id);

              if (exists) {
                toast("Sản phẩm đã có trong yêu thích", {
                  position: "top-right",
                  autoClose: 2000,
                  hideProgressBar: false,
                  closeOnClick: true,
                  pauseOnHover: true,
                  draggable: true,
                  progress: undefined,
                  theme: "light",
                });
                return; // không thêm nữa
              }else {

                 // Gọi API createWishList để thêm dữ liệu vào database
              const res = await dispatch(createWishList(wishlistData));

              // Sau khi thêm thành công thì FETCH lại danh sách wishlist
               if (res.meta.requestStatus === "fulfilled") {
                 dispatch(fetchWishList(user.userId));
               }
               toast("Sản phẩm đã được thêm vào yêu thích", {
                position: "top-right",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
              });
              }
            }
          } catch (error) {
            console.error("Lỗi trong handleAddToWishList:", error);
          }
        };
        
        const handleAddToCart = async (id) => {
          try {
            let user = null;
            const product = await getProduct(id);
            let cart = null;
            if (decoded.sub !== null) {
              user = await getUser(decoded.sub); 
              cart = await getCart(user.userId) 
            }
            
            if (user && selectProduct && selectedSize && cart) {
             
              const variantProduct = await getVariantProduct(selectProduct.product.productId, selectedSize, selectedVariant?.color)
              if(variantProduct != null) {

                const cartIem = {
                  cartId: cart.cartId,
                  productVariants: variantProduct.productVariantId,
                  quantity: quantity
                }
                const createCartItem = await  dispatch(createCartIem(cartIem)) 
                

                if (createCartItem.message == "Item quantity updated") {
                  toast("Sản phẩm đã được cập nhật", {
                    position: "top-right",
                    autoClose: 2000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                  });
                  dispatch(fetchCartItem(cart.cartId));
                }else {
                  toast("Sản phẩm đã được thêm vào giỏ hàng", {
                    position: "top-right",
                    autoClose: 2000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                  });dispatch(fetchCartItem(cart.cartId));
                 }
              }
              }
          } catch (error) {
            console.error("Lỗi trong handleAddToWishList:", error);
          }
        };

    return (
        <>
          <div className="card product-card">
            {discountPercent && (
                <span className="discount-badge">
                -{discountPercent}%
                </span>
            )}

            <button
              className="btn-wishlist btn-sm"
              type="button"
              data-toggle="tooltip"
              data-placement="left"
              title="Add to wishlist"
              onClick={() => { handleAddToWishList(id) }}
            >
              <i className="lar la-heart"></i>
            </button>

            <Link className="card-img-hover d-block" to="/product-left-image" 
            onClick={() => {
              dispatch(setSelectedProduct(id));
            }}
            >
              <img className="card-img-top card-img-back" src={imgBackSrc} alt="..." />
              <img className="card-img-top card-img-front" src={imgFrontSrc} alt="..." />
            </Link>

            <div className="card-info">
              <div className="card-body">
                <div className="product-title">
                  <Link
                    to="/product-left-image"
                    className="text-dark mt-4 mb-2 d-block link-title h6"
                    onClick={() => {
                      dispatch(setSelectedProduct(id));
                    }}
                  >
                    {title}
                  </Link>
                </div>
                <div className="mt-1">
                  <span className="product-price">
                    <del className="text-muted pr-1">{actualPrice?.toLocaleString('vi-VN')} ₫</del>
                    {price?.toLocaleString('vi-VN')} ₫
                  </span>
                  <div className="star-rating">
                    {/* {renderRating()} */}
                  </div>
                </div>
              </div>
              <div className="card-footer bg-transparent border-0" style={{ border: 'none' }}>
                <div className="product-link d-flex align-items-center justify-content-center">
                  <button
                    className="btn btn-compare"
                    data-toggle="tooltip"
                    data-placement="top"
                    title="WishList"
                    type="button"
                    onClick={() => { handleAddToWishList(id) }}
                  >
                    <i className="lar la-heart"></i>
                  </button>
                    <button
                      className="btn-cart btn btn-primary btn-animated mx-3"
                      type="button"
                      onClick={() => {
                        dispatch(openCart())
                      }}
                    >
                      <i className="las la-shopping-cart mr-1"></i>
                    </button>
                  <button
                    className="btn btn-view"
                    data-toggle="tooltip"
                    data-placement="top"
                    title="Quick View"
                    onClick={() => {
                      dispatch(setSelectedProduct(id))
                      toggleModal()
                    }}
                  >
                    <span >
                      <i className="las la-eye"></i>
                    </span>
                  </button>
                </div>
              </div>
            </div>
          </div>
          {selectedProduct && <Modal 
          className="custom-modal"
          style={{ maxWidth: '50%'}} 
          isOpen={modalOpen} 
          toggle={toggleModal}>

                <div className="overflow-hidden">
                  <Row>
                      <Col xs={11} className="align-items-center">
                      {" "}
                      <h5 className=" px-4">
                      Your Wishlist
                      </h5>
                      </Col>
                     
                        <Button
                          className="btn btn-primary btn-sm fs-1 ms-1 btn-latimes"
                          onClick={toggleModal}
                      >
                          <i className="las la-times"></i>
                      </Button>
                   
                  </Row>
                </div>
                <ModalBody>
                  <Row className="align-items-center">
                      <Col lg="5" className="col-12">
                      <div className="wrapper-price">
                      {selectProduct && <span className="product-price h4">{selectProduct.price?.toLocaleString('vi-VN')} ₫<del className="text-muted h6 ml-2">{(selectProduct.price - (selectProduct.price * discountPercent / 100)).toLocaleString('vi-VN')} ₫</del></span>}
                      </div>
                      {selectProduct && (<img className="img-fluid rounded img-item" src={selectProduct.imageUrl} alt="" />)}                      </Col>
                      <Col lg="7" className="col-12 mt-5 mt-lg-0">
                      <div className="product-details">
                         {selectProduct && (<h6 className="mb-0">{selectProduct.product.name}</h6>)} 
                          <div className="star-rating mb-2">
                          {renderSelectedRating()}
                          </div>
                          <ul className="list-unstyled my-1">
                          {selectProduct && selectedSize && (
                              <li className="mb-2">
                                Có sẵn: <span className="text-muted">
                                  {
                                    selectProduct.sizes.map((size, index) => {
                                      if (size === selectedSize) {
                                        return selectProduct.stock[index];
                                      }
                                      return null;
                                    })
                                  }
                                </span>
                              </li>
                            )}

                          {selectProduct && (<li>Thể loại: <span className="text-muted">{selectProduct.product.category.name}</span>
                            </li>)}
                          </ul>
                          {selectProduct && (<p className="mb-2">{selectProduct.product.category.description}</p>)}
                          <div className="d-sm-flex align-items-center">

                            <div className="d-sm-flex align-items-center mb-4">
                              <div className="d-flex align-items-center mr-sm-4 mb-3 mb-sm-0">
                                <div className="quantity-selector d-flex align-items-center">
                                  <Button className="btn-quantity" 
                                  onClick={() => quantity > 1 && setQuantity(quantity - 1)}>
                                    <i className="las la-minus"></i>
                                  </Button>
                                  <Input
                                    type="number"
                                    className="form-quantity text-center"
                                    value={quantity}
                                    onChange={(e) => {
                                      const maxStock = getStockBySize();
                                      const newQuantity = parseInt(e.target.value);
                                      if (selectProduct && newQuantity >= 1 && newQuantity <= maxStock) {
                                        setQuantity(newQuantity);
                                      }
                                    }}
                                  />
                                  <Button
                                    className="btn-quantity"
                                    onClick={() => {
                                      if (selectProduct) {
                                        const maxStock = getStockBySize();
                                        quantity < maxStock && setQuantity(quantity + 1);
                                      }
                                    }}
                                  >
                                    <i className="las la-plus"></i>
                                  </Button>
                                </div>
                              </div>

                              {/* Size */}
                              <Input
                                type="select"
                                className="custom-select"
                                name="size"
                                id="size"
                                placeholder="Size"
                                onChange={handleSizeChange}
                              >
                                
                                {selectProduct && selectProduct.sizes.map((size) => (
                                  <option key={size} value={size}>{size}</option>
                                ))}
                              </Input>
                            </div>
                          </div>

                          {/* Chọn màu - Đưa xuống dưới */}
                          <div className="mb-2">
                            <label className="font-weight-bold mb-2">Chọn màu:</label>
                            <div className="d-flex flex-wrap gap-2">
                              {selectedProduct.result.map((item, idx) => (
                                <div key={idx} className="ml-2">
                                  <input
                                    className="mr-1"
                                    type="radio"
                                    name="color"
                                    id={`color-${idx}`}
                                    checked={selectedVariant?.color === item.color}
                                    onChange={() => handleColorClick(item.color)}
                                  />
                                  <label
                                    htmlFor={`color-${idx}`}
                                    className={`color-swatch ${selectedVariant?.color === item.color ? 'selected' : ''}`}
                                    style={{ backgroundColor: item.color }}
                                    title={item.color}
                                  >{item.color}</label>
                                </div>
                              ))}
                            </div>
                          </div>

                          <div className="product-link d-flex align-items-center mt-1">
                              <Button
                                className="btn btn-primary btn-animated mr-sm-1 mb-3 mb-sm-0 btn-addToCart"
                                type="button"
                                onClick={() => {handleAddToCart(selectProduct.product.productId)}}
                              >
                                <i className="las la-shopping-cart"></i>
                                <span>Thêm vào giỏ hàng</span>
                              </Button>
                              <Button
                                className="btn btn-dark btn-animated btn-addToCart"
                                type="button"
                                onClick={() => { handleAddToWishList(id) }}
                              >
                                <i className="lar la-heart"></i>
                                <span>Yêu thích</span>
                              </Button>
                            </div>

                            <div className="d-sm-flex align-items-center border-top pt-4 mt-4">
                              <h6 className="mb-sm-0 mr-sm-4">Chia sẽ:</h6>
                              <ul className="list-inline">
                                  <li className="list-inline-item"><Link className="bg-white shadow-sm rounded p-2" to="#"><i
                                  className="la la-facebook"></i></Link>
                                  </li>
                                  <li className="list-inline-item"><Link className="bg-white shadow-sm rounded p-2" to="#"><i
                                  className="la la-dribbble"></i></Link>
                                  </li>
                                  <li className="list-inline-item"><Link className="bg-white shadow-sm rounded p-2" to="#"><i
                                  className="la la-instagram"></i></Link>
                                  </li>
                                  <li className="list-inline-item"><Link className="bg-white shadow-sm rounded p-2" to="#"><i
                                  className="la la-twitter"></i></Link>
                                  </li>
                                  <li className="list-inline-item"><Link className="bg-white shadow-sm rounded p-2" to="#"><i
                                  className="la la-linkedin"></i></Link>
                                  </li>
                              </ul>
                            </div>
                        </div>
                      </Col>
                  </Row>
                </ModalBody>

          </Modal >}
        </>
    
      );
}
export default ProductCard;
