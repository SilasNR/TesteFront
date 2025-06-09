import { createBrowserRouter } from 'react-router-dom';

import Principal from './Pages/Painel/Principal.js'
import Login from './Pages/Login/Login.js'

import Ajuda from './Pages/Ajuda/Ajuda.js'
import Configuracoes from './Pages/Configuracoes/Configuracoes.js'
import Produtos from './Pages/Produtos/Produtos.js'
import Usuarios from './Pages/Usuarios/Usuarios.js'

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
          path: "/Painel/",
          element: <h1>Painel</h1>,
        },
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
      ]
  },
  {
    path: "/Ajuda",
    element: <Ajuda />,
  },
  {
    path: "/Configuracoes",
    element: <Configuracoes />,
  },
  {
    path: "/Produtos",
    element: <Produtos />,
  },
  {
    path: "/Usuarios",
    element: <Usuarios />,
  },
]);

export default Rotas