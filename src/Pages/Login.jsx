import React from 'react'
import PageHeading from '../Components/PageHeading/PageHeading'
import { Container, Row, Col, Form, FormGroup, Label, Input, Button } from 'reactstrap';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { login } from '../store/reducer/authSlice'
import { store } from "../store/store";
import { useNavigate } from 'react-router-dom'
function Login() {

    const dispatch = useDispatch();
    const navigate = useNavigate(); 
    const [errorMessage, setErrorMessage] = useState('');

    const firstBreadcrumb = { label: "Trang" };
    const secondBreadcrumb = {
        label: "Đăng Nhập",
        active: true,
    };

   
    const [formData, setFormData] = useState({
        username: '',
        password: '',
    });


    const handleChange = (e) => {
        const {name, value} = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(login(formData)).then((res) => {
            if (res.meta.requestStatus === "fulfilled") {
                navigate('/')
                setErrorMessage(''); 
            // console.log("✅ Login thành công, payload:", store.getState().auth.token); // 👈 log ở đây
            } else {
                const err = res.payload?.message || "Đăng nhập thất bại. Vui lòng thử lại!";
                setErrorMessage(err);
            }
          });
          
    };

    return (
        <div className='page-wrapper'>
            <PageHeading
                title="Đăng Nhập"
                firstBreadcrumb={firstBreadcrumb}
                secondBreadcrumb={secondBreadcrumb}
            />
            <div className='page-content'>
                <section>
                    <Container>
                        <Row className="justify-content-center">
                            <Col xs="12" sm="10" md="8" lg="6">
                                <div className="shadow p-3">
                                    <img className="img-fluid mb-5" src="src\assets\image\login.png" alt="" />
                                    <h3 className="text-center mb-3 text-uppercase">Đăng Nhập</h3>
                                        {errorMessage && (
                                            <div className="alert alert-danger text-center mb-3">
                                                {errorMessage}
                                            </div>
                                        )}
                                    <Form id="contact-form" onSubmit={handleSubmit}>
                                        <div className="messages"></div>
                                        <FormGroup>
                                            <Input
                                                type="text"
                                                name="username"
                                                id="form_name"
                                                placeholder="Tên Đăng Nhập"
                                                value={formData.username}
                                                onChange={handleChange}
                                                required
                                            />
                                            <div className="help-block with-errors"></div>
                                        </FormGroup>
                                        <FormGroup>
                                            <Input
                                                type="password"
                                                name="password"
                                                id="form_password"
                                                value={formData.password}
                                                onChange={handleChange}
                                                placeholder="Mật Khẩu"
                                                required
                                            />
                                            <div className="help-block with-errors"></div>
                                        </FormGroup>
                                        <div className="form-group mt-4 mb-5">
                                            <div className="remember-checkbox d-flex align-items-center justify-content-between">
                                                {/* <div className="checkbox">
                                                    <Input type="checkbox" id="check2" name="check2" />
                                                    <Label for="check2">Remember me</Label>
                                                </div> */}
                                                <Link to="/forgotpass">Forgot Password?</Link>
                                            </div>
                                        </div>
                                        <Button type="submit" color="primary" block>Đăng Nhập</Button>
                                    </Form>
                                    <div className="d-flex align-items-center text-center justify-content-center mt-4">
                                        <span className="text-muted mr-1">Bạn mới đến Ekocart?</span>
                                        <Link to="/signup">Đăng Ký</Link>
                                    </div>
                                </div>
                            </Col>
                        </Row>
                    </Container>
                </section>
            </div>
        </div>
    )
}

export default Login