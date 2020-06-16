import React, { useState } from 'react';
import { Navbar, NavbarBrand } from 'reactstrap';
import './App.css';
import Menu from './components/MenuComponent';
import { DISHES } from './shared/dishes';

const App = () => {

  const [dishes, setDishes] = useState(DISHES);

  return(
    <div className="App">
      <Navbar dark color="primary">
        <div className="container">
          <NavbarBrand href="/">
            Whatever
          </NavbarBrand>
        </div>
      </Navbar>
      <Menu dishes={dishes}/>
    </div>
  )
}

export default App;
