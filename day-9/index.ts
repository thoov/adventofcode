/**
 * The solve function that takes the input.txt and returns the solutions
 * for part 1 and 2.
 *
 * @param {string} input - the input string
 * @returns {[number, number]} the solutions for each part
 */
export function solve(input: string): [number, number] {
  let lines = input.split('\n');
  let histories = lines.map(line => line.split(' ').map(str => Number(str)));

  let part1 = histories.map(history => findNextPrediction(history)).reduce((acc, val) => acc + val, 0);
  let part2 = histories.map(history => findNextExtrapolation(history)).reduce((acc, val) => acc + val, 0);

  return [part1, part2];
};

function findNextPrediction(history: number[]): number {
  let differences = reduceToZeros(history);
  let predicitions: number[] = [];
  let predictionValue = 0;

  differences.forEach(sequence => {
    let nextValue = sequence[sequence.length - 1] + predictionValue;
    predicitions.push(nextValue);
    predictionValue = nextValue;
  });

  return predicitions[predicitions.length - 1];
}

function findNextExtrapolation(history: number[]): number {
  let differences = reduceToZeros(history);

  let predicitions: number[] = [];
  let exprapolationValue = 0;

  differences.forEach(sequence => {
    let nextValue = sequence[0] - exprapolationValue;
    predicitions.push(nextValue);
    exprapolationValue = nextValue;
  });

  return predicitions[predicitions.length - 1];
}

function reduceToZeros(history: number[]): number[][] {
  let differences: number[][] = [history];
  while (!differences[0].every(val => val === 0)) {
    let nextSequence = [];

    for (let i = 0; i < differences[0].length - 1; i++) {
      nextSequence.push(differences[0][i + 1] - differences[0][i]);
    }

    differences.unshift(nextSequence);
  }

  return differences;
}