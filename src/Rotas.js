import { createBrowserRouter } from 'react-router-dom';

import Principal from './Pages/Produtos/Principal.js'
import Login from './Pages/Login/Login.js'


/*--------------------------Conteudo ---->*/
import Lista from './Pages/Produtos/Componentes/Lista/Lista.js'
import Pedido from './Pages/Pedido/Pedido.js'


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
                element: <Lista/>,
            },
            {
                path: "/Painel/Pedido",
                element: <Pedido/>,
            },
            // {
            //     path: "/Html/básico",
            //     element: <Basico/>,
            // },
            // {
            //     path: "/Html/Funcionando",
            //     element: <Test/>,
            // },
        ]
  }
]);

export default Rotas