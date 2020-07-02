import React, { useState, useEffect } from 'react';
import Menu from './MenuComponent';
import DishDetail from './DishDetailComponent';
import Header from './HeaderComponent';
import Footer from './FooterComponent';
import Contact from './ContactComponent';
import Home from './HomeComponent';
import About from './AboutComponent';
import { Switch, Route, Redirect } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { addComment, fetchDishes, fetchComments, fetchPromos } from '../redux/ActionCreators';
import { actions } from 'react-redux-form';

const Main = () => {

  const dispatch = useDispatch();

  const dishes = useSelector(state => state.dishes);
  const comments = useSelector(state => state.comments);
  const promotions = useSelector(state => state.promotions);
  const leaders = useSelector(state => state.leaders);

  const add_Comment = (dishId, rating, author, comment) => dispatch(addComment(dishId, rating, author, comment));
  const fetch_Dishes = () => {dispatch(fetchDishes())};
  const resetFeedbackForm = () => {dispatch(actions.reset('feedback'));}
  const fetch_Comments = () => {dispatch(fetchComments())};
  const fetch_Promos = () => {dispatch(fetchPromos())};

  useEffect(() => {fetch_Dishes(); fetch_Comments(); fetch_Promos(); }, []);

  const HomePage = () => {
      return(
          <Home dish={dishes.dishes.filter((dish) => dish.featured)[0]} comments={comments}
          dishesLoading={dishes.isLoading}
          dishesErrMess={dishes.errMess}
          promotion={promotions.promotions.filter((promotion) => promotion.featured)[0]}
          promoErrMess={promotions.errMess}
          promoLoading={promotions.isLoading}
          leader={leaders.filter((leader) => leader.featured)[0]}/>
      )
  }

  const DishWithId = ({match}) => {
    return(
      <DishDetail dish={dishes.dishes.filter((dish) => dish.id === parseInt(match.params.dishId,10))[0]} 
        isLoading={dishes.isLoading}
        errMess={dishes.errMess}
        comments={comments.comments.filter((comment) => comment.dishId === parseInt(match.params.dishId,10))} 
        commentErrMess={comments.errMess}
        add_Comment={add_Comment}
      />
    )
  }


  return(
    <div className="App">
        <Header />
        <Switch>
            <Route path="/home" component={HomePage} />
            <Route exact path="/menu" component={() => <Menu dishes={dishes} />} />
            <Route path="/menu/:dishId" component={DishWithId} />
            <Route exact path="/contactus" component={() => <Contact resetFeedbackForm={resetFeedbackForm}/>} />
            {/*Here is where I implement the new AboutComponent, using the router and passing the leaders.*/}
            <Route exact path="/aboutus" component={() => <About leaders={leaders} />} />          
            <Redirect to="/home" />
        </Switch>
        <Footer />
    </div>
  )
}

export default Main;