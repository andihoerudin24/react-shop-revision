import React,{useState} from 'react';
import {createStore,combineReducers,applyMiddleware} from 'redux'
import {Provider} from 'react-redux'
import ProductReducer from './store/reducer/products'
import authReducer from './store/reducer/auth'
import CartReducer from './store/reducer/cart'
import OrderReducer from './store/reducer/orders'
import AppNavigator from './navigation/AppNavigator'
import {AppLoading} from 'expo'
import * as Font from 'expo-font'
import ReduxThunk from 'redux-thunk'
import * as  Notivications from 'expo-notifications'

console.disableYellowBox = true;
console.ignoredYellowBox = ['Setting a timer'];

Notivications.setNotificationHandler({
  handleNotification:async () =>{
    return {
      shouldShowAlert:true
    }
  }
})

const rootReducer = combineReducers({
    products:ProductReducer,
    cart    :CartReducer,
    orders  :OrderReducer,
    auth: authReducer
})

const store = createStore(rootReducer,applyMiddleware(ReduxThunk))

const fetchFonts = () =>{
   return Font.loadAsync({
      'open-sans':require('./assets/fonts/OpenSans-Regular.ttf'),
      'open-sans-bold':require('./assets/fonts/OpenSans-Bold.ttf')
   })
}

export default function App() {
  const [fontloaded,setFontloaded] = useState(false)
   if(!fontloaded){
       return <AppLoading startAsync={fetchFonts} onFinish={()=>{
         setFontloaded(true)
       }}/>
   } 
  return (
    <Provider store={store}>
       <AppNavigator />
    </Provider>
  );
}
