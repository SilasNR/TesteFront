import React, { useEffect, useState } from 'react';
import './ProdutoList.css';
import { getProdutos, deleteProduto } from '../../service/produto.service';
import { Row, Col, Container, Form, Spinner } from 'react-bootstrap';


function ProdutoList() {
  const [produtos, setProdutos] = useState([]);
  const [codigoProduto, setCodigoProduto] = useState('');
  const [quantidade, setQuantidade] = useState('');

  const busacarProdutos = async () => {
    const data = await getProdutos();
    if (Array.isArray(data)) {
      setProdutos(data);
    } else {
      setProdutos([]);
    }
  };

  useEffect(() => {
    busacarProdutos();
  }, []);

  const deletarProduto = async (id) => {
    try {
      await deleteProduto(id);
      busacarProdutos();
    } catch (error) {
      console.error('Erro ao deletar produto:', error);
    }
  };

  const enviarProduto = async () => {
    if (codigoProduto.trim() !== '') {
      try {
        const jsonProduto = {
          codigo: codigoProduto.trim(),
          quantidade: parseInt(quantidade),
        };

        const response = await fetch(
          'https://backend-basico-production-b95f.up.railway.app/produtos',
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(jsonProduto),
          }
        );

        if (!response.ok) {
          throw new Error(`Erro: ${response.status}`);
        }

        const resultado = await response.json();
        console.log('Produto cadastrado:', resultado);

        setCodigoProduto('');
        setQuantidade('');

        busacarProdutos();
      } catch (err) {
        console.error('Erro ao enviar produto: ', err);
      }
    } else {
      console.warn('Código do produto está vazio');
    }
  };

  return (
    <>
      <Container fluid className='vh-100'>
        <Row className='px-0'>
          <Col sm={3} className='menu vh-100'>
            <h1>Menu</h1>
          </Col>
          {produtos.length > 0 ? (
            <Col className=' vh-100'>
              <Row>
                <h1>nav</h1>
              </Row>
              <Row>
                <Container fluid>
                  <Row className='titulos px-0'>
                    <Col lg={2}></Col>
                    <Col>Código</Col>
                    <Col>Quantidade</Col>
                  </Row>
                  {produtos.map((produto) => (
                    <>
                      <Row className='linha px-0'>
                        <Col lg={2}>
                          <Form.Check type="checkbox" />
                        </Col>
                        <Col className='celula'>
                          <p>{produto.codigo}</p>
                        </Col>
                        <Col className='celula'>
                          <p>{produto.quantidade}</p>
                        </Col>
                      </Row>
                    </>
                  ))}

                </Container>
              </Row>
            </Col>
          ) : (

            <Col className='d-flex justify-content-center align-items-center vh-100'>

              <Spinner animation="border" role="status">
                <span className="visually-hidden">Loading...</span>
              </Spinner>

            </Col>
          )}
        </Row>
      </Container >

      {/* <div className="Form">
        <label>Código:</label>
        <input
          type="text"
          id="codigo"
          value={codigoProduto}
          onChange={(e) => setCodigoProduto(e.target.value)}
        />
        <br />
        <i class="bi bi-0-circle"></i>
        <label>Quantidade:</label>
        <input
          type="number"
          id="quantidade"
          value={quantidade}
          onChange={(e) => setQuantidade(e.target.value)}
        />
        <br />

        <input
          type="button"
          id="btnEnviarProduto"
          value="Cadastrar Produto"
          onClick={enviarProduto}
        />

        <input
          type="button"
          id="btnEnviarProduto"
          value="Deletar Produto"
          onClick={enviarProduto}
        />
      </div> */}
    </>
  );
}

export default ProdutoList;
