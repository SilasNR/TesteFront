import { Row, Col, Container } from 'react-bootstrap';
import Navegacao from '../Painel/Componentes/Navegacao/Navegacao.js'



function Ajuda() {
    return (
        <>
            <Container fluid className='vh-100'>
                <Row className='px-0'>
                    <Navegacao />
                    <Col>
                        <h1>Ajuda</h1>
                    </Col>
                </Row>
            </Container >
        </>
    )
}

export default Ajuda;