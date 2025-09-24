import { useRouter } from "expo-router";
import { signOut } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { useContext, useEffect, useState } from "react";
import { ActivityIndicator, Pressable, StyleSheet, Text, View } from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { AuthContext } from "../../config/auth-context.config";
import { auth, db } from "../../settings/firebase";
import { colors } from "../../theme/colors";

export default function Index () {
    const { user } = useContext(AuthContext);
    const [userRecords,setUserRecords] = useState(null);

    const router = useRouter();

    // handle sign out
    const handleSignOut = async () => {
        await signOut(auth)
        .then(() => {
            router.replace("signin")
        })
        .catch((error) => console.log("Error occured while signing out",error));
    }

    useEffect(() => {
        const handleGetDoc = async () => {
            try {
                const docSnap = await getDoc(doc(db,"users",user.uid));
                if (docSnap.exists()) {
                    setUserRecords(docSnap.data())
                }
            } catch (error) {
                console.log("Error >>>>:",error)
            }
        }

        user !== undefined && handleGetDoc();
    },[user]);

    if (userRecords === null) {
        return (
            <SafeAreaProvider>
                <SafeAreaView style={styles.wrapper}>
                    <ActivityIndicator size="large" color={colors.brown300} />
                    <Text className="text-xs text-gray-600">... loading your data</Text>
                </SafeAreaView>
            </SafeAreaProvider>
        )
    } else {
        return (
            <SafeAreaProvider>
                <SafeAreaView style={styles.content}>
                    {/* header */}
                    <View className="flex flex-row gap-x-2 items-center">
                        <Text className="text-gray-800 text-xl">Hello</Text>
                        <Text className="text-black text-xl">{userRecords.firstName}</Text>
                    </View>

                    {/* body */}
                    <View></View>

                    {/* footer */}
                    <View className="flex flex-row justify-center items-center">
                        <Pressable onPress={handleSignOut} className="p-3 bg-red-700 rounded-sm">
                            <Text className="text-sx font-semibold">Sign out</Text>
                        </Pressable>
                    </View>
                </SafeAreaView>
            </SafeAreaProvider>
        )
    }
}

const styles = StyleSheet.create({
    wrapper: {
        flex: 1,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        gap: 4
    },
    content: {
        flex: 1,
        flexDirection: "column",
        justifyContent: "space-between"
    }
})