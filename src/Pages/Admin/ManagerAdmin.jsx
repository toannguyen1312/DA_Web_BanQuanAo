import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Row, Col, Button, Nav, NavItem, NavLink, TabContent, TabPane } from 'reactstrap';
import classnames from 'classnames';
import { FaSearch, FaUserCircle, FaBars } from 'react-icons/fa'; 
import { FaHome, FaUsers, FaBox, FaProductHunt, FaList, FaClipboardList, FaShippingFast, FaTag, FaWarehouse, FaInbox, FaChartLine } from 'react-icons/fa';
import TabHome from './TabHome';
import TabUserManagement from './TabUserManagement';
import TabOrderManagement from './TabOrderManagement';
import TabProductManagement from './TabProductManagement';
import '../../assets/css/Admin/ManagerAd.css';

import { Filler } from 'chart.js';

function ManagerAdmin() {
    const dropdownRef = useRef(null); // Nhấn bên ngoài dropdown của admin close
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


    const navigate = useNavigate();

    const toggleTab = (tab) => {
        if (activeTab !== tab) setActiveTab(tab);
    };


    const [isSidebarVisible, setIsSidebarVisible] = useState(false); 
    const [activeTab, setActiveTab] = useState('1');  
    const [isDropdownOpen, setIsDropdownOpen] = useState(false); 

    const toggleDropdown = () => { setIsDropdownOpen(!isDropdownOpen); };  
    const toggleSidebar = () => setIsSidebarVisible(!isSidebarVisible); 


    const handleLogout = () => {
        localStorage.removeItem('isAdminLoggedIn'); // Xoá trạng thái đăng nhập
        navigate('/admin/login');
    };

    return (
        <div className="d-flex">
            {/* Sidebar */}
            <div className={`sidebar bg-dark text-white p-3 ${isSidebarVisible ? 'active' : ''}`}>
                        <div className="search-container">
                            <div className="search-box">
                            <input
                                type="text"
                                className="search-input"
                                placeholder="Tìm kiếm..."
                            />
                        <FaSearch className="search-icon" />
                            </div>
                        </div>
                <Nav vertical>
                    <NavItem className="d-flex justify-content-between align-items-center">
                        <NavLink className={classnames({ active: activeTab === '1' })} onClick={() => toggleTab('1')}>
                            <FaHome className="icon" /> Trang chủ
                        </NavLink>
                        <span> &gt; </span>
                    </NavItem>
                    <NavItem className="d-flex justify-content-between align-items-center">
                        <NavLink className={classnames({ active: activeTab === '2' })} onClick={() => toggleTab('2')}>
                            <FaUsers className="icon" /> Quản lý người dùng
                        </NavLink>
                        <span> &gt; </span>
                    </NavItem>
                    <NavItem className="d-flex justify-content-between align-items-center">
                        <NavLink className={classnames({ active: activeTab === '3' })} onClick={() => toggleTab('3')}>
                            <FaBox className="icon" /> Quản lý đơn hàng
                        </NavLink>
                        <span> &gt; </span>
                    </NavItem>
                    <NavItem className="d-flex justify-content-between align-items-center">
                        <NavLink className={classnames({ active: activeTab === '4' })} onClick={() => toggleTab('4')}>
                            <FaProductHunt className="icon" /> Quản lý sản phẩm
                        </NavLink>
                        <span> &gt; </span>
                    </NavItem>
                    {/* Các mục quản lý khác */}
                    <NavItem className="d-flex justify-content-between align-items-center">
                        <NavLink className={classnames({ active: activeTab === '5' })} onClick={() => toggleTab('5')}>
                            <FaList className="icon" /> Quản lý danh mục
                        </NavLink>
                        <span> &gt; </span>
                    </NavItem>
                    <NavItem className="d-flex justify-content-between align-items-center">
                        <NavLink className={classnames({ active: activeTab === '6' })} onClick={() => toggleTab('6')}>
                            <FaClipboardList className="icon" /> Quản lý bài đăng
                        </NavLink>
                        <span> &gt; </span>
                    </NavItem>
                    <NavItem className="d-flex justify-content-between align-items-center">
                        <NavLink className={classnames({ active: activeTab === '7' })} onClick={() => toggleTab('7')}>
                            <FaShippingFast className="icon" /> Quản lý loại ship
                        </NavLink>
                        <span> &gt; </span>
                    </NavItem>
                    <NavItem className="d-flex justify-content-between align-items-center">
                        <NavLink className={classnames({ active: activeTab === '8' })} onClick={() => toggleTab('8')}>
                            <FaTag className="icon" /> Quản lý voucher
                        </NavLink>
                        <span> &gt; </span>
                    </NavItem>
                </Nav>
            </div>
            

            {/* Nội dung chính */}
            <div className="content flex-grow-1">
                {/* Topbar */}
                <div className="topbar bg-dark text-white p-3 d-flex justify-content-between">
                    <FaBars 
                        className="sidebar-toggle d-block" 
                        onClick={toggleSidebar} 
                        style={{ fontSize: '24px', cursor: 'pointer', color: 'white' }} 
                    />
                    <div className="left">Trang Quản Trị</div>
                    
                    {/* Thanh tìm kiếm */}
                    <div className="search-container">
                        <div className="search-box">
                                    <input type="text" className="search-input" placeholder="Tìm kiếm..." />
                        <FaSearch className="search-icon" />
                    </div>
                    </div>
                    
                    
                    <div className="right">
                        <FaUserCircle
                            size={28}
                            className="cursor-pointer"
                            onClick={toggleDropdown}
                        />
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
                                    <TabUserManagement />
                                </TabPane>
                                <TabPane tabId="3">
                                    <TabOrderManagement />
                                </TabPane>
                                <TabPane tabId="4">
                                    <TabProductManagement />
                                </TabPane>
                            </TabContent>
                        </Col>
                    </Row>
                </Container>
            </div>
        </div>
    );
}

export default ManagerAdmin;
