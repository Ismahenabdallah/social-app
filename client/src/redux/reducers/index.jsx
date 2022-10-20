import { combineReducers } from "redux";

import authReducer from './authreducers'
import errorsReducer from './errorsReducer'
import Oneuserreducer from "./Oneuserreducer";
import userReducers from "./userReducers";
import postreducers from "./postreducers";


export default combineReducers({
    auth: authReducer,
    errors: errorsReducer,
    users: userReducers,
    profile: Oneuserreducer,
    post:postreducers,
   
   
    

  
})