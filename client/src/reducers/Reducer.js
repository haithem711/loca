export const initialState=null
export const reducer=(state,action)=>{
    if (action.type==='USER'){
        return action.payload
    }
    if(action.type==='CLEAR'){
        return null
    }
    if(action.type==="UPDATEMAIL"){
        return {
            ...state,
            email:action.payload
        }
    }
  /*  if(action.type==="UPDATE"){
        return  action.payload
            }*/
   if(action.type==="UPDATE"){
        return {
            ...state,
            numtel:action.payload,
            ville:action.payload
        }
    }
    if(action.type==="CONFIRMED"){
        return {
            ...state,
            
            confirmed:action.payload
        }
    }
    if(action.type==="NAME"){
        return {
            ...state,
            
            name:action.payload
        }
    }
   
    return state
}