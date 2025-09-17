import { View, Text, StyleSheet,Pressable, Button } from "react-native";
import { useState } from "react";
import { Card, createDeck, getHandValue } from "../src/components/deck";
import { useRouter } from "expo-router";

export default function Game() {
    const router = useRouter();

    const [deck, setDeck] = useState<Card[]>([]);
    const [player, setPlayer] = useState<Card[]>([]);
    const [dealer, setDealer] = useState<Card[]>([]);

    const deal = () => {
        const d = createDeck();
        setDeck(d);
        setPlayer([d[0], d[2]]);
        setDealer([d[1], d[3]]);
    }

    const displayHand = (hand: Card[]) => hand.map(c => `${c.suit}${c.value}`).join(" ");

    return (
        <View style={styles.container}>
            <Text style={styles.dealer}>Dealer: {displayHand(dealer)}({getHandValue(dealer)})</Text>
                <Button title="Deal" onPress={deal} />
                    <Text style={styles.player}>Player: {displayHand(player)}({getHandValue(player)})</Text>
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
    },
    dealer: { //Todo
        top: -50
    },
    player: {
        bottom: -50
    }
})