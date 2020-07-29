import React,{useEffect} from 'react'
import {View,ActivityIndicator,StyleSheet,AsyncStorage} from 'react-native'
import {useDispatch} from 'react-redux'
import * as authAction from '../store/actions/auth'
import Colors from '../constans/Colors'
const StartupScreen = (props) =>{
   const dispatch = useDispatch() 
   useEffect(()=>{
       const tryLogin   = async () =>{
           const userData = await AsyncStorage.getItem('userData')
           if(!userData){
             props.navigation.navigate('AuthNavigator')  
             return;
           }
           console.log('user',userData)
           const transfromedData = JSON.parse(userData)
           const {token,userId,expiryDate} = transfromedData
           console.log('trans',transfromedData) 
           const expirationDate = new Date(expiryDate)
           console.log('expira',expirationDate)
           if(expirationDate <= new Date() || !token || !userId){
              props.navigation.navigate('AuthNavigator') 
              return;
           }

           props.navigation.navigate('ProductOverview')
           dispatch(authAction.authenticate(userId,token))
        }
        tryLogin()
   },[dispatch])
   return(
       <View style={styles.screen}>
           <ActivityIndicator size="large" color={Colors.primary} />
       </View>
   )
}

const styles = StyleSheet.create({
    screen:{
        flex:1,
        justifyContent:'center',
        alignItems:'center'
    }
})

export default StartupScreen