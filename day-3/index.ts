/**
 * The solve function that takes the input.txt and returns the solutions
 * for part 1 and 2.
 *
 * @param {string} input - the input string
 * @returns {[number, number]} the solutions for each part
 */
export function solve(input: string): [number, number] {
  let schematic = parseEngineSchematic(input);
  let validEngineParts: EnginePart[] = [];
  let gearRatiosMap: Record<number, EnginePart[]> = {};

  schematic.partList.forEach(part => {
    let symbols = findSymbolsTouchingPart(part, schematic.symbolList);

    if (symbols.length > 0) {
      validEngineParts.push(part);
    }

    symbols.forEach(symbol => {
      if (symbol.type === '*') {
        if (!gearRatiosMap[symbol.id]) {
          gearRatiosMap[symbol.id] = [];
        }

        gearRatiosMap[symbol.id].push(part);
      }
    });
  });

  let part1 = validEngineParts.map(part => part.value).reduce((a, b) => a + b, 0);
  let part2 = 0;

  Object.values(gearRatiosMap).forEach(gearParts => {
    if (gearParts.length === 2) {
      let [gearA, gearB] = gearParts;

      part2 += gearA.value * gearB.value;
    }
  });

  return [part1, part2];
};

interface Schematic {
  partList: EnginePart[];
  symbolList: EngineSymbol[];
}

interface EnginePart {
  number: string;
  value: number;
  rowIdx: number;
  colIdx: number;
}

interface EngineSymbol {
  id: number;
  type: string;
  rowIdx: number;
  colIdx: number;
}

function parseEngineSchematic(input: string): Schematic {
  let lines = input.split('\n');
  let partList: EnginePart[] = [];
  let symbolList: EngineSymbol[] = [];
  let symbolIdx = 0;

  for (let rowIdx = 0; rowIdx < lines.length; rowIdx++) {
    const regex = RegExp('\\d+|[^\.]', 'gm');
    let found: RegExpExecArray | null;

    while ((found = regex.exec(lines[rowIdx])) !== null) {
      if (found.index === regex.lastIndex) {
        regex.lastIndex++;
      }

      if (!isNaN(parseInt(found[0], 10))) {
        partList.push({
          number: found[0],
          value: parseInt(found[0], 10),
          rowIdx,
          colIdx: regex.lastIndex - found[0].length
        });
      } else {
        symbolList.push({
          id: symbolIdx++,
          type: found[0],
          rowIdx,
          colIdx: regex.lastIndex - found[0].length
        });
      }
    }
  }

  return { partList, symbolList };
}

function findSymbolsTouchingPart(part: EnginePart, symbols: EngineSymbol[]): EngineSymbol[] {
  let symbolsTouchingPart: EngineSymbol[] = [];

  symbols.forEach(symbol => {
    // is there a symbol directly touching on either side of the part
    if (symbol.rowIdx === part.rowIdx && (symbol.colIdx === part.colIdx - 1 || symbol.colIdx === part.colIdx + part.number.length)) {
      symbolsTouchingPart.push(symbol);
    }

    // is there a symbol directly above or below the part (includes diagonally touching)
    let validRange = range(part.number.length + 2, part.colIdx - 1);
    if ((symbol.rowIdx + 1 === part.rowIdx || symbol.rowIdx - 1 === part.rowIdx) && validRange.indexOf(symbol.colIdx) !== -1) {
      symbolsTouchingPart.push(symbol);
    }
  });

  return symbolsTouchingPart;
}

function range(size: number, startAt: number = 0): ReadonlyArray<number> {
  return [...Array(size).keys()].map(i => i + startAt);
}
