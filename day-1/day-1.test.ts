import { describe, expect, test, beforeAll } from "bun:test";
import { solve } from "./index";

let lines: string[] = [];

describe("day 1", () => {
  beforeAll(async () => {
    const bunFile = Bun.file(Bun.resolveSync("./input.txt", import.meta.dir));
    const input = await bunFile.text();
    lines = input.split("\n");
  });

  test("solving works correctly", async () => {
    expect(solve(lines)).toEqual([0, 0]);
  });
});