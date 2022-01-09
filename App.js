import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import store from './src/store/store'
import { Provider } from 'react-redux'

const Stack = createNativeStackNavigator();

//Screens
import HomeScreen from './src/screens/HomeScreen';
import ArtistScreen from './src/screens/ArtistScreen';
import AlbumScreen from './src/screens/AlbumScreen';

export default function App() {
  return (
    <Provider store={ store }>
      <NavigationContainer>
        <Stack.Navigator initialRouteName='Home'>
          <Stack.Screen name="Home" component={HomeScreen} options={{ headerShown: false }} />
          <Stack.Screen name="ArtistScreen" component={ ArtistScreen } options={{ headerShown: false }} />
          <Stack.Screen name="AlbumScreen" component={ AlbumScreen } options={{ headerShown: false }} />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}
