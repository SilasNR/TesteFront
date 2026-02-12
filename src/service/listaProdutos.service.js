import axios from "axios";

const URL = "https://backend-basico.onrender.com/produto-lista";

const api = axios.create({
  baseURL: URL,
  headers: { "Content-Type": "application/json" },
});

export const getListaProdutos = async () => {
  try {
    const response = await api.get("/");
    return response.data;
  } catch (error) {
    console.log("Nada Encontrado");
    return [];
  }
};

export const createListaPedido = async (ListaProdutos) => {
  try {
    // Trocado de fetch para api.post para evitar conflitos de build
    const response = await api.post("/", ListaProdutos);
    return response.data;
  } catch (err) {
    console.error("Erro ao enviar Pedido: ", err);
    throw err;
  }
};

export const deleteListaProdutos = async (ids) => {
  try {
    const response = await api.post("/delete-many", ids);
    return response.data;
  } catch (error) {
    console.error("Erro ao deletar Pedidos", error);
    throw error;
  }
};
