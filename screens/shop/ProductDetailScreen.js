import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  Button,
  ScrollView,
} from "react-native";
import { useSelector,useDispatch } from "react-redux";
import Colors from "../../constans/Colors";
import * as CartAction from "../../store/actions/cart";
const ProductDetailScreen = (props) => {
  const productId = props.route.params.productId;
  const selectedProduct = useSelector((state) =>
    state.products.avaliableProducts.find((prod) => prod.id === productId)
  );
  const itemreducer = useSelector(state => state.cart.items)
  console.log(itemreducer)
  const dispatch = useDispatch() 
  return (
    <ScrollView>
      <Image style={styles.image} source={{ uri: selectedProduct.imageUrl }} />
      <View style={styles.actions}>
        <Button color={Colors.primary} title="Add to Cart" onPress={()=>{
          dispatch(CartAction.addToCart(selectedProduct))
        }} />
      </View>
      <Text style={styles.price}>${selectedProduct.price.toFixed(2)}</Text>
      <Text style={styles.description}>{selectedProduct.description}</Text>
    </ScrollView>
  );
};

export const ScreenOptions = (navData) => {
  return {
    headerTitle: navData.route.params.productTitle,
  };
};

const styles = StyleSheet.create({
  image: {
    width: "100%",
    height: 300,
  },
  price: {
    fontSize: 20,
    color: "#888",
    marginVertical: 20,
    textAlign: "center",
    fontFamily: "open-sans-bold",
  },
  actions: {
    marginVertical: 10,
    alignItems: "center",
  },
  description: {
    fontFamily: "open-sans",
    fontSize: 14,
    textAlign: "center",
    marginHorizontal: 20,
  },
});

export default ProductDetailScreen;
