import isEmpty from "../../util/isEmpty";
import { FOLLOW, SET_USER, UNFOLLOW, UPDATE } from "../type";


const initialState = {
  isConnected: false,
  user: {},

};
// eslint-disable-next-line import/no-anonymous-default-export
export default function (state = initialState, action) {
  switch (action.type) {
    case SET_USER:
      return {
        ...state,
        isConnected: !isEmpty(action.payload),
        user: action.payload,
      };
      
      case FOLLOW :return{
        ...state,
        user:{
          ...state.user,
          followers:[...state.user.followers,action.payload.data.followers],
          following:[...state.user.following,action.payload.data.following]
         }
      }
      
       case UNFOLLOW :return {
       ...state,
       user:{
        ...state.user,
        followers:[...state.user.followers.filter((personId)=>personId!==action.payload.data)],
      
        following: [...state.user.following.filter((personId)=>personId!==action.payload.data)]
       }

       }
 case UPDATE:
      return {
        ...state,
         user: action.payload,
      };
       
            

    default:
      return state;
  }
}
