import Entypo from '@expo/vector-icons/Entypo';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Link } from 'expo-router';
import { addDoc, collection, doc, getDoc, onSnapshot, query, where } from 'firebase/firestore';
import { useContext, useEffect, useState } from 'react';
import { Pressable, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import { AuthContext } from "../config/auth-context.config";
import { db } from '../settings/firebase';
import { colors } from '../theme/colors';
import { TimePast } from '../utils/time-past';

export default function PostSnippet({ postData }) {
    const [commentInput,setCommentInput]= useState("");
    const [showCommentBox,setShowCommentBox]= useState(false);
    const { user } = useContext(AuthContext);
    const [comments,setcomments] = useState([]);
    const [commentsWithAuthorData,setcommentsWithAuthorData] = useState([]);

    // fetch all comments
    const q = query(collection(db,"comments"),where("target","==",postData.id));
    onSnapshot(q,(docSnapShot)=> {
        const newData = [];
        docSnapShot.docs.forEach(doc => newData.push({
            id: doc.id,
            data: doc.data()
        }));
        setcomments(newData);
    });

    // get authors of comments
    useEffect(()=>{
        const handleGEtCommentsWithAuthors = async ()=> {
            const commentsWithAuthorPromises = comments.map(async (item) => {
                try {
                    const docSnap = await getDoc(doc(db,"users",item.data.author));
                    if (docSnap.exists()) {
                        return {
                            id: item.id,
                            data: item.data,
                            author: docSnap.data()
                        }
                    } else {
                        return false;
                    }
                } catch (error) {
                    console.log("an error occurs",error); 
                }
            });

            const commentsWithAuthorData = await Promise.all(commentsWithAuthorPromises);
            setcommentsWithAuthorData(commentsWithAuthorData);
        }

        // call the function
        handleGEtCommentsWithAuthors();
    },[comments])

    const handlePostComment = async () => {
        try {
            await addDoc(collection(db,"comments"),{
                target: postData.id,
                text: commentInput,
                author: user?.uid,
                createdAt: new Date().getTime()
            });

            setCommentInput("");
            setShowCommentBox(false);
        } catch (error) {
            console.log("There was an error",error)
            
        }

    }

    return (
        <View>
            {/* author info and time */}
            <View className="flex flex-row justify-between items-center">
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
                <Text className="text-neutral-700">{TimePast(postData.data.createdAt)}</Text>

            </View>

            <Text className="font-semibold text-md text-neutral-700">{postData.data.text}</Text>

            {/* interactions */}
            <View className="flex gap-1">
                 <View className="flex flex-row  items-center gap-4">
                    <TouchableOpacity>
                        <FontAwesome name="heart" size={24} color="black" />
                    </TouchableOpacity>
                    <Pressable onPress={()=> setShowCommentBox(!showCommentBox)}>
                        <FontAwesome name="comments-o" size={24} color="black" />
                    </Pressable>
                </View>
                <Pressable>
                    {commentsWithAuthorData.slice(0,2).map(item => (
                        <View className="flex flex-row gap-3" key={item.id}>
                            <Text style={{color: colors.brown300}}>{item.author.firstName}</Text>
                            <Text style={{color: colors.brown400}}>{item.data.text}</Text>
                        </View>
                    ))}
                </Pressable>
               
            </View>

            {/* comment box */}
            {showCommentBox &&
            <View className="flex flex-row gap-3">
                <View className="w-80">
                    <TextInput
                    keyboardType="default"
                    style={styles.input}
                    multiline={true}
                    numberOfLines={4}
                    value={commentInput} // assign the current value of the textinput
                    onChangeText={(text)=> setCommentInput(text)}
                    />
                </View>
                <TouchableOpacity onPress={handlePostComment}>
                    <Entypo name="upload"
                     size={36} color={commentInput.length > 0? colors.brown300 : colors.gray300}/>
                </TouchableOpacity>
            </View>}

            {/* recent comment */}
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
    },
    input: {
        borderWidth: 1,
        borderColor: colors.gray300,
        borderRadius: 4,
        fontSize: 16,
        paddingHorizontal: 6,
    },
})