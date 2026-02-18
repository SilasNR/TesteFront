import Lista from "./Lista/Lista.js";
import { useEffect, useState } from "react";
import { getProdutos } from "../../service/produto.service.js";
import Filtro from "../../Componentes/Filto/Filtro.js";

function Estoque() {
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

  const [titulos] = useState([
    "Código",
    "Estoque Frente",
    "Estoque Fundo",
    "Total de Peças",
  ]);

  const [campos] = useState(["codigo", "quantidade", "caixa", "total"]);

  const aoClicar = () => {};

  return (
    <>
      <Filtro /*mudarModal={mudarModal}*/ tela="Produto" />
      <Lista
        valores={produtos}
        titulos={titulos}
        campos={campos}
        aoClicar={aoClicar}
        resposta="Não há produtos em estoque"
      />
    </>
  );
}

export default Estoque;
