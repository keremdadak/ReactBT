import React, { Component } from 'react';
import { Navbar, NavbarBrand, NavbarToggler, Collapse, Nav, NavItem, NavLink,NavbarText } from "reactstrap";
import CartSummary from './CartSummary';
class Navi extends Component {
  render() {
    return (
      <div>
        <div>
          <Navbar
            color="light"
            expand="md"
            light
          >
            <NavbarBrand href="/">
              Northwind App
            </NavbarBrand>
            <NavbarToggler onClick={function noRefCheck() { }} />
            <Collapse navbar>
              <Nav
                className="me-auto"
                navbar
              >
                <NavItem>
                  <NavLink href="/components/">
                    Components
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink href="https://github.com/reactstrap/reactstrap">
                    GitHub
                  </NavLink>
                </NavItem>
                <CartSummary removeFromCart={this.props.removeFromCart} cart={this.props.cart}/>
              </Nav>
             
            </Collapse>
          </Navbar>
        </div>
      </div>
    )
  }
}
export default Navi;
