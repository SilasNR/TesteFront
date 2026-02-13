import { Form, Col, Row } from 'react-bootstrap';


function Pesquisa() {
  return (
    <Row>
      <Form style={{ backgroodColor: 'black' }}>
        <Row>
          <Col xs={1}>

          </Col>
          <Col xs={1}>
            <Form.Control placeholder="Código" />
          </Col>

        </Row>
      </Form>
    </Row>
  );
}

export default Pesquisa;