const initialvalue={
    data:[],
    workout:[],
    serverErrors:[],
    
}
 const memberReducer=(state=initialvalue,action)=>{
    switch(action.type){
        case "ADD_MEMBER_PROFILE":{
            return {...state,data:action.payload}
        }
        case "UPDATE_MEMBER_PROFILE":{
            return {...state,data:state.data.map(profile =>
                profile._id === action.payload._id ? action.payload : profile
            )}
        }
       case "ADD_WORKOUT_SCHEDULE":{
        return {...state,workout:action.payload}
       }
       case "SET_DELETE_WORKOUT":{
        return {...state,workout:state.data.filter((ele)=>{
            return ele._id!==action.payload
        })}
       }
   
        case "SET_ERRORS":{
            return {...state,serverErrors:action.payload}
        }
default:{
    return {...state}
}
    }
}
export default memberReducer