import inputArr from '../inputs/9';

const PREAMBLE_SIZE = 25;

export default function solvePuzzle() {
  const invalidNumber = getInvalidNumber();
  const [start, end] = getRange(invalidNumber);

  const range = inputArr.slice(start, end + 1);

  return [invalidNumber, Math.min(...range) + Math.max(...range)];
}

function getRange(invalidNumber) {
  for (let i = 0; i < inputArr.length; i++) {
    let sum = inputArr[i];
    for (let j = i + 1; j < inputArr.length; j++) {
      sum += inputArr[j];
      if (sum > invalidNumber) break;
      if (sum === invalidNumber) return [i, j];
    }
  }
}

function getInvalidNumber() {
  let numbers;
  for (let i = PREAMBLE_SIZE; i < inputArr.length; i++) {
    const target = inputArr[i];
    let found = false;
    numbers = new Set(inputArr.slice(i - PREAMBLE_SIZE, i));
    for (let num of numbers) {
      if (
        numbers.has(target - num) &&
        numbers.has(num) &&
        num !== target - num
      ) {
        found = true;
        break;
      }
    }
    if (!found) {
      return target;
    }
  }
}
