import { createBrowserRouter } from "react-router-dom";

import Principal from "./Pages/Principal/Principal.js";
import Login from "./Pages/Login/Login.js";

/*--------------------------Conteudo ---->*/
import Home from "./Pages/Home/Home.js";
import Estoque from "./Pages/Estoque/Estoque.js";
import Pedido from "./Pages/Pedido/Pedido.js";
import Danificado from "./Pages/Danificado/Danificado.js";
import Devolucao from "./Pages/Devolucao/Devolucao.js";
import Produtos from "./Pages/Produtos/Produtos.js";
import Frete from "./Pages/Frete/Frete.js";
import Configuracoes from "./Pages/Configuracoes/Configuracoes.js";
import Ajuda from "./Pages/Ajuda/Ajuda.js";

const Rotas = createBrowserRouter([
  {
    path: "/",
    element: <Login />,
  },
  {
    path: "/Painel",
    element: <Principal />,
    children: [
      {
        path: "/Painel/Home",
        element: <Home />,
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
      {
        path: "/Painel/Produto",
        element: <Produtos />,
      },
      {
        path: "/Painel/Frete",
        element: <Frete />,
      },
      {
        path: "/Painel/Configuracoes",
        element: <Configuracoes />,
      },
      {
        path: "/Painel/Ajuda",
        element: <Ajuda />,
      },
    ],
  },
]);

export default Rotas;
