import "./SuperiorNavegacao.css";
import { Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';

function SuperiorNavegacao(){


    return(
        <>
            <Row>
                <Col className="SupBtn" ><Link to="/Painel/Estoque"><h1>Estoque</h1></Link></Col>
                <Col className="SupBtn" ><Link to="/Painel/Pedido"><h1>Pedidos</h1></Link></Col>
                <Col className="SupBtn" ><h1>Danificados</h1></Col>
                <Col className="SupBtn" ><h1>Devoluções</h1></Col>
            </Row>
        </>
    )
}

export default SuperiorNavegacao;