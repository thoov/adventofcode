import { describe, expect, test, beforeAll } from "bun:test";
import { solve } from "./index";

describe("day 6", () => {
  let inputTxt: string;
  let testInputTxt: string;

  beforeAll(async () => {
    const inputFile = Bun.file(Bun.resolveSync("./input.txt", import.meta.dir));
    const testInputFile = Bun.file(Bun.resolveSync("./test-input.txt", import.meta.dir));
    inputTxt = await inputFile.text();
    testInputTxt = await testInputFile.text();
  });

  test("solving part 1 correctly", async () => {
    const [part1] = solve(testInputTxt);
    expect(part1).toEqual(288);
  });

  test("solving part 2 correctly", async () => {
    const [_, part2] = solve(testInputTxt);
    expect(part2).toEqual(71503);
  });

  test("solving works correctly", async () => {
    expect(solve(inputTxt)).toEqual([1084752, 28228952]);
  });
});
