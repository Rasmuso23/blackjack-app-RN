import { View, Text, Button, StyleSheet } from "react-native";

export default function HomeScreen() {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>♠️Blackjack♠️</Text>
            <Button title="Starta spelet" />
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
