import Button from 'react-bootstrap/Button';
import { Modal, Form, Col } from 'react-bootstrap';
import { useEffect, useState } from 'react';

import Lista from '../../Lista/Lista.js';

import { createPedido } from '../../../../../service/pedido.service.js';

function Cadastrar(param) {

  const [numeroPedido, setNumeroPedido] = useState();
  const [cliente, setCliente] = useState("");
  const [codigo, setCodigo] = useState("");
  const [quantidade, setQuantidade] = useState("");

  const [lista, setLista] = useState([]);


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

  const adicionarProd = () => {
    const prodLista = {
      codigoProduto: codigo,
      quantidade: quantidade
    };

    setLista([...lista, prodLista]);
  };

  const salvar = () => {
    const pedido = {
      numero: numeroPedido,
      cliente: cliente,
      produtos: lista
    }

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
    "codigoProduto",
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
        <Form.Group className="mb-3 " controlId="formNumeroPedido">
          <Form.Label>Numero do pedido:</Form.Label>
          <Form.Control type="text" placeholder="N° Pedido" value={numeroPedido} onChange={(e) => setNumeroPedido(e.target.value)} />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formCliente">
          <Form.Label>Cliente:</Form.Label>
          <Form.Control type="text" placeholder="Nome do Cliente" value={cliente} onChange={(e) => setCliente(e.target.value)} />
        </Form.Group>
        <Form.Group  className="mb-3 d-flex align-items-center gap-2" controlId="form">
          <Form.Label>Produtos:</Form.Label>
          <Form.Group  controlId="formGridCodigo">
            <Form.Label>Código </Form.Label>
            <Form.Select aria-label="Default select example" value={codigo} onChange={(e) => { param.selecionado(e); setCodigo(e.target.value); }}>
              <option value="-1">...</option>
              {param.produtos.map((value, index) => (
                <option key={index} value={index} >
                  {value.codigo}</option>
              ))}
            </Form.Select>
          </Form.Group>
          <Form.Control type="text" placeholder="Quantidade" value={quantidade} onChange={(e) => setQuantidade(e.target.value)} />
          <Button onClick={() => {
            adicionarProd();
            setCodigo("");
            setQuantidade("");
          }}>+</Button>
        </Form.Group>
        <Form.Group className="mb-3" controlId="formLista">
          <Lista titulos={titulos} campos={campos} valores={lista} resposta="Nenhum Produto" />
        </Form.Group>
      </Modal.Body>
      <Modal.Footer>

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