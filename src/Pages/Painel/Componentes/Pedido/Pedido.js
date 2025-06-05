import { useEffect, useState } from 'react';
import { Col } from 'react-bootstrap'
import { getPedidos } from '../../../../service/pedido.service';
import Filtro from '../Filto/Filtro.js'
import Lista from '../Lista/Lista.js';


function Pedido() {
    const [pedidos, setPedidos] = useState([]);
    const [resposta, setResposta] = useState("");

    useEffect(() => {
        const busacarAteEncontrar = async () => {
            let encontrado = false;
            let tentativas = 0;
            const maxTentativas = 5;
            while (!encontrado || tentativas < maxTentativas) {
                tentativas++;
                const data = await getPedidos();

                if (Array.isArray(data) && data.length > 0) {
                    encontrado = true;
                    setPedidos(data);
                } else {
                    await new Promise(resolve => setTimeout(resolve, 1000)); // espera para chamar novamente 2 segundos
                }
            }
            if (tentativas === 5) {
                setResposta("Nada");
            }
        }

        busacarAteEncontrar();
    }, []);

    const [titulos] = useState([
        "",
        "Numero",
        "Cliente"
    ]);

    const [campos] = useState([
        "",
        "numero",
        "cliente"
    ]);


    return (
        <Col>

            <Filtro />
            <Lista valores={pedidos} titulos={titulos} campos={campos} resposta={resposta} />
        </Col>
    )
}

export default Pedido;