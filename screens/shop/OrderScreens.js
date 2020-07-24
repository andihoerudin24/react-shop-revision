import React,{useState,useEffect,useCallback} from "react";
import { View, FlatList, StyleSheet, Text, Platform,ActivityIndicator } from "react-native";
import { useSelector,useDispatch } from "react-redux";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import HeaderButton from "../../components/UI/HeaderButton";
import OrderItem from "../../components/shop/OrderItems";
import * as OrderAction from '../../store/actions/orders'
import Colors from "../../constans/Colors";
const OrderScreen = (props) => {
  const Orders = useSelector((state) => state.orders.orders);
  const dispatch = useDispatch()
  const [loading,setisloading]= useState(false)
   
  useEffect(()=>{
     const res = props.navigation.addListener('focus',()=>{
        Orders
     })
     return res
  },[Orders]) 
  
  useEffect(()=>{
      setisloading(true)
      dispatch(OrderAction.fetchOrder())
      .then(() => {
           setisloading(false)   
      })
  },[dispatch,setisloading])
  
  if(loading){
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color={Colors.primary}/>
      </View>
    )
  }

  return (
    <FlatList
      data={Orders}
      keyExtractor={(item) => item.id}
      renderItem={(itemData) => (
        <OrderItem
          amount={itemData.item.totalAmount}
          date={itemData.item.readableDate}
          items={itemData.item.items}
        />
      )}
    />
  );
};

export const ScreenOptions = (NavData) => {
  return {
    headerTitle: "Your Order",
    headerLeft: () => {
      return (
        <HeaderButtons HeaderButtonComponent={HeaderButton}>
          <Item
            title="Cart"
            iconName={Platform.OS === "android" ? "md-menu" : "ios-menu"}
            onPress={() => {
              NavData.navigation.openDrawer();
            }}
          />
        </HeaderButtons>
      );
    },
  };
};

const styles = StyleSheet.create({
  centered:{
    flex:1,
    justifyContent:'center',
    alignItems:'center'
  }
});

export default OrderScreen;
