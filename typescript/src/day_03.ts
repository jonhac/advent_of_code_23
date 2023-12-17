import { readInputFile } from "./helper";

type GridNumber = { digits: number[]; enabled: boolean };
type GridElement = GridNumber | "Symbol" | "Dot";

let grid: GridElement[][] = [];
let numbers: GridNumber[] = [];

function isInGrid(y: number, x: number) {
  return y >= 0 && x >= 0 && y < grid.length && x < grid[y].length;
}
function getPreviousAdjecent(y: number, x: number): GridElement[] {
  const candidates = [];
  candidates.push([y - 1, x - 1]);
  candidates.push([y - 1, x]);
  candidates.push([y - 1, x + 1]);
  candidates.push([y, x - 1]);
  return candidates
    .filter(([y, x]) => isInGrid(y, x))
    .map(([y, x]) => grid[y][x]);
}
function enablePreviousNumbers(y: number, x: number) {
  getPreviousAdjecent(y, x).forEach((element) => {
    if (!element.hasOwnProperty("enabled")) {
      return;
    }
    (element as GridNumber).enabled = true;
  });
}
function isAdjecentToPreviousSymbol(y: number, x: number) {
  return getPreviousAdjecent(y, x).find((e) => e === "Symbol") !== undefined;
}
function parseGrid(lines: string[]) {
  grid = [];
  numbers = [];
  for (let y = 0; y < lines.length; y++) {
    grid.push([]);
    for (let x = 0; x < lines[y].length; x++) {
      const character = lines[y][x];
      let gridElement: GridElement;

      const isDigit = /\d/.test(character);
      if (isDigit) {
        if (x > 0 && grid[y][x - 1].hasOwnProperty("digits")) {
          gridElement = grid[y][x - 1] as GridNumber;
          gridElement.digits.push(parseInt(character));
          gridElement.enabled =
            gridElement.enabled || isAdjecentToPreviousSymbol(y, x);
        } else {
          gridElement = {
            digits: [parseInt(character)],
            enabled: isAdjecentToPreviousSymbol(y, x),
          };
          numbers.push(gridElement);
        }
      } else if (character === ".") {
        gridElement = "Dot";
      } else {
        gridElement = "Symbol";
        enablePreviousNumbers(y, x);
      }
      grid[y][x] = gridElement;
    }
  }
}

const lines = readInputFile("day_3");
parseGrid(lines);

let sum = 0;
for (const number of numbers) {
  if (!number.enabled) {
    continue;
  }
  const value = number.digits.reduce((p, c, _) => p * 10 + c);
  sum += value;
}
console.log(sum);
