/**
 * The solve function that takes the input.txt and returns the solutions
 * for part 1 and 2.
 *
 * @param {string} input - the input string
 * @returns {[number, number]} the solutions for each part
 */
export function solve(input: string): [number, number] {
  let part1 = 0;
  let part2 = 0;
  let cards = parseGameCards(input);

  let totalScorecards: Record<number, number> = {};
  cards.forEach(card => totalScorecards[card.id] = 1);

  cards.forEach(card => {
    let winningTickets = card.gameNumbers.filter(num => card.winningNumbers.indexOf(num) !== -1);

    for (let i = 1; i <= winningTickets.length; i++) {
      totalScorecards[card.id + i] += totalScorecards[card.id];
    }

    if (winningTickets.length > 0) {
      part1 += Math.pow(2, winningTickets.length - 1);
    }
  });

  Object.values(totalScorecards).forEach(total => part2 += total);
  return [part1, part2];
};

interface Game {
  id: number;
  winningNumbers: number[];
  gameNumbers: number[];
}

function parseGameCards(input: string): Game[] {
  let lines = input.split('\n');
  let games: Game[] = [];
  let gamesCount = 1;
  lines.forEach(line => {
    let [_, values] = line.split(': ');
    let [winningNumString, numbersString] = values.split(' | ');
    let winningNumbers = winningNumString.split(' ').filter(numStr => numStr).map(numStr => Number(numStr));
    let gameNumbers = numbersString.split(' ').filter(n => n).map(numStr => Number(numStr));

    games.push({
      id: gamesCount++,
      winningNumbers,
      gameNumbers
    });
  });

  return games;
}
