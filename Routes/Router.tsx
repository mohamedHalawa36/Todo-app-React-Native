import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Login from "../Pages/Login";
import Register from "../Pages/Register";
import Todo from "../Pages/Todo";

export type RootStackParamList = {
  login:undefined,
  register:undefined,
  todos:{userId:string}
};


const Stack = createNativeStackNavigator<RootStackParamList>();

function Router() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="login">
        <Stack.Screen
          name="login"
          component={Login}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="register"
          component={Register}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="todos"
          component={Todo}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default Router;
