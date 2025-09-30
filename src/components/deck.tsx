export type Card = {
  suit: string;
  value: string;
};

export function createDeck(): Card[] {
  const suits = ['spade', 'heart', 'diamond', 'club'];
  const values = ['A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K'];

  const deck: Card[] = [];

  for (let suit of suits) {
    for (let value of values) {
      deck.push({ suit, value });
    }
  }
  return shuffle(deck);
}

function shuffle(deck: Card[]): Card[] {
  const shuffled = [...deck];

  //Fisher-Yates
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1)); //slumpar index mellan 0 och i
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]]; //byter plats
  }
  return shuffled;
}

function getCardValue(card: Card): number {
  if (card.value === 'A') return 11; //A som 11
  if (['J', 'Q', 'K'].includes(card.value)) return 10;
  return parseInt(card.value);
}

export function getHandValue(hand: Card[]): number {
  let total = 0;
  let ace = 0;

  for (const card of hand) {
    if (card.value === 'A') {
      ace++;
      total += 11; //A som 11
    } else {
      total += getCardValue(card);
    }
  }
  while (total > 21 && ace > 0) {
    total -= 10; // A som 1
    ace--;
  }
  return total;
}

export function drawCard(deck: Card[]): [Card, Card[]] {
  const next = [...deck];
  const card = next.pop()!;
  return [card, next];
}

export function hit(hand: Card[], deck: Card[]) {
  const [card, rest] = drawCard(deck);
  const newHand = [...hand, card];
  const total = getHandValue(newHand);

  return { hand: newHand, deck: rest, total, bust: total > 21 } as const;
}
