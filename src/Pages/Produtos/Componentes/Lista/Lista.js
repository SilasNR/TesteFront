import './Lista.css';
import React, { useEffect, useState } from 'react';
import { getProdutos } from '../../../../service/produto.service.js';
import { Row, Col, Form, Container, Spinner} from 'react-bootstrap';



import Pesquisa from '../Pesquisa/Pesquisa.js'


function Lista(param) {

  const [produtos, setProdutos] = useState([]);

  //////////////////////////////////////////////////////// Buscar produtos
  const busacarProdutos = async () => {
    const data = await getProdutos();
    if (Array.isArray(data)) {
      setProdutos(data);
      console.log("buscando ...");

    } else {
      setProdutos([]);
      console.log("não encontrado ...");

    }
  };

  useEffect(() => {
    busacarProdutos();
  }, []);

  return (
    <>
      {produtos.length > 0 ? (
        <Col className=' vh-100'>
          <Row>
            <Row className='titulos' >
              <Col lg={2}><i id="lixo" class="bi bi-trash3" onClick={param.deletarSelecionados}></i></Col>
              <Col>Código</Col>
              <Col>Peças</Col>
              <Col>Caixas</Col>
            </Row>
            <Row className='lista'>
              <Container fluid className='h-50 d-inline-block'>
                {produtos.map((produto) => (

                  <Row key={produto.id} className='linha '>
                    <Col lg={2}>
                      <Form.Check type="checkbox" value={produto.id} onChange={param.mudarCheckbox} />
                    </Col>
                    <Col className='celula'>
                      <p>{produto.codigo}</p>
                    </Col>
                    <Col className='celula'>
                      <p>{produto.quantidade}</p>
                    </Col>
                    <Col className='celula'>
                      <p>{produto.quantidade / 10}</p>
                    </Col>
                  </Row>


                ))}
              </Container>
            </Row >
          </Row>
        </Col>
      ) : (
        <Col className='d-flex justify-content-center align-items-center vh-100'>
          <Spinner animation="border" role="status">
            <span className="visually-hidden">Loading...</span>
          </Spinner>
        </Col>
      )}
    </>
  )
}

export default Lista