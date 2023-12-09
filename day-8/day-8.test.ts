import { describe, expect, test, beforeAll } from "bun:test";
import { solve } from "./index";

describe("day 8", () => {
  let inputTxt: string;
  let testInputTxt: string;
  let testInput2Txt: string;

  beforeAll(async () => {
    const inputFile = Bun.file(Bun.resolveSync("./input.txt", import.meta.dir));
    const testInputFile = Bun.file(Bun.resolveSync("./test-input.txt", import.meta.dir));
    const testInput2File = Bun.file(Bun.resolveSync("./test-input-2.txt", import.meta.dir));
    inputTxt = await inputFile.text();
    testInputTxt = await testInputFile.text();
    testInput2Txt = await testInput2File.text();
  });

  test("solving part 1 correctly", () => {
    const [part1] = solve(testInputTxt);
    expect(part1).toEqual(6);
  });

  test("solving part 2 correctly", () => {
    const [_, part2] = solve(testInput2Txt);
    expect(part2).toEqual(6);
  });

  test("solving works correctly", () => {
    expect(solve(inputTxt)).toEqual([22357, 10371555451871]);
  });
});
