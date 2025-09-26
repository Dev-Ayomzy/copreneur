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
    const [isLoading,setIsLoading] = useState(false);
    const { user } = useContext(AuthContext);

    const router = useRouter();

    const { handleBlur, handleChange, handleSubmit, touched, errors, values, resetForm} = useFormik({
        initialValues: { content:""},
        onSubmit: async () => {
            setIsLoading(true);

            try {
                // create post on database
                 await addDoc(collection(db,"posts"),{
                    text: values.content,
                    createdAt: new Date().getTime(),
                    author: user.uid,
                    likes: 0,
                });


                setIsLoading(false); // stops ActivityIndicator
                resetForm();// clears all fields
                Alert.alert(
                    "Notification",
                    "post published!",
                    [
                        {text: "Dismiss",},
                        { text: "back to home",onPress: ()=> router.replace("(tabs)")}
                    ]
                )
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
        validationSchema: createPostValidation
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

                {/* body group  */}
                <View style={styles.body}>
                    <Text className="font-bold text-lg">Hello,{user.displayName}</Text>
                    <Text style={styles.bodyText}>What do you want to share?</Text>

                    {/* create account with email and password */}
                    <View style={styles.form}>
                        <View>
                            <TextInput
                            keyboardType="default"
                            style={styles.input}
                            multiline={true}
                            value={values.content}
                            onChangeText={handleChange("content")}
                            onBlur={handleBlur("content")} 
                            />
                            {errors.content && touched.content && 
                            <Text style={styles.errormsg}>{errors.content}</Text>}
                        </View>

                        <View className="flex flex-row justify-end">
                            <TouchableOpacity onPress={handleSubmit} style={styles.signupBtn}>
                                {isLoading ?
                                <ActivityIndicator size="large" color="white"/> :
                                <Text style={styles.signInText}>Post</Text>}
                            </TouchableOpacity>
                         </View>   
                    </View>
                </View>
            </ScrollView>
        </KeyboardAvoidingView>
    )
}

const styles = StyleSheet.create({
    wrapper: {
        flex: 1,
        paddingTop: StatusBar.currentHeight,
    },
    ScrollViewContainer: {
        flexGrow: 1,
        justifyContent: "space-between",
        marginBottom: 40,
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
    signupBtn: {
      padding:10,
      backgroundColor: colors.brown400,
      borderRadius: 4,

    },
    signInText: {
        color: colors.brown100,
        fontSize: 22,
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