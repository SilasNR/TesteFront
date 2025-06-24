import { createBrowserRouter } from 'react-router-dom';

import Principal from './Pages/Painel/Principal.js'
import Login from './Pages/Login/Login.js'
import Produtos from './Pages/Produtos/Produtos.js'


/*--------------------------Conteudo ---->*/
import Estoque from './Pages/Painel/Componentes/Estoque/Estoque.js'
import Pedido from './Pages/Painel/Componentes/Pedido/Pedido.js'
import Danificado from './Pages/Painel/Componentes/Danificado/Danificado.js'
import Devolucao from './Pages/Painel/Componentes/Devolucao/Devolucao.js'


const Rotas = createBrowserRouter([
  {
    path: "/",
    element: <Login />,
  },
  {
    path: "/Painel",
    element: <Principal />,
    children:
      [
        {
          path: "/Painel/Estoque",
          element: <Estoque />,
        },
        {
          path: "/Painel/Pedido",
          element: <Pedido />,
        },
        {
          path: "/Painel/Danificado",
          element: <Danificado />,
        },
        {
          path: "/Painel/Devolucao",
          element: <Devolucao />,
        },
        {
          path: "/Painel/Produto",
          element: <Produtos />,
        },
      ]
  },
]);

export default Rotas