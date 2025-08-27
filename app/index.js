import { StyleSheet, Text, View } from "react-native";

export default function index (){
  return (
    <view style={{
      flex: 1,
      backgroundColor: "brown"
    }}>
        <View style={{
            flex: 2,
            backgroundColor: "white",
        }}>
            <Text>copreneur</Text>
            <Text>Where developer meet entreprenuer </Text>
            </View>

            <View style={{
              flex: 2,
              backgroundColor: "yellow",
            }}>
                <Text style={style.p}>I am a entrepreneur</Text>
            </View>

            <View style={{
              flex: 2,
              backgroundColor: "oldlace",
            }}>
                <Text style={style.p}>I am a developer</Text>
              </View>
        </view>
  )  
}

const styles = StyleSheet.create({
  p: {
    fontSize: 16,
    fontWeight: "bold",
  }
})