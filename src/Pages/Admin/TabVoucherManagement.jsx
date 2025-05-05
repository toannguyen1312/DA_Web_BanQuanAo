import React, { useState, useEffect } from 'react';
import { Button, Input, Table, Modal, ModalHeader, ModalBody, ModalFooter, Form, FormGroup, Label } from 'reactstrap';
import { FaSearch, FaFileExcel, FaPlus, FaEdit, FaTrashAlt } from 'react-icons/fa';
import * as XLSX from 'xlsx';

const initialVouchers = [
  {
    id: 1,
    code: 'VOUCHER10',
    name: 'Giảm giá 10%',
    description: 'Giảm giá 10% cho đơn hàng trên 200,000 VND',
    condition: 'Áp dụng cho đơn hàng từ 200,000 VND trở lên',
    startDate: '2025-05-01',
    endDate: '2025-05-30',
    usageTime: 'Không giới hạn',
    quantity: 100,
    status: 'Kích hoạt'
  },
];

const TabVoucherManagement = () => {
  const [vouchers, setVouchers] = useState(initialVouchers);
  const [search, setSearch] = useState('');
  const [filteredVouchers, setFilteredVouchers] = useState(vouchers);
  const [modal, setModal] = useState(false);
  const [newVoucher, setNewVoucher] = useState({
    code: '',
    name: '',
    description: '',
    condition: '',
    startDate: '',
    endDate: '',
    usageTime: '',
    quantity: '',
    status: 'Kích hoạt'
  });
  const [selectedVoucher, setSelectedVoucher] = useState(null);

  useEffect(() => {
    const searchResults = vouchers.filter(voucher =>
      voucher.code.toLowerCase().includes(search.toLowerCase()) ||
      voucher.name.toLowerCase().includes(search.toLowerCase())
    );
    setFilteredVouchers(searchResults);
  }, [search, vouchers]);

  const handleAddVoucher = () => {
    if (selectedVoucher) {
      const updated = vouchers.map(v => (v.id === selectedVoucher.id ? newVoucher : v));
      setVouchers(updated);
    } else {
      setVouchers([...vouchers, { ...newVoucher, id: vouchers.length + 1 }]);
    }
    setModal(false);
    setSelectedVoucher(null);
    setNewVoucher({
      code: '', name: '', description: '', condition: '',
      startDate: '', endDate: '', usageTime: '', quantity: '', status: 'Kích hoạt'
    });
  };

  const handleDeleteVoucher = (id) => {
    if (window.confirm('Bạn có chắc chắn muốn xóa voucher này không?')) {
      setVouchers(vouchers.filter(v => v.id !== id));
    }
  };

  const toggleModal = (voucher = null) => {
    setSelectedVoucher(voucher);
    setNewVoucher(voucher || {
      code: '', name: '', description: '', condition: '',
      startDate: '', endDate: '', usageTime: '', quantity: '', status: 'Kích hoạt'
    });
    setModal(true);
  };

  const exportToExcel = () => {
    const wb = XLSX.utils.book_new();
    const ws = XLSX.utils.json_to_sheet(filteredVouchers);
    XLSX.utils.book_append_sheet(wb, ws, 'Danh sách voucher');
    XLSX.writeFile(wb, 'DanhSachVoucher.xlsx');
  };

  return (
    <div>
      <div className="text-center">
        <h3 className="page-title" style={{ color: 'black', fontWeight: 'bold', marginBottom: '30px' }}>Quản lý Voucher</h3>
      </div>

      <div className="mb-4 d-flex justify-content-between">
        <Button color="success" onClick={() => toggleModal()}>
          <FaPlus /> Thêm voucher
        </Button>
        <div style={{ position: 'relative', width: '60%' }}>
          <Input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Tìm kiếm theo mã hoặc tên voucher"
            style={{ paddingLeft: '30px' }}
          />
          <FaSearch style={{ position: 'absolute', left: '10px', top: '50%', transform: 'translateY(-50%)', color: '#888' }} />
        </div>
        <Button color="info" onClick={exportToExcel}>
          <FaFileExcel /> Xuất file
        </Button>
      </div>

      <div style={{ overflowX: 'auto', border: '1px solid #ddd', maxWidth: '100%' }}>
        <Table striped bordered hover style={{ minWidth: '1200px' }}>
          <thead>
            <tr>
              <th>ID</th>
              <th>Mã voucher</th>
              <th>Tên voucher</th>
              <th>Mô tả</th>
              <th>Điều kiện</th>
              <th>Ngày bắt đầu</th>
              <th>Ngày hết hạn</th>
              <th>Thời gian sử dụng</th>
              <th>Số lượng</th>
              <th>Trạng thái</th>
              <th>Thao tác</th>
            </tr>
          </thead>
          <tbody>
            {filteredVouchers.map(voucher => (
              <tr key={voucher.id}>
                <td>{voucher.id}</td>
                <td>{voucher.code}</td>
                <td>{voucher.name}</td>
                <td>{voucher.description}</td>
                <td>{voucher.condition}</td>
                <td>{voucher.startDate}</td>
                <td>{voucher.endDate}</td>
                <td>{voucher.usageTime}</td>
                <td>{voucher.quantity}</td>
                <td>{voucher.status}</td>
                <td className="d-flex gap-2">
                  <Button color="warning" size="sm" onClick={() => toggleModal(voucher)}>
                    <FaEdit />
                  </Button>
                  <Button color="danger" size="sm" onClick={() => handleDeleteVoucher(voucher.id)}>
                    <FaTrashAlt />
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>

      <Modal isOpen={modal} toggle={() => setModal(false)}>
        <ModalHeader toggle={() => setModal(false)}>{selectedVoucher ? 'Chỉnh sửa voucher' : 'Thêm voucher'}</ModalHeader>
        <ModalBody>
          <Form>
            {['code', 'name', 'description', 'condition', 'usageTime'].map(field => (
              <FormGroup key={field}>
                <Label for={field}>{field === 'code' ? 'Mã voucher' : field === 'name' ? 'Tên voucher' : field === 'description' ? 'Mô tả' : field === 'condition' ? 'Điều kiện' : 'Thời gian sử dụng'}</Label>
                <Input
                  type="text"
                  id={field}
                  value={newVoucher[field]}
                  onChange={(e) => setNewVoucher({ ...newVoucher, [field]: e.target.value })}
                  required
                />
              </FormGroup>
            ))}
            <FormGroup>
              <Label for="startDate">Ngày bắt đầu</Label>
              <Input type="date" id="startDate" value={newVoucher.startDate} onChange={(e) => setNewVoucher({ ...newVoucher, startDate: e.target.value })} required />
            </FormGroup>
            <FormGroup>
              <Label for="endDate">Ngày hết hạn</Label>
              <Input type="date" id="endDate" value={newVoucher.endDate} onChange={(e) => setNewVoucher({ ...newVoucher, endDate: e.target.value })} required />
            </FormGroup>
            <FormGroup>
              <Label for="quantity">Số lượng</Label>
              <Input type="number" id="quantity" value={newVoucher.quantity} onChange={(e) => setNewVoucher({ ...newVoucher, quantity: e.target.value })} required />
            </FormGroup>
            <FormGroup>
              <Label for="status">Trạng thái</Label>
              <Input type="select" id="status" value={newVoucher.status} onChange={(e) => setNewVoucher({ ...newVoucher, status: e.target.value })}>
                <option>Kích hoạt</option>
                <option>Vô hiệu</option>
                <option>Hết</option>
              </Input>
            </FormGroup>
          </Form>
        </ModalBody>
        <ModalFooter>
          <Button color="secondary" onClick={() => setModal(false)}>Hủy</Button>
          <Button color="primary" onClick={handleAddVoucher}>
            {selectedVoucher ? 'Cập nhật voucher' : 'Thêm voucher'}
          </Button>
        </ModalFooter>
      </Modal>
    </div>
  );
};

export default TabVoucherManagement;