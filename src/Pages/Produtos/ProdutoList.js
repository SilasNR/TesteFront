import React, { useEffect, useState } from 'react';
import './ProdutoList.css';
import { getProdutos, deleteProdutos, createProduto} from '../../service/produto.service';
import { Row, Col, Container, Form, Spinner } from 'react-bootstrap';


function ProdutoList() {
  const [produtos, setProdutos] = useState([]);
  const [codigoProduto, setCodigoProduto] = useState('');
  const [quantidade, setQuantidade] = useState('');

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

  const enviarProduto = async () => {
  if (codigoProduto.trim() !== '') {
    const jsonProduto = {
      codigo: codigoProduto.trim(),
      quantidade: parseInt(quantidade),
    };

    try {
      await createProduto(jsonProduto);
      setCodigoProduto('');
      setQuantidade('');
      busacarProdutos();
    } catch (err) {
      console.error('Erro ao cadastrar produto:', err);
    }
  } else {
    console.warn('Código do produto está vazio');
  }
};

  const [selected, setSelected] = useState([]);

  const mudarCheckbox = (e) => {
    const value = Number(e.target.value);
    const isChecked = e.target.checked;

    if (isChecked) {
      setSelected([...selected, value]);
    } else {
      setSelected(selected.filter((v) => v !== value));
    }
  };

  const deletarSelecionados = async () => {
    console.log(selected);
    
    if (!window.confirm('Tem certeza que deseja deletar os produtos selecionados?')) {
      return;
    }

    try {
      await deleteProdutos(selected);
      busacarProdutos();
      setSelected([]);
      console.log('Produtos deletados com sucesso!');
    } catch (error) {
      console.error('Erro ao deletar produtos:', error);
    }
  };

  return (
    <>
      <Container fluid className='vh-100'>
        <Row className='px-0'>
          <Col sm={3} className='menu vh-100'>
            <h1>Pedidos</h1>
          </Col>
          {produtos.length > 0 ? (
            <Col className=' vh-100'>
              <Row>
                <h1>nav {selected}</h1>
              </Row>
              <Row>
                <Container fluid>
                  <Row className='titulos px-0'>
                    <Col lg={2}><i id="lixo" class="bi bi-trash3" onClick={deletarSelecionados}></i></Col>
                    <Col>Código</Col>
                    <Col>Quantidade</Col>
                  </Row>
                  {produtos.map((produto) => (
                    <>
                      <Row key={produto.id} className='linha px-0'>
                        <Col lg={2}>
                          <Form.Check type="checkbox" value={produto.id} onChange={mudarCheckbox} />
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

      <div className="Form">
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
      </div>
    </>
  );
}

export default ProdutoList;
