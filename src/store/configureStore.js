import {createStore,combineReducers,applyMiddleware} from "redux"
import {thunk} from "redux-thunk"
import userReducer from "../reducers/userReducer"
import memberReducer from "../reducers/memberReducer"
import ownerReducer from "../reducers/ownerReducer"
const configureStore=()=>{
    const store=createStore(combineReducers({
user:userReducer,
member:memberReducer,
owner:ownerReducer
    }),applyMiddleware(thunk))
    return store

}
export default configureStore