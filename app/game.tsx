import { useRouter } from "expo-router";
import { View, Text, StyleSheet,Pressable } from "react-native";


export default function Game() {
    const router = useRouter();

    return (
        <View style={styles.container}>
            <Text style={styles.title}>♥️♠️♦️♣️</Text>
                <Pressable style={styles.homeButton} onPress={() => router.push("/")}>
                    <Text style={styles.buttonText}>Home</Text>
                </Pressable>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
    },
    title: {
        fontSize: 48,
        fontWeight: "bold",
    },
    homeButton: {
        position: "absolute",
        backgroundColor: "gray",
        padding: 10,
        width: 200,
        height: 50,
        borderRadius: 10,
        justifyContent: "center",
        alignItems: "center",
        bottom: 30
    },
    buttonText: {
        color: "black",
        fontSize: 24,
        fontWeight: "bold"
    }
})