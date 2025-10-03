import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Link } from 'expo-router';
import { Pressable, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { colors } from '../theme/colors';

export default function PostSnippet({ postData }) {
    return (
        <View>
            {/* author info and time */}
            <View className="flex flex-row justify-between">
                {/* left: author bio */}
                <Link href="/user-profile">
                    <View  className="flex flex-row items-center gap-2">
                        <View style={styles.profileCircle}>
                            <Text className="text-2xl">{postData.author.firstName[0]}</Text>
                        </View>
                        <Text className="font-bold">{`${postData.author.firstName} ${postData.author.lastName}`}</Text>
                    </View>
                </Link>

                {/* right: time past since posst was made*/}

            </View>

            <Text className="font-semibold text-md text-neutral-700">{postData.data.text}</Text>

            {/* interactions */}
            <View className="flex flex-row justify-end items-center gap-6">
                <TouchableOpacity>
                    <FontAwesome name="heart" size={24} color="black" />
                </TouchableOpacity>
                <Pressable>
                    <FontAwesome name="comments-o" size={24} color="black" />
                </Pressable>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    profileCircle: {
        height:48,
        width: 48,
        borderRadius: 24,
        display: "flex",
        justifyContent: "center",
        alignItems:"center",
        backgroundColor: colors.brown300
    }
})