import React, { useState } from 'react';
import Menu from './MenuComponent';
import DishDetail from './DishDetailComponent';
import { DISHES } from '../shared/dishes';
import Header from './HeaderComponent';
import Footer from './FooterComponent';

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
        <Header />
      <Menu dishes={dishes} onClick={(dishId) => 
        onDishSelect(dishId)}/>      
      <DishDetail dish={dishes.filter((dish) => 
        dish.id === selectedDish)[0]
      }/>
      <Footer />
    </div>
  )
}

export default Main;