import { Navbar, Container, Nav, Button } from "react-bootstrap";
import type { User, CurrentView } from "../types";

interface NavigationBarProps {
  user: User;
  onViewChange: (view: CurrentView) => void;
  onLogout: () => void;
  cartCount: number; // Conta o total de itens no carrinho
}

const NavigationBar: React.FC<NavigationBarProps> = ({
  user,
  onViewChange,
  onLogout,
  cartCount,
}) => {
  return (
    <Navbar bg="dark" variant="dark" expand="lg" sticky="top">
      <Container>
        <Navbar.Brand href="#" onClick={() => onViewChange("catalog")}>
          E-commerce AV1
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link onClick={() => onViewChange("catalog")}>
              Catálogo
            </Nav.Link>
            <Nav.Link onClick={() => onViewChange("history")}>
              Meus Pedidos
            </Nav.Link>
          </Nav>
          <Nav className="align-items-center">
            <Navbar.Text className="text-white me-3">
              Bem-vindo(a), <span className="fw-bold">{user.email}</span>
            </Navbar.Text>
            <Button
              variant={cartCount > 0 ? "warning" : "outline-light"}
              className="mx-2 position-relative"
              onClick={() => onViewChange("cart")}
            >
              🛒 Carrinho ({cartCount})
            </Button>
            <Button variant="outline-danger" onClick={onLogout}>
              Sair
            </Button>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavigationBar;
