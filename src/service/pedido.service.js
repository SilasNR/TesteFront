import axios from "axios";

// URL do seu backend no Render para Pedidos
const URL = "https://backend-basico.onrender.com/pedidos";

const api = axios.create({
  baseURL: URL,
  headers: {
    "Content-Type": "application/json",
  },
});

/////////////////////////////////////////////////////////////////////// Get Pedidos
export const getPedidos = async () => {
  try {
    const response = await api.get("/");
    return response.data;
  } catch (error) {
    console.error("Nada Encontrado no Backend");
    return []; 
  }
};

/////////////////////////////////////////////////////////////////////// Post Pedido
export const createPedido = async (pedido) => {
  try {
    // Trocado de Fetch para Axios para manter o padrão do projeto
    const response = await api.post("/", pedido);
    console.log("Pedido cadastrado:", response.data);
    return response.data;
  } catch (err) {
    console.error("Erro ao enviar Pedido: ", err.response?.data || err.message);
    throw err;
  }
};

/////////////////////////////////////////////////////////////////////// Delete Pedidos (Vários)
export const deletePedidos = async (ids) => {
  try {
    // Note: se o seu backend espera um array direto ou um objeto { ids: [] }
    const response = await api.post("/delete-many", ids);
    return response.data;
  } catch (error) {
    console.error("Erro ao deletar Pedidos", error.message);
    throw error;
  }
};