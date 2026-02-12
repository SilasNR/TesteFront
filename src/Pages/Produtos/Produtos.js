import { Row, Col, Container, Form, Button, Stack } from "react-bootstrap";
import { useState, useEffect, useCallback } from "react";
import "./Produtos.css";

import {
  createProduto,
  getProdutos,
  deleteProduto,
} from "../../service/produto.service.js";

function Produtos() {
  const [produtos, setProdutos] = useState([]);

  // Estado para Novo Cadastro
  const [novoProduto, setNovoProduto] = useState({
    codigo: "",
    observacao: "",
    quantidade: "",
    pacote: "",
    caixa: "",
  });

  // Estado para Alteração/Seleção (Objeto Único)
  const [produtoEdit, setProdutoEdit] = useState({
    id: null,
    codigo: "",
    observacao: "",
    quantidade: "",
    pacote: "",
    caixa: "",
  });

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
      // Preenche o objeto de edição com todos os dados do produto selecionado
      setProdutoEdit(produtos[index]);
    } else {
      setProdutoEdit({
        id: null,
        codigo: "",
        observacao: "",
        quantidade: "",
        pacote: "",
        caixa: "",
      });
    }
  };

  const salvar = () => {
    createProduto(novoProduto)
      .then(() => {
        setNovoProduto({
          codigo: "",
          observacao: "",
          quantidade: "",
          pacote: "",
          caixa: "",
        });
        buscarAteEncontrar();
        alert("Produto cadastrado!");
      })
      .catch((err) => console.error(err));
  };

  const deletar = () => {
    if (!produtoEdit.id) return alert("Selecione um produto primeiro!");

    deleteProduto(produtoEdit.id)
      .then(() => {
        setProdutoEdit({
          id: null,
          codigo: "",
          observacao: "",
          quantidade: "",
          pacote: "",
          caixa: "",
        });
        buscarAteEncontrar();
        alert("Produto deletado!");
      })
      .catch((err) => console.error(err));
  };

  return (
    <Container>
      {/* SEÇÃO: CADASTRO */}
      <Container className="dashboard mb-4">
        <Row>
          <h1>Cadastro de Produto</h1>
        </Row>
        <Form>
          <Row className="mb-3">
            <Form.Group as={Col}>
              <Form.Label>Código</Form.Label>
              <Form.Control
                type="text"
                value={novoProduto.codigo}
                onChange={(e) =>
                  setNovoProduto({ ...novoProduto, codigo: e.target.value })
                }
              />
            </Form.Group>
            <Form.Group as={Col}>
              <Form.Label>Observação</Form.Label>
              <Form.Control
                type="text"
                value={novoProduto.observacao}
                onChange={(e) =>
                  setNovoProduto({ ...novoProduto, observacao: e.target.value })
                }
              />
            </Form.Group>
          </Row>
          <Row className="mb-3">
            <Form.Group as={Col}>
              <Form.Label>Pacote</Form.Label>
              <Form.Control
                type="text"
                value={novoProduto.pacote}
                onChange={(e) =>
                  setNovoProduto({ ...novoProduto, pacote: e.target.value })
                }
              />
            </Form.Group>
            <Form.Group as={Col}>
              <Form.Label>Caixa</Form.Label>
              <Form.Control
                type="text"
                value={novoProduto.caixa}
                onChange={(e) =>
                  setNovoProduto({ ...novoProduto, caixa: e.target.value })
                }
              />
            </Form.Group>
            <Form.Group as={Col}>
              <Form.Label>Total</Form.Label>
              <Form.Control
                type="text"
                value={novoProduto.quantidade}
                onChange={(e) =>
                  setNovoProduto({ ...novoProduto, quantidade: e.target.value })
                }
              />
            </Form.Group>
          </Row>
          <Button onClick={salvar}>Cadastrar Novo</Button>
        </Form>
      </Container>

      {/* SEÇÃO: DADOS DO PRODUTO (EDIÇÃO/DELEÇÃO) */}
      <Container className="dashboard">
        <Row>
          <h1>Dados do Produto Selecionado</h1>
        </Row>
        <Form>
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
          <Row className="mb-3">
            <Form.Group as={Col}>
              <Form.Label>Observação</Form.Label>
              <Form.Control
                type="text"
                value={produtoEdit.observacao || ""}
                onChange={(e) =>
                  setProdutoEdit({ ...produtoEdit, observacao: e.target.value })
                }
              />
            </Form.Group>
          </Row>
          <Row className="mb-3">
            <Form.Group as={Col}>
              <Form.Label>Pacote</Form.Label>
              <Form.Control
                type="text"
                value={produtoEdit.pacote || ""}
                onChange={(e) =>
                  setProdutoEdit({ ...produtoEdit, pacote: e.target.value })
                }
              />
            </Form.Group>
            <Form.Group as={Col}>
              <Form.Label>Caixa</Form.Label>
              <Form.Control
                type="text"
                value={produtoEdit.caixa || ""}
                onChange={(e) =>
                  setProdutoEdit({ ...produtoEdit, caixa: e.target.value })
                }
              />
            </Form.Group>
            <Form.Group as={Col}>
              <Form.Label>Total</Form.Label>
              <Form.Control
                type="text"
                value={produtoEdit.quantidade || ""}
                onChange={(e) =>
                  setProdutoEdit({ ...produtoEdit, quantidade: e.target.value })
                }
              />
            </Form.Group>
          </Row>
          <Stack gap={3} direction="horizontal">
            <Button
              variant="primary"
              onClick={() => alert("Lógica de update aqui")}
            >
              Alterar
            </Button>
            <Button variant="danger" onClick={deletar}>
              Deletar
            </Button>
          </Stack>
        </Form>
      </Container>
    </Container>
  );
}

export default Produtos;
