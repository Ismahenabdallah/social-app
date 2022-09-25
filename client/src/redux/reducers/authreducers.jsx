import isEmpty from "../../util/isEmpty";
import { FOLLOW, SET_USER, UNFOLLOW } from "../type";


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
       auth: {
        ...state.auth, 
        user: {...state.auth.user,
           following: [...state.auth.user.following, action.data]} }}
      
       case UNFOLLOW :return {
       ...state, auth: {...state.auth,
         user: {...state.auth.user,
          following: [...state.auth.user.following.filter((personId)=>personId!==action.data)]
        } }}

       
            

    default:
      return state;
  }
}
