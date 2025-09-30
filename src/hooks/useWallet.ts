import { useEffect, useState, useCallback } from 'react';
import * as SecureStore from 'expo-secure-store';

const KEY = 'wallet.balance';
const DEFAULT_BALANCE = 1000;

export function useWallet() {
  const [balance, setBalance] = useState<number>(DEFAULT_BALANCE);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const raw = await SecureStore.getItemAsync(KEY);
        const initial = raw != null ? Number(raw) : DEFAULT_BALANCE;
        setBalance(Number.isFinite(initial) ? initial : DEFAULT_BALANCE);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  async function persist(next: number) {
    setBalance(next);
    await SecureStore.setItemAsync(KEY, String(next));
  }

  async function deposit(amount: number) {
    const next = balance + amount;
    await persist(next);
  }

  async function withdraw(amount: number) {
    const next = Math.max(0, balance - amount);
    await persist(next);
  }

  return { balance, loading, deposit, withdraw };
}
