import React from 'react';
import {Container,Navbar, Nav} from 'react-bootstrap';

const NavBar = () => {
    return (
        <Navbar bg="light" expand="sm">
            <Container>
                <Navbar.Brand href="/">Pintabook</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav" className='flex-grow-0'>
                        <Nav className="me-auto">
                            <Nav.Link href="/login">Connectez vous</Nav.Link>
                            <Nav.Link href="/signup">Créez votre compte</Nav.Link>
                            <Nav.Link href="/profil">Profil</Nav.Link>
                            <Nav.Link href="#">Déconnexion</Nav.Link>
                        </Nav>
                    </Navbar.Collapse>
            </Container>
        </Navbar>
    );
};

export default NavBar;