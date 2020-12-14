import { testInput, finalInput as inputArr } from '../inputs/11';

export default function solvePuzzle() {
  let previousState = inputArr;
  let nextState;

  let changed = true;

  for (let i = 0; i < 200; i++) {
    changed = false;
    nextState = [];

    for (let i = 0; i < previousState.length; i++) {
      nextState.push('');
      for (let j = 0; j < previousState[i].length; j++) {
        let next = previousState[i][j];
        if (previousState[i][j] === 'L' && getOccupiedSeatCount(i, j) === 0) {
          next = '#';
          changed = true;
        } else if (
          previousState[i][j] === '#' &&
          getOccupiedSeatCount(i, j) >= 4
        ) {
          next = 'L';
          changed = true;
        }
        nextState[i] += next;
      }
    }
    previousState = nextState.slice();
  }

  function getOccupiedSeatCount(i, j) {
    const adjacentSeats = [
      previousState[i + 1]?.[j],
      previousState[i + 1]?.[j + 1],
      previousState[i]?.[j + 1],
      previousState[i - 1]?.[j + 1],
      previousState[i - 1]?.[j],
      previousState[i - 1]?.[j - 1],
      previousState[i]?.[j - 1],
      previousState[i + 1]?.[j - 1]
    ];

    const adj = adjacentSeats.filter((s) => s === '#').length;
    return adj;
  }

  let occupied = 0;
  for (let i = 0; i < nextState.length; i++) {
    for (let j = 0; j < nextState[i].length; j++) {
      if (nextState[i][j] === '#') occupied++;
    }
  }

  return occupied;
}
