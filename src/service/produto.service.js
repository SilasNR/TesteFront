import axios from 'axios';

const API_URL = 'https://backend-basico-production-b95f.up.railway.app/produtos';

export const getProdutos = async () => {
  try {
    const response = await axios.get(API_URL);
    return response.data;
  } catch (error) {
    console.error('Erro ao buscar produtos', error);
    return []; // 👈 evita erro no .map() se algo der errado
  }
  
};



export const deleteProduto = async (id) => {
  try {
    const response = await axios.delete(`${API_URL}/${id}`);
    console.log('Produto deletado:', response.data);
    return response.data;
  } catch (error) {
    console.error('Erro ao deletar produto', error);
    throw error;
  }
};