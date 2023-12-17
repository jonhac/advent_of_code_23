import { error } from "console";
import { readInputFile } from "./helper";

function getDigits(line: string): number {
  const digits = line.match(/[0-9]/g);
  if (digits === null) {
    throw error("Invalid input");
  }
  return parseInt(digits[0] + digits[digits.length - 1]);
}

function getDigits2(line: string): number {
  const digitWords = [
    "1",
    "one",
    "2",
    "two",
    "3",
    "three",
    "4",
    "four",
    "5",
    "five",
    "6",
    "six",
    "7",
    "seven",
    "8",
    "eight",
    "9",
    "nine",
  ];

  let firstDigit: number | undefined = undefined;
  let lastDigit = 0;

  for (let i = 0; i < line.length; i++) {
    const searchWindow = line.substring(i, i + 5);
    for (let j = 0; j < digitWords.length; j++) {
      if (searchWindow.startsWith(digitWords[j])) {
        const foundDigit = Math.trunc(j / 2) + 1;
        if (firstDigit === undefined) {
          firstDigit = foundDigit;
        }
        lastDigit = foundDigit;
        break;
      }
    }
  }

  if (firstDigit === undefined) {
    throw error("Invalid input");
  }
  return firstDigit * 10 + lastDigit;
}

const lines = readInputFile("day_1");
let sum = 0;
let sum2 = 0;
for (const line of lines) {
  sum += getDigits(line);
  sum2 += getDigits2(line);
}
console.log(`Part 1 result: ${sum}`);
console.log(`Part 2 result: ${sum2}`);
