//import { useState } from 'react';
import "./Principal.css";
//import { createProduto } from '../../service/produto.service.js';
import { Row, Col, Container } from "react-bootstrap";
import { Outlet } from "react-router-dom";

//import Navegacao from './Componentes/Navegacao/Navegacao.js'
import SuperiorNavegacao from "../../Componentes/SuperiorNavegacao/SuperiorNavegacao.js";

function ProdutoList() {
  return (
    <>
      <Container fluid className="p-0">
        <Row className="m-0">
          <Col className="p-0" md="auto">
            <SuperiorNavegacao />
          </Col>
          <Col className="ps-0">
            <Outlet />
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default ProdutoList;
