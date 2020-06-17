import React from 'react';
import { Card, CardImg, CardImgOverlay, CardText, CardBody,
    CardTitle } from 'reactstrap';

const DishDetail = (props) => {

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

    function renderComments(dish){
        if(dish != null){
            return(
                <div className="list-unstyled">
                    <h4>Comments</h4><hr></hr>
                    {dish.comments.map((comment) => {
                        return(
                            <div key={comment.id}>
                                <div className="comment">{comment.comment}</div><br></br>
                                <div className="author_date">{comment.author}, {comment.date}</div><hr></hr>
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

    return(
        <div className="row">
                <div  className="col-12 col-md-5 m-1">
                    {renderDish(props.dish)}
                </div>
                <div  className="col-12 col-md-5 m-1">
                    {renderComments(props.dish)}
                </div>
        </div>
    )
}

export default DishDetail;