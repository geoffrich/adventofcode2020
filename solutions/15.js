import { testInput, finalInput as inputArr } from '../inputs/15';

export default function solvePuzzle() {
  return [getNumberSpoken(2020), getNumberSpoken(30000000)];
}

function getNumberSpoken(count) {
  const numLookup = new Map();
  let spokenNumber;
  for (let i = 0; i < count; i++) {
    if (i < inputArr.length) {
      spokenNumber = inputArr[i];
      numLookup.set(spokenNumber, i);
    } else {
      const val = numLookup.get(spokenNumber);
      numLookup.set(spokenNumber, i - 1);
      if (val !== undefined) {
        spokenNumber = i - 1 - val;
      } else {
        spokenNumber = 0;
      }
    }
  }

  return spokenNumber;
}
