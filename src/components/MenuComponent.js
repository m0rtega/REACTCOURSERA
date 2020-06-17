import React, { useState, useEffect } from "react";
import { Card, CardImg, CardImgOverlay, CardText, CardBody,
    CardTitle } from 'reactstrap';
import DishDetail from './DishDetailComponent';


const Menu = (props) => {

    const [selectedDish, setSelectedDish] = useState(null);

    function onDishSelect(dish){
        setSelectedDish(dish);
    };

    function renderDish(dish){
        if (dish != null)
            return(
                <Card>
                    <CardImg top src={dish.image} alt={dish.name} />
                    <CardBody>
                      <CardTitle>{dish.name}</CardTitle>
                      <CardText>{dish.description}</CardText>
                    </CardBody>
                </Card>
            );
        else
            return(
                <div></div>
            );
    }

    const menu = props.dishes.map((dish, index) => {
        return(
            <div key={index} className="col-12 col-md-5 m-1">
                <Card key={dish.id}
                  onClick={() => onDishSelect(dish)}>
                  <CardImg width="100%" src={dish.image} alt={dish.name} />
                  <CardImgOverlay>
                      <CardTitle>{dish.name}</CardTitle>
                  </CardImgOverlay>
                </Card>
            </div>
        )
    });

    return(
        <div className="container">
            <div className="row">
                    {menu}
            </div>
            <DishDetail dish={selectedDish}/>
        </div>
    )
}

export default Menu;