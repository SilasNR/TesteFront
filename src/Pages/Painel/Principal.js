//import { useState } from 'react';
import './Principal.css';
//import { createProduto } from '../../service/produto.service.js';
import { Row, Col, Container } from 'react-bootstrap';
import { Outlet } from "react-router-dom";


import Navegacao from './Componentes/Navegacao/Navegacao.js'
import SuperiorNavegacao from "./Componentes/SuperiorNavegacao/SuperiorNavegacao.js";

function ProdutoList() {

  return (
    <>
      <Container fluid className='vh-100'>
        <Row className='px-0'>
          <Col>
            <SuperiorNavegacao />
            <Outlet />
          </Col>
        </Row>
      </Container >
    </>
  );
}

export default ProdutoList;
