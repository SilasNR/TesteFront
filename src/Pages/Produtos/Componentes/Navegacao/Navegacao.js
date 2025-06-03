//import React, { useEffect, useState } from 'react';
import { Row, Col, Container, Form, Spinner } from 'react-bootstrap';
import "./Navegacao.css";
import Botao from './Botao.js';

function Navegacao(param) {
    //const [display, setDisplay] = useState("block");


    return (
        <>
            <Col sm={2} className='menu vh-100'>
                <h2>CN BR Sistem</h2>

                <Botao titulo="Painel" />
                <Botao titulo="Produtos" />
                <Botao titulo="Usuário" />
                <Botao titulo="Configurações" />
                <Botao titulo="Ajuda" />
            </Col>
        </>
    )
}

export default Navegacao;