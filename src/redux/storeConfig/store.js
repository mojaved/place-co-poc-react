import { legacy_createStore, applyMiddleware, compose } from "redux"
import createDebounce from "redux-debounced"
import thunk from "redux-thunk"
import rootReducer from "../reducers/rootReducer"

const middleWares = [thunk, createDebounce()]

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
const store = legacy_createStore(
  rootReducer,
  {},
  composeEnhancers(applyMiddleware(...middleWares))
)

export { store };
