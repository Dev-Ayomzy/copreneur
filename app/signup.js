import { Link, useRouter } from "expo-router";
import { createUserWithEmailAndPassword, getAuth, updateProfile } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { useFormik } from "formik";
import { useState } from "react";
import { ActivityIndicator, Alert, Image, KeyboardAvoidingView, Platform, ScrollView, StatusBar, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import { auth, db } from "../settings/firebase";
import { colors } from "../theme/colors";
import { signupValidation } from "../utils/signup-validation-schema";

export default function Signup() {
    const [isLoading,setIsLoading] = useState(false);
    const authenticated = getAuth();

    const router = useRouter();

    const { handleBlur, handleChange, handleSubmit, touched, errors, values} = useFormik({
        initialValues: { email:"",firstName:"", lastName:"", phoneNumber:"", password:"", passwordConfirmation:"" },
        onSubmit: async () => {
            setIsLoading(true);

            try {
                // create a new user account
                const user = await createUserWithEmailAndPassword(auth,values.email,values.password);
                setIsLoading(false); // stops ActivityIndicator

                // update user's profile
                updateProfile(authenticated.currentUser,{
                    displayName: `${values.firstName} ${values.lastName}`,
                });

                // store user's data on database
                setDoc(doc(db,"users",authenticated.currentUser.uid),{
                    email: values.email,
                    firstName: values.firstName,
                    lastName: values.lastName,
                    phoneNumber: values.phoneNumber,
                    createdAt: new Date().getTime()
                });

                //redirect to home
                router.replace("/(tabs)");
            } catch (error) {
                Alert.alert(
                    "Message",
                    "An unknown error has occurred",
                    [{ text: "Dismiss"}]
                );
                console.error(error);
                setIsLoading(false);
            }
            
        },
        validationSchema: signupValidation
    });

    return (
        <KeyboardAvoidingView
            style={styles.wrapper}
            behavior="padding"
            keyboardVerticalOffset={Platform.select({
                ios: 0,
                android: -StatusBar.currentHeight,
            })}>

            <ScrollView
                contentContainerStyle={styles.ScrollViewContainer}
                showsVerticalScrollIndicator={false}>

                {/* header group */}
                <View style={styles.header}>
                    <Text style={styles.brandName}>Copreneur</Text>
                    <Text style={styles.brandDesc}>Where entrepreneurs collaborate with developers</Text>
                </View>

                {/* body group  */}
                <View style={styles.body}>
                    <Text style={styles.bodyText}>Create account</Text>

                    {/* create account with google */}
                    <TouchableOpacity style={styles.signupBtn}>
                        <Image
                            style={{
                                width: 36,
                                height: 36,
                            }}
                            source={require("../assets/images/google.png.png")}></Image>
                        <Text style={styles.signInText}>Google</Text>
                    </TouchableOpacity>

                    {/* OR */}
                    <View style={styles.orSec}>
                        <View style={styles.line}></View>
                        <Text style={styles.orText}>OR</Text>
                        <View style={styles.line}></View>
                    </View>

                    {/* create account with email and password */}
                    <View style={styles.form}>
                        <View>
                            <TextInput
                            keyboardType="email-address"
                            style={styles.input}
                            placeholder="eg. john@example.com"
                            value={values.email}
                            onChangeText={handleChange("email")}
                            onBlur={handleBlur("email")} 
                            />
                            {errors.email && touched.email && 
                            <Text style={styles.errormsg}>{errors.email}</Text>}
                        </View>
                        
                        <View>
                            <TextInput
                            keyboardType="default"
                            style={styles.input}
                            placeholder="eg. John"
                            value={values.firstName}
                            onChangeText={handleChange("firstName")}
                            onBlur={handleBlur("firstName")} 
                            />
                            {errors.firstName && touched.firstName && 
                            <Text style={styles.errormsg}>{errors.firstName}</Text>}
                        </View>
                        
                        <View>
                            <TextInput
                            keyboardType="default"
                            style={styles.input}
                            placeholder="eg. Adekule"
                            value={values.lastName}
                            onChangeText={handleChange("lastName")}
                            onBlur={handleBlur("lastName")} 
                            />
                            {errors.lastName && touched.lastName && 
                            <Text style={styles.errormsg}>{errors.lastName}</Text>}
                        </View>
                        
                        <View>
                            <TextInput
                            keyboardType="phone-pad"
                            style={styles.input}
                            placeholder="eg. 07087777367"
                            value={values.phoneNumber}
                            onChangeText={handleChange("phoneNumber")}
                            onBlur={handleBlur("phoneNumber")} 
                            />
                            {errors.phoneNumber && touched.phoneNumber && 
                            <Text style={styles.errormsg}>{errors.phoneNumber}</Text>}
                        </View>

                        <View>
                            <TextInput
                            secureTextEntry={true}
                            keyboardType="default"
                            style={styles.input}
                            placeholder="create password"
                            value={values.password}
                            onChangeText={handleChange("password")} 
                            />
                            {errors.password && touched.password && 
                            <Text style={styles.errormsg}>{errors.password}</Text>}
                        </View>

                        <View>
                            <TextInput
                            secureTextEntry={true}
                            keyboardType="default"
                            style={styles.input}
                            placeholder="confirm password"
                            value={values.passwordConfirmation}
                            onChangeText={handleChange("passwordConfirmation")}
                            />
                            {errors.passwordConfirmation && touched.passwordConfirmation && 
                            <Text style={styles.errormsg}>{errors.passwordConfirmation}</Text>}
                        </View>

                        <TouchableOpacity onPress={handleSubmit} style={styles.signupBtn}>
                            {isLoading ?
                            <ActivityIndicator size="large" color="white"/> :
                            <Text style={styles.signInText}>Create Account</Text>}
                        </TouchableOpacity>
                    </View>

                    {/* already have an account? */}
                    <View style={styles.already}>
                        <Text style={styles.alreadyText}>Already have an account?</Text>
                        <Link href="/signin" style={styles.alreadyLink}>Go to sign in</Link>
                    </View>
                </View>

                {/* bottom group */}
                <View style={styles.footer}>
                    <Link href="/about" style={styles.footerLink}>About Copreneur</Link>
                    <Link href="/about" style={styles.footerLink}>Home</Link>
                </View>
            </ScrollView>
        </KeyboardAvoidingView>
    )
}

const styles = StyleSheet.create({
    wrapper: {
        flex: 1,
        backgroundColor: colors.brown200,
        paddingTop: StatusBar.currentHeight,
    },
    ScrollViewContainer: {
        flexGrow: 1,
        justifyContent: "space-between",
        marginBottom: 40,
    },
    header: {
        display: "flex",
        flexDirection: "column", // the direction we want the item to be arranged
        alignItems: "center",
        gap: 8,
    },
    brandName: {
        fontSize: 46,
        fontWeight: "bold",
        color: colors.brown400
    },
    brandDesc: {
        fontWeight: "bold",
        color: colors.brown400,
        textAlign: "center",
    },
    body: {
        display: "flex",
        gap: 18,
        paddingHorizontal: 20,
    },
    bodyText: {
        color: colors.brown400,
        fontSize: 18
    },
    already: {
        display: "flex",
        flexDirection: "row",
        gap: 4,
    },
    alreadyText: {
        color: colors.brown400,
    },
    alreadyLink: {
        color: colors.brown300,
        fontWeight: "bold",
    },
    signupBtn: {
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
        fontSize: 12,
    },
    orSec: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-evenly",
        alignItems: "center",
    },
    orText: {
        fontSize: 16,
        color: colors.brown400
    },
    line: {
        width: "30%",
        borderTopWidth: 1,
        borderTopColor: colors.brown300,
    },
    form: {
        gap: 12,
    },
    input: {
        borderWidth: 1,
        borderColor: colors.brown400,
        borderRadius: 4,
        fontSize: 16,
        paddingHorizontal: 6,
    },
    errormsg: {
        color: "red",
        fontSize: 12
    }
});