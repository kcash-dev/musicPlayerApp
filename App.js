import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import store from './src/store/store'
import { Provider } from 'react-redux'
const Stack = createNativeStackNavigator();


//Navs
import HomeNav from './src/navs/HomeNav';
import UserNav from './src/navs/UserNav';

export default function App() {
  return (
    <Provider store={ store }>
      <NavigationContainer>
        <Stack.Navigator initialRouteName='User'>
          <Stack.Screen name="Home" component={HomeNav} options={{ headerShown: false }} />
          <Stack.Screen name="User" component={UserNav} options={{ headerShown: false }} />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}
