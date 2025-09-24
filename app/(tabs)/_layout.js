import AntDesign from '@expo/vector-icons/AntDesign';
import Feather from '@expo/vector-icons/Feather';
import Foundation from '@expo/vector-icons/Foundation';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { Tabs } from "expo-router";
import { colors } from "../../theme/colors";

export default function Layout () {
    return (
        <Tabs screenOptions={{ tabBarActiveTintColor: colors.brown300 }}>
            <Tabs.Screen
            name="index"
            options={{
                title: "Home",
                headerShown: false,
                tabBarIcon: ({ color }) => (<Feather name="home" size={24} color={color} />)
            }}/>
            
            <Tabs.Screen
            name="find"
            options={{
                title: "Find",
                headerShown: false,
                tabBarIcon: ({ color }) => (<MaterialCommunityIcons name="file-find" size={24} color={color} />)
            }}/>

            <Tabs.Screen
            name="cv"
            options={{
                title: "CV",
                headerShown: false,
                tabBarIcon: ({ color }) => (<Foundation name="clipboard-notes" size={24} color={color} />)
            }}/>

            <Tabs.Screen
            name="me"
            options={{
                title: "Me",
                headerShown: false,
                tabBarIcon: ({ color }) => (<AntDesign name="user" size={24} color={color} />)
            }}/>

        </Tabs>
    )
}