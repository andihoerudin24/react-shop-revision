import React,{useState} from 'react';
import {createStore,combineReducers} from 'redux'
import {Provider} from 'react-redux'
import ProductReducer from './store/reducer/products'
import ShopNavigator from './navigation/ShopNavigator'
import {AppLoading} from 'expo'
import * as Font from 'expo-font'

const rootReducer = combineReducers({
    products:ProductReducer
})

const store = createStore(rootReducer)

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
      <ShopNavigator/>
    </Provider>
  );
}
