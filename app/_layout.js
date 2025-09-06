import { Stack } from "expo-router";
import "./global.css";

export default function RootLayout() {
  const session = true;

  return (
    <Stack>
      {session == true ?
      <Stack.Screen
      name="(tabs)"
      options={{
        title: "Home",
        headerShown: false
      }}/>
      :
      <Stack.Screen
      name="signup"
      options={{
        title: "Create a new account",
        headerShown: false,
      }}/>
    }

      <Stack.Screen
      name="index"
      options={{
        title: "Welcome",
        headerShown: false,
      }}/>
      <Stack.Screen
      name="signin"
      options={{
        title: "sign in ",
        headerShown: false,
      }}/>
      <Stack.Screen
      name="about"
      options={{
        title: "About copreneur ",
        headerShown: false,
      }}/>
    </Stack>
  )
}
