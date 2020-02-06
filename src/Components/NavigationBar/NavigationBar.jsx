import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import UserCTX from '../../Context/UserCTX';
import {
  UncontrolledCollapse,
  NavbarBrand,
  Navbar,
  NavItem,
  NavLink,
  Nav,
  Row,
  Col,
} from 'reactstrap';
import './NavigationBar.css';

function NavigationBar() {

  const user = useContext(UserCTX);

  const disconnect = () => {
    localStorage.removeItem('token');
  }

  return (
    <Navbar className="navigation navbar-horizontal" expand="lg">
      <NavbarBrand>
        <Link to={`${process.env.PUBLIC_URL}/`} > 
          <img src={`${process.env.PUBLIC_URL}/assets/pics/logoApp.png`} alt="logo EditeOnline" id="logo" />
        </Link>
      </NavbarBrand>
      <button
        aria-controls="navbar-primary"
        aria-expanded={false}
        aria-label="Toggle navigation"
        className="navbar-toggler"
        data-target="#navbar-primary"
        data-toggle="collapse"
        id="navbar-primary"
        type="button"
      >
        <span className="navbar-toggler-icon" />
      </button>
      <UncontrolledCollapse navbar toggler="#navbar-primary">
        <div className="navbar-collapse-header">
          <Row>
            <Col className="collapse-brand" xs="6">
              EditeOnline
            </Col>
            <Col className="collapse-close" xs="6">
              <button
                aria-controls="navbar-primary"
                aria-expanded={false}
                aria-label="Toggle navigation"
                className="navbar-toggler"
                data-target="#navbar-primary"
                data-toggle="collapse"
                id="navbar-primary"
                type="button"
              >
                <span />
                <span />
              </button>
            </Col>
          </Row>
        </div>
        <Nav className="ml-lg-auto">
          <NavItem>
            <NavLink onClick={e => e.preventDefault()}>
              <Link to={`${process.env.PUBLIC_URL}/register`} > 
                Enregistrez-vous
              </Link>
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink onClick={e => e.preventDefault()}>
              <Link to={`${process.env.PUBLIC_URL}/login`} > 
                Identifiez-vous
              </Link>
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink onClick={disconnect}>
              <Link to={`${process.env.PUBLIC_URL}/menu`} > 
                Déconnectez-vous
              </Link>
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink href="#" onClick={e => e.preventDefault()}>
              Aide
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink a href="ecoute-ecrit.fr/index.html" onClick={e => e.preventDefault()}>
              A propos
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink href="#" onClick={e => e.preventDefault()}>
              <span className="flag-icon flag-icon-fr" />
            </NavLink>
          </NavItem>
        </Nav>
      </UncontrolledCollapse>
    </Navbar>
  );
}

export default NavigationBar;
