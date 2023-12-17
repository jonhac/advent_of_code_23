import { readFileSync } from "fs";

export function readInputFile(filename: string): string[] {
  return readFileSync(`../input/${filename}`, "utf8")
    .split(/\r?\n/)
    .map((l) => l.trim())
    .filter((l) => l.length > 0);
}
