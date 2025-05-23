import React, { useEffect, useState } from 'react';
import './ProdutoList.css';
import { getProdutos, deleteProduto } from '../service/produto.service';

function ProdutoList() {
  const [produtos, setProdutos] = useState([]);
  const [codigoProduto, setCodigoProduto] = useState('');
  const [quantidade, setQuantidade] = useState('');

  const fetchProdutos = async () => {
    const data = await getProdutos();
    if (Array.isArray(data)) {
      setProdutos(data);
    } else {
      setProdutos([]);
    }
  };

  useEffect(() => {
    fetchProdutos();
  }, []);

  const deletarProduto = async (id) => {
    try {
      await deleteProduto(id);
      fetchProdutos();
    } catch (error) {
      console.error('Erro ao deletar produto:', error);
    }
  };

  const enviarProduto = async () => {
    if (codigoProduto.trim() !== '') {
      try {
        const jsonProduto = {
          codigo: codigoProduto.trim(),
          quantidade: parseInt(quantidade),
        };

        const response = await fetch(
          'https://backend-basico-production-b95f.up.railway.app/produtos',
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(jsonProduto),
          }
        );

        if (!response.ok) {
          throw new Error(`Erro: ${response.status}`);
        }

        const resultado = await response.json();
        console.log('Produto cadastrado:', resultado);

        setCodigoProduto('');
        setQuantidade('');

        fetchProdutos();
      } catch (err) {
        console.error('Erro ao enviar produto: ', err);
      }
    } else {
      console.warn('Código do produto está vazio');
    }
  };

  return (
    <>
      <div>
        {produtos.length > 0 ? (
          produtos.map((produto) => (
            <div key={produto.id} className="produto-item">
              <p>
                Código: {produto.codigo} | Quantidade: {produto.quantidade}
              </p>
              <button onClick={() => deletarProduto(produto.id)}>Excluir</button>
            </div>
          ))
        ) : (
          <p>Nenhum produto encontrado.</p>
        )}
      </div>

      <div className="Form">
        <label>Código:</label>
        <input
          type="text"
          id="codigo"
          value={codigoProduto}
          onChange={(e) => setCodigoProduto(e.target.value)}
        />
        <br />

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
