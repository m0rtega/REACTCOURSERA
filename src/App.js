import React from 'react';
import { Navbar, NavbarBrand } from 'reactstrap';
import './App.css';
import Menu from './components/MenuComponent';

const App = () => (
  <div className="App">
    <Navbar dark color="primary">
      <div className="container">
        <NavbarBrand href="/">
          Whatever
        </NavbarBrand>
      </div>
    </Navbar>
    <Menu />
  </div>
)

export default App;
