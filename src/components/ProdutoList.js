import React, { useEffect, useState } from 'react';
import './ProdutoList.css';
import { getProdutos } from '../service/produto.service'; // ajuste o caminho se necessário

function ProdutoList() {
  const [produtos, setProdutos] = useState([]);

  const [codigoProduto, setCodigoProduto] = useState('');
  const [quantidade, setQuantidade] = useState('');

  useEffect(() => {
    const fetchProdutos = async () => {
      const data = await getProdutos();
      if (Array.isArray(data)) {
        setProdutos(data);
      } else {
        setProdutos([]);
      }
    };

    fetchProdutos();
  }, []);

  const enviarProduto = async () => {
    if (codigoProduto !== '') {
      try {
        const jsonProduto = {
          codigo: codigoProduto,
          quantidade: parseInt(quantidade),
        }

        const response = await fetch("https://backend-basico-production-b95f.up.railway.app/produtos", {
          method: 'POST',
          headers: {
            'Content-Type': 'aplication/json',
          },
          body: JSON.stringify(jsonProduto),
        });

        const resultado = await response.json();
        console.log(resultado);

        setCodigoProduto('');
        setQuantidade('');
      } catch (err) {
        console.error('Erro ao enviar produto: ', err);
      }
    }else{
      console.log("estão vazios");
      
    }
  }


  return (
    <>
      <div>
        {produtos.length > 0 ? (
          produtos.map((produto) => (
            <div key={produto.id}>
              <p>{produto.nome}</p>
            </div>
          ))
        ) : (
          <p>Nenhum produto encontrado.</p>
        )}

      </div>
      <div className='Form'>

        <label htmlFor="fname">Código : {codigoProduto}</label><br />
        <input type="text" id="codigo" value={codigoProduto || ''} onChange={e => setCodigoProduto(e.target.value)} /><br />

        <label htmlFor="lname">Quantidade : {quantidade}</label><br />
        <input type="text" id="quantidade" value={quantidade || ''} onChange={e => setQuantidade(e.target.value)} /><br />

        <input type='button' id='btnEnviarProduto' value={"Enviar"} onClick={enviarProduto} />
      </div>
    </>
  );
}

export default ProdutoList;
