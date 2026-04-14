import "./Lista.css";

import { Row, Col, Dropdown, Container, Spinner } from "react-bootstrap";

function Lista({
  valores = [],
  titulos = [],
  campos = [],
  resposta = "",
  aoClicar,
  deletar,
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
    <Container fluid className="px-2 mh-3">
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
                  <Dropdown>
                    <Dropdown.Toggle
                      variant="outline-secondary"
                      id="dropdown-basic"
                    >
                      <i
                        class="bi bi-three-dots-vertical"
                        variant="outline-secondary"
                      ></i>
                    </Dropdown.Toggle>

                    <Dropdown.Menu>
                      <Dropdown.Item
                        href="#/action-1"
                        onClick={() => {
                          deletar(vIndex);
                        }}
                      >
                        Excluir
                      </Dropdown.Item>
                    </Dropdown.Menu>
                  </Dropdown>
                ) : (
                  <p className="m-0 text-truncate">
                    {/* text-truncate impede que nomes longos estiquem a coluna */}
                    {cIndex > 2 ? valor[campo] / 10 : valor[campo]}
                    {/* {(() => {
                      const conteudo = valor[campo];

                      // 1. Se for a lista (Array) de estados
                      if (Array.isArray(conteudo)) {
                        return conteudo.map(e => e.Nome || e.nome).join(", ");
                      }

                      // 2. Se for um objeto único de estado (caso não seja array)
                      if (typeof conteudo === 'object' && conteudo !== null) {
                        return conteudo.Nome || conteudo.nome || "";
                      }

                      // 3. Lógica que você já tinha para números/strings
                      return cIndex > 2 ? conteudo / 10 : conteudo;
                    })()} */}
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
