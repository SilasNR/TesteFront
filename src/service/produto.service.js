import axios from "axios";

//http://localhost:3001/produtos
//const API_URL = 'https://backend-basico-production-b95f.up.railway.app/produtos';
const URL2 = "controle-pedido-apoio-2238.i.aivencloud.com/produtos";

/////////////////////////////////////////////////////////////////////// Get Produtos
export const getProdutos = async () => {
  try {
    const response = await axios.get(URL2);
    return response.data;
  } catch (error) {
    return []; // 👈 evita erro no .map() se algo der errado
  }
};

/////////////////////////////////////////////////////////////////////// Post Produto
export const createProduto = async (produto) => {
  try {
    const response = await fetch(`${URL2}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(produto),
    });

    if (!response.ok) {
      throw new Error(`Erro: ${response.status}`);
    }

    const resultado = await response.json();
    console.log("Produto cadastrado:", resultado);
    return resultado;
  } catch (err) {
    console.error("Erro ao enviar produto: ", err);
    throw err;
  }
};

////////////////////////////////////////////////////////////////////////////////Delete Produto
export const deleteProduto = async (id) => {
  try {
    const response = await axios.delete(`${URL2}/${id}`);
    return response.data;
  } catch (error) {
    console.error("Erro ao deletar produto", error);
    throw error;
  }
};

//////////////////////////////////////////////////////////////////////////////// Delete Produtos (Post)
export const deleteProdutos = async (ids) => {
  try {
    const response = await axios.post(`${URL2}/delete-many`, ids);
    return response.data;
  } catch (error) {
    console.error("Erro ao deletar produtos", error);
    throw error;
  }
};
