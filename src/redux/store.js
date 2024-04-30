import { createStore, applyMiddleware, combineReducers } from 'redux';
import thunk from 'redux-thunk';
import { userFormReducer } from './reducers/userFormReducers';
import { composeWithDevTools } from 'redux-devtools-extension';

const middleware = [thunk];

const rootReducer = combineReducers({
    users_Form: userFormReducer
})

const store = createStore(
    rootReducer,
    composeWithDevTools(applyMiddleware(...middleware))
);

export default store;