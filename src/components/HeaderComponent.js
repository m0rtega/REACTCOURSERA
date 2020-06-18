import React from 'react';
import { Navbar, NavbarBrand, Jumbotron } from 'reactstrap';

const Header = (props) => {
    return(
        <>
        <Navbar dark color="primary">
            <div className="container">
            <NavbarBrand href="/">
                Whatever
            </NavbarBrand>
            </div>
      </Navbar>
      <Jumbotron>
          <div className="container">
                <div className="row row-header">
                    <div className="col-12 col-sm-6">
                        <h1>Whatever</h1>
                        <p>Text</p>
                    </div>
                </div>
          </div>
      </Jumbotron>
        </>
    )
}

export default Header;