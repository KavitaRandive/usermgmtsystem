import { Container, Nav, Navbar, NavbarBrand } from "react-bootstrap";
import { Link } from "react-router-dom";
import "./Header.css";

const Header = () => {
  return (
    <Navbar variant="dark">
      <Container>
        <NavbarBrand as={Link} to="/">
          <strong>
            <h3>User Data Hub</h3>
          </strong>
        </NavbarBrand>
        <Nav className="ml-auto">
          <Nav.Link as={Link} to="/dashboard">Dashboard</Nav.Link>
          <Nav.Link as={Link} to="/postuser">Add User</Nav.Link>
           {/* Ensure this link points to the correct path */}
        </Nav>
      </Container>
    </Navbar>
  );
};

export default Header;
