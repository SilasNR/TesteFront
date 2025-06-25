import { Row, Col, Container, Form, Button, Stack } from 'react-bootstrap';
//import Navegacao from '../Painel/Componentes/Navegacao/Navegacao.js'
import { useState, useEffect } from 'react';
//import Lista from '../Painel/Componentes/Lista/Lista.js'
import "./Produtos.css";

import { createProduto, getProdutos, deleteProduto } from '../../service/produto.service.js';

function Produtos() {
    const [altID, setAltID] = useState();
    const [altCodigo, setAltCodigo] = useState();
    const [altObservacao, setAltObservacao] = useState();
    const [altQuantidade, setAltQuantidade] = useState();
    const [altPacote, setAltPacote] = useState();
    const [altCaixa, setAltCaixa] = useState();
    const [produtos, setProdutos] = useState([]);

    const buscarAteEncontrar = async () => {////////////////////////////////////////////////////////////////Busca produtos no banco
        let encontrado = false;
        let tentativas = 0;
        const maxTentativas = 5;
        while (!encontrado && tentativas < maxTentativas) {
            tentativas++;
            const data = await getProdutos();
            if (Array.isArray(data) && data.length > 0) {
                setProdutos(data);
                console.log(produtos);

                console.log("Encontrado");
                encontrado = true;
            } else {
                await new Promise(resolve => setTimeout(resolve, 2000)); // espera 2 segundos 
                console.log("Buscando...");
            }
        }
    };

    useEffect(() => {////////////////////////////////////////////////////////////////Busca produtos no banco
        buscarAteEncontrar();
    }, []);

    const selecionado = (e) => {////////////////////////////Pega as imformações do produto selecionado no espaço Dados do Produto
        const index = parseInt(e.target.value, 10); // Converte para número
        const produto = produtos[index];
        setAltQuantidade(produto.quantidade);
        setAltID(produto.id);
        console.log(produto);
    }

    const [codigo, setCodigo] = useState();
    const [observacao, setObservacao] = useState();
    const [quantidade, setQuantidade] = useState();
    const [pacote, setPacote] = useState();
    const [caixa, setCaixa] = useState();

    //const [lista, setLista] = useState([]);

    const salvar = () => { //////////////////////////////////////////////////////////////Salvar Produto
        const produto = {
            codigo: codigo,
            observacao: observacao || "",
            quantidade: quantidade,
            pacote:pacote,
            caixa:caixa,
        }

        createProduto(produto).then(resultado => {
            // aqui você pode limpar o formulário
            setCodigo("");
            setObservacao("");
            setQuantidade("");
            setPacote("");
            setCaixa("");
            buscarAteEncontrar();
        })
            .catch(err => {
                // tratar erro
                console.error(err);
            });
    }

    const alterar = () => { ///////////////////////////////////////////////////////////////Alterar Produto
        const produto = {
            codigo: codigo,
            observacao: observacao,
            quantidade: quantidade,
        }

        createProduto(produto).then(resultado => {
            // aqui você pode limpar o formulário
            setCodigo("");
            setQuantidade("");
            buscarAteEncontrar();
        })
            .catch(err => {
                // tratar erro
                console.error(err);
            });
    }

    const deletar = () => { ////////////////////////////////////////////////////////////Deletar Produto
        console.log(altID);

        deleteProduto(altID).then(resultado => {
            // aqui você pode limpar o formulário
            setAltCodigo("");
            setAltQuantidade("");
            buscarAteEncontrar();
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
            <Container className="dashboard ">{/*///////////////////////////////////Cadastro de Produto/////////////////////////////////////*/}
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
                            </Row>
                            <Row className="mb-3">
                                 <Form.Group as={Col} controlId="formGridQuantidade">
                                    <Form.Label>Observação</Form.Label>
                                    <Form.Control type="text" placeholder="Obiservação" value={observacao} onChange={(e) => setObservacao(e.target.value)} />
                                </Form.Group>
                            </Row>
                            <Row className="mb-3">
                                <Form.Group as={Col} controlId="formGridQuantidade">
                                    <Form.Label>Quantidade Total</Form.Label>
                                    <Form.Control type="text" placeholder="Quantidade" value={quantidade} onChange={(e) => setQuantidade(e.target.value)} />
                                </Form.Group>

                                <Form.Group as={Col} controlId="formGridQuantidade">
                                    <Form.Label>Quantidade do Pacote:</Form.Label>
                                    <Form.Control type="text" placeholder="Pacote" value={pacote} onChange={(e) => setPacote(e.target.value)} />
                                </Form.Group>

                                <Form.Group as={Col} controlId="formGridQuantidade">
                                    <Form.Label>Quantidade da Caixa:</Form.Label>
                                    <Form.Control type="text" placeholder="Caixa" value={caixa} onChange={(e) => setCaixa(e.target.value)} />
                                </Form.Group>
                            </Row>
                        </Form>
                    </Col>
                </Row>
                <Row lg={6} className="justify-content-md-center">
                    <Button onClick={() => { salvar() }}>Cadastrar</Button>
                </Row>
            </Container>

            <Container className="dashboard ">{/*///////////////////////////////////Alteração de Produto/////////////////////////////////////*/}
                <Row>
                    <h1>Dados do Produto</h1>
                </Row>
                <Row className="justify-content-md-center">
                    <Col md={12}>
                        <Form>
                            <Row className="mb-3">
                                <Form.Group as={Col} controlId="formGridCodigo">
                                    <Form.Label>Código </Form.Label>
                                    <Form.Select aria-label="Default select example" value={altCodigo} onChange={(e) => { selecionado(e); setAltCodigo(e.target.value); }}>

                                        <option value="-1">...</option>
                                        {produtos.map((value, index) => (
                                            <option key={index} value={index} >
                                                {value.codigo}</option>
                                        ))}
                                    </Form.Select>
                                </Form.Group>
                            </Row>
                            <Row className="mb-3">
                                 <Form.Group as={Col} controlId="formGridQuantidade">
                                    <Form.Label>Observação</Form.Label>
                                    <Form.Control type="text" placeholder="Obiservação" value={altObservacao} onChange={(e) => setAltObservacao(e.target.value)} />
                                </Form.Group>
                            </Row>
                            <Row className="mb-3">
                                <Form.Group as={Col} controlId="formGridQuantidade">
                                    <Form.Label>Quantidade Total</Form.Label>
                                    <Form.Control type="text" placeholder="Quantidade" value={altQuantidade} onChange={(e) => setAltQuantidade(e.target.value)} />
                                </Form.Group>

                                <Form.Group as={Col} controlId="formGridQuantidade">
                                    <Form.Label>Quantidade do Pacote:</Form.Label>
                                    <Form.Control type="text" placeholder="Pacote" value={altPacote} onChange={(e) => setAltPacote(e.target.value)} />
                                </Form.Group>

                                <Form.Group as={Col} controlId="formGridQuantidade">
                                    <Form.Label>Quantidade da Caixa:</Form.Label>
                                    <Form.Control type="text" placeholder="Caixa" value={altCaixa} onChange={(e) => setAltCaixa(e.target.value)} />
                                </Form.Group>
                            </Row>
                        </Form>
                    </Col>
                </Row>
                <Row lg={6} className="justify-content-md-center dashboard mb-3">
                    <Stack gap={3} direction='horizontal'>
                        <Button onClick={() => { }}>Alterar</Button>
                        <Button onClick={() => { deletar(); }}>Deletar</Button>
                    </Stack>
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