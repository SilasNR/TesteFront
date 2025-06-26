import './Lista.css';
//import { useState } from 'react';
import { Row, Col, Form, Container, Spinner, Stack} from 'react-bootstrap';



function Lista(param) { //////////// parametros necessários : valores={} titulos={} campos={} resposta{}

  new Promise((resolveOuter) => {
    resolveOuter(
      new Promise((resolveInner) => {
        setTimeout(resolveInner, 1000);
      }),
    );
  });



  return (
    <>
      {param.valores.length > 0 ? (
        <Row>
          <Row className='titulos' >
            {param.titulos.map((titulo, index) => (
              <Col key={index} lg={param.campos[index] === "" ? 1 : undefined}>
                {titulo}
              </Col>
            ))}
          </Row>
          <Row className='lista'>
            <Container fluid className='h-50 d-inline-block'>
              {param.valores.map((valor, index) => (
                <Row key={valor.id} className='linha' onClick={() => param.aoClicar(index)}>
                  {param.campos.map((campo, index) => (
                    <Col className='celula' key={index} lg={campo === "" ? 1 : undefined} >
                      {campo === "" ? (
                        <Stack gap={2} direction='horizontal' className='justify-content-md-center '>
                          {/* <i class="bi bi-pencil"></i> */}
                          x
                        </Stack>
                      )
                        : index === 0 ? <p>{valor[campo]}</p>
                          : index === 1 ? <p>{valor[campo]}</p>
                            : index === 2 ? <p>{valor[campo]}</p>
                              : <p>{valor[campo] / 10}</p>}
                    </Col>
                  ))}
                </Row>
              ))}
            </Container>
          </Row >
        </Row>
      ) : param.resposta === "" ? (
        <Col className='d-flex justify-content-center align-items-center'>
          <Spinner animation="border" role="status">
            <span className="visually-hidden">Loading...</span>
          </Spinner>
        </Col>
      ) : (
        <Col>
          <p>{param.resposta}</p>
        </Col>
      )}
    </>
  )
}

export default Lista