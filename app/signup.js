import { Image, StatusBar, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { colors } from "../theme/colors";

export default function Signup () {
    return(
        <View style={Styles.wrapper}> 
            {/* header group */}
            <View style={Styles.header}>
                <Text style={Styles.brandName}>copreneur</Text>
                <Text style={Styles.brandDesc}>Where entrepreneurs collaborate with developer</Text>
            </View>

            {/* {body group} */}
            <View>
                <Text>Create an account</Text>
                <TouchableOpacity>
                    <Image
                    style={{
                        width: 36,
                        height: 36
                    }}
                    source={require("../assets/images/google.png.png")}
                    />
                </TouchableOpacity>
            </View>

            {/* bottom grouo */}
            <View></View>
        </View>
    );
}

const Styles = StyleSheet.create({
    wrapper: {
        flex: 1,
        getBackgroundColor: colors.brown200,
        paddingTop: StatusBar.currentHeight,
        paddingHorizontal: 16
    },
    brandName: {
        fontSize: 46,
        fontWeight: "bold",
        colors: colors.brown400,
    },
    brandDesc: {
        fontWeight: "semibold",
        color: colors.brown400
    }
})

