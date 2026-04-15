import { Row, Col, Form, Dropdown, Button, Container } from "react-bootstrap";
import "../../Pages/Principal/Principal.css";
import Nav from "react-bootstrap/Nav";
import "./Filtro.css";

function Filtro({termoBusca, textoBusca, aoFiltrar, filtros, caminho }) {
  return (
    <Container fluid className="mb-3">
      <Row className="barra d-flex align-items-center">
        <Col className="d-flex align-items-center gap-2">
          <span> Filtro: </span>
          <Form.Control
            className="txt"
            type="text"
            placeholder={textoBusca}
            value={termoBusca} // Você deve passar isso via props do componente pai
            onChange={(e) => aoFiltrar(e.target.value)} // E uma função para atualizar
          />
          <i class="bi bi-arrow-clockwise"></i>
        </Col>

        <Col xs lg="2">
          <Row>
            <Col>
              <Nav.Link href={caminho}>
                <Button className="novo">Novo</Button>
              </Nav.Link>
            </Col>
            <Col>
              <Dropdown>
                <Dropdown.Toggle variant="success" id="dropdown-basic">
                  <i class="bi bi-funnel"></i>
                </Dropdown.Toggle>

                <Dropdown.Menu>
                  {filtros.map((filtro) => (
                    <Dropdown.Item >
                      <i class={filtro.icone}> {filtro.nome}</i>
                    </Dropdown.Item>
                  ))}
                </Dropdown.Menu>
              </Dropdown>
            </Col>
          </Row>
        </Col>
      </Row>
    </Container>
  );
}

export default Filtro;
