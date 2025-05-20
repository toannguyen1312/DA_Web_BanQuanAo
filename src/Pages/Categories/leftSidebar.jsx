import React, { useState , useEffect } from 'react';
import PageHeading from '../../Components/PageHeading/PageHeading'
import { useLocation } from 'react-router-dom';
import { getProductByCategory, getAllProduct } from '../../service/categoryService'
import { Link } from "react-router-dom";
import SideBar from "../../pages/Sidebar/Sidebar"
import ProductCard from "../../components/ProductTrenning/ProductCard"
import {
    Card,
    CardText,
    Col,
    Container,
    Row
  } from "reactstrap";
function leftSidebar() {

    const location = useLocation();
    const[products, setProducts] = useState([]);
    const[allProducts, setAllProducts] = useState([]);
    const [filteredProducts, setFilteredProducts] = useState([]);


    
  const handleFilterChange = (filtered) => {
    setFilteredProducts(filtered); // nhận filtered từ sidebar và cập nhật state
  };

    const title = location.state?.title || 'Thể Loại';
    const categoryID = location.state?.categoryID || ""
    const firstBreadcrumb = { label: "Trang" };
    
    const secondBreadcrumb = {
        label: "Thể Loại",
        active: true,
      };

    
    useEffect(() => {
        const fetchProducts = async () => {
            if (categoryID) {
                const data = await getProductByCategory(categoryID);
                const getAllProducts = await getAllProduct();
                setProducts(data);
                setAllProducts(getAllProducts)
            }
        }
        fetchProducts();
    }, [categoryID])

    const [activeFilter, setActiveFilter] = useState('grid');

    const handleFilterClick = (filter) => {
      setActiveFilter(filter);
    };
  

    return (
        <div className='page-wrapper'>
            <PageHeading
                title={"Thể Loại " + title}
                firstBreadcrumb={firstBreadcrumb}
                secondBreadcrumb={secondBreadcrumb}
            />

            <div className='page-content'>
                    <section className='pt-4'>
                    <Container>
                        <Row>
                        <Col lg={9} md={12} className="order-lg-1">
                            <Row className="">
                            <Col>
                                <Card className="border-0 py-2">
                                <Row className="align-items-center">
                                    <Col md="5" className="mb-3 mb-md-0">
                                    <CardText tag="span" className="text-muted">
                                        Hiển thị từ 1 đến {products.length} tổng số 
                                        {" "}{allProducts.length} sản phẩm
                                    </CardText>
                                    </Col>
                                    
                                </Row>
                                </Card>
                            </Col>
                            </Row>
                            <Row className="text-center">

                            {(filteredProducts.length > 0 ? filteredProducts : products).length > 0 ? (
                                (filteredProducts.length > 0 ? filteredProducts : products).map((product) => {
                                    const colors = product.colors || [];
                                    const frontImage = colors[0]?.image || "default.jpg";
                                    const backImage = colors[1]?.image || frontImage;
                                    return (
                                    <Col lg="4" md="6" className="mt-5" key={product.productId}>
                                        <ProductCard
                                        id={product.productId}
                                        imgBackSrc={backImage}
                                        imgFrontSrc={frontImage}
                                        title={product.name}
                                        price={colors[0]?.discountPrice}
                                        actualPrice={colors[0]?.price}
                                        discountPercent={Math.round(
                                            ((colors[0]?.price - colors[0]?.discountPrice) / colors[0]?.price) * 100
                                        )}
                                        rating={colors[0]?.rating}
                                        />
                                    </Col>
                                    )
                                })
                                ) : (
                                <div className="col-12 text-center">
                                    <p>Không có sản phẩm nào phù hợp.</p>
                                </div>
                                )}


                            </Row>
                            <Row
                            className="mt-5 mb-5"
                            style={{ justifyContent: "center" }}
                            >
                            {/* <CustomPagination
                                activePage={activePage}
                                totalPages={totalPages}
                                onPageChange={handlePageChange}
                            /> */}
                            </Row>
                        </Col>
                        <div className="col-lg-3 col-md-12  mt-8 mt-lg-0">
                            <SideBar 
                            onchangeFilterBar= {handleFilterChange}
                            />
                        </div>
                        </Row>
                    </Container>
                    </section>
            </div>

        </div>
       
    )
}

export default leftSidebar