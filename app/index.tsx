import { useRouter } from "expo-router";
import { View, Text, Button, StyleSheet } from "react-native";

export default function Index() {
    const router = useRouter();

    return (
        <View style={styles.container}>
            <Text style={styles.title}>♠️Blackjack♠️</Text>
            <Button title="Starta spelet" onPress={() => router.push("/game")} />
        </View> 
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "gray"
    },
    title: {
        fontSize: 48,
        fontWeight: "bold",
    }
})
