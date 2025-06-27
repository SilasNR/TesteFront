import '../../../Principal.css'
import Button from 'react-bootstrap/Button';
import { Modal, Form, Col, Row, Container, Stack } from 'react-bootstrap';
import { useEffect, useState } from 'react';

import Lista from './Lista/Lista.js';

import { createPedido } from '../../../../../service/pedido.service.js';

function Cadastrar(param) {

  const [numeroPedido, setNumeroPedido] = useState();
  const [cliente, setCliente] = useState("");
  const [codigo, setCodigo] = useState("");
  const [quantidade, setQuantidade] = useState("");

  const [lista, setLista] = useState([]);

  const [prodSelect, setProdSelect] = useState([]);

  useEffect(() => {
    if (param.pedido) {
      setNumeroPedido(param.pedido.numero || '');
      setNumeroPedido(param.pedido.numero || '');
      setCliente(param.pedido.cliente || '');
      setLista(param.pedido.lista || []);
      console.log("Lista recebida:", param.pedido.lista);
    }
  }, [param.pedido]);

  useEffect(() => {
    if (!param.show) {
      // Limpando campos quando o modal fecha
      setNumeroPedido('');
      setCliente('');
      setLista([]);
      setCodigo('');
      setQuantidade('');
    }
  }, [param.show]);

  const limpar = () => {
    param.onHide();
    setNumeroPedido("");
    setCliente("");
    setCodigo("");
    setQuantidade("");
    setLista([]);
  }

  const selecionado = (e) => {////////////////////////////Pega as imformações do produto selecionado no espaço Dados do Produto
    const index = parseInt(e.target.value, 10); // Converte para número
    const produto = param.produtos[index];
    console.log(produto);
    setProdSelect(produto);
  }

  const adicionarProd = () => {
    const proximoProduto = {
      codigo: prodSelect.codigo,
      quantidade: quantidade
    };

    console.log("Código = ", proximoProduto);

    setLista([...lista, proximoProduto]);
    console.log(lista);

  };

  const salvar = () => {
    const pedido = {
      numero: numeroPedido,
      cliente: cliente,
      produtos: lista
    }

    console.log(pedido);

    createPedido(pedido).then(resultado => {
      console.log('Pedido criado:', resultado);
      // aqui você pode limpar o formulário, fechar modal etc
    })
      .catch(err => {
        // tratar erro
        console.error(err);
      });
  }

  const [titulos] = useState([
    "",
    "Código",
    "Quantidade"
  ]);

  const [campos] = useState([
    "",
    "codigo",
    "quantidade"
  ]);

  return (
    <Modal
      {...param}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Novo  de pedido
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Col className='separador mb-3'>
          <Form.Group className="mb-3 " controlId="formNumeroPedido">
            <Form.Label>Numero do pedido:</Form.Label>
            <Form.Control type="text" placeholder="N° Pedido" value={numeroPedido} onChange={(e) => setNumeroPedido(e.target.value)} />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formCliente">
            <Form.Label>Cliente:</Form.Label>
            <Form.Control type="text" placeholder="Nome do Cliente" value={cliente} onChange={(e) => setCliente(e.target.value)} />
          </Form.Group>
        </Col>


        <Col className='separador'>
          <Form.Group className="gap-2" controlId="form">
            <Row>
              <Form.Label>Produtos:</Form.Label>
            </Row>

            <Row>
              <Form.Label>Código: </Form.Label>
            </Row>
            
            <Row>
              <Stack gap={2}>
                <Form.Select aria-label="Default select example" value={codigo} onChange={(e) => { selecionado(e); setCodigo(e.target.value); }}>
                  <option value="-1">...</option>
                  {param.produtos.map((value, index) => (
                    <option key={index} value={index} >
                      {value.codigo}</option>
                  ))}
                </Form.Select>

                <Form.Control type="text" placeholder="Quantidade" value={quantidade} onChange={(e) => setQuantidade(e.target.value)} />
                <Button onClick={() => {
                  adicionarProd();
                  setCodigo("");
                  setQuantidade("");
                }}>+</Button>
              </Stack>
            </Row>
          </Form.Group>
        </Col>


        <Form.Group className="mt-4 justify-content-md-center" controlId="formLista">
          <Lista titulos={titulos} campos={campos} valores={lista} resposta="Nenhum produto adicionado" />
        </Form.Group>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={() => { limpar() }}><i class="bi bi-trash3"></i> Excluir</Button>
        <Button onClick={() => { limpar() }}>Close</Button>
        <Button onClick={() => {
          salvar();
          param.buscar();
          limpar();
        }}>Salvar</Button>
      </Modal.Footer>
    </Modal>
  );
}


export default Cadastrar;