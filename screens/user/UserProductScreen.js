import React from "react";
import { View, Text, StyleSheet, FlatList, Button } from "react-native";
import ProductItem from "../../components/shop/ProductItem";
import { useSelector, useDispatch } from "react-redux";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import HeaderButton from "../../components/UI/HeaderButton";
import Colors from "../../constans/Colors";
import * as ProductAction from "../../store/actions/products";
const UserProductScreen = (props) => {
  const userProducts = useSelector((state) => state.products.userProducts);
  const dispatch = useDispatch();

  const editProductHandler = (id) => {
    props.navigation.navigate("EditProduct", {
      productId: id,
    });
  };
  return (
    <FlatList
      data={userProducts}
      keyExtractor={(item) => item.id}
      renderItem={(itemData) => (
        <ProductItem
          image={itemData.item.imageUrl}
          title={itemData.item.title}
          price={itemData.item.price}
          onSelect={() => {}}
        >
          <Button
            color={Colors.primary}
            title="Edit"
            onPress={() => {
              editProductHandler(itemData.item.id);
            }}
          />
          <Button
            color={Colors.primary}
            title="Delete"
            onPress={() => {
              dispatch(ProductAction.deleteProduct(itemData.item.id));
            }}
          />
        </ProductItem>
      )}
    />
  );
};

export const ScreenOptions = (navData) => {
  return {
    headerTitle: "Your Product",
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
            iconName={Platform.OS === "android" ? "md-create" : "ios-create"}
            onPress={() => {
              navData.navigation.navigate('EditProduct');
            }}
          />
        </HeaderButtons>
      );
    },
  };
};

const styles = StyleSheet.create({});
export default UserProductScreen;
