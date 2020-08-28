import { createStore, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk'
import promiseMiddleware from 'redux-promise-middleware'

export default (rootReducer) => {
    const middleware = [
        thunk,
        promiseMiddleware
    ]

    const composeEnhancers = compose;
    const store = createStore(rootReducer, composeEnhancers(applyMiddleware(...middleware)))

    return store;
}