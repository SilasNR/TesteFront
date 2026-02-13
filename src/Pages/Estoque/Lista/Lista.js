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
  // Função auxiliar para calcular caixas
  const calcularCaixas = (quantidade, porCaixa) =>
    Math.floor(quantidade / porCaixa);

  // Se estiver carregando (sem valores e sem resposta de erro)
  if (valores.length === 0 && resposta === "") {
    return (
      <div className="d-flex justify-content-center align-items-center p-5">
        <Spinner animation="border" variant="primary" />
      </div>
    );
  }

  // Se não houver valores mas houver uma resposta (ex: "Nenhum item encontrado")
  if (valores.length === 0) {
    return (
      <Col className="text-center p-5">
        <p>{resposta}</p>
      </Col>
    );
  }

  return (
    <Container fluid className="p-0">
      {/* Cabeçalho da Lista */}
      <Row className="titulos m-0 py-2 fw-bold border-bottom">
        {titulos.map((titulo, idx) => (
          <Col key={`h-${idx}`} lg={campos[idx] === "" ? 1 : undefined}>
            {titulo}
          </Col>
        ))}
      </Row>

      {/* Corpo da Lista */}
      <div
        className="lista-scroll"
        style={{ maxHeight: "70vh", overflowY: "auto" }}
      >
        {valores.map((valor, linhaIdx) => (
          <Row
            key={valor.id || linhaIdx}
            className="linha m-0 py-1 align-items-center border-bottom"
            onClick={() => aoClicar(linhaIdx)}
          >
            {campos.map((campo, colIdx) => {
              // Definimos a largura da coluna
              const colSize = campo === "" ? 1 : undefined;

              return (
                <Col key={`c-${colIdx}`} lg={colSize} className="celula">
                  {/* Lógica de Renderização da Célula */}
                  {(() => {
                    if (campo === "") {
                      return (
                        <Form.Check
                          type="checkbox"
                          value={valor.id}
                          onChange={mudarCheckbox}
                          onClick={(e) => e.stopPropagation()}
                        />
                      );
                    }

                    if (campo === "codigo") {
                      return (
                        <span>
                          CN{valor[campo]}
                          {valor.observacao ? `-${valor.observacao}` : ""}
                        </span>
                      );
                    }

                    if (campo === "pacote") {
                      return <span>{valor.quantidade % valor.caixa}</span>;
                    }

                    if (campo === "caixa") {
                      return (
                        <span>
                          {calcularCaixas(valor.quantidade, valor.caixa)}
                        </span>
                      );
                    }

                    // Padrão: exibe a quantidade ou o valor do campo
                    return <span>{valor[campo] ?? valor.quantidade}</span>;
                  })()}
                </Col>
              );
            })}
          </Row>
        ))}
      </div>
    </Container>
  );
}

export default Lista;
