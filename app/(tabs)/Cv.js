import Entypo from '@expo/vector-icons/Entypo';
import Feather from '@expo/vector-icons/Feather';
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";

export default function CV () {
    return (
        <SafeAreaProvider>
            <SafeAreaView>
                <ScrollView>
                    {/* header */}
                    <View style={styles.header}>
                        <Text style={styles.title}>Big Ayomzy</Text>

                        <View style={styles.subHeader}>
                            <Text style={styles.subTitle}>React Native Developer</Text>
                            <View style={styles.progress}>
                                <View style={styles.unitProgress}>
                                    <View style={styles.progressHeading}>
                                        <Entypo name="time-slot" size={24} color="black" />
                                        <Text style={styles.progressTitle}>Years</Text>
                                    </View>
                                    <Text style={styles.progressValue}>3</Text>
                                </View>
                                <View style={styles.unitProgress}>
                                    <View style={styles.progressHeading}>
                                        <Feather name="command" size={24} color="black" />
                                        <Text style={styles.progressTitle}>Level</Text>
                                    </View>
                                    <Text style={styles.progressValue}>Pro</Text>
                                </View>
                            </View>
                        </View>
                    </View>

                    {/* skills */}

                    {/* projects */}

                    {/* contributions */}
                </ScrollView>
            </SafeAreaView>
        </SafeAreaProvider>
    )
}

const styles = StyleSheet.create({
    p: {
        fontSize: 16, //unit is point
        fontWeight: "bold"
    }
})