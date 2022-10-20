
  /* eslint-disable import/no-anonymous-default-export */
  
import { ALLPOST, LIKE, SHAREPOST, SUB } from "../type"




const initialState = {
  subpost:[],
  posts:[],
  post:{}
}
export default function(state = initialState, action){
  switch (action.type) {
   
    case ALLPOST : return {...state,posts:action.payload}
    case SUB : return {...state, subpost:action.payload}
    case SHAREPOST : return {...state,post:action.payload}
    case LIKE : 
   // const item = state.subpost.find((iteam)=> iteam._id === action.payload._id);
  
   return {
    ...state,
    subpost:{
     ...state.subpost,
     likes:[...state.subpost.likes.filter(action.payload.data)],
   
        }

    }
      default:
          return state
  }
}