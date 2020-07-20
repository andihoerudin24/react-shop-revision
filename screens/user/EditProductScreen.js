import React, { useState, useCallback, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  ScrollView,
  Platform,
  YellowBox,
} from "react-native";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import HeaderButton from "../../components/UI/HeaderButton";
import { useSelector, useDispatch } from "react-redux";
import { CommonActions } from "@react-navigation/native";
import * as productsAction from "../../store/actions/products";

YellowBox.ignoreWarnings([
  "Non-serializable values were found in the navigation state",
]);

const EditProductScreen = (props) => {
  const dispatch = useDispatch();
  const productId = props.route.params ? props.route.params.productId : "";
  const Editedproduct = useSelector((state) =>
    state.products.userProducts.find((prod) => prod.id === productId)
  );

  const [title, setTitle] = useState(Editedproduct ? Editedproduct.title : "");
  const [imageUrl, setImageUrl] = useState(
    Editedproduct ? Editedproduct.imageUrl : ""
  );
  const [price, setPrice] = useState('');
  const [description, setDescription] = useState(
    Editedproduct ? Editedproduct.description : ""
  );

  const submitHandler = useCallback(() => {
     if(Editedproduct){
       dispatch(productsAction.updateProduct(productId,title,description,imageUrl))
     }else{
       dispatch(productsAction.createProduct(title,description,imageUrl, +price))
     }
  }, [dispatch, productId, title, description, imageUrl, price]);
   
  //console.log(price)
  useEffect(() => {
    props.navigation.dispatch(
      CommonActions.setParams({ submit: submitHandler })
    );
  }, [submitHandler]);

  return (
    <ScrollView>
      <View style={styles.form}>
        <View style={styles.formControl}>
          <Text style={styles.label}>Title</Text>
          <TextInput
            style={styles.input}
            value={title}
            onChangeText={(text) => setTitle(text)}
          />
        </View>
        <View style={styles.formControl}>
          <Text style={styles.label}>Image URL</Text>
          <TextInput
            style={styles.input}
            value={imageUrl}
            onChangeText={(text) => setImageUrl(text)}
          />
        </View>
        {Editedproduct ? null : (
          <View style={styles.formControl}>
            <Text style={styles.label}>Price</Text>
            <TextInput
              style={styles.input}
              value={price}
              keyboardType='decimal-pad'
              onChangeText={(text) => setPrice(text)}
            />
          </View>
        )}
        <View style={styles.formControl}>
          <Text style={styles.label}>Description</Text>
          <TextInput
            style={styles.input}
            value={description}
            onChangeText={(text) => setDescription(text)}
          />
        </View>
      </View>
    </ScrollView>
  );
};
export const ScreenOptions = (navData) => {
  const submitFn = navData.route.params?.submit ?? {};
  //console.log(submitFn);
  const param = navData.route.params?.productId ?? {};
  return {
    headerTitle: Object.keys(param).length > 0 ? "Edit Product" : "Add Product",
    headerRight: () => {
      return (
        <HeaderButtons HeaderButtonComponent={HeaderButton}>
          <Item
            title="Cart"
            iconName={
              Platform.OS === "android" ? "md-checkmark" : "ios-checkmark"
            }
            onPress={submitFn}
          />
        </HeaderButtons>
      );
    },
  };
};

const styles = StyleSheet.create({
  form: {
    margin: 20,
  },
  formControl: {
    width: "100%",
  },
  label: {
    fontFamily: "open-sans-bold",
    marginVertical: 8,
  },
  input: {
    paddingHorizontal: 2,
    paddingVertical: 5,
    borderBottomColor: "#ccc",
    borderBottomWidth: 1,
  },
});

export default EditProductScreen;
