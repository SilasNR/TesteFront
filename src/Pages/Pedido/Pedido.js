import { useEffect, useState, useCallback } from "react";
import { Col } from "react-bootstrap";
import { getPedidos } from "../../service/pedido.service.js";
import Filtro from "../../Componentes/Filto/Filtro.js";
import Lista from "../../Componentes/Lista/Lista.js";

function Pedido() {
  const [pedidos, setPedidos] = useState([]);
  const [resposta, setResposta] = useState("");

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
    " ",
  ];
  const campos = [
    "numero",
    "cliente",
    "cnpj",
    "uf",
    "volume",
    "transportadora",
    "frete",
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

  return (
    <Col className="p-0">
      <h1>Controle de Pedidos</h1>
      {/* Passamos handleNovoPedido em vez de apenas abrir o modal */}
      <Filtro tela="pedido" />

      <Lista
        valores={pedidos}
        titulos={titulos}
        campos={campos}
        resposta={resposta}
        aoClicar={() => {}}
      />
    </Col>
  );
}

export default Pedido;
