import { useRouter } from "expo-router";
import { View, Text, StyleSheet, Button } from "react-native";


export default function Game() {
    const router = useRouter();

    return (
        <View style={styles.container}>
            <Text style={styles.title}>♥️♠️♦️♣️</Text>
                <Button title="Gå tillbaka" onPress={() => router.push("/")} />
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
    }
})