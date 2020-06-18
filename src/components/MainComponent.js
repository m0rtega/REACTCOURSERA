import React, { useState } from 'react';
import { Navbar, NavbarBrand } from 'reactstrap';
import Menu from './MenuComponent';
import DishDetail from './DishDetailComponent';
import { DISHES } from '../shared/dishes';

const Main = () => {

  const [dishes, setDishes] = useState(DISHES);

  //we make the state variable for the selected dish
  const [selectedDish, setSelectedDish] = useState(null);

  //function for setting the state variable to a new dish
  function onDishSelect(dish){
      setSelectedDish(dish);
  };


  return(
    <div className="App">
      <Navbar dark color="primary">
        <div className="container">
          <NavbarBrand href="/">
            Whatever
          </NavbarBrand>
        </div>
      </Navbar>
      <Menu dishes={dishes} onClick={(dishId) => onDishSelect(dishId)}/>      
      <DishDetail dish={dishes.filter((dish) => 
        dish.id === selectedDish)[0]
      }/>
    </div>
  )
}

export default Main;