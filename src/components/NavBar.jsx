import React, {useState} from 'react';
import {Container, Navbar, Nav} from 'react-bootstrap';
import {connect} from 'react-redux';
import storage from 'redux-persist/lib/storage';
const NavBar = (props) => {

    const [token, setToken] = useState(props.token)

    return (
        <>
            {token 
            ?  
                <Navbar bg="light" expand="sm">
                    <Container>
                        <Navbar.Brand href="/">Pintabook</Navbar.Brand>
                        <Navbar.Toggle aria-controls="basic-navbar-nav" />
                            <Navbar.Collapse id="basic-navbar-nav" className='flex-grow-0'>
                                <Nav className="me-auto">
                                    <Nav.Link href="/profil">Profil</Nav.Link>
                                    <Nav.Link href="/" onClick={()=>storage.removeItem('persist:Username,token')}>Déconnexion</Nav.Link>
                                </Nav>
                            </Navbar.Collapse>
                    </Container>
                </Navbar> 
            :
                <Navbar bg="light" expand="sm">
                    <Container>
                        <Navbar.Brand href="/">Pintabook</Navbar.Brand>
                        <Navbar.Toggle aria-controls="basic-navbar-nav" />
                        <Navbar.Collapse id="basic-navbar-nav" className='flex-grow-0'>
                            <Nav className="me-auto">
                                <Nav.Link href="/login">Connectez vous</Nav.Link>
                                <Nav.Link href="/signup">Créez votre compte</Nav.Link>
                            </Nav>
                        </Navbar.Collapse>
                    </Container>
                </Navbar> 
            }
        </>
    );
};
function mapStateToProps(state) {
    return {token: state.token}
}
function mapDispacthToProps(dispatch) {
    return {
        USER_LOGGED_OUT: function(logout) {
            dispatch({type:"USER_LOGGED_OUT", logout: logout})
        }
    }
}

export default connect (
    mapStateToProps,
    mapDispacthToProps
)(NavBar);