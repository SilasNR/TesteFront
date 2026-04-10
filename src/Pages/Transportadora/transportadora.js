import { Row, Col, Container } from "react-bootstrap";
import { useEffect, useState, useCallback } from "react";

import Filtro from "../../Componentes/Filto/Filtro"
import Lista from "../../Componentes/Lista/Lista";
import { createTransportadora, getTransportadora } from "../../service/transportadora.service";

function Transportadora() {

  const [resposta, setResposta] = useState("");
  const [transportadoras, setTransportadoras] = useState([]);

  const carregarDados = useCallback(async () => {
    setResposta(""); // Limpa erro anterior
    try {
      // Carrega ambos em paralelo para ganhar tempo
      const [dataTransportadora] = await Promise.all([getTransportadora()]);

      if (Array.isArray(dataTransportadora) && dataTransportadora.length > 0) {
        setTransportadoras(dataTransportadora);
      } else {
        setResposta("Nenhuma transportadora encontrada.");
      }
    } catch (error) {
      console.error("Erro ao carregar dados:", error);
      setResposta("Erro ao conectar com o servidor.");
    }
  }, []);

  useEffect(() => {
    carregarDados();
  }, [carregarDados]);

  const titulos = [
    "Transportadora",
    "CNPJ",
    ""
  ];
  const campos = [
    "nome",
    "cnpj",
    ""
  ];

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
    <>
      <Container fluid className="vh-100">
        <Col>
          <h1>Transportadora</h1>
        </Col>
        <Col>
          <Filtro
            tela="pedido"
            textoBusca="Digite o nome da Transportadora"
            filtros={filtros}
          />

          <Lista
            valores={transportadoras}
            titulos={titulos}
            campos={campos}
            resposta={resposta}
            aoClicar={() => { }}
            deletar={(e) => {
            }}
          />
        </Col>
      </Container>
    </>
  );
}

export default Transportadora;
