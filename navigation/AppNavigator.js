import React from "react";
import { useSelector } from "react-redux";
import { NavigationContainer } from "@react-navigation/native";
//import {createStackNavigator} from '@react-navigation/stack'
import { ShopNavigation,AuthNavigator } from "./ShopNavigator";
//import StartupScreen from '../screens/startupScrenn'
//const MyStack = createStackNavigator();

const AppNavigator = (props) => {
  //const isAuth = useSelector((state) => !!state.auth.token);
  //const didTryAutoLogin = useSelector((state) => state.auth.didTryAutoLogin);
  return (
    <NavigationContainer>
      <AuthNavigator />
      {/* <ShopNavigation /> */}
    </NavigationContainer>
  );
};

export default AppNavigator;
