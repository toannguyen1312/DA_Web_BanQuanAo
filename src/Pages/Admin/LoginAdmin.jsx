import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Row, Col, Form, FormGroup, Input, Button } from 'reactstrap';
import logoImage from '../../assets/images/image.png';
import '../../assets/css/Admin/LoginAd.css';
import { login } from "../../store/reducer/authSlice"
import { jwtDecode } from "jwt-decode"; 
import { useDispatch, useSelector } from "react-redux";

function LoginAdmin() {
    const dispatch = useDispatch();
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState('');

  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    dispatch(login(formData)).then((res) => {
      if (res.meta.requestStatus === "fulfilled") {
        const token = res.payload.result.token;
        console.log("token: ", token)
        if (!token) {
          setErrorMessage("Không lấy được token!");
          return;
        }

        try {
          const decoded = jwtDecode(token);
          const scopes = decoded.scope ? decoded.scope.split(' ') : [];
          const hasRoleAdmin = scopes.includes('ROLE_ADMIN');

          if (!hasRoleAdmin) {
            setErrorMessage("Không được đăng nhập bằng tài khoản User.");
          } else {
            setErrorMessage('');
            navigate('/admin');
          }
        } catch (decodeErr) {
          console.error("Lỗi giải mã token:", decodeErr);
          setErrorMessage("Token không hợp lệ.");
        }
      } else {
        const err = res.payload?.message || "Đăng nhập thất bại. Vui lòng thử lại!";
        setErrorMessage(err);
      }
    });
  };


    return (
        <div className='page-wrapper login-admin'>
            <div className='page-content'>
                <section>
                    <Container>
                        <Row className="justify-content-center">
                            <Col xs="12" sm="10" md="6" lg="4">
                            <div className="text-center mb-4">
                            <img src={logoImage} alt="Logo" style={{ width: '150px' }} />
                                
                            </div>
                                <div className="shadow p-4 bg-white rounded">
                                    <h3 className="text-center mb-4">Admin Đăng Nhập</h3>
                                    {errorMessage && (
                                        <div className="alert alert-danger text-center">{errorMessage}</div>
                                    )}
                                    <Form onSubmit={handleSubmit}>
                                        <FormGroup>
                                            <Input
                                                type="text"
                                                name="username"
                                                placeholder="Username"
                                                value={formData.username}
                                                onChange={handleChange}
                                                required
                                            />
                                        </FormGroup>
                                        <FormGroup>
                                            <Input
                                                type="password"
                                                name="password"
                                                placeholder="Password"
                                                value={formData.password}
                                                onChange={handleChange}
                                                required
                                            />
                                        </FormGroup>
                                        <Button type="submit" color="primary" block>Đăng Nhập</Button>
                                    </Form>
                                </div>
                            </Col>
                        </Row>
                    </Container>
                </section>
            </div>
        </div>
    );
}

export default LoginAdmin;
