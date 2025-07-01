import '../../lib/jquery-global'
import "owl.carousel/dist/assets/owl.carousel.css";
import "owl.carousel/dist/assets/owl.theme.default.css";
import React, { useEffect, useState } from "react";
import OwlCarousel from "react-owl-carousel";
import ReactImageGallery from 'react-image-gallery';
import 'react-image-gallery/styles/css/image-gallery.css';
import PageHeading from '../../Components/PageHeading/PageHeading'
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { jwtDecode } from "jwt-decode"; 
import {createWishList} from "../../store/reducer/wishlistReducer"
import {fetchWishList} from "../../store/reducer/selectedWishList"
import { getUser, getProduct } from '../../service/productService';
import { toast } from "react-toastify";
import { getReviewProductID } from '../../service/detail';
import {
    Button,
    Col,
    Container,
    Form,
    FormGroup,
    Input,
    Nav,
    NavItem,
    NavLink,
    Progress,
    Row,
    TabContent,
    TabPane,
    Table
} from "reactstrap";

function Detail() {

    const dispatch = useDispatch();
    const [quantity, setQuantity] = useState(1);
    const [selectProduct, setSelectProduct] = useState(null); // quản lý sản phẩm
    const [selectedVariant, setVariant] = useState(null); // chứa tất cả các màu
    const [selectedSize, setSelectedSize] = useState(null);
    const wishList = useSelector(state => state.fetchWishListSlice.SelectedWishList);
    const selectedProduct = useSelector((state) => state.selectProduct.selectedProduct)
    const token = useSelector(state =>state.auth.token)
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

    const firstBreadcrumb = { label: "Trang", link: "/product-left-image" };
    const secondBreadcrumb = {
        label: "Chi tiết sản phẩm",
        link: "/product-left-image",
        active: true,
    };

    useEffect(() => {
        if (selectedProduct !== null) {
        const first = selectedProduct.result[0];
        setSelectProduct(first);
        setVariant(first);
        setSelectedSize(first.sizes[0]);
        }
    }, [selectedProduct]);
    useEffect(() => {
        window.scrollTo(0, 0); // ✅ Thêm cái này
    }, []);


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

    const handleAddToCart = async () => {
        if (!selectProduct || !selectedSize) return;
        const maxStock = getStockBySize();
        if (quantity > maxStock) {
            toast("Số lượng sản phẩm trong kho không đủ!", {
                position: "top-right",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });
            return;
        }
        // TODO: Thực hiện logic thêm vào giỏ hàng ở đây
        // Ví dụ: gọi API hoặc dispatch action
        toast("Đã thêm vào giỏ hàng!", {
            position: "top-right",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
        });
    };






// review


 const [activeTab, setActiveTab] = useState("1");
    const toggle = (tab) => {
        if (activeTab !== tab) {
            setActiveTab(tab);
            if(tab === "1") {
                console.log("result: ", tab)
                console.log("dữ liệu: ", selectProduct.imageUrl)
            }
        }
    };

    const[reviews, setReviews] = useState([])
    useEffect(() => {
        const fetchRating = async () => {
            const data = await getReviewProductID(selectProduct?.product.productId)
            setReviews(data)
        }

        if (selectProduct?.product?.productId) {
            fetchRating()
        }
    }, [selectProduct])


    console.log("result: ", reviews)


   const ReviewItem = ({ image, name, description, rating, reviewDate }) => {
    // Chuyển đổi và định dạng ngày
    const formattedDate = new Date(reviewDate).toLocaleDateString('vi-VN', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
    });

    return (
        <div className="media-holder mt-5">
            <div className="media d-block d-md-flex">
                <img
                    className="img-fluid align-self-center rounded mr-md-3 mb-3 mb-md-0"
                    alt="image"
                    src={image}
                    style={{ width: '100px', height: '100px' }}
                />
                <div className="media-body">
                    <div className="d-flex align-items-center">
                        <h6 className="mb-0">{name}</h6>
                        <small className="mx-3 text-muted">{formattedDate}</small>
                        <div className="star-rating">
                            {[...Array(rating)].map((_, i) => (
                                <i key={i} className="las la-star"></i>
                            ))}
                        </div>
                    </div>
                    <p className="mb-0 mt-3">{description}</p>
                </div>
            </div>
        </div>
    );
};

