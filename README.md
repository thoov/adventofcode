# Advent of Code

My solutions for [adventofcode](https://adventofcode.com/).

## Project Structure

For each day, copy the `day-x`directory and replace all `-x` with the specific day number. The directory structure
looks like:

- `day-x/`
  - `input.txt` The input text for the given day's question.
  - `index.ts` A file that exports a "solve" function with type: `string[] => [number, number]`.
  - `day-x.test.ts`A test file that validates the "solve" function.

## Running

`bun index.ts`

## Testing

`bun test`
`bun test --watch`