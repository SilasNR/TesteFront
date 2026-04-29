import "../../Principal/Principal.css";
import Button from "react-bootstrap/Button";
import { Form, Col, Row, Container, FloatingLabel } from "react-bootstrap";
import { useState } from "react";

import { createTransportadora } from "../../../service/transportadora.service.js";

function Cadastrar(param) {
  const [novaTransportadora, setNovaTransportadora] = useState({
    nome: "",
    cnpj: "",
    endereco: "",
  });

  const [estadoSelecionado, setEstadoSelecionado] = useState([
    {nome: 'AC',selecao: false,},
    {nome: 'AM',selecao: false,},
    {nome: 'AP',selecao: false,},
    {nome: 'AL',selecao: false,},
    {nome: 'BA',selecao: false,},
    {nome: 'CE',selecao: false,},
    {nome: 'DF',selecao: false,},
    {nome: 'ES',selecao: false,},
    {nome: 'GO',selecao: false,},
    {nome: 'MA',selecao: false,},
    {nome: 'MG',selecao: false,},
    {nome: 'MS',selecao: false,},
    {nome: 'MT',selecao: false,},
    {nome: 'PA',selecao: false,},
    {nome: 'PB',selecao: false,},
    {nome: 'PE',selecao: false,},
    {nome: 'PI',selecao: false,},
    {nome: 'PR',selecao: false,},
    {nome: 'RJ',selecao: false,},
    {nome: 'RN',selecao: false,},
    {nome: 'RO',selecao: false,},
    {nome: 'RR',selecao: false,},
    {nome: 'RS',selecao: false,},
    {nome: 'SC',selecao: false,},
    {nome: 'SE',selecao: false,},
    {nome: 'SP',selecao: false,},
    {nome: 'TO',selecao: false,},
  ])

  const nomesEstados = {
    'AC': 'Acre', 'AL': 'Alagoas', 'AP': 'Amapá', 'AM': 'Amazonas',
    'BA': 'Bahia', 'CE': 'Ceará', 'DF': 'Distrito Federal', 'ES': 'Espírito Santo',
    'GO': 'Goiás', 'MA': 'Maranhão', 'MT': 'Mato Grosso', 'MS': 'Mato Grosso do Sul',
    'MG': 'Minas Gerais', 'PA': 'Pará', 'PB': 'Paraíba', 'PR': 'Paraná',
    'PE': 'Pernambuco', 'PI': 'Piauí', 'RJ': 'Rio de Janeiro', 'RN': 'Rio Grande do Norte',
    'RS': 'Rio Grande do Sul', 'RO': 'Rondônia', 'RR': 'Roraima', 'SC': 'Santa Catarina',
    'SP': 'São Paulo', 'SE': 'Sergipe', 'TO': 'Tocantins'
  };

  const [lista, setLista] = useState([]);
  const alternarSelecao = (nome) => {
    console.log(lista);

    setEstadoSelecionado(prevEstado =>
      prevEstado.map(item => {
        if (item.nome === nome) {
          const existe = lista.find(i => i.nome === item.nome);

          if (existe) {
            // Se já existe, removemos (filtra mantendo apenas os diferentes)
            setLista(lista.filter(i => i.nome !== item.nome));

          } else {
            // Se não existe, adicionamos (mantém os atuais + o novo)
            setLista([...lista, item.nome]);
          }
          return { ...item, selecao: !item.selecao };
        }
        // Se não for o estado clicado, retorna ele sem mudanças
        return item;
      })
    );
  };


  /*-------------------------------------------------------------------------------------------------------Salvar*/
  const salvar = () => {
    const transportadora = {
      ...novaTransportadora,
      nome: novaTransportadora.nome || "",
      cnpj: novaTransportadora.cnpj?.toString().replace(/\D/g, '') || "",
      endereco: novaTransportadora.endereco || "",
      estado: lista.map((item, index) => { return { nome: nomesEstados[item], sigla: item } }),
    };
    console.log(transportadora);
    createTransportadora(transportadora)
      .then((resultado) => {
        console.log("transportadora criado:", resultado);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  return (
    <Container>
      <h1>Cadastro de Pedido</h1>
      <Col className=" mb-3 dashboard">
        <Row className="">
          <FloatingLabel controlId="floatingSelect" label="Nome da Transportadora" className="mb-3">
            <Form.Control
              type="text"
              placeholder=""
              value={novaTransportadora.nome}
              onChange={(e) => setNovaTransportadora({ ...novaTransportadora, nome: e.target.value })}
            />
          </FloatingLabel>

          <FloatingLabel controlId="floatingSelect" label="CNPJ" className="mb-3">
            <Form.Control
              type="text"
              placeholder=""
              value={novaTransportadora.cnpj}
              onChange={(e) => setNovaTransportadora({ ...novaTransportadora, cnpj: e.target.value })}
            />
          </FloatingLabel>
        </Row>

        <FloatingLabel controlId="floatingSelect" label="Endereço" className="mb-3">
          <Form.Control
            type="text"
            placeholder=""
            value={novaTransportadora.endereco}
            onChange={(e) => setNovaTransportadora({ ...novaTransportadora, endereco: e.target.value })}
          />
        </FloatingLabel>

      </Col>
      <Col className="separador dashboard" >
        <Form.Group className="gap-2" controlId="form">
          <Row>
            <Form.Label>Estados Atendidos</Form.Label>
          </Row>
          <Row>
            <div>
              {estadoSelecionado.map((estado) => (
                <div
                  key={estado.nome}
                  style={{
                    backgroundColor: estado.selecao ? '#0d6efd' : 'white',
                    color: estado.selecao ? 'white' : 'black',
                    cursor: 'pointer', // Adicionei para o usuário saber que é clicável
                    display: 'inline-block', // Para ficarem lado a lado se preferir
                    margin: '5px',
                    fontWeight: estado.selecao ? 'bold' : 'normal',
                    border: '1px solid gray',
                    borderRadius: '5px',
                    width: '30px',
                    textAlign: 'center',
                    userSelect: 'none'
                  }}
                  onClick={() => alternarSelecao(estado.nome)} // <--- A correção está aqui!
                >
                  <span>{estado.nome}</span>
                </div>
              ))}
            </div>
          </Row>
        </Form.Group>

      </Col>
      <Col className="dashboard" style={{ border: 'none' }}>
        <Row className="gap-2">
          <Button
            onClick={() => {
              salvar();
            }}
          >
            Salvar
          </Button>
          <Button
            href="/Painel/Transportadora"
          >
            Cancelar
          </Button>
        </Row>
      </Col>
    </Container>
  );
}

export default Cadastrar;
