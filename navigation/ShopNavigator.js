import React from 'react'
import {createStackNavigator} from '@react-navigation/stack'
import ProductOverViewScreen,{ScreenOptions as ProductOptions} from '../screens/shop/ProductOverviewScreen'
import Colors from '../constans/Colors';
import { Platform } from 'react-native'
import { NavigationContainer } from "@react-navigation/native";
import ProductDetailScreen,{ScreenOptions as ProductDetailScreenOptions} from '../screens/shop/ProductDetailScreen';
import CartScreen from '../screens/shop/CartScreen';
const defaultNvOptions = {
    headerStyle: {
      backgroundColor: Platform.OS === "android" ? Colors.primary : "",
    },
    headerTitleStyle:{
      fontFamily:'open-sans-bold'
    },
    headerBackTitleStyle:{
      fontFamily:'open-sans'
    },
    headerTintColor: Platform.OS === "android" ? "white" : Colors.primary,
  };

const ProdutStackNavigator = createStackNavigator();

export const ProductNavigator = () =>{
    return(
        <ProdutStackNavigator.Navigator screenOptions={defaultNvOptions}>
            <ProdutStackNavigator.Screen 
             name="ProductOverview"
             component={ProductOverViewScreen}
             options={ProductOptions}
            />
            <ProdutStackNavigator.Screen 
             name="ProductDetail"
             component={ProductDetailScreen}
             options={ProductDetailScreenOptions}
            />
            <ProdutStackNavigator.Screen 
             name="CartScreen"
             component={CartScreen}
            />
        </ProdutStackNavigator.Navigator>
    )
}


export default (ShopNavigator = () => {
    return (
      <NavigationContainer>
        <ProductNavigator />
      </NavigationContainer>
    );
  });