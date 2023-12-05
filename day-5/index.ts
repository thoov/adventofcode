/**
 * The solve function that takes the input.txt and returns the solutions
 * for part 1 and 2.
 *
 * @param {string} input - the input string
 * @returns {[number, number]} the solutions for each part
 */
export function solve(input: string): [number, number] {
  let seedRegex = /seeds: (?<seeds>(\d+[ ]*)+)\n/gm
  let seedToSoilRegex = /seed-to-soil map:\n(?<mappings>(\d+\s*)+)/gm
  let soilToFertilizerRegex = /soil-to-fertilizer map:\n(?<mappings>(\d+\s*)+)/gm
  let fertilizerToWaterRegex = /fertilizer-to-water map:\n(?<mappings>(\d+\s*)+)/gm
  let waterToLightRegex = /water-to-light map:\n(?<mappings>(\d+\s*)+)/gm
  let lightToTemperatureRegex = /light-to-temperature map:\n(?<mappings>(\d+\s*)+)/gm
  let temperatureToHumidityRegex = /temperature-to-humidity map:\n(?<mappings>(\d+\s*)+)/gm
  let humidityToLocationRegex = /humidity-to-location map:\n(?<mappings>(\d+\s*)+)/gm

  let seedsGroup = (seedRegex.exec(input)?.groups?.seeds)?.split(' ').map(str => Number(str)) || [];
  let mappings = [
    createMapping(input, seedToSoilRegex),
    createMapping(input, soilToFertilizerRegex),
    createMapping(input, fertilizerToWaterRegex),
    createMapping(input, waterToLightRegex),
    createMapping(input, lightToTemperatureRegex),
    createMapping(input, temperatureToHumidityRegex),
    createMapping(input, humidityToLocationRegex)
  ];

  let part1Seeds: Range[] = [];
  let part2Seeds: Range[] = [];

  for (let i = 0; i < seedsGroup.length; i++) {
    part1Seeds.push(new Range(seedsGroup[i], seedsGroup[i]));
  }

  for (let i = 0; i < seedsGroup.length; i += 2) {
    part2Seeds.push(new Range(seedsGroup[i], seedsGroup[i] + seedsGroup[i + 1] - 1));
  }

  return [findLowestLocation(part1Seeds, mappings), findLowestLocation(part2Seeds, mappings)];
};

function findLowestLocation(seeds: Range[], mappings: Mapping[][]): number {
  let ranges = seeds;
  for (let mapping of mappings) {
    resetTransformed(ranges);

    for (let mapTransform of mapping) {
      ranges = ranges.flatMap(range => mapTransform.transform(range));
    }
  }

  let lowestLocation = Infinity;
  ranges.forEach(range => lowestLocation = Math.min(lowestLocation, range.start));

  return lowestLocation;
}

function resetTransformed(ranges: Range[]) {
  for (let range of ranges) {
    range.isTransformed = false;
  }
}

class Range {
  start: number;
  end: number;
  isTransformed: boolean;

  constructor(start: number, end: number) {
    this.start = start;
    this.end = end;
    this.isTransformed = false;
  }

  intesection(aRange: Range): { intersection: Range | null, remaining: Range[] } {
    if (aRange.start >= this.start && aRange.start <= this.end || this.start >= aRange.start && this.start <= aRange.end) {

      let intersection = new Range(Math.max(aRange.start, this.start), Math.min(aRange.end, this.end));
      let remaining: Range[] = [];

      if (aRange.start < this.start) {
        remaining.push(new Range(aRange.start, this.start - 1));
      }
      if (aRange.end > this.end) {
        remaining.push(new Range(this.end + 1, aRange.end));
      }

      return {
        intersection,
        remaining
      };
    }

    return { intersection: null, remaining: [new Range(aRange.start, aRange.end)] };
  }
}

class Mapping {
  source: Range;
  destination: Range;
  amount: number;

  constructor(destinationStart: number, sourceStart: number, amount: number) {
    this.source = new Range(sourceStart, sourceStart + amount - 1);
    this.destination = new Range(destinationStart, destinationStart + amount - 1);
    this.amount = amount;
  }

  get offset() {
    return this.destination.start - this.source.start;
  }

  transform(input: Range): Range[] {
    if (input.isTransformed) return [input];

    let { intersection, remaining } = this.source.intesection(input);
    if (!intersection) {
      return [input];
    }

    intersection.start += this.offset;
    intersection.end += this.offset;
    intersection.isTransformed = true;

    return [intersection, ...remaining];
  }
}

function createMapping(input: string, regex: RegExp): Mapping[] {
  let mappingGroup = (regex.exec(input)?.groups?.mappings)?.split('\n').filter(row => row !== '').map(row => row.split(' ').map(str => Number(str))) || [[]];
  let mappings: Mapping[] = [];

  mappingGroup.forEach(([destinationStart, sourceStart, amount]) => {
    mappings.push(new Mapping(destinationStart, sourceStart, amount));
  });

  return mappings;
}
