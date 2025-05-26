import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Row, Col, Button, Nav, NavItem, NavLink, Collapse, TabContent, TabPane } from 'reactstrap';
import classnames from 'classnames';
import { FaSearch, FaUserCircle, FaBars } from 'react-icons/fa'; 
import { FaHome, FaUsers, FaBox, FaProductHunt, FaList, FaClipboardList, FaChevronDown, FaShippingFast, FaTag, FaChevronRight, FaWarehouse, FaInbox, FaChartLine, FaUserAlt, FaUsersCog, FaHistory } from 'react-icons/fa';
import TabHome from './TabHome';
import TabUserManagement from './TabUserManagement';
import TabOrderManagement from './TabOrderManagement';
import TabProductManagement from './TabProductManagement';
import TabStaffManagement from './TabStaffManagement';
// import TabHistoryManagament from './TabHistoryManagement';
import TabCategoryManagement from './TabCategoryManagement';
import TabPostManagement from './TabPostManagement';
import TabShipManagement from './TabShipManagement';
import TabVoucherManagement from './TabVoucherManagement';
import { useDispatch, useSelector } from "react-redux";
import '../../assets/css/Admin/ManagerAd.css';
import { logout } from "../../store/reducer/authSlice"; 
import { getAllUser, OrderUsers } from '../../service/admin';


