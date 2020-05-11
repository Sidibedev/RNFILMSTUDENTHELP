import React from 'react'

import NavigationBottom from './Navigation/NavigationBottom'
import { Provider } from 'react-redux'
import Store from './Store/configureStore'
import AuthStack from './Navigation/AuthStack';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { AppLoading } from 'expo';
import { AuthContext } from './AuthContext';
import { AsyncStorage } from 'react-native';


const RootStack = createStackNavigator()
export default function App() {

  const [state, dispatch] = React.useReducer(
    (prevState, action) => {
      switch (action.type) {
        case 'RESTORE_TOKEN':
          return {
            ...prevState,
            userToken: action.token,
            isLoading: false,
        };
        case 'SIGN_IN':
          return {
            ...prevState,
            userToken: action.token,
          };
        }
    },
    {
      isLoading: true,
      userToken: null,
     
    }
  );

  React.useEffect(() => {
  const bootstrapAsync = async () => {
    // AsyncStorage.removeItem('userToken')
    // AsyncStorage.removeItem('role')
    // AsyncStorage.removeItem('userData')
      let userToken;


      try {
        userToken = await AsyncStorage.getItem('userToken');
      } catch (e) {
        // Restoring token failed
      }

      // After restoring token, we may need to validate it in production apps

      // This will switch to the App screen or Auth screen and this loading
      // screen will be unmounted and thrown away.
      
      dispatch({ type: 'RESTORE_TOKEN', token: userToken });
     }
  bootstrapAsync();



  }, []);

  const authContext = React.useMemo(
    () => ({
      signIn: async data => {
        // In a production app, we need to send some data (usually username, password) to server and get a token
        // We will also need to handle errors if sign in failed
        // After getting token, we need to persist the token using `AsyncStorage`
        // In the example, we'll use a dummy token
        console.log(data)
        
        
       dispatch({ type: 'SIGN_IN', token: data });
    

        // persist token
        AsyncStorage.setItem('userToken' , data)


      },
      
    }),
    [

    ]
  );
  return (
    <AuthContext.Provider value={{state , authContext}}>

  
    <Provider store={Store}>
        <NavigationContainer>

        <RootStack.Navigator>
           {state.isLoading == true ?
            <RootStack.Screen name="loading" component={AppLoading} /> :
            state.userToken == null  ?
          <RootStack.Screen name="auth" options={{headerShown:false}} component={AuthStack} />
          :
          <RootStack.Screen name="home" options={{headerShown:false}} component={NavigationBottom} />}
        </RootStack.Navigator>
        
         </NavigationContainer>
    </Provider>

    </AuthContext.Provider>
  );
}

