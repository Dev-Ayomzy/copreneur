import { Link } from "expo-router";
import { StyleSheet, Text } from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";

export default function index (){
  return (
    <SafeAreaProvider>
      <SafeAreaView>
        <Text>Welcome Screen</Text>
        <Text>Welcome to coprenuer</Text>
        <Link href="/signup"
        styles={{
            fontWeight: "bold",
            Color: "brown"
        }}>Create a new account</Link>
      </SafeAreaView>    
    </SafeAreaProvider>
  )  
}

const styles = StyleSheet.create({
  p: {
    fontSize: 16,
    fontWeight: "bold",
  }
})