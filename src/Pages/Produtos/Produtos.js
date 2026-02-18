import { Container } from "react-bootstrap";
import { useState, useEffect } from "react";
import "./Produtos.css";
import Lista from "./Lista/Lista.js";
import Filtro from "../../Componentes/Filto/Filtro.js";

import { getProdutos } from "../../service/produto.service.js";

function Produtos() {
  //Lista de Produtos
  const [produtos, setProdutos] = useState([]);

  useEffect(() => {
    const buscarAteEncontrar = async () => {
      let encontrado = false;

      while (!encontrado) {
        const data = await getProdutos();

        if (Array.isArray(data) && data.length > 0) {
          setProdutos(data);
          console.log("Encontrado");
          encontrado = true;
        } else {
          console.log("Buscando...");
          await new Promise((resolve) => setTimeout(resolve, 2000)); // espera 2 segundos
        }
      }
    };

    buscarAteEncontrar();
  }, []);

  const [titulos] = useState(["Código"]);

  const [campos] = useState(["codigo"]);

  const aoClicar = () => {};

  return (
    <Container>
      <Filtro
        /*mudarModal={mudarModal}*/ tela="Produto"
        link="/Painel/Produto/CadastroProd"
      />
      <Lista
        valores={produtos}
        titulos={titulos}
        campos={campos}
        aoClicar={aoClicar}
        resposta="Não há produtos em estoque"
      />
      {/* SEÇÃO: CADASTRO */}
    </Container>
  );
}

export default Produtos;
