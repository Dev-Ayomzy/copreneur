import { Link } from "expo-router";
import { useState } from "react";
import { Image, StatusBar, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import { colors } from "../theme/colors";

export default function signup () {
    const [email,setEmail] = useState("");
    const [password,setpassword] = useState("");
    const [passwordConfirmation,setpasswordConfirmation] = useState("");
    return(
        <View style={Styles.wrapper}> 
            {/* header group */}
            <View style={Styles.header}>
                <Text style={Styles.brandName}>copreneur</Text>
                <Text style={Styles.brandDesc}>Where entrepreneurs collaborate with developer</Text>
            </View>

            {/* {body group} */}
            <View style={Styles.body}>
                <Text style={Styles.bodyText}>Create an account</Text>

                {/* create account with google */}
                <TouchableOpacity style={Styles.signInBtn}>
                    <Image
                    style={{
                        width: 36,
                        height: 36
                    }}
                    source={require("../assets/images/google.png.png")}/>
                    <Text style={Styles.signInText}>Google</Text>  
                </TouchableOpacity>

                {/* OR */}
                <View style={Styles.orSec}>
                    <View style={Styles.line}></View>
                    <Text style={Styles.orText}>OR</Text>
                    <View style={Styles.line}></View>

                </View>

                {/* create account with email and password */}
                <View style={Styles.emailSec}>
                    <TextInput
                    keyboardType="email-address"
                    style={Styles.input}
                    placeholder="eg. johndoe@example.com"
                    value={email}
                    onChangeText={(text) => setEmail(text)}/>

                    <TextInput
                    secureTextEntry={true}
                    keyboardType="default"
                    style={Styles.input}
                    placeholder="create password"
                    value={password}
                    onChangeText={(text) => setpassword(text)}/>
                    
                    {password.length >= 8 &&
                    <TextInput
                    secureTextEntry={true}
                    keyboardType="default"
                    style={Styles.input}
                    placeholder="confirm password"
                    value={passwordConfirmation}
                    onChangeText={(text) => setpasswordConfirmation(text)}/>}

                    {password.length >= 8 && password == passwordConfirmation &&
                    <TouchableOpacity style={Styles.signInBtn}>
                    <Text style={Styles.signInText}>Create an Account</Text>  
                    </TouchableOpacity>}
                </View>

                {/* already have an account? */}
                <View style ={Styles.already}>
                    <Text style={Styles.alreadyText}>Already have an account?</Text>
                    <Link href="/signin" style={Styles.alreadyLink}>Go to sign in</Link>

                </View>
            </View>

            {/* bottom grouo */}
            <View style={Styles.footer}>
                <Link href="/about" style={Styles.footerLink}>About copreneur</Link>
                <Link href="/about" style={Styles.footerLink}>Home</Link>

            </View>
        </View>
    );
}

const Styles = StyleSheet.create({
    wrapper: {
        flex: 1,
        display: "flex",
        justifyContent: "space-between",
        getBackgroundColor: colors.brown200,
        paddingTop: StatusBar.currentHeight,
        paddingBottom: 40
    },
    header: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 8
    },
    brandName: {
        fontSize: 46,
        fontWeight: "bold",
        colors: colors.brown400,
    },
    brandDesc: {
        fontWeight: "bold",
        color: colors.brown400,
        textAlign: "center"
    },
    body:{
        paddingHorizontal: 20,
        gap: 18,
        paddingHorizontal: 40,
    },
    bodyText: {
        color: colors.brown400,
        fontSize: 18
    },
    already: {
        display: "flex",
        flexDirection: "row",
        gap:4
    },
    alreadyText: {
        color:colors.brown400,
    },
    alreadyLink: {
        color:colors.brown300,
        fontWeight: "bold"
    },
    signInBtn: {
        height: 56,
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        gap: 16,
        backgroundColor: colors.brown400,
        borderRadius: 4,
    },
    signInText: {
        color: colors.brown100,
        fontSize: 22,
    },
    footer: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-evenly",
    },
    footerLink: {
        color: colors.brown400,
        fontSize:12
    },
    orSec: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-evenly"  ,
        alignItems: "center", 
    },
    orText: {
        fontSize: 16,
        color: colors.brown400,
    },
    line: {
        width: "30%",
        borderTopWidth: 1,
        borderTopColor: colors.brown300,

    },
    emailSec: {
        gap: 8
    },
    input: {
        borderWidth: 1,
        borderColor: colors.brown400,
        borderRadius: 4,
        fontSize: 16,
        paddingHorizontal: 6

    }
})

