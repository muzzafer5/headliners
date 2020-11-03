import 'react-native-gesture-handler';
import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import LandingScreen from './screens/auth/landing';
import HomeScreen from './screens/home/home'
import LoadingScreen from './screens/auth/loading'
import SignupScreen from './screens/auth/signup'
import LoginScreen from './screens/auth/login'
import GameScreen from './screens/game/game'
import Test from './screens/test/test'

const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator headerMode="none" initialRouteName = "Loading">
        <Stack.Screen name = "Home" component={HomeScreen} options={{ title: 'Welcome' }}/>
        <Stack.Screen name = "Landing" component={LandingScreen} />
        <Stack.Screen name = "Loading" component = {LoadingScreen}/>
        <Stack.Screen name = "Signup" component={SignupScreen} />
        <Stack.Screen name = "Login" component = {LoginScreen}/>
        <Stack.Screen name= "Game" component={GameScreen} />
        <Stack.Screen name = "Test" component = {Test}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App