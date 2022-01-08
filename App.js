import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import store from './src/store/store'
import { Provider } from 'react-redux'

const Stack = createNativeStackNavigator();

//Screens
import HomeScreen from './src/screens/HomeScreen';

export default function App() {
  return (
    <Provider store={ store }>
      <NavigationContainer>
        <Stack.Navigator initialRouteName='Home'>
          <Stack.Screen name="Home" component={HomeScreen} options={{ headerShown: false }} />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}
