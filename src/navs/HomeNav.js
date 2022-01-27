import { createNativeStackNavigator } from '@react-navigation/native-stack';
const Stack = createNativeStackNavigator();

//Screens
import HomeScreen from '../screens/HomeScreen';
import ArtistScreen from '../screens/ArtistScreen';
import AlbumScreen from '../screens/AlbumScreen';
import EditInfoScreen from '../screens/EditInfoScreen';
import FavoritesScreen from '../screens/FavoritesScreen';

export default function HomeNav() {
  return (
    <Stack.Navigator initialRouteName='HomeScreen'>
        <Stack.Screen name="HomeScreen" component={HomeScreen} options={{ headerShown: false }} />
        <Stack.Screen name="ArtistScreen" component={ ArtistScreen } options={{ headerShown: false }} />
        <Stack.Screen name="AlbumScreen" component={ AlbumScreen } options={{ headerShown: false }} />
        <Stack.Screen name="EditInfoScreen" component={ EditInfoScreen } options={{ headerShown: false }} />
        <Stack.Screen name="FavoritesScreen" component={ FavoritesScreen } options={{ headerShown: false }} />
    </Stack.Navigator>
  );
}