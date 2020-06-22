import React from 'react';
import { Card, CardImg, CardImgOverlay, CardText, CardBody,
    CardTitle, Breadcrumb, BreadcrumbItem } from 'reactstrap';
import { Link } from 'react-router-dom';

//render method for displaying the details and image of the dish
function RenderDish({dish}){
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
function RenderComments({comments}){
    if(comments != null){
        return(
            <div className="list-unstyled">                
                <h4>Comments</h4><hr></hr>
                {comments.map((comment) => {
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

//functional component
const DishDetail = (props) => {

    //what is being rendered by the component
    //notice that the bootstrap columns are set in the className
    return(
            <div className="container">
            <div className="row">
                <Breadcrumb>
                    <BreadcrumbItem><Link to="/menu">Menu</Link></BreadcrumbItem>
                    <BreadcrumbItem active>{props.dish.name}</BreadcrumbItem>
                </Breadcrumb>
                <div className="col-12">
                    <h3>{props.dish.name}</h3>
                    <hr />
                </div>                
            </div>
            <div className="row">
                <div className="col-12 col-md-5 m-1">
                    <RenderDish dish={props.dish} />
                </div>
                <div className="col-12 col-md-5 m-1">
                    <RenderComments comments={props.comments} />
                </div>
            </div>
            </div>
    )
}

export default DishDetail;