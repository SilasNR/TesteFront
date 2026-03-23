import axios from "axios";

// URL do seu backend no Render
const URL = "https://backend-basico.onrender.com/produtos";

// Instância do Axios (opcional, mas boa prática para definir o timeout e headers)
const api = axios.create({
  baseURL: URL,
  headers: {
    "Content-Type": "application/json",
  },
});

/////////////////////////////////////////////////////////////////////// Get Produtos
export const getProdutos = async () => {
  try {
    const response = await api.get("/"); // O "/" aqui se junta à baseURL
    return response.data;
  } catch (error) {
    console.error("Erro ao buscar produtos:", error.message);
    return [];
  }
};

///////////////////////////////////////////////////////////////////////////Get Produto
export const getProduto = async (id) => {
  try {
    const response = await api.get(`/${id}`);
    return response.data;
  } catch (error) {
    console.error("Erro ao buscar produto:", error.message);
    throw error;
  }
};

/////////////////////////////////////////////////////////////////////// Post Produto
export const createProduto = async (produto) => {
  try {
    // Trocado Fetch por Axios para manter o padrão
    const response = await api.post("/", produto);
    console.log("Produto cadastrado:", response.data);
    return response.data;
  } catch (err) {
    console.error(
      "Erro ao enviar produto: ",
      err.response?.data || err.message
    );
    throw err;
  }
};
/////////////////////////////////////////////////////////////////////////// Atualizar Produto
export const updateProduto = async (id, produto) => {
  try {
    const response = await api.patch(`/${id}`, produto);
    return response.data;
  } catch (error) {
    console.error("Erro ao atualizar produto:", error.message);
    throw error;
  }
};

//////////////////////////////////////////////////////////////////////////////// Delete Produto
export const deleteProduto = async (id) => {
  try {
    const response = await api.delete(`/${id}`);
    return response.data;
  } catch (error) {
    console.error("Erro ao deletar produto:", error.message);
    throw error;
  }
};

//////////////////////////////////////////////////////////////////////////////// Delete Vários
export const deleteProdutos = async (ids) => {
  try {
    const response = await api.post("/delete-many", { ids }); // Enviando como objeto { ids: [...] }
    return response.data;
  } catch (error) {
    console.error("Erro ao deletar produtos:", error.message);
    throw error;
  }
};
