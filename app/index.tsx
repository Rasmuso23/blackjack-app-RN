import { useRouter } from "expo-router";
import { View, Text, StyleSheet, Pressable } from "react-native";

export default function Home() {
    const router = useRouter();

    return (
        <View style={styles.container}>
            <View style={styles.titleContainer}>
            <Text style={styles.title}>♠️Blackjack♠️</Text>
            </View>
            <View style={styles.buttonsContainer}>
            <Pressable style={styles.navButton} onPress={() => router.push("/game")}>
                <Text style={styles.buttonText}>Start</Text>
            </Pressable>
                <Pressable style={styles.navButton}onPress={() => router.push("/")}>
                    <Text style={styles.buttonText}>Statistics</Text>
                </Pressable>
                <Pressable style={styles.navButton}onPress={() => router.push("/")}>
                    <Text style={styles.buttonText}>Wallet</Text>
                </Pressable>
                </View>
        </View> 
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "white",
        justifyContent: "center",
        alignItems: "center"
    },
    titleContainer: {
        position: "absolute",
        top: "40%",
        left: 0,
        right: 0,
        justifyContent: "center",
        alignItems: "center",
        marginBottom: 20
    },
    title: {
        fontSize: 48,
        fontWeight: "bold",
    },
    buttonsContainer: {
        alignItems: "center",
        position: "absolute",
        top: "55%",
        left: 0,
        right: 0,
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
        color: "black",
        fontSize: 24,
        fontWeight: "bold"
    }
})
