import { testInput, finalInput as inputArr } from '../inputs/13';

export default function solvePuzzle() {
  return [solvePart1(), solvePart2()];
}

function solvePart1() {
  const [timestamp, busString] = inputArr;
  const buses = busString.split(',').filter((b) => b !== 'x');
  const timeToNextBus = buses.map((b) => b - (timestamp % b));
  const minWaitTime = Math.min(...timeToNextBus);
  const bestBus = buses[timeToNextBus.indexOf(minWaitTime)];

  return minWaitTime * bestBus;
}

function solvePart2() {
  const offsets = inputArr[1]
    .split(',')
    .map((val, idx) => [val, idx])
    .filter(([val, _]) => val !== 'x');

  let start = +offsets[0][0];
  let increment = 1;
  let latestIndex = 0;

  let x;
  for (let i = 0; i < 6000000; i++) {
    x = start + increment * i;
    let found = true;
    for (let j = 0; j < offsets.length; j++) {
      const [id, offset] = offsets[j];
      if ((x + offset) % +id !== 0) {
        found = false;
        break;
      } else if (j > latestIndex) {
        // if we find a match, we can start at this time and increment by the LCM of all previous numbers
        latestIndex = j;
        start = x;
        increment = increment * +id;
        i = 0;
      }
    }

    if (found) {
      return x;
    }
  }

  return -1;
}
