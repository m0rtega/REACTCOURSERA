import React, { useState, useEffect } from "react";
import { Card, CardImg, CardImgOverlay, CardText, CardBody,
    CardTitle } from 'reactstrap';

//Functional component
const Menu = (props) => {

    //menu variable that maps and renders the images and "buttons" of the dishes array
    const menu = props.dishes.map((dish, index) => {
        return(
            <div key={index} className="col-12 col-md-5 m-1">
                <Card key={dish.id}
                  onClick={() => props.onClick(dish.id)}>
                  <CardImg width="100%" src={dish.image} alt={dish.name} />
                  <CardImgOverlay>
                      <CardTitle>{dish.name}</CardTitle>
                  </CardImgOverlay>
                </Card>
            </div>
        )
    });

    //What is rendered in the DishDetailsComponent
    //Notice how the DishDetail component is being used and the selectedDish
    //state variable is being passed as a prop
    return(
        <div className="container">
            <div className="row">
                    {menu}
            </div>
        </div>
    )
}

export default Menu;