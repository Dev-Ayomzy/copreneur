import { useRouter } from "expo-router";
import { addDoc, collection } from "firebase/firestore";
import { useFormik } from "formik";
import { useContext, useState } from "react";
import { ActivityIndicator, Alert, KeyboardAvoidingView, Platform, ScrollView, StatusBar, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import { AuthContext } from "../../config/auth-context.config";
import { db } from "../../settings/firebase";
import { colors } from "../../theme/colors";
import { createPostValidation } from "../../utils/create-post-validation-schema";


export default function Create() {
    const [isLoading, setIsLoading] = useState(false);
    const { user } = useContext(AuthContext);

    const router = useRouter();

    const { handleBlur, handleChange, handleSubmit, touched, errors, values, resetForm } = useFormik({
        initialValues: { content: "" },
        onSubmit: async () => {
            setIsLoading(true);

            try {
                // create post on database
                const docId = await addDoc(collection(db, "posts"), {
                    text: values.content,
                    createdAt: new Date().getTime(),
                    author: user.uid,
                    likes: 0,
                });

                setIsLoading(false); // stops Activityindicator
                resetForm(); // clears all fields

                Alert.alert(
                    "Notification",
                    "Post published!",
                    [
                        { text: "Dismiss" },
                        { text: "back to home", onPress: () => router.replace("(tabs)") }
                    ]
                )


            } catch (error) {
                Alert.alert(
                    "Message",
                    "An unknown error has occurred",
                    [{ text: "Dismiss" }]
                );
                console.error(error);
                setIsLoading(false);

            }
        },
        validationSchema: createPostValidation
    });

    console.log(values.content)

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

                {/* body group  */}
                <View style={styles.body}>
                    <Text className="font-bold test-lg">Hello, {user?.displayName}</Text>
                    <Text style={styles.bodyText}>What do you want to share?</Text>                

                    {/* create account with email and password */}
                    <View style={styles.form}>

                        <View style={styles.inputBlock}>
                            <TextInput
                                keyboardType="default"
                                style={styles.input}
                                multiline={true}
                                numberOfLines={4}
                                value={values.content} // assign the current value of the textinput
                                onChangeText={handleChange("content")}
                                onBlur={handleBlur("content")}
                            />
                            {errors.content && touched.content &&
                                <Text style={styles.errormsg}>{errors.content}</Text>}

                        </View>

                        <View className="flex flex-row justify-end">
                            <TouchableOpacity onPress={handleSubmit} style={styles.signupBtn}>
                                {isLoading ?
                                    <ActivityIndicator size="large" color="white" /> :
                                    <Text style={styles.signInText}>Create</Text>}
                            </TouchableOpacity>
                        </View>

                    </View>
                </View>

            </ScrollView>
        </KeyboardAvoidingView >
    )
}

const styles = StyleSheet.create({
    wrapper: {
        flex: 1,
        paddingTop: StatusBar.currentHeight,
    },
    ScrollViewContainer: {
        display: "flex",
        paddingHorizontal: 20,
        gap: 10
    },
    body: {
        display: "flex",
        gap: 18,
        paddingHorizontal: 4,
    },
    bodyText: {
        color: colors.brown400,
        fontSize: 18
    },
    signupBtn: {
        padding: 10,
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