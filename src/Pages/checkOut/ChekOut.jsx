import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import {
    Button,
    Col,
    Container,
    Form,
    FormGroup,
    Input,
    Label,
    ListGroup,
    ListGroupItem,
    Row,
} from "reactstrap";
import { useLocation, useNavigate } from "react-router-dom";
import PageHeading from "../../Components/PageHeading/PageHeading";
import { getOrderDetailsByOrderId, updateOrders, deleteCartItem, updateProductVariantsStock, createPayment} from "../../service/ordersService";


function CheckOut() {
    const location = useLocation();
    const orderId = location.state?.orderId;
    const discount = location.state?.discount;
    const totalAmount = location.state?.totalAmount
    const [orderDetails, setOrderDetails] = useState([]);
    const [formData, setFormData] = useState({
        address: '',
        name: '',
        email: '',
        phone: '',
        paymentMethod: '',
        date: '',
        orderId: '',
        acceptTerms: false, 
});

    const [formError, setFormError] = useState('');

    const firstBreadcrumb = { label: "Trang", link: "/checkout" };
    const secondBreadcrumb = {
        label: "Thanh Toán",
        link: "/checkout",
        active: true,
    };

    const navigate = useNavigate();

    useEffect(() => {
    if (orderId) {
        getOrderDetailsByOrderId(orderId).then(data => {
        setOrderDetails(data || []);
        });
    }
    }, [location.state]);


    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    const handleSubmit = async (e) => {
    e.preventDefault();

    const now = new Date();
    const formattedDate = now.toISOString().split('T')[0];

    const updatedForm = {
        ...formData,
        date: formattedDate,
        orderId: orderId
    };

    // Kiểm tra validate trên updatedForm
    for (const key in updatedForm) {
        if (typeof updatedForm[key] === 'string' && updatedForm[key].trim() === '') {
            setFormError('Vui lòng nhập đầy đủ thông tin.');
            return;
        }
        if (typeof updatedForm[key] === 'boolean' && !updatedForm[key]) {
            setFormError('Bạn phải đồng ý với điều khoản và điều kiện.');
            return;
        }
    }

    // Kiểm tra tồn kho từng sản phẩm
    for (const item of orderDetails) {
        if (item.quantity > item.productVariant.stock) {
            setFormError(`Sản phẩm "${item.productVariant.product.name}" không đủ hàng trong kho!`);
            return;
        }
    }

    setFormError('');
    setFormData(updatedForm); // Cập nhật lại state nếu cần dùng tiếp
    // TODO: gửi dữ liệu lên server hoặc điều hướng tiếp
    
    // Gọi API cập nhật order nếu cần
    const updateOrderRequest = {
        orderId: orderId,
        orderAddress: formData.address,
        date: new Date().toISOString().split('T')[0],
        orderEmail: formData.email,
        orderName: formData.name,
        orderPhone: formData.phone,
      };

    const response = await updateOrders(updateOrderRequest);
    // Xóa cartItem
    if (response) {
        // Xác định trạng thái thanh toán
        const paymentStatus =
            formData.paymentMethod === "Thanh toán bàn tài khoảng"
                ? "Đã thanh toán"
                : "Chưa thanh toán";
        const paymentData = {
            orderId: orderId ,
            userId: orderDetails[0].order.cart.user.userId ,
            payMethod: formData.paymentMethod,
            paymentStatus: paymentStatus,
            paymentDate: new Date().toISOString().split('T')[0]
        };

        await createPayment(paymentData);

        // Tạo list các object VariantStockUpdateRequest
        const variantList = orderDetails.map(item => ({
            productVariantId: item.productVariant.productVariantId,
            quantityToSubtract: item.quantity
        }));
        await updateProductVariantsStock(variantList);
        // Xóa cart
        await deleteCartItem(orderDetails[0].order.cart.cartId);
    }
    alert('Thanh toán thành công!');
    navigate("/");
};



    return (
        <div>
            <div className="page-wrapper">
                <PageHeading
                    title="Thanh Toán"
                    firstBreadcrumb={firstBreadcrumb}
                    secondBreadcrumb={secondBreadcrumb}
                />
                <div className="page-content">
                    <section>
                        <Container>
                            <Row>
                                <Col lg={7} md={12}>
                                    <div className="checkout-form">
                                        <h2 className="mb-4">Thông tin thanh toán</h2>
                                        <Form>
                                            <Row>
                                                
                                                <Col md={12}>
                                                    <FormGroup>
                                                        <Label for="address" className="font-w-6">
                                                            Địa chỉ nhận hàng
                                                        </Label>
                                                        <Input
                                                            type="text"
                                                            id="address"
                                                            name="address"
                                                            placeholder="Địa chỉ nhận hàng"
                                                            value={formData.address}
                                                            onChange={handleChange}
                                                        />
                                                    </FormGroup>
                                                </Col>

                                                <Col md={12}>
                                                    <FormGroup>
                                                        <Label for="name" className="font-w-6">
                                                            Tên người nhận
                                                        </Label>
                                                        <Input
                                                            type="text"
                                                            id="name"
                                                            name="name"
                                                            placeholder="Nhập tên người nhận"
                                                            value={formData.name}
                                                            onChange={handleChange}
                                                        />
                                                    </FormGroup>
                                                   
                                                </Col>


                                                <Col md={12}>
                                                    <FormGroup>
                                                        <Label for="email" className="font-w-6">
                                                            Email
                                                        </Label>
                                                        <Input
                                                            type="email"
                                                            id="email"
                                                            name="email"
                                                            placeholder="Nhập Email"
                                                            value={formData.email}
                                                            onChange={handleChange}
                                                        />
                                                    </FormGroup>
                                                </Col>

                                                <Col md={12}>
                                                    <FormGroup>
                                                        <Label for="phone" className="font-w-6">
                                                            Số điện thoại
                                                        </Label>
                                                        <Input
                                                            type="number"
                                                            id="phone"
                                                            name="phone"
                                                            placeholder="Nhập số điện thoại"
                                                            value={formData.phone}
                                                            onChange={handleChange}
                                                        />
                                                    </FormGroup>
                                                </Col>
                                                
                                            </Row>
                                        </Form>
                                    </div>
                                </Col>
                                <Col lg={5} md={12} className="mt-5 mt-lg-0">
                                    <Row className="my-5">
                                        <Col md={12}>
                                            <div className="p-3 p-lg-5 shadow-sm mb-5">
                                                <h3 className="mb-3">Đơn hàng</h3>
                                                <ListGroup className="list-unstyled">
                                                    {orderDetails.map((item, index) => (
                                                        <ListGroupItem
                                                            className="mb-3 pb-3 d-flex justify-content-between"
                                                            key={index}
                                                            style={{
                                                                borderLeft: 'none',
                                                                borderRight: 'none',
                                                                borderTop: 'none'
                                                            }}
                                                        >
                                                          <span>
                                                                {item.quantity} x{" "}
                                                                <span
                                                                    style={{
                                                                    WebkitLineClamp: 1,
                                                                    WebkitBoxOrient: "vertical",
                                                                    overflow: "hidden",
                                                                    textOverflow: "ellipsis",
                                                                    fontSize: "14px",
                                                                    cursor: "pointer",
                                                                    whiteSpace: "nowrap"
                                                                    }}
                                                                >
                                                                    {(() => {
                                                                    const name = item.productVariant.product.name;
                                                                    const words = name.trim().split(" ");
                                                                    return words.length > 4
                                                                        ? words.slice(0, 4).join(" ") + "..."
                                                                        : name;
                                                                    })()}
                                                                </span>
                                                                </span>

                                                       <span className="text-primary">{" "} {(item.productVariant.price * item.quantity).toLocaleString("vi-VN")} ₫</span>
                                                        </ListGroupItem>
                                                    ))}
                                                   
                                                    <ListGroupItem className="mb-3 pb-3 " style={{
                                                        borderLeft: 'none',
                                                        borderRight: 'none',
                                                        borderTop: 'none'
                                                    }}>
                                                        <span>Giảm giá: </span>
                                                        <span className="text-primary" style={{display:"flex", justifyContent:"space-between"}}>
                                                            {discount?.toLocaleString("vi-VN")} ₫
                                                        </span>
                                                    </ListGroupItem>
                                                    <ListGroupItem className="mb-3 pb-3 d-flex justify-content-between" style={{
                                                        borderLeft: 'none',
                                                        borderRight: 'none',
                                                        borderTop: 'none'
                                                    }}>
                                                        <span>
                                                            <strong className="cart-total">Tổng tiền: </strong>
                                                        </span>
                                                        <span className="text-primary">
                                                           {(totalAmount-discount)?.toLocaleString("vi-VN")} ₫
                                                        </span>
                                                    </ListGroupItem>
                                                </ListGroup>
                                            </div>
                                            <div className="cart-detail my-5">
                                                <h3 className="mb-3">Phương thức thanh toán</h3>
                                                <div className="form-group">
                                                    <div className="custom-control custom-radio">
                                                        <input type="radio" id="customRadio1" name="paymentMethod" className="custom-control-input" value="Thanh toán khi nhận hàng" checked={formData.paymentMethod === 'Thanh toán khi nhận hàng'} onChange={handleChange} />
                                                        <label className="custom-control-label" htmlFor="customRadio1">Thanh toán khi nhận hàng</label>
                                                    </div>
                                                </div>
                                                <div className="form-group">
                                                    <div className="custom-control custom-radio">
                                                        <input type="radio" id="customRadio2" name="paymentMethod" className="custom-control-input" value="Thanh toán bàn tài khoảng" checked={formData.paymentMethod === 'Thanh toán bàn tài khoảng'} onChange={handleChange} />
                                                        <label className="custom-control-label" htmlFor="customRadio2">Thanh toán bàn tài khoảng</label>
                                                    </div>
                                                </div>
                                               
                                                <div className="form-group mb-0">
                                                    <div className="custom-control custom-checkbox">
                                                        <input type="checkbox" className="custom-control-input" id="customCheck1" name="acceptTerms" checked={formData.acceptTerms} onChange={handleChange} />
                                                        <label className="custom-control-label" htmlFor="customCheck1">Tôi đã đọc và chấp nhận các điều khoản và điều kiện</label>
                                                    </div>
                                                </div>
                                                {formError && <div className="text-danger mb-2">{formError}</div>}
                                                <button className="btn btn-primary btn-animated btn-block"
                                                 onClick={handleSubmit}
                                                >Thanh toán</button>
                                            </div>
                                        </Col>
                                    </Row>
                                </Col>
                            </Row>
                        </Container>
                    </section>
                </div>
            </div>
        </div>
    )
}

export default CheckOut;