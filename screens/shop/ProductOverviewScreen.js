import React from "react";
import { View, FlatList, Text,Platform } from "react-native";
import { useSelector,useDispatch } from "react-redux";
import {HeaderButtons,Item} from 'react-navigation-header-buttons'
import HeaderButton from '../../components/UI/HeaderButton'
import ProductItem from "../../components/shop/ProductItem";
import * as CartAction  from '../../store/actions/cart'

const ProductOverViewScreen = (props) => {
  const products = useSelector((state) => state.products.avaliableProducts);
  const dispatch = useDispatch()
  return (
    <FlatList
      data={products}
      renderItem={(itemData) => (
        <ProductItem
          image={itemData.item.imageUrl}
          title={itemData.item.title}
          price={itemData.item.price}
          onViewDetail={() => {
              props.navigation.navigate('ProductDetail',{
                  productId:itemData.item.id,
                  productTitle:itemData.item.title
              })
          }}
          onAddToCart={() => {
            dispatch(CartAction.addToCart(itemData.item))
          }}
        />
      )}
      keyExtractor={(item) => item.id}
    />
  );
};

export const ScreenOptions = (navData) => {
  return {
    headerTitle: "All Products",
    headerRight: () =>{
        return(
          <HeaderButtons HeaderButtonComponent={HeaderButton}>
              <Item title='Cart' iconName={Platform.OS === 'android' ? 'md-cart' : 'ios-cart'}  
              onPress={()=>{
                navData.navigation.navigate('CartScreen')
              }} />
          </HeaderButtons>
        )
    }
  };
};

export default ProductOverViewScreen;
