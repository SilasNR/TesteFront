import { createBrowserRouter } from "react-router-dom";

import Principal from "./Pages/Principal/Principal.js";
import Login from "./Pages/Login/Login.js";

/*--------------------------Conteudo ---->*/

import Pedido from "./Pages/Pedido/Pedido.js";
import CadastroPedido from "./Pages/Pedido/Cadastro/Cadastrar.js";
import Danificado from "./Pages/Danificado/Danificado.js";
import Devolucao from "./Pages/Devolucao/Devolucao.js";
import Produtos from "./Pages/Produtos/Produtos.js";
import Frete from "./Pages/Frete/Frete.js";
import Configuracoes from "./Pages/Configuracoes/Configuracoes.js";
import Ajuda from "./Pages/Ajuda/Ajuda.js";
import Dashboard from "./Pages/DashBoard/dashboard.js";
import Transportadora from "./Pages/Transportadora/Transportadora.js";
import CadastroTransportadora from "./Pages/Transportadora/Cadastrar/Casdastar.js"


const Rotas = createBrowserRouter([
  {
    path: "/",
    element: <Login />,
  },
  {
    path: "/",
    element: <Principal />,
    children: [
      {
        path: "/Painel",
        element: <Dashboard />,
      },
      {
        path: "/Painel/Pedido",
        element: <Pedido />,
      },
      {
        path: "/Painel/CadastroPedido",
        element: <CadastroPedido />,
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
        path: "/Painel/Transportadora",
        element: <Transportadora />,
      },
      {
        path: "/Painel/CadastroTransportadora",
        element: <CadastroTransportadora />,
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
