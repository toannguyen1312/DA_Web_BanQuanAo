import React from 'react';
import { Card, CardBody, Col, Row, CardHeader, CardFooter } from 'reactstrap';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';

// Cấu hình cho biểu đồ
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const TabHome = () => {
  const revenueData = {
    labels: ['Tháng 1', 'Tháng 2', 'Tháng 3', 'Tháng 4', 'Tháng 5', 'Tháng 6'],
    datasets: [
      {
        label: 'Doanh thu',
        data: [300, 500, 700, 600, 900, 1000],
        borderColor: '#00b5e2',
        backgroundColor: 'rgba(0, 181, 226, 0.2)',
        fill: true,
        tension: 0.4,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Biểu đồ doanh thu',
      },
    },
  };

  return (
    <div>
      <h3>Trang chủ</h3>
      <p>Đây là trang chủ của hệ thống quản lý admin.</p>

      <Row>
        <Col lg="4" md="6">
          <Card>
            <CardHeader>Tổng số đơn</CardHeader>
            <CardBody>
              <h2>1,245</h2>
            </CardBody>
          </Card>
        </Col>

        <Col lg="4" md="6">
          <Card>
            <CardHeader>Tổng số sản phẩm</CardHeader>
            <CardBody>
              <h2>530</h2>
            </CardBody>
          </Card>
        </Col>

        <Col lg="4" md="6">
          <Card>
            <CardHeader>Đơn trong ngày</CardHeader>
            <CardBody>
              <h2>65</h2>
            </CardBody>
          </Card>
        </Col>
      </Row>

      <Row className="mt-4">
        <Col lg="12">
          <Card>
            <CardHeader>Biểu đồ doanh thu</CardHeader>
            <CardBody>
              <Line data={revenueData} options={options} />
            </CardBody>
            <CardFooter>
              <small className="text-muted">Doanh thu được tính theo tháng</small>
            </CardFooter>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default TabHome;