function ManagerAdmin() {
    const dispatch = useDispatch();
    const dropdownRef = useRef(null);
    const [activeTab, setActiveTab] = useState('1');  
    const [isDropdownOpen, setIsDropdownOpen] = useState(false); 
    const [isSubMenuOpen, setIsSubMenuOpen] = useState(false);
    const [isSidebarVisible, setIsSidebarVisible] = useState(true); 
    const token = useSelector(state =>state.auth.token)
    const [users, setUsers] = useState([]);
    const [orders, setOrders] = useState([]);
    // Xử lý nhấn bên ngoài dropdown
    useEffect(() => {
        function handleClickOutside(event) {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsDropdownOpen(false);
            }
        }
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    const toggleTab = (tab) => {
        if (activeTab !== tab) setActiveTab(tab);
    };

    const toggleDropdown = () => setIsDropdownOpen(!isDropdownOpen);
    const toggleSidebar = () => setIsSidebarVisible(!isSidebarVisible);
    const toggleSubMenu = () => setIsSubMenuOpen(!isSubMenuOpen); 

    const navigate = useNavigate();

    const handleLogout = () => {
        dispatch(logout({token: token}));  
        navigate('/admin/login');
    };

   useEffect(() => {
    if (activeTab === '2' && token) {
        console.log("🔥 token trong useEffect:", token);
        getAllUser(token)
            .then(data => {
                console.log("data: ", data)
                setUsers(data);
                console.log("📦 users từ API:", data);
            })
            .catch(err => {
                setUsers([]);
                console.error("❌ Lỗi lấy user:", err);
            });
    }

    if(activeTab == 3) {
        OrderUsers().then(data => {
            console.log("order từ API: ", data)
            setOrders(data);
        })
        .catch(error =>{
            setOrders([])
            console.log("lỗi lấy order: ", error)
        })
    }
}, [activeTab, token]);



   

    return (
        <div className="d-flex">
            {/* Sidebar */}
            <div className={`sidebar bg-dark text-white p-3 ${isSidebarVisible ? 'active' : ''}`}>
                <div className="search-container">
                    <div className="search-box">
                        <input type="text" className="search-input" placeholder="Tìm kiếm..." />
                        <FaSearch className="search-icon" />
                    </div>
                </div>
                <Nav vertical>
                    <NavItem className="d-flex justify-content-between align-items-center">
                        <NavLink className={classnames({ active: activeTab === '1' })} onClick={() => toggleTab('1')}>
                            <FaHome className="icon" /> Trang chủ
                        </NavLink>
                        <FaChevronRight className="icon" />
                    </NavItem>
                    <NavItem className="d-flex justify-content-between align-items-center" onClick={toggleSubMenu}>
                        <NavLink>
                            <FaUsers className="icon" /> Quản lý người dùng
                        </NavLink>
                        {isSubMenuOpen ? (
                        <FaChevronDown className="iconr" />
                    ) : (
                        <FaChevronRight className="iconr" />
                    )}
                    </NavItem>
                    
                    <Collapse isOpen={isSubMenuOpen}>
                        <NavItem className="pl-2 sub">
                            <NavLink onClick={() => toggleTab('2')}><FaUserAlt className="icon" />Quản lý Khách Hàng</NavLink>
                        </NavItem>
                        
                    </Collapse>
                    <NavItem className="d-flex justify-content-between align-items-center">
                        <NavLink className={classnames({ active: activeTab === '3' })} onClick={() => toggleTab('3')}>
                            <FaBox className="icon" /> Quản lý đơn hàng
                        </NavLink>
                        <FaChevronRight className="iconr" />
                    </NavItem>
                    <NavItem className="d-flex justify-content-between align-items-center">
                        <NavLink className={classnames({ active: activeTab === '4' })} onClick={() => toggleTab('4')}>
                            <FaProductHunt className="icon" /> Quản lý sản phẩm
                        </NavLink>
                        <FaChevronRight className="iconr" />
                    </NavItem>
                    {/* Các mục quản lý khác */}
                    <NavItem className="d-flex justify-content-between align-items-center">
                        <NavLink className={classnames({ active: activeTab === '5' })} onClick={() => toggleTab('5')}>
                            <FaList className="icon" /> Quản lý thể loại
                        </NavLink>
                        <FaChevronRight className="iconr" />
                    </NavItem>
                    <NavItem className="d-flex justify-content-between align-items-center">
                        <NavLink className={classnames({ active: activeTab === '6' })} onClick={() => toggleTab('6')}>
                            <FaClipboardList className="icon" /> Quản lý bài đăng
                        </NavLink>
                        <FaChevronRight className="icon" />
                    </NavItem>
                    <NavItem className="d-flex justify-content-between align-items-center">
                        <NavLink className={classnames({ active: activeTab === '7' })} onClick={() => toggleTab('7')}>
                            <FaShippingFast className="icon" /> Quản lý loại ship
                        </NavLink>
                        <FaChevronRight className="iconr" />
                    </NavItem>
                    <NavItem className="d-flex justify-content-between align-items-center">
                        <NavLink className={classnames({ active: activeTab === '8' })} onClick={() => toggleTab('8')}>
                            <FaTag className="icon" /> Quản lý voucher
                        </NavLink>
                        <FaChevronRight className="iconr" />
                    </NavItem>
                </Nav>
            </div>

            {/* Nội dung chính */}
            <div className={`content flex-grow-1${isSidebarVisible ? '' : ' content-full'}`}>
                {/* Topbar */}
                <div className="topbar bg-dark text-white p-3 d-flex justify-content-between">
                    <FaBars className="sidebar-toggle d-block" onClick={toggleSidebar} style={{ fontSize: '24px', cursor: 'pointer', color: 'white' }} />
                    <div className="left">Trang Quản Trị</div>
                    {/* Thanh tìm kiếm */}
                    <div className="search-container">
                        <div className="search-box">
                            <input type="text" className="search-input" placeholder="Tìm kiếm..." />
                            <FaSearch className="search-icon" />
                        </div>
                    </div>
                    <div className="right">
                        <FaUserCircle size={28} className="cursor-pointer" onClick={toggleDropdown} />
                        {isDropdownOpen && (
                            <div className="dropdown" ref={dropdownRef}>
                                <Button color="danger" size="sm" onClick={handleLogout}>
                                    Đăng xuất
                                </Button>
                            </div>
                        )}
                    </div>
                </div>

                {/* Nội dung theo tab */}
                <Container className="pt-4">
                    <Row>
                        <Col>
                            <TabContent activeTab={activeTab}>
                                <TabPane tabId="1">
                                    <TabHome />
                                </TabPane>
                                <TabPane tabId="2">
                                    <TabUserManagement accountUser={users} />
                                </TabPane>
                                <TabPane tabId="3">
                                    <TabOrderManagement />
                                </TabPane>
                                <TabPane tabId="4">
                                    <TabProductManagement />
                                </TabPane>
                                <TabPane tabId="5">
                                    <TabCategoryManagement />
                                </TabPane>
                                <TabPane tabId="6">
                                    <TabPostManagement />
                                </TabPane>
                                <TabPane tabId="7">
                                    <TabShipManagement />
                                </TabPane>
                                <TabPane tabId="8">
                                    <TabVoucherManagement />
                                </TabPane>
                                <TabPane tabId="9">
                                    <TabStaffManagement />
                                </TabPane>
                                {/* <TabPane tabId="10">
                                    <TabHistoryManagament />
                                </TabPane> */}
                            </TabContent>
                        </Col>
                    </Row>
                </Container>
            </div>
        </div>
    );
}

export default ManagerAdmin;
