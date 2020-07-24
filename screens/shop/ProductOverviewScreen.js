import React,{useEffect,useState,useCallback} from "react";
import { View, FlatList, Text, Platform, Button,ActivityIndicator,StyleSheet } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import HeaderButton from "../../components/UI/HeaderButton";
import ProductItem from "../../components/shop/ProductItem";
import * as CartAction from "../../store/actions/cart";
import * as ProductAction from "../../store/actions/products";
import Colors from "../../constans/Colors";
import { isLoading } from "expo-font";

const ProductOverViewScreen = (props) => {
  const products = useSelector((state) => state.products.avaliableProducts);
  const [loading, setisloading] = useState(false)
  const [refreshing,setisRefreshing]=useState(false)
  const dispatch = useDispatch();
  const [errors,setErrors]= useState()  
  
  const loadProduct =useCallback(async () => {
    setErrors(null)
    setisRefreshing(true)
    try {
      await dispatch(ProductAction.fetchProduct()) 
    } catch (error) {
       setErrors(error.message)
    }
    setisRefreshing(false)
  },[dispatch,setErrors,setisloading])

  useEffect(()=>{
    const willfocusSub= props.navigation.addListener('focus',()=>{
      loadProduct()
    })
    return willfocusSub
  },[loadProduct])
   
  useEffect(()=>{
    setisloading(true)
    loadProduct().then(()=>{
      setisloading(false)
    })
  },[])

  const selectItemHandler = (id, title) => {
    props.navigation.navigate("ProductDetail", {
      productId: id,
      productTitle: title,
    });
  };
  
  if(loading){
    return (<View style={styles.centered}>
      <ActivityIndicator size="large" color={Colors.primary}/>
    </View>)
  }

  
  if(errors){
    return (<View style={styles.centered}>
      <Text>{errors}</Text>
      <Button title="Try Again" color={Colors.primary} onPress={loadProduct}  /> 
    </View>)
  }


  if(!loading && products.length === 0){
    return (<View style={styles.centered}>
      <Text>No Product Found Mybe Start adding some</Text>
  </View>)
  }

  return (
    <FlatList
      onRefresh={loadProduct}
      refreshing={refreshing}
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

const styles = StyleSheet.create({
  centered:{
    flex:1,
    justifyContent:'center',
    alignItems:'center'
  }
})

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
