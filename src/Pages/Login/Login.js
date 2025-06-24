//import React, { useEffect, useState } from 'react';
import './Login.css'
//import {   } from '../service/produto.service';
import { Row, Col, Button, Form } from 'react-bootstrap';
//import CNBR from './img/CNBR.jpg'
import { Link } from 'react-router-dom';

function Login() {


    return (
        <>
            <div className="d-flex justify-content-center vh-100">
                <Row>
                    <Col>
                        <div id='imagem' className='mt-5 w-100  mb-3'>
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
                                <Link to="/Painel/Estoque">
                                    <Button variant="primary" type="submit">
                                        Entrar
                                    </Button>
                                </Link>
                            </Form>
                        </div>
                    </Col>
                </Row>
            </div>
        </>
    );
}

export default Login;
