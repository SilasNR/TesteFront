import axios from "axios";

//http://localhost:3001/
//const API_URL = 'https://backend-basico-production-b95f.up.railway.app/';
const URL2 = "controle-pedido-apoio-2238.i.aivencloud.com/produto-lista";

/////////////////////////////////////////////////////////////////////// Get Pedidos
export const getListaProdutos = async () => {
  try {
    const response = await axios.get(URL2);
    return response.data;
  } catch (error) {
    console.log("Nada Encontrado");

    return []; // 👈 evita erro no .map() se algo der errado
  }
};

/////////////////////////////////////////////////////////////////////// Post Pedido
export const createListaPedido = async (ListaProdutos) => {
  try {
    const response = await fetch(`${URL2}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(ListaProdutos),
    });

    if (!response.ok) {
      throw new Error(`Erro: ${response.status}`);
    }

    const resultado = await response.json();
    console.log("Pedido cadastrado:", resultado);
    return resultado;
  } catch (err) {
    console.error("Erro ao enviar Pedido: ", err);
    throw err;
  }
};

//////////////////////////////////////////////////////////////////////////////////Delete Pedido
// export const deleteListaProdutos = async (ids) => {
//   try {
//     const response = await axios.delete(`${API_URL}`, {
//       data: ids, // <-- Importante! DELETE não usa 'body' diretamente no axios, usa 'data'
//     });
//     return response.data;
//   } catch (error) {
//     console.error('Erro ao deletar ListaProdutos', error);
//     throw error;
//   }
// };

//////////////////////////////////////////////////////////////////////////////// Delete ListaProdutos (Post)
export const deleteListaProdutos = async (ids) => {
  try {
    const response = await axios.post(`${URL2}/delete-many`, ids);
    return response.data;
  } catch (error) {
    console.error("Erro ao deletar Pedidos", error);
    throw error;
  }
};
