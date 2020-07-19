import React from "react";
import { View, Text, StyleSheet, FlatList } from "react-native";
import ProductItem from "../../components/shop/ProductItem";
import { useSelector } from "react-redux";
import {HeaderButtons,Item} from 'react-navigation-header-buttons'
import HeaderButton from '../../components/UI/HeaderButton'
const UserProductScreen = (props) => {
  const userProducts = useSelector((state) => state.products.userProducts);
  return (
    <FlatList
      data={userProducts}
      keyExtractor={(item) => item.id}
      renderItem={(itemData) => (
        <ProductItem
          image={itemData.item.imageUrl}
          title={itemData.item.title}
          price={itemData.item.price}
          onViewDetail={() => {}}
          onAddToCart={() => {}}
        />
      )}
    />
  );
};

export const ScreenOptions = (navData) => {
    return {
      headerTitle: 'Your Product',
      headerLeft: () =>{
        return(
          <HeaderButtons HeaderButtonComponent={HeaderButton}>
              <Item title='Cart' iconName={Platform.OS === 'android' ? 'md-menu' : 'ios-menu'}  
              onPress={()=>{
                navData.navigation.openDrawer()
              }} />
          </HeaderButtons>
        )
      },
    };
  };
  

const styles = StyleSheet.create({});
export default UserProductScreen;
