import React from 'react';
import { Link } from 'react-router-dom';
import { Button, Col, Container, Form, FormGroup, Input, Row } from 'reactstrap';
import PageHeading from '../Components/PageHeading/PageHeading';


function ForgotPass() {
    const firstBreadcrumb = { label: "Pages" };
    const secondBreadcrumb = {
        label: "Forgot Password",
        active: true,
    };
    const handleSubmit = (e) => {
        e.preventDefault();
    };

    return (
        <div className='page-wrapper'>
            <PageHeading
                title="Forgot Password"
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
                                        — Forgot Password
                                    </h6>
                                    {/* <h2>Simple And Easy To Sign Up</h2> */}
                                    <p className="lead">Enter your email to receive a password recovery link</p>
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
                                                <Col md={12}>
                                                    <FormGroup>

                                                        <Input type="text" name="name" id="form_name" placeholder="User name" required />
                                                        <div className="help-block with-errors"></div>
                                                    </FormGroup>
                                                </Col>
                                        
                                            </Row>
                                            <Row>
                                                <Col md={12}>
                                                    <FormGroup>
                                                        <Input type="email" name="email" id="form_email" placeholder="Email" required />
                                                        <div className="help-block with-errors"></div>
                                                    </FormGroup>
                                                </Col>
                                               
                                            </Row>
                                            <Row>
                                            <Col md={12}>
                                                    <FormGroup>

                                                        <Input type="tel" name="phone" id="form_phone" placeholder="Phone" required />
                                                        <div className="help-block with-errors"></div>
                                                    </FormGroup>
                                                </Col>
                                            </Row>
                                        
                                            {/* <Row className="mt-5">
                                                <Col md={12}>
                                                    <div className="remember-checkbox clearfix mb-5">
                                                        <div className="custom-control custom-checkbox">
                                                            <input type="checkbox" className="custom-control-input" id="customCheck1" />
                                                            <label className="custom-control-label" for="customCheck1">I agree to the term of use and privacy
                                                                policy</label>
                                                        </div>
                                                    </div>
                                                </Col>
                                            </Row> */}
                                            <Row>
                                                <Col md={12}>
                                                <p className="lead">Enter at least one   item in the form</p>
                                                    <Button type="submit" color="primary">Forgot Account</Button>
                                                    {/* <span className="mt-4 d-block">
                                                        Have an Account? <Link to="/login"><i>Sign In!</i></Link>
                                                    </span> */}
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

export default ForgotPass;