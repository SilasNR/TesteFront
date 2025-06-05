import { Row, Col, Form, Button } from 'react-bootstrap';
import '../../Principal.css'
import './Filtro.css'

function Filtro() {

    return (
        <>
            <Row className='barra m-0 mb-2 d-flex align-items-center' >
                <Col className="d-flex align-items-center gap-2">
                    <span> Filtro: </span><Form.Control className="txt" type="text" placeholder="numero, cliente" />
                </Col>
                <Col xs lg="1">
                    <Button variant="danger">Excluir</Button>
                </Col>
                <Col xs lg="1" >
                    <Button variant="success">Novo</Button>
                </Col>
            </Row>
        </>
    );
}

export default Filtro;