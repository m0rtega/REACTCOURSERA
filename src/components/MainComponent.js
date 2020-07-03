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
import { postComment, fetchDishes, fetchComments, fetchPromos } from '../redux/ActionCreators';
import { actions } from 'react-redux-form';
import { TransitionGroup, CSSTransition } from 'react-transition-group';

const Main = (props) => {

  const dispatch = useDispatch();

  const dishes = useSelector(state => state.dishes);
  const comments = useSelector(state => state.comments);
  const promotions = useSelector(state => state.promotions);
  const leaders = useSelector(state => state.leaders);

  const fetch_Dishes = () => {dispatch(fetchDishes())};
  const resetFeedbackForm = () => {dispatch(actions.reset('feedback'));}
  const fetch_Comments = () => {dispatch(fetchComments())};
  const fetch_Promos = () => {dispatch(fetchPromos())};
  const post_Comment = (dishId, rating, author, comment) => {dispatch(postComment(dishId, rating, author, comment))}

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
        post_Comment={post_Comment}
      />
    )
  }


  return(
    <div className="App">
        <Header />
        <TransitionGroup>
          <CSSTransition key={Location.key} classNames="page" timeout={300}>
            <Switch>
                <Route path="/home" component={HomePage} />
                <Route exact path="/menu" component={() => <Menu dishes={dishes} />} />
                <Route path="/menu/:dishId" component={DishWithId} />
                <Route exact path="/contactus" component={() => <Contact resetFeedbackForm={resetFeedbackForm}/>} />
                {/*Here is where I implement the new AboutComponent, using the router and passing the leaders.*/}
                <Route exact path="/aboutus" component={() => <About leaders={leaders} />} />          
                <Redirect to="/home" />
            </Switch>
          </CSSTransition>
        </TransitionGroup>
        <Footer />
    </div>
  )
}

export default Main;