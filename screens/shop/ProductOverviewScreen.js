import React from "react";
import { View, FlatList, Text, Platform, Button } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import HeaderButton from "../../components/UI/HeaderButton";
import ProductItem from "../../components/shop/ProductItem";
import * as CartAction from "../../store/actions/cart";
import Colors from "../../constans/Colors";

const ProductOverViewScreen = (props) => {
  const products = useSelector((state) => state.products.avaliableProducts);
  const dispatch = useDispatch();
  const selectItemHandler = (id, title) => {
    props.navigation.navigate("ProductDetail", {
      productId: id,
      productTitle: title,
    });
  };
  return (
    <FlatList
      data={products}
      renderItem={(itemData) => (
        <ProductItem
          image={itemData.item.imageUrl}
          title={itemData.item.title}
          price={itemData.item.price}
          onSelect={() => {
            selectItemHandler(itemData.item.id, itemData.item.title);
          }}
        >
          <Button
            color={Colors.primary}
            title="View Detail"
            onPress={() => {
              selectItemHandler(itemData.item.id, itemData.item.title);
            }}
          />
          <Button
            color={Colors.primary}
            title="To Cart"
            onPress={()=>{
                dispatch(CartAction.addToCart(itemData.item));
            }}
          />
        </ProductItem>
      )}
      keyExtractor={(item) => item.id}
    />
  );
};

export const ScreenOptions = (navData) => {
  return {
    headerTitle: "All Products",
    headerLeft: () => {
      return (
        <HeaderButtons HeaderButtonComponent={HeaderButton}>
          <Item
            title="Cart"
            iconName={Platform.OS === "android" ? "md-menu" : "ios-menu"}
            onPress={() => {
              navData.navigation.openDrawer();
            }}
          />
        </HeaderButtons>
      );
    },
    headerRight: () => {
      return (
        <HeaderButtons HeaderButtonComponent={HeaderButton}>
          <Item
            title="Cart"
            iconName={Platform.OS === "android" ? "md-cart" : "ios-cart"}
            onPress={() => {
              navData.navigation.navigate("CartScreen");
            }}
          />
        </HeaderButtons>
      );
    },
  };
};

export default ProductOverViewScreen;
