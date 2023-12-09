/**
 * The solve function that takes the input.txt and returns the solutions
 * for part 1 and 2.
 *
 * @param {string} input - the input string
 * @returns {[number, number]} the solutions for each part
 */
export function solve(input: string): [number, number] {
  let [instructionsStr, ...mappingsStrs] = input.split('\n');
  let mapping: Record<string, [string, string]> = {};

  // strip the empty line between the instructions and the mappings
  mappingsStrs.slice(1).forEach(m => {
    let [key, valuePair] = m.split(' = '); // FFX = (HQG, VFQ)

    // strip the ( and ) from the mappings
    let [left, right] = valuePair.slice(1, -1).split(', ');
    mapping[key] = [left, right];
  });

  let instructions = instructionsStr.split('');
  return [
    mapping['AAA'] ? calculateStepCount('AAA', instructions, mapping, (node) => node === 'ZZZ') : 0,
    findStartingNodes(mapping).map(node => calculateStepCount(node, instructions, mapping, (node) => node.endsWith('Z'))).reduce(lcm)
  ];
};

function findStartingNodes(mappings: Record<string, [string, string]>): string[] {
  return Object.keys(mappings).filter(key => key.endsWith('A'));
}

function calculateStepCount(
  startingNode: string,
  instructions: string[],
  mappings: Record<string, [string, string]>,
  endCondition: (node: string) => boolean
): number {
  let stepCount = 0;
  let currentNode = startingNode;

  while (!endCondition(currentNode)) {
    currentNode = instructions[stepCount % instructions.length] === 'L' ? mappings[currentNode][0] : mappings[currentNode][1];
    stepCount += 1;
  }

  console.log(stepCount);

  return stepCount;
}

const gcd = (a: number, b: number): number => a ? gcd(b % a, a) : b;
const lcm = (a: number, b: number) => a * b / gcd(a, b);