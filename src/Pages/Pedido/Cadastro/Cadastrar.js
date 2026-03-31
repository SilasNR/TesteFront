import "../../Principal/Principal.css";
import Button from "react-bootstrap/Button";
import { Form, Col, Row, Stack, Container, InputGroup, FloatingLabel } from "react-bootstrap";
import { useState, useEffect, useCallback } from "react";

import Lista from "./Lista/Lista.js";

import { createPedido } from "../../../service/pedido.service.js";
import { getProdutos } from "../../../service/produto.service.js";

function Cadastrar(param) {
  const [novoPedido, setNovoPedido] = useState({
    numero: "",
    cliente: "",
    cnpj: "",
    municipio: "",
    uf: "",
    cep: "",
    valor: "",
    peso: ""
  });
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



  const selecionado = (e) => {
    const index = parseInt(e.target.value, 10);
    if (index >= 0) {
      setProdSelect(produtos[index]);
    } else {
      setProdSelect([]); // Limpa se selecionar a opção vazia
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
    const newArray = lista.filter((_, e) => index !== e);
    setLista(newArray); // Updates the state with the new array
  };

  /*-------------------------------------------------------------------------------------------------------Salvar*/
  const salvar = () => {
    const pedido = {
      ...novoPedido,
      valor: parseFloat(novoPedido.valor) || 0,
      peso: parseFloat(novoPedido.peso) || 0,
      produtos: lista,
    };
    console.log(pedido);
    createPedido(pedido)
      .then((resultado) => {
        console.log("Pedido criado:", resultado);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const [titulos] = useState(["", "Código", "Quantidade"]);
  const [campos] = useState(["", "codigo", "quantidade"]);

  return (
    <Container>
      <h1>Cadastro de Pedido</h1>
      <Col className="separador mb-3 dashboard">
        <FloatingLabel controlId="floatingSelect" label="Número do pedido" className="mb-3">
          <Form.Control
            type="text"
            placeholder="N° Pedido"
            value={novoPedido.numeroPedido}
            onChange={(e) => setNovoPedido({ ...novoPedido, numeroPedido: e.target.value })}
          />
        </FloatingLabel>

        <FloatingLabel controlId="floatingSelect" label="Cliente" className="mb-3">
          <Form.Label></Form.Label>
          <Form.Control
            type="text"
            placeholder="Nome do Cliente"
            value={novoPedido.cliente}
            onChange={(e) => setNovoPedido({ ...novoPedido, cliente: e.target.value })}
          />
        </FloatingLabel>

        <FloatingLabel controlId="floatingSelect" label="CNPJ" className="mb-3">
          <Form.Control
            type="text"
            placeholder="CNPJ"
            value={novoPedido.cnpj}
            onChange={(e) => setNovoPedido({ ...novoPedido, cnpj: e.target.value })}
          />
        </FloatingLabel>

        <FloatingLabel controlId="floatingSelect" label="UF" className="mb-3">
          <Form.Control
            type="text"
            value={novoPedido.uf}
            onChange={(e) => setNovoPedido({ ...novoPedido, uf: e.target.value })}
          />
        </FloatingLabel>

        <FloatingLabel controlId="floatingSelect" label="Municipio" className="mb-3">
          <Form.Control
            type="text"
            value={novoPedido.municipio}
            onChange={(e) => setNovoPedido({ ...novoPedido, municipio: e.target.value })}
          />
        </FloatingLabel>

        <FloatingLabel controlId="floatingSelect" label="CEP" className="mb-3">
          <Form.Control
            type="text"
            placeholder="CEP"
            value={novoPedido.cep}
            onChange={(e) => setNovoPedido({ ...novoPedido, cep: e.target.value })}
          />
        </FloatingLabel>


        <InputGroup className="mb-3">
          <InputGroup.Text>R$</InputGroup.Text>
          <FloatingLabel controlId="floatingSelect" label="Valor" className="mb-3">
            <Form.Control
              type="text"
              step="0.00"
              value={novoPedido.valor}
              onChange={(e) => setNovoPedido({ ...novoPedido, valor: e.target.value })}
            />
          </FloatingLabel>
        </InputGroup>

        <InputGroup className="mb-3">
          <FloatingLabel controlId="floatingSelect" label="Peso" className="mb-3">
            <Form.Control
              type="text"
              value={novoPedido.peso}
              onChange={(e) => setNovoPedido({ ...novoPedido, peso: e.target.value })}
            />
          </FloatingLabel>
          <InputGroup.Text>kg</InputGroup.Text>
        </InputGroup>

      </Col>
      <Col className="separador dashboard" >
        <Form.Group className="gap-2" controlId="form">

          <Row>
            <Form.Label>Produtos </Form.Label>
          </Row>
          <Row>
            <Stack gap={2}>
              <Row className="mb-3">
                <FloatingLabel controlId="floatingSelect" label="Selecione o Código ">
                  <Form.Select onChange={selecionado}>
                    <option value="-1"></option>
                    {produtos.map((p, i) => (
                      <option key={p.id || i} value={i}>
                        {p.codigo}
                      </option>
                    ))}
                  </Form.Select>
                </FloatingLabel>
              </Row>
              <FloatingLabel controlId="floatingSelect" label="Quantidade" className="mb-3">
                <Form.Control
                  type="text"
                  placeholder="Quantidade"
                  value={quantidade}
                  onChange={(e) => setQuantidade(e.target.value)}
                />
              </FloatingLabel>
              <Button
                onClick={() => {
                  adicionarProd();
                  setQuantidade("");
                }}
              >
                +
              </Button>
            </Stack>
          </Row>
        </Form.Group>

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

      </Col>

      <Button
        onClick={() => {
          // limpar();
        }}
      >
        Cancelar
      </Button>

      <Button
        onClick={() => {
          salvar();
        }}
      >
        Salvar
      </Button>
    </Container>
  );
}

export default Cadastrar;
