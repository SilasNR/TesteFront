import { Row, Col, Form, Dropdown, Button, Container } from "react-bootstrap";
import "../../Pages/Principal/Principal.css";
import "./Filtro.css";

function Filtro(param) {
  return (
    <Container fluid className="mb-3">
      <Row className="barra d-flex align-items-center">
        <Col className="d-flex align-items-center gap-2">
          <span> Filtro: </span>
          <Form.Control
            className="txt"
            type="text"
            placeholder="numero, cliente"
            value={param.termoBusca} // Você deve passar isso via props do componente pai
            onChange={(e) => param.aoFiltrar(e.target.value)} // E uma função para atualizar
          />
          <i class="bi bi-arrow-clockwise"></i>
        </Col>
        <Col xs lg="2">
          {param.tela === "produto" ? (
            <Dropdown>
              <Dropdown.Toggle variant="success" id="dropdown-basic">
                <i class="bi bi-funnel"> Filto</i>
              </Dropdown.Toggle>

              <Dropdown.Menu>
                <Dropdown.Item>
                  <i class="bi bi-arrow-up-short"> Crescente</i>
                </Dropdown.Item>
                <Dropdown.Item href="#/action-1">
                  <i class="bi bi-arrow-down-short"> Decrecente</i>
                </Dropdown.Item>
                {/* <Dropdown.Item href="#/action-1">
                                    <i class="bi bi-calendar-event">  Data de Modificação</i>
                                </Dropdown.Item>
                                <Dropdown.Item href="#/action-1">
                                    <i class="bi bi-arrow-up-short">  Crescente</i>
                                </Dropdown.Item> */}
              </Dropdown.Menu>
            </Dropdown>
          ) : param.tela != "produto" ? (
            // <Dropdown>
            //     <Dropdown.Toggle variant="success" id="dropdown-basic">
            //         <i class="bi bi-tools"></i>
            //     </Dropdown.Toggle>

            //     {/* <Dropdown.Menu>
            //         <Dropdown.Item href="#/action-1" onClick={() => {
            //             param.mudarModal()
            //         }}>
            //             <i class="bi bi-plus-circle-dotted">  Criar Pedido</i>
            //         </Dropdown.Item>
            //         <Dropdown.Item href="#/action-2"><i class="bi bi-pencil-fill">  Alterar</i>   </Dropdown.Item>
            //     </Dropdown.Menu> */}
            // </Dropdown>
            <Button
              onClick={() => {
                param.mudarModal();
              }}
            >
              Novo {param.tela}
            </Button>
          ) : param.tela === "danificados" ? (
            <Dropdown>
              <Dropdown.Toggle variant="success" id="dropdown-basic">
                <i class="bi bi-funnel"> Filto</i>
              </Dropdown.Toggle>

              <Dropdown.Menu>
                <Dropdown.Item>
                  <i class="bi bi-arrow-up-short"> Crescente</i>
                </Dropdown.Item>
                <Dropdown.Item href="#/action-1">
                  <i class="bi bi-arrow-down-short"> Decrecente</i>
                </Dropdown.Item>
                {/* <Dropdown.Item href="#/action-1">
                                    <i class="bi bi-calendar-event">  Data de Modificação</i>
                                </Dropdown.Item>
                                <Dropdown.Item href="#/action-1">
                                    <i class="bi bi-arrow-up-short">  Crescente</i>
                                </Dropdown.Item> */}
              </Dropdown.Menu>
            </Dropdown>
          ) : (
            ""
          )}
        </Col>
      </Row>
    </Container>
  );
}

export default Filtro;
