export function solve(lines: string): [number, number] {
  return [parse(lines, false), parse(lines, true)];
};

function parse(lines: string, allowWordNums: boolean): number {
  let sum = 0;

  for (const line of lines.split('\n')) {
    let digits = line.split('').map((char, idx) => {
      if (allowWordNums) {
        const slice = line.slice(idx);

        if (slice.startsWith('one')) return 1
        if (slice.startsWith('two')) return 2
        if (slice.startsWith('three')) return 3
        if (slice.startsWith('four')) return 4
        if (slice.startsWith('five')) return 5
        if (slice.startsWith('six')) return 6
        if (slice.startsWith('seven')) return 7
        if (slice.startsWith('eight')) return 8
        if (slice.startsWith('nine')) return 9
      }
      return parseInt(char);
    }).filter(n => !!n);


    let calibration = Number(`${digits[0]}${digits.at(-1)}`);
    sum += calibration;
  }

  return sum;
}