

export type Card = {
    suit: string;
    value: string;
};

export function createDeck(): Card[] {
    const suits = ["♠️", "♥️", "♦️", "♣️"];
    const values = ["A", "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K"];

    const deck: Card[] = [];

    for (let suit of suits) {
        for (let value of values) {
            deck.push({ suit, value });
        }
    }
    return deck;
}