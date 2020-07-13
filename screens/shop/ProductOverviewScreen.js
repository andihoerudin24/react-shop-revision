import React from 'react';
import { View,FlatList,Text } from 'react-native'
import {useSelector} from 'react-redux'

const ProductOverViewScreen = props =>{
    const products = useSelector(state => state.products.avaliableProducts) 
    return(
            <FlatList data={products} renderItem={itemData =>(
                <Text>{itemData.item.title}</Text>
            )} 
            keyExtractor={item => item.id}
             />    
     )
}

export const ScreenOptions = (navData) =>{
     return{
        headerTitle:'All Products'
     }
}

export default ProductOverViewScreen