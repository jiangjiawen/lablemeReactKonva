import { createStore, combineReducers, applyMiddleware } from "redux";
import thunkMiddleware from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import { regionsReducer } from "./regions/reducers";
import { nodemenuReducer } from "./menucontrol/reducers";


const rootReducer = combineReducers({
    regions: regionsReducer,
    nodemenuControl: nodemenuReducer
})

export type AppState = ReturnType<typeof rootReducer>;

export default function configureStore() {
    const middlewares = [thunkMiddleware]
    const middlewareEnhancer = applyMiddleware(...middlewares);
    const store = createStore(rootReducer, composeWithDevTools(middlewareEnhancer));
    return store
}