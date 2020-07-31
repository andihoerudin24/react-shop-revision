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
             //props.navigation.navigate('AuthNavigator') 
             dispatch(authAction.setDidTryAL());
             return;
           }
           const transfromedData = JSON.parse(userData)
           const {token,userId,expiryDate} = transfromedData
           const expirationDate = new Date(expiryDate)
           if(expirationDate <= new Date() || !token || !userId){
             // props.navigation.navigate('AuthNavigator') 
             dispatch(authAction.setDidTryAL()); 
             return;
           }

          const expirationTime = expirationDate.getTime() - new Date().getTime();
          dispatch(authAction.authenticate(userId,token,expirationTime))
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