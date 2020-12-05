import inputArr from '../inputs/5';

export default function solvePuzzle() {
  const seatIds = getSeatIds();
  const max = seatIds.reduce((a, b) => Math.max(a, b));

  return [max, getMissingSeat(seatIds)];
}

function getSeatIds() {
  return inputArr.map(
    (input) =>
      decode(input.substring(0, 7), 'B') * 8 + decode(input.substring(7), 'R')
  );
}

function getMissingSeat(seatIds) {
  const sorted = seatIds.sort();
  let last = 0;
  for (let input of sorted) {
    if (input === last + 2) {
      return input - 1;
    }
    last = input;
  }
}

function decode(input, upperChar) {
  let min = 0;
  for (let i = 0; i < input.length; i++) {
    if (input[i] === upperChar) {
      min += 2 ** (input.length - i - 1);
    }
  }
  return min;
}
