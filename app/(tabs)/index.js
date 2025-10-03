import AntDesign from '@expo/vector-icons/AntDesign';
import Ionicons from '@expo/vector-icons/Ionicons';
import { useFonts } from "expo-font";
import { Link } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { collection, doc, getDoc, onSnapshot } from 'firebase/firestore';
import { useContext, useEffect, useState } from "react";
import { ActivityIndicator, FlatList, Pressable, StatusBar, StyleSheet, Text, View } from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { Seperator } from "../../components/ListSeperator";
import PostSnippet from '../../components/PostSnippet';
import { db, } from '../../settings/firebase';
import { colors } from '../../theme/colors';
import { AuthContext } from "./../../config/auth-context.config";

SplashScreen.preventAutoHideAsync();

export default function Index () {
    const { user } = useContext(AuthContext);
    const [posts,setposts]= useState(undefined);
    const [postsWithAuthorData, setpostsWithAuthorData]=useState(undefined);

       const [loaded, error] = useFonts({
            "Polea-Extra": require("../../assets/fonts/Polea-Extra.otf"),
        });
    
        useEffect(() => {
            if (loaded || error) {
                SplashScreen.hideAsync();
            }
        }, [loaded, error]);
    
        if (!loaded && !error) {
            return null;
        }

        // fetch post data from the database
        
          const compiledData = [];
          onSnapshot(collection(db,"posts"),(docs) => {
            docs.forEach(doc=> {
              compiledData.push({
                id:doc.id,
                data: doc.data()
              })

            });

            setposts(compiledData);
          });
        

              // fetch authors data and merge with posts data
    useEffect(() => {
        const handlegetPostWithAuthorProfile = async () =>  {
          if (Array.isArray(posts) && posts.length > 0) {
            const postsWithAuthorsPromises = posts.map(async (post) => {
                //get author data
                const docSnap = await getDoc(doc(db, "users",post.data.author));
                if (docSnap.exists()) {
                     mergeData = {
                        id: post.id,
                        data: post.data,
                        author: docSnap.data(),
                    }
                    return mergeData                    
                }
            });

            const postsWithAuthors = await Promise.all(postsWithAuthorsPromises);
            setpostsWithAuthorData(postsWithAuthors)
        }
        }
        handlegetPostWithAuthorProfile()
    }, [posts]);

    return (
        <SafeAreaProvider>
          <StatusBar barStyle="dark-content" backgroundColor="transparent" />
            <SafeAreaView style={styles.wrapper}>
                {/* header */}
                <View className="flex flex-row justify-between mb-3">
                    <Text style={styles.brandText}>Coprenuer</Text>
                  <View className="flex flex-row gap-3">
                    <Pressable>
                      <Ionicons name="notifications" size={24} color="black" />
                    </Pressable>
                    <Link href="/(tabs)/profile">
                    <AntDesign name="user" size={24} color="black" />
                    </Link>
                  </View>
                </View>
                {postsWithAuthorData !== undefined
                  ?
                <FlatList
                data={postsWithAuthorData}
                renderItem={({item})=> {
                  return (
                    <PostSnippet postData={item}/>
                  )
                }}
                keyExtractor={(item)=> item.id}
                ItemSeparatorComponent={()=><Seperator w={0} h={16} />}
                />
                :
                <View style={styles.bodyEmpty}>
                  <ActivityIndicator size={36} color={colors.brown300} />
                  <Text className="italic text-sm text-neutral-500">... feeds loading</Text>

                </View>
              }

               
            </SafeAreaView>
        </SafeAreaProvider>
    )
}

const styles = StyleSheet.create({
  wrapper: {
    flex:1,
    paddingHorizontal:8
  },
  bodyEmpty: {
    flex:1,
    justifyContent: "center",
    alignItems:"center"
  },
    brandText: {
        fontFamily: "Polea-Extra",
        fontSize: 28,
        color: colors.brown400
    }
});