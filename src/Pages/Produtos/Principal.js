import React, { useEffect, useState } from 'react';
import './Principal.css';
import { getProdutos, deleteProdutos, createProduto } from '../../service/produto.service.js';
import { Row, Col, Container, Spinner } from 'react-bootstrap';
import { Outlet } from "react-router-dom";


import Navegacao from './Componentes/Navegacao/Navegacao.js'
import SuperiorNavegacao from "./Componentes/SuperiorNavegacao/SuperiorNavegacao.js";

function ProdutoList() {
  const [codigoProduto, setCodigoProduto] = useState('');
  const [quantidade, setQuantidade] = useState('');



  /////////////////////////////////////////////////////////////////Enviar Pruduto 
  const enviarProduto = async () => {
    if (codigoProduto.trim() !== '') {
      const jsonProduto = {
        codigo: codigoProduto.trim(),
        quantidade: parseInt(quantidade),
      };

      try {
        await createProduto(jsonProduto);
        setCodigoProduto('');
        setQuantidade('');
      } catch (err) {
        console.error('Erro ao cadastrar produto:', err);
      }
    } else {
      console.warn('Código do produto está vazio');
    }
  };

  const [selected, setSelected] = useState([]);

  ////////////////////////////////////////////////////////////Selecionar Checkbox
  const mudarCheckbox = (e) => {
    const value = Number(e.target.value);
    const isChecked = e.target.checked;
    if (isChecked) {
      setSelected([...selected, value]);
    } else {
      setSelected(selected.filter((v) => v !== value));
    }
  };

  ////////////////////////////////////////////////////////Deletar
  const deletarSelecionados = async () => {
    console.log(selected);
    if (!window.confirm('Tem certeza que deseja deletar os produtos selecionados?')) {
      return;
    }
    try {
      await deleteProdutos(selected);
      setSelected([]);
      console.log('Produtos deletados com sucesso!');
    } catch (error) {
      console.error('Erro ao deletar produtos:', error);
    }
  };

  return (
    <>
      <Container fluid className='vh-100'>
        <Row className='px-0'>
          <Navegacao />
          <Col>
            <SuperiorNavegacao />
            <Outlet />
          </Col>

        </Row>
      </Container >

      <div className="Form">
        <label>Código:</label>
        <input
          type="text"
          id="codigo"
          value={codigoProduto}
          onChange={(e) => setCodigoProduto(e.target.value)}
        />
        <br />
        <i class="bi bi-0-circle"></i>
        <label>Quantidade:</label>
        <input
          type="number"
          id="quantidade"
          value={quantidade}
          onChange={(e) => setQuantidade(e.target.value)}
        />
        <br />

        <input
          type="button"
          id="btnEnviarProduto"
          value="Cadastrar Produto"
          onClick={enviarProduto}
        />
      </div>
    </>
  );
}

export default ProdutoList;
