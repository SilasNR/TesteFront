import { useEffect, useState, useCallback } from "react";
import { Col } from "react-bootstrap";
import { getPedidos, deletePedido } from "../../service/pedido.service.js";
import Filtro from "../../Componentes/Filto/Filtro.js";
import Lista from "../../Componentes/Lista/Lista.js";
import Confirmacao from "./Confirmacao.js";

function Pedido() {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);

  const [pedidoParaDelete, setPedidoParaDeletar] = useState("");

  const [pedidos, setPedidos] = useState([]);
  const [resposta, setResposta] = useState("");

  // Configuração fixa da tabela (não precisa ser estado se não muda)
  const titulos = [
    "Número",
    "Cliente",
    "CNPJ",
    "Cidade - UF",
    "Volume",
    "Status",
    "",
  ];
  const campos = [
    "numero",
    "cliente",
    "cnpj",
    "municipio",
    "volume",
    "status",
    "",
  ];

  const carregarDados = useCallback(async () => {
    setResposta(""); // Limpa erro anterior
    try {
      // Carrega ambos em paralelo para ganhar tempo
      const [dataPedidos] = await Promise.all([getPedidos()]);

      if (Array.isArray(dataPedidos) && dataPedidos.length > 0) {
        setPedidos(dataPedidos);
      } else {
        setResposta("Nenhum pedido encontrado.");
      }
    } catch (error) {
      console.error("Erro ao carregar dados:", error);
      setResposta("Erro ao conectar com o servidor.");
    }
  }, []);

  useEffect(() => {
    carregarDados();
  }, [carregarDados]);

  const deletarPedido = (id) => {
    console.log("Clicou no - " + id);
    console.log("Deletar - " + pedidos[id].id);
    deletePedido(pedidos[id].id);
    carregarDados();
  };

  const filtos = [
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
    <Col className="p-0">
      <h1>Controle de Pedidos</h1>
      {/* Passamos handleNovoPedido em vez de apenas abrir o modal */}
      <Filtro
        tela="pedido"
        textoBusca="Digite o número do pedido, nome do Cliente"
        filtros={filtos}
        caminho="/Painel/CadastroPedido"
      />

        <Lista
          valores={pedidos}
          titulos={titulos}
          campos={campos}
          resposta={resposta}
          aoClicar={() => { }}
          deletar={(e) => {
            setShow(true);
            setPedidoParaDeletar(e);
          }}
        />

      <Confirmacao
        titulo={`Deletar ${pedidos[pedidoParaDelete]?.numero}`}
        show={show}
        handleClose={handleClose}
        texto={`Deseja deletar o pedido Número: ${pedidos[pedidoParaDelete]?.numero} \n
              Cliente: ${pedidos[pedidoParaDelete]?.cliente}
        `}
        deletarM={() => {
          deletarPedido(pedidoParaDelete);
        }}
      />
    </Col>
  );
}

export default Pedido;
