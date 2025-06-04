import { Row, Col, Container } from 'react-bootstrap';
import Navegacao from '../Painel/Componentes/Navegacao/Navegacao.js'

function Usuarios() {
    return (
        <>
            <Container fluid className='vh-100'>
                <Row className='px-0'>
                    <Navegacao />
                    <Col>
                        <h1>Usuarios</h1>
                    </Col>
                </Row>
            </Container >
        </>
    )
}

export default Usuarios;