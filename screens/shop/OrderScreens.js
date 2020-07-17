import React from "react";
import { View, FlatList, StyleSheet, Text,Platform } from "react-native";
import { useSelector } from "react-redux";
import { HeaderButtons,Item } from "react-navigation-header-buttons";
import HeaderButton from '../../components/UI/HeaderButton'
const OrderScreen = (props) => {
  const Orders = useSelector((state) => state.orders.orders);
  return (
     <FlatList
      data={Orders}
      keyExtractor={item => item.id}
      renderItem={itemData => (
      <Text>{itemData.item.totalAmount}</Text>
      )}
     />
  );
};

export const ScreenOptions = (NavData) => {
     return{
         headerTitle:'Your Order',
         headerLeft : () =>{
             return(
                <HeaderButtons HeaderButtonComponent={HeaderButton}>
                <Item title='Cart' iconName={Platform.OS === 'android' ? 'md-menu' : 'ios-menu'}  
                onPress={()=>{
                  NavData.navigation.openDrawer()
                }} />
            </HeaderButtons>
             )
         }
     }
};

const styles = StyleSheet.create({});

export default OrderScreen;
