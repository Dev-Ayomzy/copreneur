import { Stack } from "expo-router";
import { useContext } from "react";
import { AuthContext, AuthProvider } from "./../config/auth-context.config";
import "./global.css";

export default function RootLayout() {
  const { user } = useContext(AuthContext);
  
  return (
    <AuthProvider>
      <Stack screenOptions={{ headerShown: false}}>
        {user !== undefined ?
        <Stack.Screen
        name="(tabs)"
        options={{
          title: "Home",
          headerShown: false
        }}/>
        :
        <Stack.Screen
        name="index"
        options={{
          title: "Welcome",
          headerShown: false,
        }}/>
        }
        
        <Stack.Screen
        name="signin"
        options={{
          title: "Sign in",
          headerShown: false,
        }}/>
        
        <Stack.Screen
        name="about"
        options={{
          title: "About copreneur",
          headerShown: false,
        }}/>
        
        <Stack.Screen
        name="signup"
        options={{
          title: "Create a new account",
          headerShown: false,
        }}/>
        <Stack.Screen
        name="user-profile"
        options={{
          title: "user profile",
          headerShown: false,
        }}/>
      </Stack>
    </AuthProvider>
  )
}