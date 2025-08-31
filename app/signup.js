import { Image, Text, TouchableOpacity, View } from "react-native";
import { StatusBar } from "react-native-web";
import { colors } from "../theme/colors";

export default function Signup () {
    return(
        <View style={style.wrapper}> 
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
                    source={require("../assets/images/google.png")}
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
})

