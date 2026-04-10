import Modal from 'react-bootstrap/Modal';

function Cadastrar([campos, titulo]) {
  
  const [novoPedido, setNovoPedido] = useState({
    numero: "",
    cliente: "",
    cnpj: "",
    municipio: "",
    uf: "",
    cep: "",
    valor: "",
    peso: ""
  });
  const [quantidade, setQuantidade] = useState("");
  const [lista, setLista] = useState([]);

  const [produtos, setProdutos] = useState([]);


  /*-------------------------------------------------------------------------------------------------------Salvar*/
  // const salvar = () => {
  //   const pedido = {
  //     ...novoPedido,
  //     valor: parseFloat(novoPedido.valor) || 0,
  //     peso: parseFloat(novoPedido.peso) || 0,
  //     produtos: lista,
  //   };
  //   console.log(pedido);
  //   createPedido(pedido)
  //     .then((resultado) => {
  //       console.log("Pedido criado:", resultado);
  //     })
  //     .catch((err) => {
  //       console.error(err);
  //     });
  // };

  return (
    <>
      <Modal
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Modal heading
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <h4>Centered Modal</h4>
          <p>
            Cras mattis consectetur purus sit amet fermentum. Cras justo odio,
            dapibus ac facilisis in, egestas eget quam. Morbi leo risus, porta ac
            consectetur ac, vestibulum at eros.
          </p>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={props.onHide}>Close</Button>
        </Modal.Footer>
      </Modal>

      <Container>
        <h1>{titulo}</h1>
        <Col className=" mb-3 dashboard">
          <Row className="">
            <FloatingLabel controlId="floatingSelect" label="Número do pedido" className="mb-3">
              <Form.Control
                type="text"
                placeholder={""}
                value={novoPedido.numero}
                onChange={(e) => setNovoPedido({ ...novoPedido, numero: e.target.value })}
              />
            </FloatingLabel>

            <FloatingLabel controlId="floatingSelect" label="Cliente" className="mb-3">
              <Form.Label></Form.Label>
              <Form.Control
                type="text"
                placeholder="Nome do Cliente"
                value={novoPedido.cliente}
                onChange={(e) => setNovoPedido({ ...novoPedido, cliente: e.target.value })}
              />
            </FloatingLabel>

            <FloatingLabel controlId="floatingSelect" label="CNPJ" className="mb-3">
              <Form.Control
                type="text"
                placeholder="CNPJ"
                value={novoPedido.cnpj}
                onChange={(e) => setNovoPedido({ ...novoPedido, cnpj: e.target.value })}
              />
            </FloatingLabel>
          </Row>

          <FloatingLabel controlId="floatingSelect" label="UF" className="mb-3">
            <Form.Control
              type="text"
              placeholder="UF"
              value={novoPedido.uf}
              onChange={(e) => setNovoPedido({ ...novoPedido, uf: e.target.value })}
            />
          </FloatingLabel>

          <FloatingLabel controlId="floatingSelect" label="Municipio" className="mb-3">
            <Form.Control
              type="text"
              placeholder="Municipio"
              value={novoPedido.municipio}
              onChange={(e) => setNovoPedido({ ...novoPedido, municipio: e.target.value })}
            />
          </FloatingLabel>

          <FloatingLabel controlId="floatingSelect" label="CEP" className="mb-3">
            <Form.Control
              type="text"
              placeholder="CEP"
              value={novoPedido.cep}
              onChange={(e) => setNovoPedido({ ...novoPedido, cep: e.target.value })}
            />
          </FloatingLabel>


          <InputGroup className="mb-3">
            <InputGroup.Text>R$</InputGroup.Text>
            <FloatingLabel controlId="floatingSelect" label="Valor" className="mb-3">
              <Form.Control
                type="text"
                placeholder="Valor"
                value={novoPedido.Valor}
                onChange={(e) => setNovoPedido({ ...novoPedido, valor: e.target.value })}
              />
            </FloatingLabel>
          </InputGroup>

          <InputGroup className="mb-3">
            <FloatingLabel controlId="floatingSelect" label="Peso" className="mb-3">
              <Form.Control
                type="text"
                placeholder="CNPJ"
                value={novoPedido.peso}
                onChange={(e) => setNovoPedido({ ...novoPedido, peso: e.target.value })}
              />
            </FloatingLabel>
            <InputGroup.Text>kg</InputGroup.Text>
          </InputGroup>

        </Col>
        <Col className="separador dashboard" >
          <Form.Group className="gap-2" controlId="form">

            <Row>
              <Form.Label>Produtos </Form.Label>
            </Row>
            <Row>
              <Stack gap={2}>
                <Row className="mb-3">
                  <FloatingLabel controlId="floatingSelect" label="Selecione o Código ">
                    <Form.Select onChange={""}>
                      <option value="-1"></option>
                      {produtos.map((p, i) => (
                        <option key={p.id || i} value={i}>
                          {p.codigo}
                        </option>
                      ))}
                    </Form.Select>
                  </FloatingLabel>
                </Row>
                <FloatingLabel controlId="floatingSelect" label="Quantidade" className="mb-3">
                  <Form.Control
                    type="text"
                    placeholder="Quantidade"
                    value={quantidade}
                    onChange={(e) => setQuantidade(e.target.value)}
                  />
                </FloatingLabel>
              </Stack>
            </Row>
          </Form.Group>

          <Row className="mb-3">
            <Form.Group
              className="mt-4 justify-content-md-center"
              controlId="formLista"
            >
            </Form.Group>
          </Row>

        </Col>

        <Button
          onClick={() => {
            // limpar();
          }}
        >
          Cancelar
        </Button>

        <Button
          onClick={() => {
            //salvar();
          }}
        >
          Salvar
        </Button>
      </Container>
    </>
  );
}

export default Cadastrar;
