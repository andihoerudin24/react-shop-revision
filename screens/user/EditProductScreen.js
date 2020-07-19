import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  ScrollView,
  Platform,
} from "react-native";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import HeaderButton from "../../components/UI/HeaderButton";
import { useSelector } from "react-redux";

const EditProductScreen = (props) => {
  const productId = props.route.params ? props.route.params.productId : "";
  const Editedproduct = useSelector((state) =>
    state.products.userProducts.find((prod) => prod.id === productId)
  );

  const [title, setTitle] = useState(Editedproduct ? Editedproduct.title : "");
  const [imageUrl, setImageUrl] = useState(
    Editedproduct ? Editedproduct.imageUrl : ""
  );
  const [price, setPrice] = useState(Editedproduct ? Editedproduct.price : "");
  const [description, setDescription] = useState(
    Editedproduct ? Editedproduct.description : ""
  );

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
            onPress={() => {}}
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
