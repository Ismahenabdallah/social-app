/* eslint-disable import/no-anonymous-default-export */

import { ERRORS } from "../type"



const initialState = {}
export default function(state = initialState, action){
  switch (action.type) {
      case ERRORS:
          return {
            ...state,
            errors:action.payload,
          }
  
      default:
          return state
  }
}