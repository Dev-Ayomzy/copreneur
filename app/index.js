import AntDesign from "@expo/vector-icons/AntDesign";
import { useFonts } from "expo-font";
import { Link } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";
import { FlatList, ScrollView, StatusBar, StyleSheet, Text, View } from "react-native";
import { forDevelopers } from "../assets/local-data/benefits";
import { Seperator } from "../components/ListSeperator";
import { colors } from "../theme/colors";

SplashScreen.preventAutoHideAsync();

export default function Index () {
    const [loaded, error] = useFonts({
        "Polea-Extra": require("../assets/fonts/Polea-Extra.otf"),
    });

    useEffect(() => {
        if (loaded || error) {
            SplashScreen.hideAsync();
        }
    }, [loaded, error]);

    if (!loaded && !error) {
        return null;
    }

    return (
        <View className="px-4 pb-4 pt-8">
            <StatusBar barStyle="dark-content" backgroundColor="transparent" translucent={true}/>
            <ScrollView>
                <Text style={styles.brandText}>Copreneur</Text>

                {/* for developers */}
                <View style={{ backgroundColor: colors.brown100 }} className="flex flex-col gap-y-3 rounded-lg p-3">
                    <Text className="font-bold text-3xl">For Developers</Text>
                    <FlatList 
                    data={forDevelopers}
                    keyExtractor={item => item.id}
                    ItemSeparatorComponent={() => (<Seperator w={0} h={8}/>)}
                    renderItem={({item}) => (
                        <View style={{ backgroundColor: colors.brown400 }} className="h-12 flex flex-row items-center gap-4 rounded-lg px-2">
                            <AntDesign name="check-circle" size={24} color={colors.brown200} />
                            <Text className="text-lg font-semibold text-white">{item.text}</Text>
                        </View>
                    )}/>
                </View>

                {/* get started */}
                <View className="min-h-24 flex flex-col gap-y-4 bg-brown-800 rounded-lg my-12">
                    <Text className="font-bold text-3xl">Get started</Text>
                    <Text className="text-sm">Whether you are an entrepreneur or a developer, start connecting to move your projects forward.</Text>

                    <View className="flex flex-row items-center gap-x-3">
                        <Link href="/signin" style={{ backgroundColor: colors.brown400 }} className="rounded-lg p-6">
                            <Text className="text-white text-xs">I have an account</Text>
                        </Link>
                        <Link href="/signup" style={{ backgroundColor: colors.brown300 }} className="rounded-lg p-6">
                            <Text className="text-white text-xs">I am new here</Text>
                        </Link>
                    </View>
                </View>

                {/* for entrepreneurs */}
                <View style={{ backgroundColor: colors.brown100 }} className="flex flex-col gap-y-3 rounded-lg p-3">
                    <Text className="font-bold text-3xl">For Entrepreneurs</Text>
                    <FlatList 
                    data={forDevelopers}
                    keyExtractor={item => item.id}
                    ItemSeparatorComponent={() => (<Seperator w={0} h={8}/>)}
                    renderItem={({item}) => (
                        <View style={{ backgroundColor: colors.brown400 }} className="h-12 flex flex-row items-center gap-4 rounded-lg px-2">
                            <AntDesign name="check-circle" size={24} color={colors.brown200} />
                            <Text className="text-lg font-semibold text-white">{item.text}</Text>
                        </View>
                    )}/>
                </View>
            </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
    wrapper: {
        flex: 1
    },
    brandText: {
        fontFamily: "Polea-Extra",
        fontSize: 48,
        marginBottom: 16,
        color: colors.brown400
    }
});