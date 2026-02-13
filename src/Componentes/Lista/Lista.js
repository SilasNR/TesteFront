import "./Lista.css";
import { Row, Col, Form, Container, Spinner } from "react-bootstrap";

function Lista({
  valores = [],
  titulos = [],
  campos = [],
  resposta = "",
  aoClicar,
  mudarCheckbox,
}) {
  if (valores.length === 0) {
    return (
      <Container fluid className="d-flex justify-content-center p-5">
        {resposta === "" ? (
          <Spinner animation="border" variant="primary" />
        ) : (
          <p>{resposta}</p>
        )}
      </Container>
    );
  }

  return (
    /* g-0 no Container e m-0 nas Rows removem as margens que causam scroll X */
    <Container fluid className="px-2">
      {/* Cabeçalho */}
      <Row className="bg-light fw-bold border-bottom m-0">
        {titulos.map((titulo, index) => (
          <Col
            key={`tit-${index}`}
            lg={campos[index] === "" ? 1 : undefined}
            className="py-2"
          >
            {titulo}
          </Col>
        ))}
      </Row>

      {/* Corpo da Lista */}
      <div className="lista-body">
        {valores.map((valor, vIndex) => (
          <Row
            key={valor.id || vIndex}
            /* m-0 é essencial aqui para não vazar da tela */
            className="linha align-items-center border-bottom m-0"
            onClick={() => aoClicar(vIndex)}
            style={{ cursor: "pointer" }}
          >
            {campos.map((campo, cIndex) => (
              <Col
                key={`cel-${vIndex}-${cIndex}`}
                className="celula py-2"
                lg={campo === "" ? 1 : undefined}
              >
                {campo === "" ? (
                  <Form.Check
                    type="checkbox"
                    checked={valor.selecionado}
                    onChange={(e) => mudarCheckbox(e, valor.id)}
                    onClick={(e) => e.stopPropagation()}
                  />
                ) : (
                  <p className="m-0 text-truncate">
                    {/* text-truncate impede que nomes longos estiquem a coluna */}
                    {cIndex > 2 ? valor[campo] / 10 : valor[campo]}
                  </p>
                )}
              </Col>
            ))}
          </Row>
        ))}
      </div>
    </Container>
  );
}

export default Lista;
