import { useRouter } from "expo-router";
import { View, Text, Button, StyleSheet, Pressable } from "react-native";

export default function Index() {
    const router = useRouter();

    return (
        <View style={styles.container}>
            <Text style={styles.title}>♠️Blackjack♠️</Text>
            <Pressable style={styles.navButton} onPress={() => router.push("/game")}>
                <Text style={styles.buttonText}>Start</Text>
            </Pressable>
                <Pressable style={styles.navButton}onPress={() => router.push("/")}>
                    <Text style={styles.buttonText}>Stats</Text>
                </Pressable>
        </View> 
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center"
    },
    title: {
        fontSize: 48,
        fontWeight: "bold",
    },
    navButton: {
        backgroundColor: "gray",
        padding: 10,
        width: 200,
        height: 50,
        borderRadius: 10,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 10
    },
    buttonText: {
        color: "white",
        fontSize: 24,
        fontWeight: "bold"
    }
})
