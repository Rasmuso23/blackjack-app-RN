# Blackjack RN

En mobil **Blackjack-app** byggd i React Native och Expo Router.  
Spelet har en enkel startskärm, själva spelet spelas med en helt slumpad kortlek, finns även saldohantering och statistik.  
Feedback ges både visuellt (UI), via **ljud** och **vibration** vid vinster och förluster.

---

## Bygga och köra

1. Installera beroenden:

   ```bash
   npm install
   ```

2. Starta projektet:

   ```bash
   npm start
   ```

3. Välj plattform:
   - **i** för iOS
   - **a** för Android

---

## Projektstruktur

```
app/             Expo Router-sidor (home, game, stats, wallet)
src/components/  UI-komponenter (kort, knappar, kortlek)
src/hooks/       Spel- och plånbokshooks
src/context/     Kontext för handens tillstånd
src/outcome.tsx  Vinstlogik, ljud och haptik
assets/sounds/   Ljudfiler
```

---

## Funktioner

- Blackjack-spel med blandad kortlek och dealer-logik
- Spelstatus lagrad i **GameContext** för att dela händer mellan komponenter
- **Wallet** med `expo-secure-store` som sparar saldo lokalt mellan sessioner
- **Statistik** över spelomgångar (wins, losses, ties) på en egen skärm
- Ljud från `expo-av` och haptisk feedback via `expo-haptics`
- UI med `expo-linear-gradient` och ikoner från `@expo/vector-icons`

---

## Använda komponenter

**React Native-komponenter**

- `View`
- `Text`
- `Pressable`
- `StyleSheet`

**Expo-komponenter**

- `expo-router` (navigation)
- `expo-av` (ljud)
- `expo-haptics` (haptisk feedback)
- `expo-linear-gradient` (bakgrund och knappar)
- `@expo/vector-icons` (ikoner)
- `expo-secure-store` (lokal lagring för Wallet)

---

## Uppfyllda krav

- [x] Projektet använder minst 4 RN-komponenter och minst 4 Expo-komponenter
- [x] Komponenterna är antecknade i README (ovan)
- [x] React Navigation (via **Expo Router**) används för navigation
- [x] Git & GitHub har använts
- [x] README.md finns med titel, beskrivning, bygginstruktioner och krav

---
