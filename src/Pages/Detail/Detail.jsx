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
    const selectedProduct = useSelector((state) => state.selectProduct.selectedProduct)
    useEffect(() => {
        if (selectedProduct !== null) {
        const first = selectedProduct.result[0];
        setSelectProduct(first);
        setVariant(first);
        setSelectedSize(first.sizes[0]);
        }
    }, [selectedProduct]);


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
                                                // onClick={() => handleAddToCart(product)}
                                            >
                                                <i className="las la-shopping-cart mr-1"></i>Thêm vào giỏ hàng
                                            </Button>
                                            <Button
                                                className="btn btn-dark btn-animated    "
                                                type="button"
                                                // onClick={() => {
                                                //     handleAddToWishList(product);
                                                // }}
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
                                            // className={
                                            //     activeTab === "1"
                                            //         ? "text-dark active ms-0"
                                            //         : "text-dark ms-0"
                                            // }
                                            // onClick={() => {
                                            //     toggle("1");
                                            // }}
                                        >
                                            Description
                                        </NavLink>
                                    </NavItem>
                                    <NavItem>
                                        <NavLink
                                            // className={
                                            //     activeTab === "2" ? "text-dark active" : "text-dark"
                                            // }
                                            // onClick={() => {
                                            //     toggle("2");
                                            // }}
                                        >
                                            Additional Information
                                        </NavLink>
                                    </NavItem>
                                    <NavItem>
                                        <NavLink
                                            // className={
                                            //     activeTab === "3" ? "active text-dark" : "text-dark"
                                            // }
                                            // onClick={() => {
                                            //     toggle("3");
                                            // }}
                                        >
                                            Reviews (3)
                                        </NavLink>
                                    </NavItem>
                                </Nav>
                                <TabContent  className="pt-5">
                                    <TabPane tabId="1">

                                        <div className="row align-items-center">
                                            <div className="col-md-5">
                                                {/* <img className="img-fluid w-100" src={`assets/images/${product.pictures[0]}`} alt="" /> */}
                                            </div>
                                            <div className="col-md-7 mt-5 mt-lg-0">
                                                {/* <h3 className="mb-3">{product.name}</h3> */}
                                                {/* <p>{product.description}</p>  */}
                                                <Link className="btn btn-primary btn-animated" to="#"><i
                                                    className="las la-long-arrow-alt-right mr-1"></i>Read More</Link>
                                            </div>
                                        </div></TabPane>
                                    <TabPane tabId="2">
                                        <h5 className="mb-3">Additional information</h5>
                                        <Table bordered className="mb-0">
                                            <tbody>
                                                <tr>
                                                    <td>Size</td>
                                                    {/* <td>{product.size.join(" ")}</td> */}
                                                </tr>
                                                <tr>
                                                    <td>Color</td>
                                                    {/* <td>{product.colors.join(" ")}</td> */}
                                                </tr>
                                                <tr>
                                                    <td>Chest</td>
                                                    <td>38 inches</td>
                                                </tr>
                                                <tr>
                                                    <td>Waist</td>
                                                    <td>20 cm</td>
                                                </tr>
                                                <tr>
                                                    <td>Length</td>
                                                    <td>35 cm</td>
                                                </tr>
                                                <tr>
                                                    <td>Fabric</td>
                                                    <td>Cotton, Silk &amp; Synthetic</td>
                                                </tr>
                                                <tr>
                                                    <td>Warranty</td>
                                                    <td>6 Months</td>
                                                </tr>
                                            </tbody>
                                        </Table>
                                    </TabPane>
                                    <TabPane tabId="3">
                                        <Row className="total-rating align-items-center">
                                            <Col md="6">
                                                <div className="bg-dark shadow-sm rounded text-center p-5">
                                                    <h5 className="text-white">Overall</h5>
                                                    {/* <h4 className="text-white">{product.rating}</h4> */}
                                                    <h6 className="text-white">(03 Reviews)</h6>
                                                </div>
                                            </Col>
                                            <Col md="6" className="mt-3 mt-lg-0">
                                                <div className="rating-list">
                                                    {/* {starRatings.map(
                                                        ({ stars, percentage, color }) => (
                                                            <RatingBar
                                                                stars={stars}
                                                                percentage={percentage}
                                                                color={color}
                                                            />
                                                        )
                                                    )} */}
                                                </div>
                                            </Col>
                                        </Row>
                                        <Row className="mt-7">

                                            {/* {items.map(
                                                ({ image, name, description, rating }, i) => (
                                                    <ReviewItem
                                                        key={i}
                                                        image={image}
                                                        name={name}
                                                        description={description}
                                                        rating={rating}
                                                    />
                                                )
                                            )} */}
                                            <div className="mt-8 shadow p-5">
                                                <h4 className="mb-4">Add Review</h4>
                                                <Form id="contact-form" className="row" >
                                                    <FormGroup className="col-sm-6">
                                                        <Input
                                                            type="text"
                                                            name="name"
                                                            placeholder="Name"
                                                            required
                                                            className="form-control"
                                                            // value={name}
                                                            // onChange={(event) =>
                                                            //     setName(event.target.value)
                                                            // }
                                                        />
                                                    </FormGroup>
                                                    <FormGroup className="col-sm-6">
                                                        <Input
                                                            type="email"
                                                            name="email"
                                                            className="form-control"
                                                            placeholder="Email Address"
                                                            required
                                                            // value={email}
                                                            // onChange={(event) =>
                                                            //     setEmail(event.target.value)
                                                            // }
                                                        />
                                                    </FormGroup>
                                                    <FormGroup className="col-12 clearfix">
                                                        <label >Rating</label>
                                                        <Input
                                                            type="select"
                                                            name="rating"
                                                            id="ratingSelect"
                                                            // value={rating}
                                                            className="form-control custom-select"
                                                            // onChange={(event) =>
                                                            //     setRating(event.target.value)
                                                            // }
                                                        >
                                                            {/* <select defaultValue="">
                                                                    <option value="" disabled hidden>-- Select --</option>
                                                                    <option value="1">1</option>
                                                                    <option value="2">2</option>
                                                                    <option value="3">3</option>
                                                                    <option value="4">4</option>
                                                                    <option value="5">5</option>
                                                                    </select> */}

                                                        </Input>
                                                    </FormGroup>
                                                    <FormGroup className="col-12">
                                                        <Input
                                                            type="text"
                                                            name="phone"
                                                            className="form-control"
                                                            placeholder="Phone Number"
                                                            required
                                                            // value={phone}
                                                            // onChange={(event) =>
                                                            //     setPhone(event.target.value)
                                                            // }
                                                        />
                                                    </FormGroup>
                                                    <FormGroup className="col-12">
                                                        <Input
                                                            type="textarea"
                                                            name="comment"
                                                            className="form-control rounded-4 h-auto"
                                                            placeholder="Type Comment"
                                                            rows="4"
                                                            required
                                                            // value={comment}
                                                            // onChange={(event) =>
                                                            //     setComment(event.target.value)
                                                            // }
                                                        />
                                                    </FormGroup>
                                                    <div className="col-12">
                                                        <Button color="primary" className="mt-3 btn btn-primary btn-animated">
                                                            Post Review
                                                        </Button>
                                                    </div>
                                                </Form>
                                            </div>
                                        </Row>
                                    </TabPane>
                                </TabContent>
                            </Col>
                        </Row>
                    </Container>
                    {/* <section>
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
                                        {filterProducts()}
                                    </OwlCarousel>
                                </Col>
                            </Row>
                        </Container>
                    </section> */}
                </div>
            </div>
        </div>
    );
}


export default Detail