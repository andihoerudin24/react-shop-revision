import React from "react";
import { View, Text, FlatList, StyleSheet, Button } from "react-native";
import {useSelector} from 'react-redux'

const CartScreen = (props) => {
  const cartTotalAmount = useSelector(state => state.cart.totalAmount)
  return (
    <View>
      <View>
        <Text>
          Total: <Text>${cartTotalAmount}</Text>
        </Text>
          <Button title="Order Now" />
      </View>
      <View>
            <Text>Cart Items</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({});

export default CartScreen;
