import React from "react";
import { useSelector } from "react-redux";
import { NavigationContainer } from "@react-navigation/native";
//import {createStackNavigator} from '@react-navigation/stack'
import { ShopNavigation,AuthNavigator } from "./ShopNavigator";
import StartupScreen from '../screens/StartupScreen'


const AppNavigator = (props) => {
  const isAuth = useSelector((state) => !!state.auth.token);
  const didTryAutoLogin = useSelector((state) => state.auth.didTryAutoLogin);
  return (
  <NavigationContainer>
      {isAuth && <ShopNavigation />}
      {!isAuth && didTryAutoLogin && <AuthNavigator />}
      {!isAuth && !didTryAutoLogin && <StartupScreen />}
    </NavigationContainer>
  );
};

export default AppNavigator;
