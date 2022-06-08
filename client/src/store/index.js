import { createStore , applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension"
import thunk from "redux-thunk";
import rootReducer from "../reducer";

export const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk)))



//rootreducer es el nmombre de mi reducer, si lo cambio aqui tambien cambia