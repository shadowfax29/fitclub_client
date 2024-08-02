const initialValue={
    data:{},
    gym:{},
    images:[],
    subscription:[],
    serverErrors:[]
}
 const ownerReducer=(state=initialValue,action)=>{
switch(action.type){
    // case 'ADD_PROFILE_PHOTO':
    //         return {
    //             ...state,
    //             data: action.payload 
    //         };
    case "ADD_GYM":{
        return{...state,gym:action.payload}
    }
    case "ADD_IMAGES":{
        return{...state,images: action.payload}
    }
    case "DELETE_IMAGE":{
        return{...state,
            images:action.payload
    }}
    case "UPDATE_IMAGE":{
        return{...state,
            images: state.images.map((ele) => {
              if (ele._id === action.payload.imgId) {
                return { ...ele, img: action.payload.result };
              }
              return ele;
            })}
    }
    case "UPDATE_GYM":{
        return{...state,gym:action.payload}
    }
    case "ADD_SUBSCRIPTION":{
        return{...state,subscription:action.payload}
    }
    case "EDIT_SUBSCRIPTION":{
        return{...state,subscription:state.subscription.map((ele,i)=>{
            if(ele._id===action.payload._id){
                return action.payload
            }
        })}

    }
    case "REMOVE_SUBSCRIPTION":{
        return{...state,subscription:state.subscription.filter((ele)=>{
            return ele._id !== action.payload
        })}
    }
    case "ERROR":{
        return{...state,serverErrors:action.payload}
    }
    default:{
        return {...state}
    }
}
}
export default ownerReducer