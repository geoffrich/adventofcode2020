import { testInput, testInput2, finalInput as inputArr } from '../inputs/11';

export default function solvePuzzle() {
  return [solvePart1(), solvePart2()];
}

function solvePart1() {
  let previousState = inputArr;
  let nextState;

  let changed = true;

  for (let i = 0; i < 200; i++) {
    if (!changed) break;
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

  return nextState.reduce((acc, cur) => acc + cur.split('#').length - 1, 0);
}

function solvePart2() {
  let previousState = inputArr;
  let nextState;
  let seenSeats = [];

  let changed = true;

  for (let i = 0; i < 100; i++) {
    if (!changed) {
      console.log(`broke after ${i} iterations`);
      break;
    }
    changed = false;
    nextState = [];
    seenSeats = [];
    populateSeenSeats();

    for (let i = 0; i < previousState.length; i++) {
      nextState.push('');
      for (let j = 0; j < previousState[i].length; j++) {
        let next = previousState[i][j];
        if (previousState[i][j] === 'L' && seenSeats[i][j] === 0) {
          next = '#';
          changed = true;
        } else if (previousState[i][j] === '#' && seenSeats[i][j] >= 5) {
          next = 'L';
          changed = true;
        }
        nextState[i] += next;
      }
    }
    previousState = nextState.slice();
  }

  function populateSeenSeats() {
    // WARNING: messy code ahead

    // each row
    for (let i = 0; i < previousState.length; i++) {
      seenSeats.push([]);
      let previousSeat;
      for (let j = 0; j < previousState[i].length; j++) {
        seenSeats[i].push(0);
        if (previousState[i][j] === '.') continue;
        if (previousSeat) {
          const [previousI, previousJ, kind] = previousSeat;
          if (kind === '#') {
            seenSeats[i][j]++;
          }
          if (previousState[i][j] === '#') {
            seenSeats[previousI][previousJ]++;
          }
        }
        previousSeat = [i, j, previousState[i][j]];
      }
    }

    //each column
    for (let j = 0; j < previousState[0].length; j++) {
      let previousSeat;
      for (let i = 0; i < previousState.length; i++) {
        if (previousState[i][j] === '.') continue;
        if (previousSeat) {
          const [previousI, previousJ, kind] = previousSeat;
          if (kind === '#') {
            seenSeats[i][j]++;
          }
          if (previousState[i][j] === '#') {
            seenSeats[previousI][previousJ]++;
          }
        }
        previousSeat = [i, j, previousState[i][j]];
      }
    }

    // down left diagonal
    for (
      let i = 0;
      i <= previousState.length + previousState[0].length - 1;
      i++
    ) {
      let previousSeat;
      for (let j = 0; j < previousState[0].length; j++) {
        const seat = previousState[i - j]?.[j];
        if (!seat || seat === '.') continue;
        if (previousSeat) {
          const [previousI, previousJ, kind] = previousSeat;
          if (kind === '#') {
            seenSeats[i - j][j]++;
          }
          if (seat === '#') {
            seenSeats[previousI][previousJ]++;
          }
        }
        previousSeat = [i - j, j, seat];
      }
    }

    // down right diagonal
    for (
      let i = 0;
      i <= previousState.length + previousState[0].length - 1;
      i++
    ) {
      let previousSeat;
      for (let j = previousState[0].length - 1; j >= 0; j--) {
        const offset = previousState[0].length - 1 - j;
        const seat = previousState[i - offset]?.[j];
        if (!seat || seat === '.') continue;

        if (previousSeat) {
          const [previousI, previousJ, kind] = previousSeat;
          if (kind === '#') {
            seenSeats[i - offset][j]++;
          }
          if (seat === '#') {
            seenSeats[previousI][previousJ]++;
          }
        }
        previousSeat = [i - offset, j, seat];
      }
    }
  }

  return nextState.reduce((acc, cur) => acc + cur.split('#').length - 1, 0);
}
