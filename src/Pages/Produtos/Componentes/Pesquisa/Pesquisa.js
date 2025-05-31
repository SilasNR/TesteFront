import {Form, Col, Row} from 'react-bootstrap';


function Pesquisa() {
  return (
    <Form style={{backgroodColor: 'black'}}>
      <Row>
        <Col xs={7}>
          <Form.Control placeholder="Código" />
        </Col>
        <Col>
          <Form.Control placeholder="Quantidade" />
        </Col>
        <Col>
          <Form.Control placeholder="Zip" />
        </Col>
      </Row>
    </Form>
  );
}

export default Pesquisa;