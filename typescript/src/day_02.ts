import { readInputFile } from "./helper";

//returns [red, green, blue]
function getDraws(line: string): number[][] {
  let result: number[][] = [];
  const draws = line.split("; ");
  for (const draw of draws) {
    result.push([
      parseInt(draw.match(/(\d+) red/)?.[1] ?? "0"),
      parseInt(draw.match(/(\d+) green/)?.[1] ?? "0"),
      parseInt(draw.match(/(\d+) blue/)?.[1] ?? "0"),
    ]);
  }
  return result;
}

function selectHighest(values: number[][]): number[] {
  return values.reduce((highest, current, i) => [
    Math.max(highest[0], current[0]),
    Math.max(highest[1], current[1]),
    Math.max(highest[2], current[2]),
  ]);
}
function isDrawPossible([red, green, blue]: number[]) {
  return red <= 12 && green <= 13 && blue <= 14;
}

let sumOfValidIndices = 0;
let sumOfPowers = 0;
const lines = readInputFile("day_2");
for (const line of lines) {
  const colonIndex = line.indexOf(": ");
  const gameIndex = parseInt(line.substring(5, colonIndex));

  const draws = getDraws(line.substring(colonIndex));
  const requiredCubes = selectHighest(draws);
  if (isDrawPossible(requiredCubes)) {
    sumOfValidIndices += gameIndex;
  }
  sumOfPowers += requiredCubes.reduce((p, c, _) => p * c);
}

console.log(`Part 1 result: ${sumOfValidIndices}`);
console.log(`Part 2 result: ${sumOfPowers}`);
