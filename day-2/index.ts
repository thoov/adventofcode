/**
 * The solve function that takes the input.txt and returns the solutions
 * for part 1 and 2.
 *
 * @param {string} input - the input string
 * @returns {[number, number]} the solutions for each part
 */
export function solve(input: string): [number, number] {
  const lines = input.split('\n');
  const gameInfo = lines.map(line => parseGameInformation(line));

  return [part1(gameInfo), part2(gameInfo)];
};

function part1(gameInfo: GameInfo[]): number {
  let count = 0;

  gameInfo.forEach(info => {
    let isInvalid = false;

    info.revealed.forEach(r => {
      if (r.red > 12 || r.green > 13 || r.blue > 14) {
        isInvalid = true;
      }
    })

    if (!isInvalid) {
      count += parseInt(info.id, 10);
    }
  });

  return count;
}

function part2(gameInfo: GameInfo[]): number {
  let minScore = 0;

  gameInfo.forEach(info => {
    let minRed = 0;
    let minGreen = 0;
    let minBlue = 0;

    info.revealed.forEach(r => {
      minRed = minRed > r.red ? minRed : r.red;
      minGreen = minGreen > r.green ? minGreen : r.green;
      minBlue = minBlue > r.blue ? minBlue : r.blue;
    });

    minScore += minRed * minBlue * minGreen;
  });

  return minScore;
}

interface GameInfo {
  id: string;
  revealed: Revealed[]
}

interface Revealed {
  blue: number;
  red: number;
  green: number;
}

function parseGameInformation(line: string): GameInfo {
  let [gameId, revealedInfo] = line.split(': ');
  let [_, id] = gameId.split(' ');
  let revealed = revealedInfo.split('; ').map(r => parseRevealedInfomation(r));

  return {
    id,
    revealed
  };
}

function parseRevealedInfomation(info: string): Revealed {
  let revealed = { blue: 0, red: 0, green: 0 };

  info.split(', ').forEach(pair => {
    let [amount, color] = pair.split(' ');

    if (color === 'red') revealed.red = parseInt(amount, 10);
    if (color === 'blue') revealed.blue = parseInt(amount, 10);
    if (color === 'green') revealed.green = parseInt(amount, 10);
  });

  return revealed;
}
