import React, { useState } from 'react';
import { Card, CardImg, CardText, CardBody,
    CardTitle, Breadcrumb, BreadcrumbItem, Button, Modal, ModalHeader, ModalBody, Label, Col, Row } from 'reactstrap';
import { Link } from 'react-router-dom';
import { Control, LocalForm, Errors } from 'react-redux-form';
import { Loading } from './LoadingComponent';

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
function RenderComments({comments, add_Comment, dishId}){
    if(comments != null){
        return(
            <>
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
            {/*We insert the CommentForm in the RenderComments to show the Modal with the Form. Toggled by a button.*/}
            <CommentForm dishId={dishId} add_Comment={add_Comment} />
            </>
        )
    } else {
        return(
            <div></div>
        )
    }
}

//CommentForm that displays the Modal for submitting a comment
const CommentForm = (props) => {
    
    //The various validators used for the author controller
    const required = (val) => val && val.length;
    const maxLength = (len) => (val) => !(val) || (val.length <= len);
    const minLength = (len) => (val) => val && (val.length >= len);

    //The isModalOpen used to toggle the Modal. Here, it is set to false
    const [isModalOpen, setIsModalOpen] = useState(false);

    //The function that handles the submit for the form. Currently it doesnt do much.
    const handleSubmit = (values) => {
        toggleModal();
        props.add_Comment(props.dishId, values.rating, values.author, values.comment);
    }

    //The function that toggles the modal. For some reason, if not done this way
    //the whole thing doesnt work. I thought it could be done with the hook but 
    //it doesn't so who knows.
    const toggleModal = () => {
        setIsModalOpen(!isModalOpen);
    }

    //Here is the whole thing. The button, the modal and the form.
    return(
    <>
        {/*Button that toggles the modal. */}
        <Button outline onClick={toggleModal}><span className="fa fa-pencil fa-lg"></span> Submit Comment</Button>

        {/*The modal that shows the form. */}
        <Modal isOpen={isModalOpen} toggle={toggleModal}>
            <ModalHeader toggle={toggleModal}>Submit Comment</ModalHeader>
            <ModalBody>

                {/*The form that was requested. It uses the react-redux-form */}
                <LocalForm onSubmit={(values) => handleSubmit(values)}>

                    {/*The rating controller. It uses a select control, with options from 1 to 5. */}
                    <Row className="form-group">
                        <Col md={10}>
                            <Label htmlFor="rating" md={2}>Rating</Label>
                            <Control.select model=".rating" id="rating" name="rating">
                                <option value={null}>-Choose a value-</option>
                                <option value="1">1</option>
                                <option value="2">2</option>
                                <option value="3">3</option>
                                <option value="4">4</option>
                                <option value="5">5</option>
                            </Control.select>
                        </Col>
                    </Row>

                    {/*The author text control which is verified by the validators at the top. Minimum len of 3, max len of 15 and it is required */}
                    <Row className="form-group">
                        <Col md={10}>
                            <Label htmlFor="author" md={2}>Your Name</Label>
                            <Control.text model=".author" id="author" name="author"
                                placeholder="Author name"
                                className="form-control"
                                validators={{
                                    required, minLength: minLength(3), maxLength: maxLength(15)
                                }}
                                />     
                                
                                {/*Show errors for the invalid inputs.*/}
                                <Errors
                                    className="text-danger" 
                                    model=".author"
                                    show="touched"
                                    messages={{
                                        required: 'Required, ',
                                        minLength: 'Must be greater than 2 characters',
                                        maxLength: 'Must be 15 characters or less'
                                    }}
                                >   
                                </Errors>                           
                        </Col>
                    </Row>

                    {/*The comment control, which is a text area of 6 rows. Nothing more to add. */}
                    <Row className="form-group">                            
                        <Col md={10}>
                            <Label htmlFor="message" md={2}>Comment</Label>
                            <Control.textarea model=".comment" id="comment" name="comment"
                                rows="6"
                                className="form-control" />
                        </Col>
                    </Row>

                    {/*Submit button for the form.*/}
                    <Row className="form-group">                            
                        <Col md={{size: 10, offset: 2}}>
                            <Button type="submit" color="primary">
                                Submit
                            </Button>
                        </Col>
                    </Row>
                </LocalForm>
            </ModalBody>
        </Modal>
    </>
    )
}

//functional component
const DishDetail = (props) => {

    if(props.isLoading){
        return(
            <div className="container">
                <div className="row">
                    <Loading />
                </div>
            </div>
        )
    } else if (props.errMess){
        return(
            <div className="container">
                <div className="row">
                    <h4>{props.errMess}</h4>
                </div>
            </div>
        )
    } else if (props.dish != null)
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
                        <RenderComments comments={props.comments} 
                        add_Comment={props.add_Comment}
                        dishId={props.dish.id}/>
                    </div>
                </div>
                </div>
        )
}

export default DishDetail;