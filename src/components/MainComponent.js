import React, { useState } from 'react';
import Menu from './MenuComponent';
import DishDetail from './DishDetailComponent';
import Header from './HeaderComponent';
import Footer from './FooterComponent';
import Contact from './ContactComponent';
import Home from './HomeComponent';
import About from './AboutComponent';
import { Switch, Route, Redirect } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

const Main = () => {

  const dishes = useSelector(state => state.dishes);
  const comments = useSelector(state => state.comments);
  const promotions = useSelector(state => state.promotions);
  const leaders = useSelector(state => state.leaders);

  const HomePage = () => {
      return(
          <Home dish={dishes.filter((dish) => dish.featured)[0]} comments={comments}
          promotion={promotions.filter((promotion) => promotion.featured)[0]}
          leader={leaders.filter((leader) => leader.featured)[0]}/>
      )
  }

  const DishWithId = ({match}) => {
    return(
      <DishDetail dish={dishes.filter((dish) => dish.id === parseInt(match.params.dishId,10))[0]} 
      comments={comments.filter((comment) => comment.dishId === parseInt(match.params.dishId,10))} />
    )
  }


  return(
    <div className="App">
        <Header />
        <Switch>
            <Route path="/home" component={HomePage} />
            <Route exact path="/menu" component={() => <Menu dishes={dishes} />} />
            <Route path="/menu/:dishId" component={DishWithId} />
            <Route exact path="/contactus" component={Contact} />
            {/*Here is where I implement the new AboutComponent, using the router and passing the leaders.*/}
            <Route exact path="/aboutus" component={() => <About leaders={leaders} />} />          
            <Redirect to="/home" />
        </Switch>
        <Footer />
    </div>
  )
}

export default Main;