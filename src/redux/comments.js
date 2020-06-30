import { COMMENTS } from '../shared/comments';
import * as ActionTypes from './ActionTypes';

export const Comments = (state = COMMENTS, action) => {
    switch (action.type) {    
        case ActionTypes.ADD_COMMENT:
            let comment = action.payload;
            comment.id = state.length;
            comment.date = new Date().toISOString();
            console.log("Comment ", comment); 
            console.log(state.concat(comment));
            const newState = state.concat(comment);
            return newState;
        default:
            return state;
    }
}