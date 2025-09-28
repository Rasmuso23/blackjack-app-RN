export let stats = { rounds: 0, wins: 0, losses: 0, ties: 0 };

export function addStat(outcome: string) {
  stats.rounds += 1;

  const lower = outcome.toLowerCase();
  if (lower.includes('tie')) stats.ties += 1;
  else if (lower.includes('dealer wins')) stats.losses += 1;
  else if (lower.includes('you win')) stats.wins += 1;
}
