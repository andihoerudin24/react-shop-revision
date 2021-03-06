import React, { useState,useEffect,useCallback } from "react";
import { View, Text, StyleSheet, FlatList, Button,Alert,ActivityIndicator } from "react-native";
import ProductItem from "../../components/shop/ProductItem";
import { useSelector, useDispatch } from "react-redux";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import HeaderButton from "../../components/UI/HeaderButton";
import Colors from "../../constans/Colors";
import * as ProductAction from "../../store/actions/products";
const UserProductScreen = (props) => {
  
  const userProducts = useSelector((state) => state.products.userProducts);
  const [error,setError]= useState(false);
  const [loading,setisloading]= useState(false);
  const [errors,setErrors]= useState()  
  const dispatch = useDispatch();
  
  const loadproduct = useCallback(async()=>{
    setError(null)
    setisloading(true)
    try {
      await dispatch(ProductAction.fetchProduct())
    } catch (error) {
      setErrors(error.message) 
    }
    setisloading(false)
  },[setError,setisloading,dispatch])

  const editProductHandler = (id) => {
    props.navigation.navigate("EditProduct", {
      productId: id,
    });
  };

  const deletes = async (id) =>{
    setError(null)
    setisloading(true)
    try {
      await dispatch(ProductAction.deleteProduct(id)); 
    } catch (error) {
      setError(error.message)
    }
    setisloading(false)
  }
  
  const deleteHandler = (id) =>{
    Alert.alert('Are You Sure?','Do You Really want to delete this items?',[
      {text:'No',style:'default'},
      {text:'Yes',style:'destructive',onPress:()=>{deletes(id)}}
    ])
  }

  useEffect(()=>{
     if(errors){
       Alert.alert('error',errors,[{
         text:'Okay'
       }])
     }
  },[errors])

  useEffect(()=>{
    const willfocus = props.navigation.addListener('focus',()=>{
      loadproduct()
    })
    return willfocus
  },[loadproduct])
  
  if(loading){
    return (<View style={styles.centered}>
      <ActivityIndicator size="large" color={Colors.primary}/>
    </View>)
  }

  if(userProducts.length === 0){
    return(
      <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
        <Text>NO Product Found</Text>
      </View>
    )
  }


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
            onPress={deleteHandler.bind(this,itemData.item.id)}
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

const styles = StyleSheet.create({
  centered:{
    flex:1,
    justifyContent:'center',
    alignItems:'center'
  }
});
export default UserProductScreen;
