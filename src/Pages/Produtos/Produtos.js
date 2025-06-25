import { Row, Col, Container, Form, Button } from 'react-bootstrap';
//import Navegacao from '../Painel/Componentes/Navegacao/Navegacao.js'
import { useState, useEffect } from 'react';
//import Lista from '../Painel/Componentes/Lista/Lista.js'
import "./Produtos.css";

import { createProduto, getProdutos } from '../../service/produto.service.js';

function Produtos() {
    //const [altCodigo, setAltCodigo] = useState();
    const [altQuantidade, setAltQuantidade] = useState();
    const [produtos, setProdutos] = useState([]);

    useEffect(() => {
        const buscarAteEncontrar = async () => {
            let encontrado = false;

            while (!encontrado) {
                const data = await getProdutos();

                if (Array.isArray(data) && data.length > 0) {
                    setProdutos(data);
                    console.log("Encontrado");
                    encontrado = true;
                } else {
                    console.log("Buscando...");
                    await new Promise(resolve => setTimeout(resolve, 2000)); // espera 2 segundos 
                }
            }
        };

        buscarAteEncontrar();
    }, []);

    const selecionado = (e) => {
        const index = parseInt(e.target.value, 10); // Converte para número
        const produto = produtos[index];
        setAltQuantidade(produto.quantidade);
    }


    const [codigo, setCodigo] = useState();
    const [quantidade, setQuantidade] = useState();

    //const [lista, setLista] = useState([]);

    const salvar = () => { /////////////////////////////Salvar Produto
        const produto = {
            codigo: codigo,
            quantidade: quantidade,
        }

        createProduto(produto).then(resultado => {

            // aqui você pode limpar o formulário
            setCodigo("");
            setQuantidade("");
        })
            .catch(err => {
                // tratar erro
                console.error(err);
            });

    }

    // const adicionarProd = () => {////////////////Adiciona Produto na lista
    //     const prodLista = {
    //         codigo: codigo,
    //         quantidade: quantidade
    //     };

    //     setLista([...lista, prodLista]);
    // };

    // const [titulos] = useState([
    //     "",
    //     "Código",
    //     "Quantidade"
    // ]);

    // const [campos] = useState([
    //     "",
    //     "codigo",
    //     "quantidade",
    // ]);

    return (
        <Container>
            <Container className="dashboard ">
                <Row>
                    <h1>Cadastro de Produto</h1>
                </Row>
                <Row className="justify-content-md-center">
                    <Col md={12}>
                        <Form>
                            <Row className="mb-3">
                                <Form.Group as={Col} controlId="formGridCodigo">
                                    <Form.Label>Código </Form.Label>
                                    <Form.Control type="text" placeholder="Código" value={codigo} onChange={(e) => setCodigo(e.target.value)} />
                                </Form.Group>

                                <Form.Group as={Col} controlId="formGridQuantidade">
                                    <Form.Label>Observação</Form.Label>
                                    <Form.Control type="text" placeholder="Obiservação" />
                                </Form.Group>

                                <Form.Group as={Col} controlId="formGridQuantidade">
                                    <Form.Label>Quantidade</Form.Label>
                                    <Form.Control type="text" placeholder="Quantidade" value={quantidade} onChange={(e) => setQuantidade(e.target.value)} />
                                </Form.Group>
                            </Row>
                        </Form>
                    </Col>
                </Row>
                <Row lg={6} className="justify-content-md-center">
                    <Button onClick={() => { salvar() }}>Cadastrar</Button>
                </Row>
            </Container>

            <Container className="dashboard ">
                <Row>
                    <h1>Alterar Produto</h1>
                </Row>
                <Row className="justify-content-md-center">
                    <Col md={12}>
                        <Form>
                            <Row className="mb-3">
                                <Form.Group as={Col} controlId="formGridCodigo">
                                    <Form.Label>Código </Form.Label>
                                    <Form.Select aria-label="Default select example" onChange={(e) => { selecionado(e) }}>

                                        <option value="-1">...</option>
                                        {produtos.map((value, index) => (
                                            <option key={index} value={index} >
                                                {value.codigo}</option>
                                        ))}
                                    </Form.Select>
                                </Form.Group>
                            </Row>
                            <Row>
                                <Form.Group as={Col} controlId="formGridQuantidade">
                                    <Form.Label>Observação</Form.Label>
                                    <Form.Control type="text" placeholder="Obiservação" />
                                </Form.Group>

                                <Form.Group as={Col} controlId="formGridQuantidade">
                                    <Form.Label>Quantidade</Form.Label>
                                    <Form.Control type="text" placeholder="Quantidade" value={altQuantidade} />
                                </Form.Group>
                            </Row>
                        </Form>
                    </Col>
                </Row>
                <Row lg={6} className="justify-content-md-center">
                    <Button onClick={() => { salvar() }}>Cadastrar</Button>
                </Row>
            </Container>

            {/* <Container className="dashboard ">
                <Row>
                    <h4>Lista de Produto</h4>
                </Row>
                <Row className="justify-content-md-center">
                    <Col md={12}>
                        <Lista valores={lista} titulos={titulos} campos={campos} resposta="Ainda sem produtos inseridos para cadastro"></Lista>
                    </Col>
                </Row>
                <Row lg={6} className="justify-content-md-center">
                    <Button>Cadastrar</Button>
                </Row>
            </Container> */}
        </Container>
    );
}

export default Produtos;