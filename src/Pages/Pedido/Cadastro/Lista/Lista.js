import "./Lista.css";
import { Row, Col, Container, Spinner, Stack } from "react-bootstrap";

function Lista({
  valores = [],
  titulos = [],
  campos = [],
  resposta = "",
  aoClicar,
}) {
  // Renderização de Estados de Vazio/Carregamento
  if (valores.length === 0) {
    return (
      <Container fluid className="d-flex justify-content-center p-5">
        {resposta === "" ? (
          <Spinner animation="border" variant="primary" />
        ) : (
          <p className="text-muted">{resposta}</p>
        )}
      </Container>
    );
  }

  return (
    <Container fluid className="px-3">
      {/* Cabeçalho: m-0 e gx-0 impedem o estouro da largura */}
      <Row className="titulos m-0 gx-0 align-items-center">
        {titulos.map((titulo, index) => (
          <Col
            key={`tit-${index}`}
            lg={campos[index] === "" ? 1 : undefined}
            className="py-2 px-3"
          >
            {titulo}
          </Col>
        ))}
      </Row>

      {/* Listagem */}
      <div className="lista-scroll border border-top-0 rounded-bottom">
        {valores.map((valor, vIndex) => (
          <Row
            key={valor.id || vIndex}
            className="linha m-0 gx-0 align-items-center border-bottom"
            onClick={() => aoClicar(vIndex)}
          >
            {campos.map((campo, cIndex) => (
              <Col
                key={`cel-${vIndex}-${cIndex}`}
                className="celula py-2 px-3"
                lg={campo === "" ? 1 : undefined}
              >
                {campo === "" ? (
                  <Stack
                    direction="horizontal"
                    className="justify-content-center"
                  >
                    <i className="bi bi-pencil-square text-primary"></i>
                  </Stack>
                ) : (
                  <p className="m-0 text-truncate">
                    {/* Lógica de divisão apenas para índices maiores que 2 */}
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
