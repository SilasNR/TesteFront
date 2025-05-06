import React, { useEffect, useState } from 'react';
import { getProdutos } from '../service/produto.service'; // ajuste o caminho se necessário

function ProdutoList() {
  const [produtos, setProdutos] = useState([]);

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

  return (
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
  );
}

export default ProdutoList;
