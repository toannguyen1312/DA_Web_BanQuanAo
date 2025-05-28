import React, { useState, useEffect } from 'react';
import { Button, Input, Table, Modal, ModalHeader, ModalBody, ModalFooter, Form, FormGroup, Label } from 'reactstrap';
import { FaSearch, FaFileExcel, FaPlus, FaEdit, FaTrashAlt } from 'react-icons/fa';
import * as XLSX from 'xlsx';
import { addToVoucher, getAllVoucher,deleteVoucher } from '../../service/admin';

const TabVoucherManagement = () => {
  const [vouchers, setVouchers] = useState([]);
  const [search, setSearch] = useState('');
  const [filteredVouchers, setFilteredVouchers] = useState([]);
  const [modal, setModal] = useState(false);
  const [newVoucher, setNewVoucher] = useState({
    code: '',
    discount: 0,
    expirationDate: '',
    minDiscount: 0,
    maxDiscount: 0,
    createdAt: '',
    active: false,
    couponsid: null,
  });
  const [selectedVoucher, setSelectedVoucher] = useState(null);

  useEffect(() => {
    const searchResults = vouchers.filter(voucher =>
      voucher.code.toLowerCase().includes(search.toLowerCase())
    );
    setFilteredVouchers(searchResults);
  }, [search, vouchers]);

  const handleAddVoucher = async () => {
    const dataToSave = {
      code: newVoucher.code,
      discount: newVoucher.discount,
      expirationDate: newVoucher.expirationDate,
      minDiscount: newVoucher.minDiscount,
      maxDiscount: newVoucher.maxDiscount,
      createdAt: newVoucher.createdAt,
      active: newVoucher.active,
      created_at: selectedVoucher ? selectedVoucher.created_at : new Date().toISOString().split('T')[0],
      couponsid: selectedVoucher ? selectedVoucher.couponsid : undefined,
    };

    try {
      if (selectedVoucher) {
        // Gửi API PUT để cập nhật
        // Cần chỉnh sửa URL API và đảm bảo cấu trúc dataToSave phù hợp với API backend
        // await axios.put(`/api/vouchers/${selectedVoucher.couponsid}`, dataToSave);
        alert('Cập nhật voucher thành công!');
      } else {
        // Gửi API POST để thêm mới
        const result = await addToVoucher(dataToSave);
        console.log("voucher1: ", dataToSave)
        if(result){
          alert('Thêm voucher thành công!');
        }else {
          alert('Thêm không thành công')
          console.log("voucher: ", dataToSave)
        }
      }

      // Sau khi gọi API xong, có thể gọi lại API get nếu muốn cập nhật lại bảng
      // hoặc emit sự kiện, tuỳ vào bạn xử lý state hay reload.
    } catch (error) {
      console.error('Lỗi khi lưu voucher:', error);
      alert('Đã xảy ra lỗi khi lưu voucher.');
    }

    // Đóng modal & reset form
    setModal(false);
    setSelectedVoucher(null);
    setNewVoucher({
      code: generateRandomCode(),
      discount: 0,
      expirationDate: '',
      minDiscount: 0,
      maxDiscount: 0,
      createdAt: '',
      active: false,
      couponsid: null,
    });
  };

  const handleDeleteVoucher = async (id) => {
    if (window.confirm('Bạn có chắc chắn muốn xóa voucher này không?')) {
      console.log("Delete Voucher with ID: ", id);
      try {
        // Thêm lệnh gọi API DELETE tại đây
        // await axios.delete(`/api/vouchers/${id}`);
        await deleteVoucher(id)
        const updated = vouchers.filter(v => v.couponsID !== id);
        setVouchers(updated);
        setFilteredVouchers(updated);
        alert('Xóa voucher thành công!');
      } catch (error) {
        console.error('Lỗi khi xóa voucher:', error);
        alert('Đã xảy ra lỗi khi xóa voucher.');
      }
    }
  };

  const toggleModal = (voucher = null) => {
    setSelectedVoucher(voucher);
    setNewVoucher(voucher ? {
      code: voucher.code,
      discount: voucher.discount,
      expirationDate: voucher.expirationDate || '',
      maxDiscount: voucher.maxDiscount || 0,
      minDiscount: voucher.minDiscount || 0,
      createdAt: voucher.createdAt || '',
      active: voucher.active ?? false,
      couponsid: voucher.couponsid
    } : {
      code: generateRandomCode(),
      discount: 0,
      expirationDate: '',
      maxDiscount: 0,
      minDiscount: 0,
      createdAt: '',
      active: false,
      couponsid: null,
    });
    setModal(true);
  };

  const exportToExcel = () => {
    const wb = XLSX.utils.book_new();
    const ws = XLSX.utils.json_to_sheet(filteredVouchers.map(v => ({
        couponsid: v.couponsid,
        code: v.code,
        createdAt: v.createdAt,
        discount: v.discount,
        expirationDate: v.expirationDate,
        maxDiscount: v.maxDiscount,
        minDiscount: v.minDiscount,
        active: v.active,

    })));
    XLSX.utils.book_append_sheet(wb, ws, 'Danh sách voucher');
    XLSX.writeFile(wb, 'DanhSachVoucher.xlsx');
  };

  // code logic
  const generateRandomCode = (length = 20) => {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let result = '';
    for (let i = 0; i < length; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return result;
  };

  // hiển thị danh sách voucher
useEffect(() => {
  const fetchVouchers = async () => {
    const data = await getAllVoucher();

    console.log("hiển thi voucher: ", data)
    setFilteredVouchers(data);
    setVouchers(data); // để đồng bộ với bảng hiển thị
  };
  fetchVouchers();
}, []);


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
            placeholder="Tìm kiếm theo mã voucher"
            style={{ paddingLeft: '30px' }}
          />
          <FaSearch style={{ position: 'absolute', left: '10px', top: '50%', transform: 'translateY(-50%)', color: '#888' }} />
        </div>
        <Button color="info" onClick={exportToExcel}>
          <FaFileExcel /> Xuất file
        </Button>
      </div>

      <div >
        <Table striped bordered hover style={{ minWidth: '1200px' }}>
          <thead>
            <tr>
              <th>Coupon ID</th>
              <th>Code</th>
              <th>Ngày bắt đầu</th>
              <th>Ngày hết hạn</th>
              <th>Giảm giá tối đa</th>
              <th>Giảm giá tối thiểu </th>
              <th>đã sử dụng </th>
              <th>Thao tác</th>
            </tr>
          </thead>
          <tbody>
            {filteredVouchers.map(voucher => (
              <tr key={voucher.couponsID}>
                <td>{voucher.couponsID}</td>
                <td>{voucher.code}</td>
                <td>{voucher.createdAt}</td>
                <td>{voucher.expirationDate}</td>
                <td>{voucher.maxDiscount}</td>
                <td>{voucher.minDiscount}</td>
                <td>
                  {new Date() >= new Date(voucher.createdAt) && new Date() <= new Date(voucher.expirationDate)
                    ? '✅'
                    : '❌'
                  }
                </td>
                <td className="d-flex gap-2">
                  <Button color="warning" size="sm" onClick={() => toggleModal(voucher)}>
                    <FaEdit />
                  </Button>
                  <Button color="danger" size="sm" onClick={() => handleDeleteVoucher(voucher.couponsID)}>
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
            <FormGroup>
              <Label for="code">Code</Label>
              <Input type="text" id="code" value={newVoucher.code} onChange={(e) => setNewVoucher({ ...newVoucher, code: e.target.value })} required />
            </FormGroup>
            <FormGroup>
              <Label for="discount">Giảm giá (%)</Label>
              <Input type="number" id="discount" value={newVoucher.discount} onChange={(e) => setNewVoucher({ ...newVoucher, discount: e.target.value === '' ? '' : parseFloat(e.target.value) })}required />
            </FormGroup>
            <FormGroup>
              <Label for="expirationDate">Ngày hết hạn</Label>
               <FormGroup>
              <Input type="date" id="createdAt" value={newVoucher.expirationDate} onChange={(e) => setNewVoucher({ ...newVoucher, expirationDate: e.target.value })} required />
            </FormGroup>

            </FormGroup>
            <FormGroup>
              <Label for="maxDiscount">Giảm giá tối đa</Label>
              <Input
                type="number"
                id="max_discount"
                value={newVoucher.maxDiscount === 0 ? '' : newVoucher.maxDiscount}
                onChange={(e) =>
                  setNewVoucher({
                    ...newVoucher,
                    maxDiscount: e.target.value === '' ? '' : parseFloat(e.target.value),
                  })
                }
                required
              />
            </FormGroup>
            <FormGroup>
              <Label for="minDiscount">Giảm giá tối thiểu</Label>
              <Input type="number" id="min_discount"    value={newVoucher.minDiscount === 0 ? '' : newVoucher.minDiscount} onChange={(e) =>
                  setNewVoucher({
                    ...newVoucher,
                    minDiscount: e.target.value === '' ? '' : parseFloat(e.target.value),
                  })
                } required />
            </FormGroup>
            <FormGroup>
              <Label for="createdAt">Ngày bắt đầu</Label>
              <Input type="date" id="createdAt" value={newVoucher.createdAt} onChange={(e) => setNewVoucher({ ...newVoucher, createdAt: e.target.value })} required />
            </FormGroup>
            
            <FormGroup>
               <Input
                type="checkbox"
                id="active"
                checked={newVoucher.active}
                onChange={(e) =>
                  setNewVoucher({ ...newVoucher, active: e.target.checked })
                }
                style={{opacity: "1", marginLeft: "10px"}}
              />
              <Label for="active">Kích hoạt voucher</Label>
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