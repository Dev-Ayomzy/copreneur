import { Stack } from "expo-router";

export default function RootLayout() {
  return (
    <Stack>
      <Stack.Screen
      name="(tabs)"
      options={{
        title: "Home",
        headerShown: false
      }}/>
      <Stack.Screen
      name="index"
      options={{
        title: "Welcome",
        headerShown: false,
      }}/>
      <Stack.Screen
      name="signup"
      options={{
        title: "Create a new account",
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
