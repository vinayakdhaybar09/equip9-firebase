import { StatusBar  } from "react-native";
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Screen1 from './src/screens/Screen1';
import Screen2 from './src/screens/Screen2';
import Screen3 from './src/screens/Screen3';
import CameraScreen from "./src/components/CameraScreen";
import ImageUpload from "./src/components/ImageUpload";
import Screen4 from "./src/screens/Screen4";
import Temp from "./src/components/Temp";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <StatusBar backgroundColor="white" barStyle={"dark-content"} />
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="screen1" component={Screen1} />
        <Stack.Screen name="screen2" component={Screen2} />
        <Stack.Screen name="screen3" component={Screen3} />
        <Stack.Screen name="screen4" component={Screen4} />
        <Stack.Screen name="cameraScreen" component={CameraScreen} />
        <Stack.Screen name="imageUpload" component={ImageUpload} />
        <Stack.Screen name="temp" component={Temp} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

