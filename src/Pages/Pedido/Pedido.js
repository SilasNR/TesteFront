import { useEffect, useState, useCallback } from "react";
import { Col } from "react-bootstrap";
import { getPedidos } from "../../service/pedido.service.js";
import { getProdutos } from "../../service/produto.service.js";
import Filtro from "../../Componentes/Filto/Filtro.js";
import Lista from "../../Componentes/Lista/Lista.js";
import CadPedido from "./Cadastro/Cadastrar.js";

function Pedido() {
  const [modalShow, setModalShow] = useState(false);
  const [pedidos, setPedidos] = useState([]);
  const [produtos, setProdutos] = useState([]);
  const [resposta, setResposta] = useState("");
  const [pedidoSelecionado, setPedidoSelecionado] = useState(null);
  const [isAlterar, setIsAlterar] = useState(false);

  // Configuração fixa da tabela (não precisa ser estado se não muda)
  const titulos = [
    "Número",
    "Cliente",
    "CNPJ",
    "Cidade - UF",
    "Volume",
    "Transportadora",
    "Frete",
    "Finalizado",
  ];
  const campos = ["numero", "cliente"];

  // Abrir para criação
  const handleNovoPedido = () => {
    setPedidoSelecionado(null);
    setIsAlterar(false);
    setModalShow(true);
  };

  // Abrir para edição
  const handleAbrirPedido = (index) => {
    setPedidoSelecionado(pedidos[index]);
    setIsAlterar(true);
    setModalShow(true);
  };

  const carregarDados = useCallback(async () => {
    setResposta(""); // Limpa erro anterior
    try {
      // Carrega ambos em paralelo para ganhar tempo
      const [dataPedidos, dataProdutos] = await Promise.all([
        getPedidos(),
        getProdutos(),
      ]);

      if (Array.isArray(dataPedidos) && dataPedidos.length > 0) {
        setPedidos(dataPedidos);
      } else {
        setResposta("Nenhum pedido encontrado.");
      }

      if (Array.isArray(dataProdutos)) {
        setProdutos(dataProdutos);
      }
    } catch (error) {
      console.error("Erro ao carregar dados:", error);
      setResposta("Erro ao conectar com o servidor.");
    }
  }, []);

  useEffect(() => {
    carregarDados();
  }, [carregarDados]);

  return (
    <Col className="p-0">
      {/* Passamos handleNovoPedido em vez de apenas abrir o modal */}
      <Filtro mudarModal={handleNovoPedido} tela="pedido" />

      <Lista
        valores={pedidos}
        titulos={titulos}
        campos={campos}
        resposta={resposta}
        aoClicar={handleAbrirPedido}
      />

      <CadPedido
        show={modalShow}
        onHide={() => setModalShow(false)}
        buscar={carregarDados} // Recarrega a lista após salvar
        pedido={pedidoSelecionado}
        alterar={isAlterar}
        produtos={produtos}
      />
    </Col>
  );
}

export default Pedido;
