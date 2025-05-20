import React, { useState, useEffect } from 'react';
import { Button, Input, Table, Modal, ModalHeader, ModalBody, ModalFooter, Form, FormGroup, Label } from 'reactstrap';
import { FaSearch, FaFileExcel, FaPlus, FaEdit, FaTrashAlt } from 'react-icons/fa';
import * as XLSX from 'xlsx';

const initialShips = [
  { 
    id: 1, 
    name: 'Giao hàng nhanh', 
    description: 'Giao hàng trong 24h', 
    fee: 30000, 
    deliveryTime: '1 ngày', 
    deliveryArea: 'Toàn quốc', 
    conditions: 'Đơn hàng trên 100,000 VND', 
    status: 'Kích hoạt'
  },
  { 
    id: 2, 
    name: 'Giao hàng miễn phí', 
    description: 'Miễn phí giao hàng cho đơn hàng trên 500,000 VND', 
    fee: 0, 
    deliveryTime: '3-5 ngày', 
    deliveryArea: 'Toàn quốc', 
    conditions: 'Đơn hàng trên 500,000 VND', 
    status: 'Kích hoạt'
  },
  { 
    id: 3, 
    name: 'Giao hàng tiêu chuẩn', 
    description: 'Giao hàng trong 5-7 ngày', 
    fee: 15000, 
    deliveryTime: '5-7 ngày', 
    deliveryArea: 'Khu vực nội thành', 
    conditions: '-', 
    status: 'Vô hiệu hóa'
  }
];

