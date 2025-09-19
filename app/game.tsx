import { View, Text, StyleSheet,Pressable, Button } from "react-native";
import { useState } from "react";
import { Card, createDeck, getHandValue } from "../src/components/deck";
import { useRouter } from "expo-router";
import { Winner } from "../src/rules";
import { useGame } from "../src/context/GameContext";
import { LinearGradient } from "expo-linear-gradient";
import PlayingCard from "../src/components/card";

export default function Game() {
    const router = useRouter();

    const [deck, setDeck] = useState<Card[]>([]);
    const { playerHand, dealerHand, setPlayerHand, setDealerHand } = useGame();
    const [hiddenCard, setHiddenCard] = useState<Card | null>(null);

    const deal = () => {
        setPlayerHand([]); 
        setDealerHand([]); 
        setHiddenCard(null);

        setTimeout(() => {

        const d = createDeck();
        setDeck(d);
        
        setTimeout(() => {
            setPlayerHand([d[0]]);
            }, 500);
            
            setTimeout(() => {
                setDealerHand([d[1]]);
            }, 1000);
            
            setTimeout(() => {
                setPlayerHand([d[0], d[2]]);
            }, 1500);
            
            setTimeout(() => {
                setHiddenCard(d[3]);
            }, 2000);
    }, 1000);
};

    const displayHand = (hand: Card[]) => hand.map(c => `${c.suit}${c.value}`).join(" ");

    const reveal = () => {
        if (!hiddenCard)
            return;
        setDealerHand([dealerHand[0], hiddenCard]);
        setHiddenCard(null);
    };

    return (
        <LinearGradient colors={["#0b5d1e", "#0f7a2a", "#0b5d1e"]} 
                        start={{ x: 0.2, y: 0}} 
                        end={{ x: 0.8, y: 1 }} 
                        style={styles.container}
                        >
            <View style={styles.dealer}>
                <Text>
                Dealer ({hiddenCard ? "?" : getHandValue(dealerHand)})
                </Text>
                <View style={{ flexDirection: "row" }}>
                    {dealerHand.map((c, i) => (
                        <PlayingCard key={i} card={c} />
                    ))}
                    {hiddenCard && <PlayingCard card={hiddenCard} faceDown />}
                </View>
                </View>

                <Button title="Deal" onPress={deal} />
                <Button title="Reveal card" onPress={reveal} disabled={!hiddenCard} />

                {playerHand.length === 2 && dealerHand.length === 2 ? <Winner /> : null}
                    
                    <View style={styles.player}>
                        <Text>
                            Player: ({getHandValue(playerHand)})
                        </Text>
                        <View style={{ flexDirection: "row" }}>
                            {playerHand.map((c, i) => (
                                <PlayingCard key={i} card={c} />
                            ))}
                        </View>
                    </View>
                <Pressable style={styles.homeButton} onPress={() => {
                     setPlayerHand([]); 
                     setDealerHand([]); 
                     setHiddenCard(null);
                     router.push("/")}}>
                        
                    <Text style={styles.buttonText}>Home</Text>
                </Pressable>
        </LinearGradient>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        paddingHorizontal: 16,
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