import { useEffect, useState } from 'react';
import { Col } from 'react-bootstrap';
import { getPedidos } from '../../../../service/pedido.service';
import { getProdutos } from '../../../../service/produto.service.js';
import Filtro from '../Filto/Filtro.js';
import Lista from '../Lista/Lista.js';
import CadPedido from './Cadastro/Cadastrar.js'

function Pedido() {
    const [modalShow, setModalShow] = useState(false);

    const mudarModal = () => {
        setModalShow(true);
    }
    const [pedidos, setPedidos] = useState([]);
    const [resposta, setResposta] = useState("");

    const busacarAteEncontrar = async () => { /////////////////////////////////////Busca os Pedidos
        let encontrado = false;
        let tentativas = 0;
        const maxTentativas = 3;
        while (!encontrado && tentativas < maxTentativas) {
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
            setResposta("Nenhum pedido encontrado");
        }
    }
    useEffect(() => {
        busacarAteEncontrar();
    }, []);

    const [titulos] = useState([
        "Numero",
        "Cliente"
    ]);

    const [campos] = useState([
        "numero",
        "cliente"
    ]);

    const [pedido, setPedido] = useState();
    const [alterar, setAlterar] = useState(false);

    const abrirPedido = (index) => {
        const pedidoSelecionado = pedidos[index];
        setPedido(pedidoSelecionado);
        setAlterar(true);
        mudarModal();
    }

    const [produtos, setProdutos] = useState([]);

    const buscarAteEncontrar = async () => {////////////////////////////////////////////////////////////////Busca produtos no banco
        let encontrado = false;
        let tentativas = 0;
        const maxTentativas = 3;
        while (!encontrado && tentativas < maxTentativas) {
            tentativas++;
            const data = await getProdutos();
            if (Array.isArray(data) && data.length > 0) {
                setProdutos(data);
                console.log(produtos);

                console.log("Encontrado");
                encontrado = true;
            } else {
                await new Promise(resolve => setTimeout(resolve, 2000)); // espera 2 segundos 
                console.log("Buscando Produtos...");
            }
        }
    };

    useEffect(() => {////////////////////////////////////////////////////////////////Busca produtos no banco
        buscarAteEncontrar();
    }, []);



    return (
        <Col>
            <Filtro mudarModal={mudarModal} tela="pedido" />
            <Lista valores={pedidos} titulos={titulos} campos={campos} resposta={resposta} funcao="sim" aoClicar={abrirPedido} />
            <CadPedido
                show={modalShow}
                onHide={() => setModalShow(false)}
                buscar={busacarAteEncontrar}
                pedido={pedido}
                alterar={alterar}
                produtos={produtos}
            />
        </Col>
    )
}

export default Pedido;