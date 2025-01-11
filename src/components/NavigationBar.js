import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import LoginModal from './Login';
import "./NavigationBar.css"

function NavScrollExample() {
  return (
    <Navbar expand="md" className="bg-glass " style={{ zIndex: 100 }}>
      <Container>
        <Navbar.Brand href="/" style={{ color: '#ff6700', fontWeight: "bolder" }}>
          Pick&Win 
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav className="me-auto my-2 my-lg-0" navbarScroll>
            <Nav.Link href="Complete" style={{ color: '#fff' }}>Completed Events</Nav.Link>
            <Nav.Link href="Upcoming" style={{ color: '#fff' }}>Upcoming Events</Nav.Link>
            <Nav.Link href="Purchase" style={{ color: '#fff' }}>My Purchase</Nav.Link>
          </Nav>
          
          <LoginModal />
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavScrollExample;