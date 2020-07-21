import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Button,
  FlatList,
} from "react-native";
import { useSelector,useDispatch } from "react-redux";
import Color from "../../constans/Colors";
import CartItems from "../../components/shop/CartItem";
import * as CartAction from '../../store/actions/cart'
import * as OrderAction from '../../store/actions/orders'
import Card from "../../components/UI/Card";


const CartScreen = (props) => {
  const cartTotalAmount = useSelector((state) => state.cart.totalAmount);
  const CartItem = useSelector((state) => {
    const transformedCartItems = [];
    for (const key in state.cart.items) {
      transformedCartItems.push({
        productId: key,
        productTitle: state.cart.items[key].productTitle,
        productPrice: state.cart.items[key].productPrice,
        quantity: state.cart.items[key].quantity,
        sum: state.cart.items[key].sum,
      });
    }
    return transformedCartItems.sort((a,b)=>{
      a.productId > b.productId ? 1 : - 1
    });
  });
  const dispatch = useDispatch()
  return (
    <View style={styles.screen}>
      <Card style={styles.summary}>
        <Text style={styles.summaryText}>
          Total:
          <Text style={styles.amount}>${Math.round(cartTotalAmount.toFixed(2) * 100) / 100}</Text>
        </Text>
        <Button
          title="Order Now"
          color={Color.accent}
          disabled={CartItem.length === 0}
          onPress={()=>{
            dispatch(OrderAction.addOrder(CartItem,cartTotalAmount))         
          }}
        />
      </Card>
      <FlatList
        data={CartItem}
        keyExtractor={(item) => item.productId}
        renderItem={(itemData) => (
          <CartItems
            quantity={itemData.item.quantity}
            title={itemData.item.productTitle}
            amount={itemData.item.sum}
            deletable
            onRemove={() => {
               dispatch(CartAction.removeFormCart(itemData.item.productId))
            }}
          />
        )}
      />
    </View>
  );
};


export const ScreenOptions = (navData) => {
  return {
    headerTitle: 'Cart Screen',
  };
};

const styles = StyleSheet.create({
  screen: {
    margin: 20,
  },
  summary: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 20,
    padding: 10,
  },
  summaryText: {
    fontFamily: "open-sans-bold",
    fontSize: 18,
  },
  amount: {
    color: Color.accent,
  },
});

export default CartScreen;
