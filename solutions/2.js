import inputArr from '../inputs/2';

export default function solvePuzzle() {
  return [firstSolution(), secondSolution()];
}

function firstSolution() {
  let validPasswords = 0;
  for (let i = 0; i < inputArr.length; i++) {
    let [low, high, letter, password] = parseInputLine(inputArr[i]);
    let count = 0;
    for (const char of password) {
      if (char === letter) {
        count++;
      }
    }

    if (count >= low && count <= high) {
      validPasswords++;
    }
  }
  return validPasswords;
}

function secondSolution() {
  let validPasswords = 0;
  for (let i = 0; i < inputArr.length; i++) {
    let [low, high, letter, password] = parseInputLine(inputArr[i]);

    const firstLetter = password[low - 1];
    const secondLetter = password[high - 1];

    if (
      (firstLetter === letter && secondLetter !== letter) ||
      (firstLetter !== letter && secondLetter === letter)
    ) {
      validPasswords++;
    }
  }
  return validPasswords;
}

function parseInputLine(line) {
  let [range, letter, password] = line.split(' ');
  letter = letter[0];
  let [low, high] = range.split('-');
  high = parseInt(high, 10);
  low = parseInt(low, 10);

  return [low, high, letter, password];
}
