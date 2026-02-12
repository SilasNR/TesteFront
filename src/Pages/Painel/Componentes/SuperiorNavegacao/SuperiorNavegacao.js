import "./SuperiorNavegacao.css";
import { Row, Col, Container } from 'react-bootstrap';
import { Link, useLocation } from 'react-router-dom';

function SuperiorNavegacao() {
    const location = useLocation();
    const path = location.pathname;
    const partes = path.split('/');
    const ultimo = partes.pop() || partes.pop();

    return (
        <Container fluid>
            <Row className="TodosSupBtn">
                <Link to="/Painel/Estoque"><Col className={ultimo === "Estoque" ? "SupBtn ativo" : "SupBtn"}><span>Estoque</span></Col></Link>
                <Link to="/Painel/Pedido" ><Col className={ultimo === "Pedido" ? "SupBtn ativo" : "SupBtn"}><span>Pedidos</span></Col></Link>
                <Link to="/Painel/Danificado" ><Col className={ultimo === "Danificado" ? "SupBtn ativo" : "SupBtn"}><span>Danificados</span></Col></Link>
                <Link to="/Painel/Devolucao" ><Col className={ultimo === "Devolucao" ? "SupBtn ativo" : "SupBtn"}><span>Devoluções</span></Col></Link>
                <Link to="/Painel/Produto" ><Col className={ultimo === "Produto" ? "SupBtn ativo" : "SupBtn"}><span>Produto</span></Col></Link>
                <Link to="/Painel/Frete" ><Col className={ultimo === "Fretes" ? "SupBtn ativo" : "SupBtn"}><span>Fretes</span></Col></Link>
                <Col md={1}>
                    <Row>
                        <Link to="/Painel/Configuracoes"><Col className={ultimo === "Configuracoes" ? "HelpBtn ativo" : "HelpBtn"}><span className={ultimo === "Configuracoes" ? "ativo" : ""}><i class="bi bi-gear"></i></span></Col></Link>
                    </Row>
                    <Row>
                        <Col className={ultimo === "Ajuda" ? "HelpBtn ativo" : "HelpBtn"}><Link to="/Painel/Ajuda" className={ultimo === "Ajuda" ? "ativo" : ""}><span><i class="bi bi-question-lg"></i></span></Link></Col>
                    </Row>
                </Col>
            </Row>
        </Container>
    )
}

export default SuperiorNavegacao;