import { useEffect, useState, useCallback } from "react"; // Adicionei useCallback
import { Col } from "react-bootstrap";
import { getPedidos } from "../../../../service/pedido.service.js";
import { getProdutos } from "../../../../service/produto.service.js";
import Filtro from "../Filto/Filtro.js";
import Lista from "../Lista/Lista.js";
import CadPedido from "./Cadastro/Cadastrar.js";

function Pedido() {
  const [modalShow, setModalShow] = useState(false);
  const [pedidos, setPedidos] = useState([]);
  const [produtos, setProdutos] = useState([]);
  const [resposta, setResposta] = useState("");
  const [pedido, setPedido] = useState();
  const [alterar, setAlterar] = useState(false);
  const [titulos] = useState(["Numero", "Cliente"]);
  const [campos] = useState(["numero", "cliente"]);

  const mudarModal = () => setModalShow(true);

  // Usei useCallback para o React não reclamar da dependência no useEffect
  const carregarPedidos = useCallback(async () => {
    let encontrado = false;
    let tentativas = 0;
    const maxTentativas = 5;
    while (!encontrado && tentativas < maxTentativas) {
      tentativas++;
      const data = await getPedidos();
      if (Array.isArray(data) && data.length > 0) {
        encontrado = true;
        setPedidos(data);
      } else {
        await new Promise((resolve) => setTimeout(resolve, 1000));
      }
    }
    if (tentativas === 5) setResposta("Nada");
  }, []);

  const carregarProdutos = useCallback(async () => {
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
      }
    }
  }, []);

  useEffect(() => {
    carregarPedidos();
    carregarProdutos();
  }, [carregarPedidos, carregarProdutos]); // Agora o build aceita

  const abrirPedido = (index) => {
    const pedidoSelecionado = pedidos[index];
    setPedido(pedidoSelecionado);
    setAlterar(true);
    mudarModal();
  };

  return (
    <Col>
      <Filtro mudarModal={mudarModal} tela="pedido" />
      <Lista
        valores={pedidos}
        titulos={titulos}
        campos={campos}
        resposta={resposta}
        funcao="sim"
        aoClicar={abrirPedido}
      />
      <CadPedido
        show={modalShow}
        onHide={() => setModalShow(false)}
        buscar={carregarPedidos}
        pedido={pedido}
        alterar={alterar}
        produtos={produtos}
      />
    </Col>
  );
}

export default Pedido;