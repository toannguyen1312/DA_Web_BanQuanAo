import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Card, CardText, Button } from 'reactstrap';
import PageHeading from '../../Components/PageHeading/PageHeading';
import ProductCard from '../../components/ProductTrenning/ProductCard';
import { getDiscountedProducts } from '../../service/productService';
import { useTranslation } from 'react-i18next';

function OutletSale() {
    const { t } = useTranslation();
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [visibleCount, setVisibleCount] = useState(8); // số lượng hiển thị ban đầu
    const initialCount = 8;

 const firstBreadcrumb = { label: t('outlet_sale_breadcrumb_home'), link: "/discourd-item" };
  const secondBreadcrumb = {
    label: t('outlet_sale_breadcrumb_title'),
    link: "/discourd-item",
    active: true,
  };
 useEffect(() => {
    const fetchDiscountedProducts = async () => {
      setLoading(true);
      const result = await getDiscountedProducts();
      setProducts(result);
      setLoading(false);
    };

    fetchDiscountedProducts();
  }, []);

  const handleLoadMore = () => {
    setVisibleCount((prev) => prev + initialCount);
  };

  const handleCollapse = () => {
  setVisibleCount(initialCount);
  window.scrollTo({ top: 0, behavior: 'smooth' });
};


  const visibleProducts = products.slice(0, visibleCount);

  return (
    <div>
      <PageHeading
        title={t('outlet_sale_breadcrumb_title')}
        firstBreadcrumb={firstBreadcrumb}
        secondBreadcrumb={secondBreadcrumb}
      />
      <div className='page-content'>
        <section className='pt-8'>
          <div className="container-fluid px-lg-8">
            <Container>
              <Row>
                <Col lg={12} md={12}>
                  <Row>
                    <Col>
                      <Card className="border-0 py-2">
                        <Row className="align-items-center">
                          <Col md="5" className="mb-3 mb-md-0">
                            <CardText tag="span" className="text-muted">
                              {products.length > 0
                                ? t('outlet_sale_showing', { shown: visibleProducts.length, total: products.length })
                                : t('outlet_sale_no_products')}
                            </CardText>
                          </Col>
                        </Row>
                      </Card>
                    </Col>
                  </Row>

                  {/* Danh sách sản phẩm */}
                  <Row>
                    {loading ? (
                      <div className="col-12 text-center">
                        <p>{t('outlet_sale_loading')}</p>
                      </div>
                    ) : visibleProducts.length > 0 ? (
                      visibleProducts.map((product) => {
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
                        <p>{t('outlet_sale_no_products')}</p>
                      </div>
                    )}
                  </Row>

                  {/* Nút "Xem thêm" hoặc "Thu gọn" */}
                  {!loading && products.length > initialCount && (
                    <div className="text-center mt-4">
                      {visibleCount < products.length ? (
                        <Button color="primary" onClick={handleLoadMore}>
                          {t('outlet_sale_load_more')}
                        </Button>
                      ) : (
                        <Button color="secondary" onClick={handleCollapse}>
                          {t('outlet_sale_collapse')}
                        </Button>
                      )}
                    </div>
                  )}
                </Col>
              </Row>
            </Container>
          </div>
        </section>
      </div>
    </div>
  );
}

export default OutletSale;
