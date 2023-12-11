/**
 * The solve function that takes the input.txt and returns the solutions
 * for part 1 and 2.
 *
 * @param {string} input - the input string
 * @returns {[number, number]} the solutions for each part
 */
export function solve(input: string): [number, number] {
  const yCoordinatesWithGalaxy: Set<number> = new Set();
  const xCoordinatesWithGalaxy: Set<number> = new Set();
  const galaxies: [number, number][] = [];

  input.split('\n').map((row, y) => row.split('').map((type, x) => {
    if (type === '#') {
      xCoordinatesWithGalaxy.add(x);
      yCoordinatesWithGalaxy.add(y);
      galaxies.push([x, y]);
    }
  }));

  let part1 = 0;
  let part2 = 0;
  for (let i = 0; i < galaxies.length; i++) {
    for (let j = i + 1; j < galaxies.length; j++) {
      const galaxy1 = galaxies[i];
      const galaxy2 = galaxies[j];

      const xDistance = Math.abs(galaxy1[0] - galaxy2[0]) + expansionFactor(galaxy1[0], galaxy2[0], xCoordinatesWithGalaxy);
      const yDistance = Math.abs(galaxy1[1] - galaxy2[1]) + expansionFactor(galaxy1[1], galaxy2[1], yCoordinatesWithGalaxy);

      const xDistance2 = Math.abs(galaxy1[0] - galaxy2[0]) + (expansionFactor(galaxy1[0], galaxy2[0], xCoordinatesWithGalaxy) * 999_999);
      const yDistance2 = Math.abs(galaxy1[1] - galaxy2[1]) + (expansionFactor(galaxy1[1], galaxy2[1], yCoordinatesWithGalaxy) * 999_999);

      part1 += xDistance + yDistance;
      part2 += xDistance2 + yDistance2;
    }
  }

  return [part1, part2];
};

function expansionFactor(
  pointA: number,
  pointB: number,
  coordinatesWithGalaxies: Set<number>
): number {
  let expansionFactor = 0;
  let startPoint = Math.min(pointA, pointB);
  let endPoint = Math.max(pointA, pointB);

  for (let i = startPoint; i < endPoint; i++) {
    if (!coordinatesWithGalaxies.has(i)) {
      expansionFactor++;
    }
  }

  return expansionFactor;
}