import { createStore, combineReducers } from 'redux'
import { persistStore, persistReducer } from 'redux-persist'
// import storageSession from 'redux-persist/lib/storage/session' /// could be stored in session
import storage from 'redux-persist/lib/storage'
import Username from './Reducers/Username';
import token from './Reducers/Token';

const reducer = combineReducers({
    Username: Username,
    token: token
})
const persistConfig = {
  key: ['Username', 'token'],
  storage,
//   storage: storageSession, /// session storage configuration
}

const persistedReducer = persistReducer(persistConfig, reducer)

export const store = createStore(persistedReducer)
export const persistor = persistStore(store)


export const rootReducer = (token, action) => {
  if (action.type === "USER_LOGGED_OUT") {
    token = undefined;
    storage.removeItem('persist:token');
  }
  return reducer(token, action)
}