const TabShipManagement = () => {
  const [ships, setShips] = useState(initialShips);
  const [search, setSearch] = useState('');
  const [filteredShips, setFilteredShips] = useState(ships);
  const [modal, setModal] = useState(false);
  const [newShip, setNewShip] = useState({
    name: '',
    description: '',
    fee: '',
    deliveryTime: '',
    deliveryArea: '',
    conditions: '',
    status: 'Kích hoạt'
  });
  const [selectedShip, setSelectedShip] = useState(null);

  useEffect(() => {
    const searchResults = ships.filter(ship =>
      ship.name.toLowerCase().includes(search.toLowerCase()) ||
      ship.description.toLowerCase().includes(search.toLowerCase())
    );
    setFilteredShips(searchResults);
  }, [search, ships]);

  const handleAddShip = () => {
    setShips([...ships, { ...newShip, id: ships.length + 1 }]);
    setModal(false);
    resetForm();
  };

  const handleUpdateShip = () => {
    const updatedShips = ships.map(ship =>
      ship.id === selectedShip.id ? { ...newShip, id: ship.id } : ship
    );
    setShips(updatedShips);
    setModal(false);
    resetForm();
  };

  const handleDeleteShip = (id) => {
    if (window.confirm('Bạn có chắc chắn muốn xóa loại ship này không?')) {
      const updatedShips = ships.filter(ship => ship.id !== id);
      setShips(updatedShips);
    }
  };

  const resetForm = () => {
    setNewShip({
      name: '',
      description: '',
      fee: '',
      deliveryTime: '',
      deliveryArea: '',
      conditions: '',
      status: 'Kích hoạt'
    });
    setSelectedShip(null);
  };

  const toggleModal = (ship = null) => {
    setSelectedShip(ship);
    setNewShip(ship || {
      name: '',
      description: '',
      fee: '',
      deliveryTime: '',
      deliveryArea: '',
      conditions: '',
      status: 'Kích hoạt'
    });
    setModal(!modal);
  };

  const exportToExcel = () => {
    const wb = XLSX.utils.book_new();
    const ws = XLSX.utils.json_to_sheet(filteredShips);
    XLSX.utils.book_append_sheet(wb, ws, 'Danh sách loại ship');
    XLSX.writeFile(wb, 'DanhSachLoaiShip.xlsx');
  };

  return (
    <div>
      <div className="text-center">
        <h3 className="page-title" style={{ color: 'black', fontWeight: 'bold', marginBottom: '30px' }}>Quản lý Loại Ship</h3>
      </div>

      <div className="mb-4 d-flex justify-content-between">
        <Button color="success" onClick={() => toggleModal()}>
          <FaPlus /> Thêm loại ship
        </Button>
        <div style={{ position: 'relative', width: '60%' }}>
          <Input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Tìm kiếm theo tên hoặc mô tả loại ship"
            style={{
              display: 'inline-block',
              paddingLeft: '30px',
            }}
          />
          <FaSearch 
            style={{
              position: 'absolute',
              left: '10px',
              top: '50%',
              transform: 'translateY(-50%)',
              color: '#888',
            }}
          />
        </div>
        <Button color="info" onClick={exportToExcel}>
          <FaFileExcel /> Xuất file
        </Button>
      </div>

      <div style={{ overflowX: 'auto', border: '1px solid #ddd' }}>
        <Table striped bordered hover style={{ minWidth: '1000px' }}>
          <thead>
            <tr>
              <th>ID</th>
              <th>Tên loại ship</th>
              <th>Mô tả</th>
              <th>Phí giao hàng</th>
              <th>Thời gian giao hàng</th>
              <th>Vùng giao hàng</th>
              <th>Điều kiện</th>
              <th>Trạng thái</th>
              <th>Thao tác</th>
            </tr>
          </thead>
          <tbody>
            {filteredShips.map(ship => (
              <tr key={ship.id}>
                <td>{ship.id}</td>
                <td>{ship.name}</td>
                <td>{ship.description}</td>
                <td>{parseInt(ship.fee).toLocaleString()} VND</td>
                <td>{ship.deliveryTime}</td>
                <td>{ship.deliveryArea}</td>
                <td>{ship.conditions}</td>
                <td>{ship.status}</td>
                <td>
                  <Button color="warning" size="sm" className="me-2" onClick={() => toggleModal(ship)}>
                    <FaEdit />
                  </Button>
                  <Button color="danger" size="sm" onClick={() => handleDeleteShip(ship.id)}>
                    <FaTrashAlt />
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>

      <Modal isOpen={modal} toggle={toggleModal}>
        <ModalHeader toggle={toggleModal}>{selectedShip ? 'Chỉnh sửa loại ship' : 'Thêm loại ship'}</ModalHeader>
        <ModalBody>
          <Form>
            <FormGroup>
              <Label for="name">Tên loại ship</Label>
              <Input
                type="text"
                id="name"
                value={newShip.name}
                onChange={(e) => setNewShip({ ...newShip, name: e.target.value })}
                required
              />
            </FormGroup>
            <FormGroup>
              <Label for="description">Mô tả</Label>
              <Input
                type="text"
                id="description"
                value={newShip.description}
                onChange={(e) => setNewShip({ ...newShip, description: e.target.value })}
                required
              />
            </FormGroup>
            <FormGroup>
              <Label for="fee">Phí giao hàng</Label>
              <Input
                type="number"
                id="fee"
                value={newShip.fee}
                onChange={(e) => setNewShip({ ...newShip, fee: e.target.value })}
                required
              />
            </FormGroup>
            <FormGroup>
              <Label for="deliveryTime">Thời gian giao hàng</Label>
              <Input
                type="text"
                id="deliveryTime"
                value={newShip.deliveryTime}
                onChange={(e) => setNewShip({ ...newShip, deliveryTime: e.target.value })}
                required
              />
            </FormGroup>
            <FormGroup>
              <Label for="deliveryArea">Vùng giao hàng</Label>
              <Input
                type="text"
                id="deliveryArea"
                value={newShip.deliveryArea}
                onChange={(e) => setNewShip({ ...newShip, deliveryArea: e.target.value })}
                required
              />
            </FormGroup>
            <FormGroup>
              <Label for="conditions">Điều kiện</Label>
              <Input
                type="text"
                id="conditions"
                value={newShip.conditions}
                onChange={(e) => setNewShip({ ...newShip, conditions: e.target.value })}
              />
            </FormGroup>
            <FormGroup>
              <Label for="status">Trạng thái</Label>
              <Input
                type="select"
                id="status"
                value={newShip.status}
                onChange={(e) => setNewShip({ ...newShip, status: e.target.value })}
              >
                <option>Kích hoạt</option>
                <option>Vô hiệu</option>
              </Input>
            </FormGroup>
          </Form>
        </ModalBody>
        <ModalFooter>
          <Button color="secondary" onClick={toggleModal}>Hủy</Button>
          <Button color="primary" onClick={selectedShip ? handleUpdateShip : handleAddShip}>
            {selectedShip ? 'Cập nhật loại ship' : 'Thêm loại ship'}
          </Button>
        </ModalFooter>
      </Modal>
    </div>
  );
};

export default TabShipManagement;
