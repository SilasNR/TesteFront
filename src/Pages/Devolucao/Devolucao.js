import Lista from "../../Componentes/Lista/Lista.js";
import { useState } from "react";

function Devolucao() {
  const [v] = useState([]);

  return (
    <>
      <Lista resposta="" valores={v} />
    </>
  );
}

export default Devolucao;
