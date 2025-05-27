//import React, { useEffect, useState } from 'react';
import './Login.css'
//import {   } from '../service/produto.service';
import { Row, Col } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Img from './CNBR.jpg'

function Login() {


    return (
        <>
            <div className="d-flex justify-content-center align-items-center vh-100">
                <Row>
                    <Col className="justify-content-center">
                        <div >
                            <img scr={Img} alt="Logo" width="200"></img>
                        </div>
                        <div className="border p-5">
                            <Form>
                                <Form.Group className="mb-3" controlId="formBasicEmail">
                                    <Form.Control type="email" placeholder="Usuário" />
                                    <Form.Text className="text-muted">
                                    </Form.Text>
                                </Form.Group>

                                <Form.Group className="mb-3" controlId="formBasicPassword">
                                    <Form.Control type="password" placeholder="Senha" />
                                </Form.Group>
                                <Form.Group className="mb-3" controlId="formBasicCheckbox">
                                    <Form.Check type="checkbox" label="Lembrar" />
                                </Form.Group>
                                <Button variant="primary" type="submit">
                                    Entrar
                                </Button>
                            </Form>
                        </div>
                    </Col>
                </Row>
            </div>
        </>
    );
}

export default Login;
