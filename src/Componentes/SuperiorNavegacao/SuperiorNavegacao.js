import "./SuperiorNavegacao.css";
import { Container } from "react-bootstrap";
//import { useLocation } from "react-router-dom";

import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";

function SuperiorNavegacao() {
  //const location = useLocation();
  //const path = location.pathname;
  //const partes = path.split("/");
  //const ultimo = partes.pop() || partes.pop();

  return (
    <Container fluid className="ps-0">
      <Navbar
        bg="primary"
        data-bs-theme="dark"
        className="flex-column vh-100 align-items-start p-3"
        style={{ width: "250px" }}
      >
        <Container className="flex-column h-100 align-items-start">
          <Navbar.Brand href="/Painel/Home" className="mb-4">
            Logo
          </Navbar.Brand>

          {/* Navegação Principal */}
          <Nav className="flex-column w-100">
            <Nav.Link href="/Painel/Pedido">Pedido</Nav.Link>
            <Nav.Link href="/Painel/Danificado">Danificados</Nav.Link>
            <Nav.Link href="/Painel/Devolucao">Devoluções</Nav.Link>
            <Nav.Link href="/Painel/Produto">Produto</Nav.Link>
            <Nav.Link href="/Painel/Frete">Fretes</Nav.Link>
            <Nav.Link href="/Painel/Estoque">Estoque</Nav.Link>
          </Nav>

          {/* Bloco Inferior: O mt-auto empurra tudo abaixo dele para o fim do container */}
          <Nav className="flex-column w-100 mt-auto">
            <Nav.Link href="/Painel/Configuracoes">
              <i className="bi bi-gear me-2"></i> Configurações
            </Nav.Link>
            <Nav.Link href="/Painel/Ajuda">
              <i className="bi bi-question-lg me-2"></i> Ajuda
            </Nav.Link>
          </Nav>
        </Container>
      </Navbar>
    </Container>
  );
}

export default SuperiorNavegacao;
