import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet} from 'react-native';
import {createStore,combineReducers} from 'redux'
import {Provider} from 'react-redux'
import ProductReducer from './store/reducer/products'
import ShopNavigator from './navigation/ShopNavigator'

const rootReducer = combineReducers({
    products:ProductReducer
})

const store = createStore(rootReducer)

export default function App() {
  return (
    <Provider store={store}>
      <ShopNavigator/>
    </Provider>
  );
}
