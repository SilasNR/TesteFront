import "./SuperiorNavegacao.css";
import { Row, Col } from 'react-bootstrap';
import { Link, useLocation } from 'react-router-dom';

function SuperiorNavegacao() {
    const location = useLocation();
    const path = location.pathname;
    const partes = path.split('/');
    const ultimo = partes.pop() || partes.pop();

    return (
        <>
            <Row className="TodosSupBtn">
                <Col className={ultimo === "Estoque" ? "SupBtn ativo" : "SupBtn"}><Link to="/Painel/Estoque" className={ultimo === "Estoque" ? "ativo" : ""}><h1>Estoque</h1></Link></Col>
                <Col className={ultimo === "Pedido" ? "SupBtn ativo" : "SupBtn"}><Link to="/Painel/Pedido"className={ultimo === "Pedido" ? "ativo" : ""}><h1>Pedidos</h1></Link></Col>
                <Col className={ultimo === "Danificado" ? "SupBtn ativo" : "SupBtn"}><Link to="/Painel/Danificado" className={ultimo === "Danificado" ? "ativo" : ""}><h1>Danificados</h1></Link></Col>
                <Col className={ultimo === "Devolucao" ? "SupBtn ativo" : "SupBtn"}><Link to="/Painel/Devolucao" className={ultimo === "Devolucao" ? "ativo" : ""}><h1>Devoluções</h1></Link></Col>
            </Row>
        </>
    )
}

export default SuperiorNavegacao;