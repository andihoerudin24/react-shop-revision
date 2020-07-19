import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import ProductOverViewScreen, {
  ScreenOptions as ProductOptions,
} from "../screens/shop/ProductOverviewScreen";
import Colors from "../constans/Colors";
import { Platform } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import ProductDetailScreen, {
  ScreenOptions as ProductDetailScreenOptions,
} from "../screens/shop/ProductDetailScreen";
import CartScreen, {
  ScreenOptions as CartScreenOption,
} from "../screens/shop/CartScreen";
import OrderScreen, {
  ScreenOptions as OrderScreenOptions,
} from "../screens/shop/OrderScreens";
import { createDrawerNavigator } from "@react-navigation/drawer";
import UserProductScreen,{ScreenOptions} from '../screens/user/UserProductScreen'
import { Ionicons } from "@expo/vector-icons";

const defaultNvOptions = {
  headerStyle: {
    backgroundColor: Platform.OS === "android" ? Colors.primary : "",
  },
  headerTitleStyle: {
    fontFamily: "open-sans-bold",
  },
  headerBackTitleStyle: {
    fontFamily: "open-sans",
  },
  headerTintColor: Platform.OS === "android" ? "white" : Colors.primary,
};

const ProdutStackNavigator = createStackNavigator();
export const ProductNavigator = () => {
  return (
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
        options={CartScreenOption}
      />
    </ProdutStackNavigator.Navigator>
  );
};

const OrderStackNavigator = createStackNavigator();
export const OrdersNavigator = () => {
  return (
    <OrderStackNavigator.Navigator screenOptions={defaultNvOptions}>
      <OrderStackNavigator.Screen
        name="Orders"
        component={OrderScreen}
        options={OrderScreenOptions}
      />
    </OrderStackNavigator.Navigator>
  );
};

const UserProductStackNavigator = createStackNavigator();
export const AdminNavigator = () => {
  return (
    <UserProductStackNavigator.Navigator screenOptions={defaultNvOptions}>
      <UserProductStackNavigator.Screen
        name="Admin"
        component={UserProductScreen}
        options={ScreenOptions}
      />
    </UserProductStackNavigator.Navigator>
  );
};

const ShopDrawerNavigator = createDrawerNavigator();
export const ShopNavigation = () => {
  return (
    <ShopDrawerNavigator.Navigator
      drawerContentOptions={{
        activeTintColor: Colors.primary,
      }}
    >
      <ShopDrawerNavigator.Screen
        name="Product"
        component={ProductNavigator}
        options={{
          drawerIcon: (props) => (
            <Ionicons
              name={Platform.OS === "android" ? "md-cart" : "ios-cart"}
              size={23}
              color={props.color}
            />
          ),
        }}
      />
      <ShopDrawerNavigator.Screen
        name="Orders"
        component={OrdersNavigator}
        options={{
          drawerIcon: (props) => (
            <Ionicons
              name={Platform.OS === "android" ? "md-list" : "ios-list"}
              size={23}
              color={props.color}
            />
          ),
        }}
      />
      <ShopDrawerNavigator.Screen
        name="Admin"
        component={AdminNavigator}
        options={{
          drawerIcon: (props) => (
            <Ionicons
              name={Platform.OS === "android" ? "md-create" : "ios-create"}
              size={23}
              color={props.color}
            />
          ),
        }}
      />
    </ShopDrawerNavigator.Navigator>
  );
};
export default ShopNavigator = () => {
  return (
    <NavigationContainer>
      <ShopNavigation />
    </NavigationContainer>
  );
};
