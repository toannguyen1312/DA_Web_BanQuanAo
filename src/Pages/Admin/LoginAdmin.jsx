import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Row, Col, Form, FormGroup, Input, Button } from 'reactstrap';
import logoImage from '../../assets/images/image.png';
import '../../assets/css/Admin/LoginAd.css';


function LoginAdmin() {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({ username: '', password: '' });
    const [errorMessage, setErrorMessage] = useState('');

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const { username, password } = formData;

        if (username === 'admin' && password === '123') {
            localStorage.setItem('isAdminLoggedIn', 'true'); // Lưu trạng thái
            navigate('/admin');
        } else {
            setErrorMessage('Thông tin đăng nhập không đúng!');
        }
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
                                    <h3 className="text-center mb-4">Admin Login</h3>
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
                                        <Button type="submit" color="primary" block>Login</Button>
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
