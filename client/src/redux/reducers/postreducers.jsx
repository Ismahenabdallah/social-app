/* eslint-disable import/no-anonymous-default-export */

import { ALLPOST, COMMENT, DISLIKE, LIKE,  SHAREPOST, SUB } from "../type";

const initialState = {
  subpost: [],
  posts: [],
  post: {},
 
  
};
export default function (state = initialState, action) {
  switch (action.type) {
    case ALLPOST:
      return { ...state, posts: action.payload };
    case SUB:
      return { ...state, subpost: action.payload };
    case SHAREPOST:
      return { ...state, post: action.payload };
    case LIKE:
      return {
        ...state,
        subpost: {
          ...state.subpost,
          likes: [...state.subpost.likes, action.payload],
          //likes:[...state.subpost.likes.filter((personId)=>personId!==action.payload.data)],
        },
      };
    case DISLIKE:
      return {
        ...state,
        subpost: {
          ...state.subpost,
          //  likes:[...state.subpost.likes,action.payload.data],
          likes: [
            ...state.subpost.likes.filter(
              (personId) => personId !== action.payload
            ),
          ],
        },
      };
    case COMMENT : return {
      ...state,
      subpost: {
        ...state.subpost,
        comments: [...state.subpost.comments, action.payload.data.comments],
       
      }
    }
   


    /*
      *  return {
        ...state,

        subpost: state.subpost.map(item => {
          if (item._id === action.postId) {
            return {
            
              ...item,
             
             likes:[...state.subpost.likes.filter((personId)=>personId!==action.payload.data)],
    
            }
            
          }
          return item;
        }
        
        )
      };
      */
    default:
      return state;
  }
}
