import React from 'react';
import { Card, CardImg, CardImgOverlay, CardText, CardBody,
    CardTitle } from 'reactstrap';

//functional component
const DishDetail = (props) => {

    //render method for displaying the details and image of the dish
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

    //render method for mapping the comments of the dish
    //the header is being used, as well as two lines for the comment and author/date
    function renderComments(dish){
        if(dish != null){
            return(
                <div className="list-unstyled">                
                    <h4>Comments</h4><hr></hr>
                    {dish.comments.map((comment) => {
                        return(
                            <div key={comment.id}>
                                <div className="comment">{comment.comment}</div><br></br>
                                <div className="author_date">{comment.author}, {new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'short', day: '2-digit'}).format(new Date(Date.parse(comment.date)))}</div><hr></hr>
                            </div>
                        )
                    })}
                </div>
            )
        } else {
            return(
                <div></div>
            )
        }
    }

    //what is being rendered by the component
    //notice that the bootstrap columns are set in the className
    return(
        <div className="container">
            <div className="row">
                    <div  className="col-12 col-md-5 m-1">
                        {renderDish(props.dish)}
                    </div>
                    <div  className="col-12 col-md-5 m-1">
                        {renderComments(props.dish)}
                    </div>
            </div>
        </div>
    )
}

export default DishDetail;