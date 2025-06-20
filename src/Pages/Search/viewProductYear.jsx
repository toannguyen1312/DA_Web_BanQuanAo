import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Container, Row, Col, Card, CardText } from 'reactstrap';
import PageHeading from '../../Components/PageHeading/PageHeading';
import ProductCard from '../../components/ProductTrenning/ProductCard';
import { getByYear } from '../../service/productService';

function useQuery() {
  return new URLSearchParams(useLocation().search);
}


function ViewProductYear() {
  const query = useQuery();
  const year = query.get("year") || "";

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const firstBreadcrumb = { label: "Trang", link: "/search-year" };
  const secondBreadcrumb = {
    label: "hiển thị sản phẩm",
    link: "/search-year",
    active: true,
  };

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      console.log("year: ", year)
      try {
        const results = await getByYear(year);
        setProducts(results);
      } catch (error) {
        console.error("Lỗi khi tìm kiếm sản phẩm:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, [year]);

  return (
    <div>
      <PageHeading
        title="Sản phẩm tìm kiếm"
        firstBreadcrumb={firstBreadcrumb}
        secondBreadcrumb={secondBreadcrumb}
      />
      <div className='page-content'>
        <section className='pt-8'>
          <div className="container-fluid px-lg-8">
            <Container>
              <Row>
                <Col lg={12} md={12} className="order-lg-1">
                  <Row>
                    <Col>
                      <Card className="border-0 py-2">
                        <Row className="align-items-center">
                          <Col md="5" className="mb-3 mb-md-0">
                            <CardText tag="span" className="text-muted">
                              {products.length > 0
                                ? `Hiển thị ${products.length} sản phẩm`
                                : "Không có sản phẩm nào phù hợp."}
                            </CardText>
                          </Col>
                        </Row>
                      </Card>
                    </Col>
                  </Row>
                  <Row>
                  {loading ? (
                    <div className="col-12 text-center">
                      <p>Đang tải...</p>
                    </div>
                  ) : products.length > 0 ? (
                    products.map((product) => {
                      const colors = product.colors || [];
                      const frontImage = colors[0]?.image || "default.jpg";
                      const backImage = colors[1]?.image || frontImage;
                      return (
                        <Col lg="3" md="6" className="mt-5" key={product.productId}>
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
                      );
                    })
                  ) : (
                    <div className="col-12 text-center">
                      <p>Không có sản phẩm nào phù hợp.</p>
                    </div>
                  )}
                </Row>

                </Col>
              </Row>
            </Container>
          </div>
        </section>
      </div>
    </div>
  );
}
export default ViewProductYear;
