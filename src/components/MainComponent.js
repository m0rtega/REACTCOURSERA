import React, { useState } from 'react';
import Menu from './MenuComponent';
import DishDetail from './DishDetailComponent';
import { DISHES } from '../shared/dishes';
import Header from './HeaderComponent';
import Footer from './FooterComponent';
import Home from './HomeComponent';
import { Switch, Route, Redirect } from 'react-router-dom';

const Main = () => {

  const [dishes, setDishes] = useState(DISHES);

  const HomePage = () => {
      return(
          <Home />
      )
  }

  return(
    <div className="App">
        <Header />
        <Switch>
            <Route path="/home" component={HomePage} />
            <Route exact path="/menu" component={() => <Menu dishes={dishes} />} />
            <Redirect to="/home" />
        </Switch>
        <Footer />
    </div>
  )
}

export default Main;