import { Row, Col, Container, Form, Button, Stack } from "react-bootstrap";
import { useState, useEffect, useCallback } from "react";
import Filtro from "../../Componentes/Filto/Filtro.js";
import Lista from "../../Componentes/Lista/Lista.js";

import "./Produtos.css";

import {
  createProduto,
  getProdutos,
  deleteProduto,
  updateProduto,
} from "../../service/produto.service.js";

function Produtos() {
  const [produtos, setProdutos] = useState([]);

  // Estado para Novo Cadastro
  const [novoProduto, setNovoProduto] = useState({
    codigo: "",
    observacao: "",
    quantidade: "",
    altura: "",
    largura: "",
    comprimento: "",
    cubagem: "",
    pacote: "",
    caixa: "",
  });

  // Estado para Alteração/Seleção (Objeto Único)
  const [produtoEdit, setProdutoEdit] = useState({
    id: null,
    codigo: "",
    observacao: "",
    quantidade: "",
    altura: "",
    largura: "",
    comprimento: "",
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
        altura: "",
        largura: "",
        comprimento: "",
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
          altura: "",
          largura: "",
          comprimento: "",
          pacote: "",
          caixa: "",
        });
        buscarAteEncontrar();
        alert("Produto cadastrado!");
      })
      .catch((err) => console.error(err));
  };

  const atualizar = () => {
    if (!produtoEdit.id) return alert("Selecione um produto primeiro!");

    updateProduto(produtoEdit.id, produtoEdit)
      .then(() => {
        setProdutoEdit({
          id: null,
          codigo: "",
          observacao: "",
          quantidade: "",
          altura: "",
          largura: "",
          comprimento: "",
          pacote: "",
          caixa: "",
        });
        buscarAteEncontrar();
        alert("Produto atualizado!");
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
          altura: "",
          largura: "",
          comprimento: "",
          pacote: "",
          caixa: "",
        });
        buscarAteEncontrar();
        alert("Produto deletado!");
      })
      .catch((err) => console.error(err));
  };

  const [titulos] = useState([
    "Código",
    "Descrição",
    "Estoque Fundo",
    "Total de Peças",
  ]);

  const [campos] = useState(["codigo", "observacao", "caixa", "quantidade"]);

  const aoClicar = () => {};

  const filtros = [
    {
      nome: "Crecente",
      icone: "bi bi-arrow-up-short"
    },
    {
      nome: "Descrecente",
      icone: "bi bi-arrow-down-short"
    },
  ]

  return (
    <Container>
      {/* SEÇÃO: CADASTRO */}
      <Row className="dashboard">
        <Filtro
            tela="pedido"
            textoBusca="Digite o número do pedido, nome do Cliente"
            filtros={filtros}
          />
        <Lista
          valores={produtos}
          titulos={titulos}
          campos={campos}
          aoClicar={aoClicar}
          resposta="Não há produtos em estoque"
        />
      </Row>

      <Row className="dashboard">
        <Row>
          <h1>Cadastro de Produto</h1>
        </Row>
        <Form>
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
          <Row className="mb-3">
            <Form.Group as={Col}>
              <Form.Label>Altura</Form.Label>
              <Form.Control
                type="text"
                value={novoProduto.altura}
                onChange={(e) =>
                  setNovoProduto({ ...novoProduto, altura: e.target.value })
                }
              />
            </Form.Group>

            <Form.Group as={Col}>
              <Form.Label>Largura</Form.Label>
              <Form.Control
                type="text"
                value={novoProduto.largura}
                onChange={(e) =>
                  setNovoProduto({ ...novoProduto, largura: e.target.value })
                }
              />
            </Form.Group>

            <Form.Group as={Col}>
              <Form.Label>Comprimento</Form.Label>
              <Form.Control
                type="text"
                value={novoProduto.comprimento}
                onChange={(e) =>
                  setNovoProduto({
                    ...novoProduto,
                    comprimento: e.target.value,
                  })
                }
              />
            </Form.Group>

            <Form.Group as={Col}>
              <Form.Label>Cubagem</Form.Label>
              <Form.Control
                type="text"
                value={
                  (novoProduto.altura *
                    novoProduto.largura *
                    novoProduto.comprimento) /
                  100000
                }
                disabled
              />
            </Form.Group>
          </Row>
          {/* <Form.Group as={Col}>
            <Form.Label>Cubagem</Form.Label>
            <Form.Control
              type="text"
              value={novoProduto.codigo}
              onChange={(e) =>
                setNovoProduto({ ...novoProduto, codigo: e.target.value })
              }
            />
          </Form.Group> */}

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

          <Button onClick={salvar}>Cadastrar Novo</Button>
        </Form>
      </Row>

      {/* SEÇÃO: DADOS DO PRODUTO (EDIÇÃO/DELEÇÃO) --------------------------------------------------------------------------------*/}
      <Row className="dashboard">
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
          <Form.Group as={Col}>
            <Form.Label>Observação</Form.Label>
            <Form.Control
              type="text"
              value={produtoEdit.observacao}
              onChange={(e) =>
                setProdutoEdit({ ...produtoEdit, observacao: e.target.value })
              }
            />
          </Form.Group>

          <Form.Group as={Col}>
            <Form.Label>Total</Form.Label>
            <Form.Control
              type="text"
              value={produtoEdit.quantidade}
              onChange={(e) =>
                setProdutoEdit({ ...produtoEdit, quantidade: e.target.value })
              }
            />
          </Form.Group>
          <Row className="mb-3">
            <Form.Group as={Col}>
              <Form.Label>Altura</Form.Label>
              <Form.Control
                type="text"
                value={produtoEdit.altura}
                onChange={(e) =>
                  setProdutoEdit({ ...produtoEdit, altura: e.target.value })
                }
              />
            </Form.Group>

            <Form.Group as={Col}>
              <Form.Label>Largura</Form.Label>
              <Form.Control
                type="text"
                value={produtoEdit.largura}
                onChange={(e) =>
                  setProdutoEdit({ ...produtoEdit, largura: e.target.value })
                }
              />
            </Form.Group>

            <Form.Group as={Col}>
              <Form.Label>Comprimento</Form.Label>
              <Form.Control
                type="text"
                value={produtoEdit.comprimento}
                onChange={(e) =>
                  setProdutoEdit({
                    ...produtoEdit,
                    comprimento: e.target.value,
                  })
                }
              />
            </Form.Group>
          </Row>
          {/* <Form.Group as={Col}>
            <Form.Label>Cubagem</Form.Label>
            <Form.Control
              type="text"
              value={produtoEdit.codigo}
              onChange={(e) =>
                setProdutoEdit({ ...produtoEdit, codigo: e.target.value })
              }
            />
          </Form.Group> */}

          <Form.Group as={Col}>
            <Form.Label>Pacote</Form.Label>
            <Form.Control
              type="text"
              value={produtoEdit.pacote}
              onChange={(e) =>
                setProdutoEdit({ ...produtoEdit, pacote: e.target.value })
              }
            />
          </Form.Group>
          <Form.Group as={Col}>
            <Form.Label>Caixa</Form.Label>
            <Form.Control
              type="text"
              value={produtoEdit.caixa}
              onChange={(e) =>
                setProdutoEdit({ ...produtoEdit, caixa: e.target.value })
              }
            />
          </Form.Group>

          <Stack gap={3} direction="horizontal">
            <Button variant="primary" onClick={atualizar}>
              Alterar
            </Button>
            <Button variant="danger" onClick={deletar}>
              Deletar
            </Button>
          </Stack>
        </Form>
      </Row>
    </Container>
  );
}

export default Produtos;