const totalReviews = reviews.length;

const starRatings = [5, 4, 3, 2, 1].map((stars) => {
  const count = reviews.filter((r) => r.rating === stars).length;
  const percentage = totalReviews ? Math.round((count / totalReviews) * 100) : 0;
  const color = "#ffc107"; // màu vàng cho sao

  return { stars, percentage, color };
});


    const RatingBar = ({ stars, percentage, color }) => (
    <div className="d-flex align-items-center mb-2">
        <div className="text-nowrap me-3 mr-2">{stars} Sao</div>
        <div className="w-100">
        <Progress value={percentage} color={color} style={{ height: "5px" }} />
        </div>
        <span className="text-muted ms-3">{percentage}%</span>
    </div>
    );


    //  const filterProducts = () => {
    //     const topRatedProducts = allProducts.filter((product) => product.category === cat);
    //     return renderProductCards(topRatedProducts);
    // };
    const renderProductCards = (filteredProducts) => {
        return filteredProducts.map((product) => (
            <div className="item" key={product.id}>
                {/* Rest of the ProductCard component code */}
                <ProductCard
                    id={product.id}
                    imgBackSrc={`assets/images/${product.pictures[0]}`}
                    imgFrontSrc={`assets/images/${product.pictures[1]}`}
                    title={product.name}
                    price={product.salePrice}
                    actualPrice={product.price}
                    rating={product.rating}
                    onClick={() => { refreshPage() }}
                />
            </div>
        ));
    };


    return (
        <div className="page-wrapper">
            <PageHeading
                title="Chi tiết sản phẩm"
                firstBreadcrumb={firstBreadcrumb}
                secondBreadcrumb={secondBreadcrumb}
            />
            <div className="page-content">
                <div>
                    <section>
                        <div className="container">
                            <div className="row">
                                <div className="col-lg-6 col-12">

                                {selectProduct?.imageUrl && (
                                    <ReactImageGallery
                                        items={[{
                                        original: selectProduct.imageUrl,
                                        thumbnail: selectProduct.imageUrl
                                        }]}
                                        showNav={true}
                                        showThumbnails={false}
                                        showFullscreenButton={false}
                                        showPlayButton={false}
                                        swipe={true}
                                        disableScroll={true}
                                    />
                                    )}

                                </div>
                                <div className="col-lg-6 col-12 mt-5 mt-lg-0">
                                    <div className="product-details">
                                    {selectProduct && (<h3 className="mb-0">{selectProduct.product.name}</h3>)}
                                        <div className="star-rating mb-4">
                                            {/* {Array.from({ length: product.rating }).map((_, index) => (
                                                <i key={index} className="las la-star"></i>
                                            ))} */}
                                            {renderSelectedRating()}
                                        </div>

                                        {selectProduct &&
                                        <span className="product-price h4">
                                            {selectProduct.price?.toLocaleString('vi-VN')} ₫
                                            <del className="text-muted h6 ml-2">{(selectProduct.price - (selectProduct.price * selectProduct.discount / 100)).toLocaleString('vi-VN')} ₫</del>
                                        </span>
                                         }
                                        <ul className="list-unstyled my-4">
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
                                        {selectProduct && (<p className="mb-4">{selectProduct.product.category.description}</p>)}

                                        <div className="mb-5">
                                            {/* Phần số lượng + size */}
                                            <div className="d-sm-flex align-items-center mb-3">
                                                {/* Số lượng */}
                                                <div className="d-flex align-items-center mr-sm-4">
                                                <Button
                                                    className="btn-product btn-product-up"
                                                    onClick={() => quantity > 1 && setQuantity(quantity - 1)}
                                                >
                                                    <i className="las la-minus"></i>
                                                </Button>
                                                <Input
                                                    className="form-product"
                                                    type="number"
                                                    name="form-product"
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
                                                    className="btn-product btn-product-down"
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

                                                {/* Size */}
                                                <Input
                                                type="select"
                                                className="custom-select mt-3 mt-sm-0"
                                                name="size"
                                                id="size"
                                                placeholder="Size"
                                                onChange={handleSizeChange}
                                                >
                                                {selectProduct &&
                                                    selectProduct.sizes.map((size) => (
                                                    <option key={size} value={size}>
                                                        {size}
                                                    </option>
                                                    ))}
                                                </Input>
                                            </div>

                                            {/* Chọn màu - tách ra bên dưới */}
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
                                                        className={`color-swatch ${selectedVariant?.color === item.color ? 'selected' : ''}`}
                                                        style={{ backgroundColor: item.color }}
                                                        title={item.color}
                                                    >
                                                        {item.color}
                                                    </label>
                                                    </div>
                                                ))}
                                                </div>
                                            </div>
                                        </div>

                                        <div className="product-link d-flex align-items-center mt-4">
                                            <Button
                                                className="btn btn-primary btn-animated mr-sm-4 mb-3 mb-sm-0"
                                                type="button"
                                                onClick={handleAddToCart}
                                            >
                                                <i className="las la-shopping-cart mr-1"></i>Thêm vào giỏ hàng
                                            </Button>
                                            <Button
                                                className="btn btn-dark btn-animated    "
                                                type="button"
                                                onClick={() => {
                                                    handleAddToWishList(selectProduct.product.productId);
                                                }}
                                            >
                                                <i className="lar la-heart mr-1"></i>Yêu thích 
                                            </Button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                    <Container>
                        <Row>
                            <Col md={12}>
                                <Nav tabs>
                                    <NavItem>
                                        <NavLink
                                            className={
                                                activeTab === "1"
                                                    ? "text-dark active ms-0"
                                                    : "text-dark ms-0"
                                            }
                                            onClick={() => {
                                                toggle("1");
                                            }}
                                        >
                                            Giới thiệu
                                        </NavLink>
                                    </NavItem>
                                    <NavItem>
                                        <NavLink
                                            className={
                                                activeTab === "2" ? "text-dark active" : "text-dark"
                                            }
                                            onClick={() => {
                                                toggle("2");
                                            }}
                                        >
                                            Thông tin chi tiết
                                        </NavLink>
                                    </NavItem>
                                    <NavItem>
                                        <NavLink
                                            className={
                                                activeTab === "3" ? "active text-dark" : "text-dark"
                                            }
                                            onClick={() => {
                                                toggle("3");
                                            }}
                                        >
                                            Đánh giá sản phẩm
                                        </NavLink>
                                    </NavItem>
                                </Nav>
                                <TabContent activeTab={activeTab}  className="pt-5" >
                                    <TabPane tabId="1">
                                        <div className="row align-items-center">
                                            <div className="col-md-5">
                                                <img className="img-fluid w-80" style={{width: "80%"}} src={selectProduct?.imageUrl || ''} alt={selectProduct?.name || ''} />
                                            </div>
                                            <div className="col-md-7 mt-5 mt-lg-0">
                                                <h3 className="mb-3">{selectProduct?.product.name}</h3>
                                                <p>{selectProduct?.product.category.description}</p> 
                                                <Link className="btn btn-primary btn-animated" to="#"><i
                                                    className="las la-long-arrow-alt-right mr-1"></i>Đọc thêm</Link>
                                            </div>
                                        </div>
                                    </TabPane>
                                    <TabPane tabId="2">
                                        <h5 className="mb-3">Thông tin chi tiết</h5>
                                        <Table bordered className="mb-0">
                                            <tbody>
                                                <tr>
                                                <td>Kích cỡ</td>
                                                    <td>
                                                        {selectProduct &&
                                                        selectProduct.sizes.map((size, index) => (
                                                            <span key={size}>
                                                            {size}
                                                            {index !== selectProduct.sizes.length - 1 && ', '}
                                                            </span>
                                                        ))}
                                                    </td>
                                                </tr>

                                               <tr>
                                                <td>Màu</td>
                                                <td>
                                                    {selectedProduct.result.map((item, idx) => (
                                                    <span key={idx}>
                                                        {item.color}
                                                        {idx !== selectedProduct.result.length - 1 && ', '}
                                                    </span>
                                                    ))}
                                                </td>
                                                </tr>

                                                <tr>
                                                    <td>Giá</td>
                                                    <td>{selectProduct?.price.toLocaleString('vi-VN')} ₫</td>
                                                </tr>
                                                <tr>
                                                    <td>Giảm giá</td>
                                                    <td>{selectProduct?.discount} %</td>
                                                </tr>
                                                <tr>
                                                    <td>Sẳn có</td>
                                                    <td><span className="text-muted">
                                                    {
                                                        selectProduct?.sizes.map((size, index) => {
                                                        if (size === selectedSize) {
                                                            return selectProduct.stock[index];
                                                        }
                                                        return null;
                                                        })
                                                    }
                                                    </span></td>
                                                </tr>
                                               
                                            </tbody>
                                        </Table>
                                    </TabPane>
                                    <TabPane tabId="3">
                                        <Row className="total-rating align-items-center">
                                            <Col md="6">
                                                <div className="bg-dark shadow-sm rounded text-center p-5">
                                                    <h5 className="text-white">Tổng thể</h5>
                                                    {/* <h4 className="text-white">{product.rating}</h4> */}
                                                    <h6 className="text-white">( {reviews.length} Đánh giá )</h6>
                                                </div>
                                            </Col>
                                           <Col md="6" className="mt-3 mt-lg-0">
                                                <div className="rating-list">
                                                    {starRatings.map(({ stars, percentage, color }) => (
                                                    <RatingBar
                                                        key={stars}
                                                        stars={stars}
                                                        percentage={percentage}
                                                        color={color}
                                                    />
                                                    ))}
                                                </div>
                                            </Col>
                                        </Row>
                                        <div>
                                            {reviews.map(
                                                (item, i) => (
                                                      <ReviewItem
                                                        key={i}
                                                        image={item.imageURL}
                                                        name={item.user.username}
                                                        description={item.comment}
                                                        rating={item.rating}
                                                        reviewDate={item.reviewDate}
                                                    />
                                                )
                                            )}
                                        </div>
                                    </TabPane>
                                </TabContent>
                            </Col>
                        </Row>
                    </Container>
                    <section>
                        <Container>
                            <div className="row justify-content-center text-center">
                                <div className="col-lg-8 col-md-10">
                                    <div className="mb-5">
                                        <h6 className="text-primary mb-1">
                                            — You may also like
                                        </h6>
                                        <h2 className="mb-0">Related Products</h2>
                                    </div>
                                </div>
                            </div>
                            <Row>
                                <Col>
                                    <OwlCarousel
                                        className="owl-carousel no-pb owl-2"
                                        dots={false}
                                        nav={true}
                                        items={3}
                                        responsive={{
                                            0: { items: 1 },
                                            576: { items: 2 },
                                            768: { items: 2 },
                                            992: { items: 3 },
                                        }}
                                        navText={["<span class='las la-arrow-left'><span></span></span>","<span class='las la-arrow-right'><span></span></span>"]}
                                    >
                                        {/* {filterProducts()} */}
                                    </OwlCarousel>
                                </Col>
                            </Row>
                        </Container>
                    </section>
                </div>
            </div>
        </div>
    );
}


export default Detail