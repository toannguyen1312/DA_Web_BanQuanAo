import React, { useEffect, useState } from 'react';
import { Button, Card, CardBody, Table } from 'reactstrap';
import { FaShoppingCart, FaBoxOpen, FaDollarSign, FaUsers, FaExclamationTriangle, FaSearch } from 'react-icons/fa';
import '../../assets/css/Admin/Tabhome.css';
import { Chart as ChartJS, LineElement, PointElement, BarElement, CategoryScale, LinearScale, Title, Tooltip, Legend } from 'chart.js';
import { Line, Bar } from 'react-chartjs-2';

// Đăng ký các phần tử cần thiết của Chart.js
ChartJS.register(LineElement, PointElement, BarElement, CategoryScale, LinearScale, Title, Tooltip, Legend);

const AdminDashboard = () => {
  const [numUser, setNumUser] = useState(150);
  const [numPro, setNumPro] = useState(300);
  const [numOrder, setNumOrder] = useState(120);
  const [revenueTotal, setRevenueTotal] = useState(1500000);
  const [lowStockCount, setLowStockCount] = useState(10);
  const [unSoldProduct, setUnSoldProduct] = useState(5);
  const [revenueData, setRevenueData] = useState([]);
  const [orderData, setOrderData] = useState([]);



  useEffect(() => {
    // Mocking data that would come from a server
    setRevenueData([3000, 4000, 3500, 5000, 6000, 7000, 8000, 6500, 6000, 7500, 8500, 9000]);
    setOrderData([50, 60, 55, 70, 80, 90, 100, 75, 85, 90, 95, 110]);
    setNumUser(150);
    setNumPro(300);
    setNumOrder(120);
    setRevenueTotal(1500000);
    setLowStockCount(10);
    setUnSoldProduct(5);
  }, []);

  return (
    <div>
      <div className="text-center">
        <h3 className="page-title" style={{ color: 'black', fontWeight: 'bold', marginBottom: '30px' }}>Trang Chủ</h3>
      </div>

      <div className="row chart-container">
        <div className="col-lg-6">
          <Card>
            <CardBody>
              <h4 className="card-title">Biểu đồ doanh thu</h4>
              <Line
                data={{
                  labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
                  datasets: [{
                    label: 'Doanh thu',
                    data: revenueData,
                    backgroundColor: 'rgba(75, 192, 192, 0.2)',
                    borderColor: 'rgba(75, 192, 192, 1)',
                    borderWidth: 1,
                  }],
                }}
                options={{
                  scales: {
                    y: {
                      beginAtZero: true,
                    },
                  },
                }}
              />
            </CardBody>
          </Card>
        </div>
        <div className="col-lg-6">
          <Card>
            <CardBody>
              <h4 className="card-title">Biểu đồ đơn hàng</h4>
              <Bar
                data={{
                  labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
                  datasets: [{
                    label: 'Đơn hàng',
                    data: orderData,
                    backgroundColor: 'rgba(153, 102, 255, 0.2)',
                    borderColor: 'rgba(153, 102, 255, 1)',
                    borderWidth: 1,
                  }],
                }}
                options={{
                  scales: {
                    y: {
                      beginAtZero: true,
                    },
                  },
                }}
              />
            </CardBody>
          </Card>
        </div>
      </div>

      <div className="row">
        <div className="col-lg-4 col-md-6 col-sm-6">
          <Card className="text-center card-custom">
            <CardBody>
              <div className="card-header">
                <FaShoppingCart size={40} />
              </div>
              <h5 className="card-title"><strong>Đơn hàng</strong></h5>
              <h3>{numOrder}</h3>
              <Button color="info" size="sm" onClick={() => setActiveTab('3')}>Xem đơn hàng</Button>
            </CardBody>
          </Card>
        </div>
        <div className="col-lg-4 col-md-6 col-sm-6">
          <Card className="text-center card-custom">
            <CardBody>
              <div className="card-header">
                <FaBoxOpen size={40} />
              </div>
              <h5 className="card-title"><strong>Sản phẩm</strong></h5>
              <h3>{numPro}</h3>
              <Button color="info" size="sm">Xem sản phẩm</Button>
            </CardBody>
          </Card>
        </div>
        <div className="col-lg-4 col-md-6 col-sm-6">
          <Card className="text-center card-custom">
            <CardBody>
              <div className="card-header">
                <FaDollarSign size={40} />
              </div>
              <h5 className="card-title"><strong>Doanh thu</strong></h5>
              <h3>{revenueTotal} VND</h3>
              <Button color="info" size="sm">Chi tiết</Button>
            </CardBody>
          </Card>
        </div>
      </div>

      <div className="row">
        <div className="col-lg-4 col-md-6 col-sm-6">
          <Card className="text-center card-custom">
            <CardBody>
              <div className="card-header">
                <FaUsers size={40} />
              </div>
              <h5 className="card-title"><strong>Khách hàng</strong></h5>
              <h3>{numUser}</h3>
              <Button color="info" size="sm">Quản lý khách hàng</Button>
            </CardBody>
          </Card>
        </div>
        <div className="col-lg-4 col-md-6 col-sm-6">
          <Card className="text-center card-custom">
            <CardBody>
              <div className="card-header">
                <FaExclamationTriangle size={40} />
              </div>
              <h5 className="card-title"><strong>Sắp hết hàng</strong></h5>
              <h3>{lowStockCount}</h3>
              <Button color="info" size="sm">Cần nhập hàng</Button>
            </CardBody>
          </Card>
        </div>
        <div className="col-lg-4 col-md-6 col-sm-6">
          <Card className="text-center card-custom">
            <CardBody>
              <div className="card-header">
                <FaSearch size={40} />
              </div>
              <h5 className="card-title"><strong>Không bán được</strong></h5>
              <h3>{unSoldProduct}</h3>
              <Button color="info" size="sm">Chi tiết sản phẩm</Button>
            </CardBody>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;