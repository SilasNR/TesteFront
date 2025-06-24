import { Col } from 'react-bootstrap';
import { useLocation } from 'react-router-dom';
import "./Navegacao.css";
import Botao from './Botao';

function Navegacao() {
    const location = useLocation();
    const path = location.pathname;
    const partes = path.split('/');
    const ativo = partes[1]; // <-- pega 'Painel'

    const getStyle = (nome) => {
        return ativo === nome ? "ativo"  : "";
    };

    return (
        <Col sm={2} className='menu vh-100'>
            <h2>CN BR Sistem</h2>

            <Botao titulo="Painel" ativo={getStyle("Painel")} />
            <Botao titulo="Produtos" ativo={getStyle("Produtos")} />
        </Col>
    );
}

export default Navegacao;
