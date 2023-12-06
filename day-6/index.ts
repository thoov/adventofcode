/**
 * The solve function that takes the input.txt and returns the solutions
 * for part 1 and 2.
 *
 * @param {string} input - the input string
 * @returns {[number, number]} the solutions for each part
 */
export function solve(input: string): [number, number] {
  let racesPart1 = parseSheetOfPaper(input, true);
  let racesPart2 = parseSheetOfPaper(input, false);

  return [findNumRaceWins(racesPart1), findNumRaceWins(racesPart2)];
};

function findNumRaceWins(races: { time: number, distance: number }[]): number {
  let score = 1;

  races.forEach(race => {
    let winningRaces = 0;
    for (let speed = 1; speed <= race.time; speed++) {
      let travelTime = race.time - speed;
      let distanceTraveled = speed * travelTime;

      if (distanceTraveled > race.distance) {
        winningRaces += 1;
      }
    }

    score *= winningRaces;
  });

  return score;
}

function parseSheetOfPaper(input: string, isPart1: boolean): { time: number, distance: number }[] {
  const regex = /(\d+)/g;
  let [timeStr, distanceStr] = input.split('\n');
  let times = [...timeStr.matchAll(regex)].map(item => Number(item[0]));
  let distances = [...distanceStr.matchAll(regex)].map(item => Number(item[0]));

  let races = [];

  if (isPart1) {
    for (let i = 0; i < times.length; i++) {
      races.push({
        time: times[i],
        distance: distances[i]
      });
    }
  } else {
    races.push({
      time: Number(times.join('')),
      distance: Number(distances.join(''))
    });
  }

  return races;
}
