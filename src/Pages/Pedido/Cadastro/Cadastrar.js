import "../../Principal/Principal.css";
import Button from "react-bootstrap/Button";
import { Form, Col, Row, Stack, Container } from "react-bootstrap";
import { useState, useEffect, useCallback } from "react";

import Lista from "./Lista/Lista.js";

import { createPedido } from "../../../service/pedido.service.js";
import { getProdutos } from "../../../service/produto.service.js";

function Cadastrar(param) {
  const [numeroPedido, setNumeroPedido] = useState();
  const [cliente, setCliente] = useState("");
  const [codigo, setCodigo] = useState("");
  const [quantidade, setQuantidade] = useState("");
  const [lista, setLista] = useState([]);

  const [prodSelect, setProdSelect] = useState([]);
  const [produtos, setProdutos] = useState([]);

  const buscarAteEncontrar = useCallback(async () => {
    let encontrado = false;
    let tentativas = 0;
    const maxTentativas = 5;
    while (!encontrado && tentativas < maxTentativas) {
      tentativas++;
      const data = await getProdutos();
      if (Array.isArray(data) && data.length > 0) {
        setProdutos(data);
        encontrado = true;
      } else {
        await new Promise((resolve) => setTimeout(resolve, 2000));
        console.log("Buscando...");
      }
    }
  }, []);

  useEffect(() => {
    buscarAteEncontrar();
  }, [buscarAteEncontrar]);

  useEffect(() => {
    if (param.pedido) {
      setNumeroPedido(param.pedido.numero || "");
      setNumeroPedido(param.pedido.numero || "");
      setCliente(param.pedido.cliente || "");
      setLista(param.pedido.lista || []);
      console.log("Lista recebida:", param.pedido.lista);
    }
  }, [param.pedido]);

  useEffect(() => {
    if (!param.show) {
      // Limpando campos quando o modal fecha
      setNumeroPedido("");
      setCliente("");
      setLista([]);
      setCodigo("");
      setQuantidade("");
    }
  }, [param.show]);

  const limpar = () => {
    param.onHide();
    setNumeroPedido("");
    setCliente("");
    setCodigo("");
    setQuantidade("");
    setLista([]);
  };

  const selecionado = (e) => {
    ////////////Pega as imformações do produto selecionado no espaço Dados do Produto
    const index = parseInt(e.target.value, 10); // Converte para número
    //const produto = param.produtos[index];
    //console.log(produto);
    //setProdSelect(produto);
    if (index >= 0) {
      console.log(index);
      //   // Preenche o objeto de edição com todos os dados do produto selecionado
      setProdSelect(produtos[index]);
      // } else {
    }
  };

  /*-------------------------------------------------------------------------------------------------------AdicionarProd*/
  const adicionarProd = () => {
    const proximoProduto = {
      codigo: prodSelect.codigo,
      quantidade: quantidade,
    };
    console.log("Código = ", proximoProduto);
    setLista([...lista, proximoProduto]);
    console.log(lista);
  };

  /*-------------------------------------------------------------------------------------------------------AdicionarProd*/
  const removerProd = (index) => {
    console.log(index);
    const newArray = lista.filter((indexlista) => index !== indexlista);
    console.log("lista = " + lista);
    console.log("Nova = " + newArray);
    setLista(newArray); // Updates the state with the new array
  };

  /*-------------------------------------------------------------------------------------------------------Salvar*/
  const salvar = () => {
    const pedido = {
      numero: numeroPedido,
      cliente: cliente,
      produtos: lista,
    };
    console.log(pedido);
    createPedido(pedido)
      .then((resultado) => {
        console.log("Pedido criado:", resultado);
        // aqui você pode limpar o formulário, fechar modal etc
      })
      .catch((err) => {
        // tratar erro
        console.error(err);
      });
  };

  const [titulos] = useState(["", "Código", "Quantidade"]);
  const [campos] = useState(["", "codigo", "quantidade"]);

  return (
    <Container>
      <h1>Cadastro de Pedido</h1>
      <Col className="separador mb-3 dashboard">
        <Form.Group className="mb-3 " controlId="formNumeroPedido">
          <Form.Label>Numero do pedido:</Form.Label>
          <Form.Control
            type="text"
            placeholder="N° Pedido"
            value={numeroPedido}
            onChange={(e) => setNumeroPedido(e.target.value)}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formCliente">
          <Form.Label>Cliente:</Form.Label>
          <Form.Control
            type="text"
            placeholder="Nome do Cliente"
            value={cliente}
            onChange={(e) => setCliente(e.target.value)}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formCliente">
          <Form.Label>CNPJ:</Form.Label>
          <Form.Control
            type="text"
            placeholder="CNPJ"
            value={cliente}
            onChange={(e) => setCliente(e.target.value)}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formCliente">
          <Form.Label>Estado/Cidade:</Form.Label>
          <Form.Control
            type="text"
            placeholder="Estado/Cidade"
            value={cliente}
            onChange={(e) => setCliente(e.target.value)}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formCliente">
          <Form.Label>CEP:</Form.Label>
          <Form.Control
            type="text"
            placeholder="CEP"
            value={cliente}
            onChange={(e) => setCliente(e.target.value)}
          />
        </Form.Group>
      </Col>
      <hr />
      <Col className="separador">
        <Form.Group className="gap-2" controlId="form">
          <Row>
            <Form.Label>Produtos:</Form.Label>
          </Row>
          <Row>
            <Form.Label>Código: </Form.Label>
          </Row>
          <Row>
            <Stack gap={2}>
              <Row className="mb-3">
                <Form.Group as={Col}>
                  <Form.Label>Selecione o Código</Form.Label>
                  <Form.Select onChange={selecionado}>
                    <option value="-1">...</option>
                    {produtos.map((p, i) => (
                      <option key={p.id || i} value={i}>
                        {p.codigo}
                      </option>
                    ))}
                  </Form.Select>
                </Form.Group>
              </Row>
              <Form.Control
                type="text"
                placeholder="Quantidade"
                value={quantidade}
                onChange={(e) => setQuantidade(e.target.value)}
              />
              <Button
                onClick={() => {
                  adicionarProd();
                  setCodigo("");
                  setQuantidade("");
                }}
              >
                +
              </Button>
            </Stack>
          </Row>
        </Form.Group>
      </Col>

      <Row className="mb-3">
        <Form.Group
          className="mt-4 justify-content-md-center"
          controlId="formLista"
        >
          <Lista
            titulos={titulos}
            campos={campos}
            valores={lista}
            resposta="Nenhum produto adicionado"
            aoClicar={(e) => {
              removerProd(e);
            }}
          />
        </Form.Group>
      </Row>

      <Button
        onClick={() => {
          // limpar();
        }}
      >
        <i class="bi bi-trash3"></i> Excluir
      </Button>
      <Button
        onClick={() => {
          // limpar();
        }}
      >
        Close
      </Button>
      <Button
        onClick={() => {
          // salvar();
          // param.buscar();
          // limpar();
        }}
      >
        Salvar
      </Button>
    </Container>
  );
}

export default Cadastrar;
