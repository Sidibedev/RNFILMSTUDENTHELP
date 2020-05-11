import React, { Component } from 'react';
import { View, Text, Image,AsyncStorage } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import * as AppAuth from 'expo-app-auth';
import { Linking } from 'expo';
import { AuthContext } from '../AuthContext';
export default function Login(){
    const { authContext } = React.useContext(AuthContext);
    React.useEffect(() => {
        (async () => {
          let cachedAuth = await getCachedAuthAsync();
          if (cachedAuth && !authState) {
            setAuthState(cachedAuth);
          }
        })();
      }, []);
    let [authState, setAuthState] = React.useState(null);
     async function getCachedAuthAsync() {
        let value = await AsyncStorage.getItem('auth');
        let authState = JSON.parse(value);
        console.log('getCachedAuthAsync', authState);
        if (authState) {
          if (checkIfTokenExpired(authState)) {
            return refreshAuthAsync(authState);
          } else {
            return authState;
          }
        }
        return null;
      }
      function checkIfTokenExpired({ accessTokenExpirationDate }) {
        return new Date(accessTokenExpirationDate) < new Date();
      }
      async function cacheAuthAsync(authState) {
        return await AsyncStorage.setItem('auth', JSON.stringify(authState));
      }

       async function signInAsync() {
        let authState = await AppAuth.authAsync(config);
        await cacheAuthAsync(authState);
        console.log('signInAsync', authState);
        authContext.signIn(authState.idToken)
        return authState;
      }
      
      async function refreshAuthAsync({ refreshToken }) {
        let authState = await AppAuth.refreshAsync(config, refreshToken);
        console.log('refreshAuth', authState);
        await cacheAuthAsync(authState);
        return authState;
      }
      let config = {
        issuer: 'https://accounts.google.com',
        scopes: ['openid', 'profile'],
        /* This is the CLIENT_ID generated from a Firebase project */
        clientId: '603386649315-vp4revvrcgrcjme51ebuhbkbspl048l9.apps.googleusercontent.com',
      };

   const signin = async() => {
    
   
        const _authState = await signInAsync();
        setAuthState(_authState);
     
   }


 
    return (
      <View style={{flex:1, alignItems:'center', justifyContent:'center'}}>
        <TouchableOpacity onPress={signin} style={{width: '80%', backgroundColor:'#ff1746', padding: 20, borderRadius: 15, flexDirection:'row', alignItems:'center'}}>
            <Text style={{color:'white'}}>Connectez vous via Google</Text>
            <Image source={require('../Images/sign.png')} style={{width:30, height:30, marginLeft: 10}} />
        </TouchableOpacity>
       
      </View>
    );
  
}
