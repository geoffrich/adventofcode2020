import { testInput as inputArr, finalInput } from '../inputs/15';

export default function solvePuzzle() {
  return [getNumberSpoken(2020)];
}

function getNumberSpoken(count) {
  const numLookup = new Map();
  let spokenNumber;
  for (let i = 0; i < count; i++) {
    if (i < inputArr.length) {
      spokenNumber = inputArr[i];
      numLookup.set(spokenNumber, [i]);
    } else {
      const val = numLookup.get(spokenNumber);
      if (val.length === 1) {
        spokenNumber = 0;
      } else {
        const [x, y] = val;
        spokenNumber = y - x;
      }
      updateMap(spokenNumber, i);
      console.log(i, spokenNumber);
    }
  }

  function updateMap(num, turn) {
    const val = numLookup.get(num);
    if (val === undefined) {
      numLookup.set(num, [turn]);
    } else if (val.length === 1) {
      numLookup.set(num, [...val, turn]);
    } else {
      const [x, y] = val;
      numLookup.set(num, [y, turn]);
    }
  }

  return spokenNumber;
}
