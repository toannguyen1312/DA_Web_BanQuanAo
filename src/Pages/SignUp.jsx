import React from 'react';
import { Link } from 'react-router-dom';
import { Button, Col, Container, Form, FormGroup, Input, Row } from 'reactstrap';
import PageHeading from '../Components/PageHeading/PageHeading';
import { useDispatch, useSelector } from "react-redux";
import { registerUser } from "../store/reducer/registerSlice";
import { useState, useEffect } from "react";
import { checkUsernameExists } from "../service/userService"
import "../assets/css/login/register.css"
import { useNavigate } from 'react-router-dom'; 

function SignUp() {
    // "idle" | "checking" | "exists" | "available"
    const [emailValid, setEmailValid] = useState("idle");
    const [phoneValid, setPhoneValid] = useState("idle");
    const [usernameStatus, setUsernameStatus] = useState("idle"); 
    const [passwordValid, setPasswordValid] = useState("idle"); 
    const [firstNameValid, setFirstNameValid] = useState("idle")
    const [lastNameValid, setLastNameValid]  = useState("idle")
    const [addressValid, setAddressValid]  = useState("idle")
    const navigate = useNavigate(); 
    const dispatch = useDispatch();

        const [formData, setFormData] = useState({
            username: "",
            password: "",
            firstName: "",
            lastName: "",
            email: "",
            phone: "",
            address: "",
            birthday: "",
        });

    // const user = useSelector(state =>state.users.user)

    // useEffect(() => {
    //     if(user) {
    //         console.log("User mới đã được đăng ký:", user);
    //     }
    // }, [user])

      
    const firstBreadcrumb = { label: "Trang" };
    const secondBreadcrumb = {
        label: "Đăng Ký",
        active: true,
    };

// check định dạng form
const validateField = (name, value) => {
    const trimmedValue = value.trim();
    
    if (!trimmedValue) return "idle";
    
    switch (name) {
        case "username":
            return "checking";  // Trạng thái đang kiểm tra cho username
        case "email":
            return validateEmail(trimmedValue) ? "is-valid" : "is-invalid";
        case "phone":
            return validatePhone(trimmedValue) ? "is-valid" : "is-invalid";
        case "password":
            return validPassword(trimmedValue) ? "is-valid" : "is-invalid"
        case "firstName":
        case "lastName":
        case "address":
            return trimmedValue !== " " ? "is-valid" : "is-invalid";
        default:
            return "idle";
    }
};

const handleChange = async (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    
    // Xử lý username 
    if (name === "username") {
        const trimmed = value.trim();
        if (!trimmed) {
            setUsernameStatus("idle");
            return;
        }
        setUsernameStatus("checking");
        const exists = await checkUsernameExists(trimmed);
        setUsernameStatus(exists ? "exists" : "available");
    }
    
    // Xử lý các trường còn lại
    const status = validateField(name, value);
    if (name === "username") return;  // Đã xử lý riêng username

    if (name === "email") setEmailValid(status);
    if (name === "phone") setPhoneValid(status);
    if (name === "password") setPasswordValid(status);
    if (name === "firstName") setFirstNameValid(status);
    if (name === "lastName") setLastNameValid(status);
    if (name === "address") setAddressValid(status);
};


// kiểm tra định dạng email email
    const validateEmail = (email) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

//  kiểm tra định dạng phone
    const validatePhone = (phone) => {
        const phoneRegex = /^\d{10}$/;
        return phoneRegex.test(phone);
    };
// kiểm tra password
    
    const validPassword = (password) => {
        if (password.length >= 8) {
            return true;  
        } else {
            return false;  
        }
    }

  
    // gửi dữ liệu đi
    const handleSubmit = (e) => {
        e.preventDefault();

        if(phoneValid == "is-invalid" || emailValid == "is-invalid" || passwordValid == "is-invalid") {
            return;
        }else {
            dispatch(registerUser(formData)).then(() => {
                navigate("/login");
            });

        }
    };

    return (
        <div className='page-wrapper'>
            <PageHeading
                title="Đăng Ký"
                firstBreadcrumb={firstBreadcrumb}
                secondBreadcrumb={secondBreadcrumb}
            />
            <div className='page-content'>
                <section>
                    <Container>
                        <div className="row justify-content-center text-center">
                            <div className="col-lg-8 col-md-12">
                                <div className="mb-6">
                                    <h6 className="text-primary mb-1">
                                        — Đăng Ký
                                    </h6>
                                    <h3>Đăng ký tài khoảng đơn giản và dễ dàng</h3>
                                </div>
                            </div>
                        </div>
                        <Row>
                            <Col lg={8} md={10} className='ml-auto mr-auto'>
                                <div className='register-form text-center'>
                                    <Form id="contact-form" onSubmit={handleSubmit}>
                                        <div className="messages"></div>
                                        <Container>
                                            <Row>
                                                <Col md={6}>
                                                    <FormGroup>
                                                        <Input 
                                                        type="text"
                                                        name="username" 
                                                        id="form_userName" 
                                                        placeholder="User name"   
                                                        onChange={handleChange}   
                                                        value={formData.username} 
                                                        required 
                                                        className={
                                                            usernameStatus === "exists" 
                                                                ? "is-invalid" 
                                                                : usernameStatus === "available" 
                                                                    ? "is-valid" 
                                                                    : ""
                                                        }
                                                        />
                                                        {usernameStatus === "exists" && (
                                                            <div className="help-block with-errors">Username đã tồn tại!</div>
                                                        )}
                                                    </FormGroup>
                                                </Col>
                                                <Col md={6}>
                                                    <FormGroup>

                                                        <Input 
                                                        type="text" 
                                                        name="firstName" 
                                                        id="form_firstName" 
                                                        placeholder="First name"   
                                                        onChange={handleChange} 
                                                        required 
                                                         className={
                                                            firstNameValid === "is-valid" 
                                                                ? "is-valid" 
                                                                : firstNameValid === "is-invalid" 
                                                                    ? "is-invalid" 
                                                                    : ""
                                                        }
                                                        />
                                                        <div className="help-block with-errors"></div>
                                                    </FormGroup>
                                                </Col>
                                            </Row>

                                            <Row>
                                                <Col md={6}>
                                                    <FormGroup>
                                                        <Input 
                                                        type="password" 
                                                        name="password" 
                                                        id="form_password" 
                                                        placeholder="Password"   
                                                        onChange={handleChange} 
                                                        required 
                                                        className={
                                                            passwordValid === "is-valid" 
                                                                ?  "is-valid" 
                                                                : passwordValid === "is-invalid" 
                                                                    ? "is-invalid"
                                                                    : ""
                                                        }
                                                        />
                                                         {passwordValid === "is-invalid" && (
                                                            <div className="help-block with-errors">password phải lớn hơn 8 ký tự!</div>
                                                        )}
                                                    </FormGroup>
                                                </Col>
                                                <Col md={6}>
                                                    <FormGroup>

                                                        <Input 
                                                        type="text" 
                                                        name="lastName" 
                                                        id="form_lastName" 
                                                        placeholder="Last name"   
                                                        onChange={handleChange} 
                                                        required 
                                                        className={
                                                            lastNameValid === "is-valid" 
                                                                ? "is-valid" 
                                                                : lastNameValid === "is-invalid" 
                                                                    ? "is-invalid" 
                                                                    : ""
                                                        }
                                                        />
                                                        <div className="help-block with-errors"></div>
                                                    </FormGroup>
                                                </Col>
                                            </Row>
                                            <Row>
                                                <Col md={6}>
                                                    <FormGroup>
                                                        <Input 
                                                        type="email" 
                                                        name="email" 
                                                        id="form_email" 
                                                        placeholder="Email"  
                                                        onChange={handleChange} 
                                                        required 
                                                        className={
                                                            emailValid === "is-valid" 
                                                                ?  "is-valid" 
                                                                : usernameStatus === "is-invalid" 
                                                                    ? "is-invalid"
                                                                    : ""
                                                        }
                                                        />
                                                         {emailValid === "is-invalid" && (
                                                            <div className="help-block with-errors">Lỗi Eamil sai định dạng!</div>
                                                        )}
                                                       
                                                    </FormGroup>
                                                </Col>
                                                <Col md={6}>
                                                    <FormGroup>

                                                        <Input 
                                                        type="tel" 
                                                        name="phone" 
                                                        id="form_phone" 
                                                        placeholder="Phone"  
                                                        onChange={handleChange} 
                                                        required 
                                                        className={
                                                            phoneValid === "is-valid" 
                                                                ?  "is-valid" 
                                                                : phoneValid === "is-invalid" 
                                                                    ? "is-invalid"
                                                                    : ""
                                                        }
                                                        />
                                                        {phoneValid === "is-invalid" && (
                                                            <div className="help-block with-errors">Lỗi định dạng!</div>
                                                        )}
                                                    </FormGroup>
                                                </Col>
                                            </Row>
                                            <Row>
                                                <Col md={6}>
                                                    <FormGroup>

                                                        <Input 
                                                        type="text" 
                                                        name="address" 
                                                        id="form_address" 
                                                        placeholder="Address"  
                                                        onChange={handleChange} 
                                                        required 
                                                        className={
                                                            addressValid === "is-valid" 
                                                                ? "is-valid" 
                                                                : addressValid === "is-invalid" 
                                                                    ? "is-invalid" 
                                                                    : ""
                                                        }
                                                        />
                                                        <div className="help-block with-errors"></div>
                                                    </FormGroup>
                                                </Col>
                                                <Col md={6}>
                                                    <FormGroup>

                                                        <Input type="date" name="birthday" id="form_birthday" placeholder="Birthday Password" onChange={handleChange} required />
                                                        <div className="help-block with-errors"></div>
                                                    </FormGroup>
                                                </Col>
                                            </Row>
                                            
                                            <Row className="mt-5">
                                                <Col md={12}>
                                                    <div className="remember-checkbox clearfix mb-5">
                                                        <div className="custom-control custom-checkbox">
                                                            <input type="checkbox" className="custom-control-input" id="customCheck1" />
                                                            <label className="custom-control-label" for="customCheck1">Tôi đồng ý với điều khoản sử dụng và chính sách bảo mật</label>
                                                        </div>
                                                    </div>
                                                </Col>
                                            </Row>
                                            <Row>
                                                <Col md={12}>
                                                    <Button type="submit" color="primary">Tạo Tài Khoảng</Button>
                                                    <span className="mt-4 d-block">
                                                        Có tài khoảng? <Link to="/login"><i>Đăng nhập!</i></Link>
                                                    </span>
                                                </Col>
                                            </Row>
                                        </Container>
                                    </Form>
                                </div>
                            </Col>
                        </Row>
                    </Container>
                </section>
            </div>
        </div>
    )
}

export default SignUp;