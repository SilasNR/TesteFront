import axios from 'axios';

const API_URL = 'http://localhost:3000/produtos';

export const getProdutos = async () => {
  try {
    const response = await axios.get(API_URL);
    return response.data;
  } catch (error) {
    console.error('Erro ao buscar produtos', error);
    return []; // 👈 evita erro no .map() se algo der errado
  }
};
