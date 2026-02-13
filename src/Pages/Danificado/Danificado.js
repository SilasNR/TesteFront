import Lista from "../../Componentes/Lista/Lista.js";
import { useState } from "react";

function Danificado() {
  const [v] = useState([]);

  return (
    <>
      <Lista resposta="" valores={v} />
    </>
  );
}

export default Danificado;
