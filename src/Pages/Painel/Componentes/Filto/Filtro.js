import { Row, Col, Form, Dropdown } from 'react-bootstrap';
import '../../Principal.css'
import './Filtro.css'


function Filtro(param) {

    return (
        <>

            <Row className='barra m-0 mb-2 d-flex align-items-center' >
                <Col className="d-flex align-items-center gap-2">
                    <span> Filtro: </span><Form.Control className="txt" type="text" placeholder="numero, cliente" />
                </Col>
                <Col xs lg="1">
                    <Dropdown>
                        <Dropdown.Toggle variant="success" id="dropdown-basic">
                            <i class="bi bi-tools"></i>
                        </Dropdown.Toggle>

                        <Dropdown.Menu>
                            <Dropdown.Item href="#/action-1" onClick={() => {
                                param.mudarModal()
                            }}>
                                <i class="bi bi-plus-circle-dotted">  Criar Produto</i>
                            </Dropdown.Item>
                            <Dropdown.Item href="#/action-2"><i class="bi bi-pencil-fill"></i>  Alterar </Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown>
                </Col>
                {/* <Col xs lg="1" >
                    <Button variant="success" onClick={param.mudarModal}>Novo</Button>
                </Col> */}
            </Row>
        </>
    );
}

export default Filtro;