import { testInput as inputArr, testInput2, finalInput } from '../inputs/11';

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

  for (let i = 0; i < 5; i++) {
    if (!changed) break;
    changed = false;
    nextState = [];
    seenSeats = [];
    populateSeenSeats();
    console.log(seenSeats);

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
    console.log(nextState);
  }

  function populateSeenSeats() {
    // each row
    for (let i = 0; i < previousState.length; i++) {
      let seatsInRow = [];
      seenSeats.push([]);
      for (let j = 0; j < previousState[i].length; j++) {
        seenSeats[i].push(0);
        if (previousState[i][j] === '#') seatsInRow.push([i, j]);
      }
      if (seatsInRow.length === 0 || seatsInRow.length === 1) continue;
      const [firstSeatI, firstSeatJ] = seatsInRow[0];
      const [lastSeatI, lastSeatJ] = seatsInRow[seatsInRow.length - 1];
      seenSeats[firstSeatI][firstSeatJ] += 1;
      seenSeats[lastSeatI][lastSeatJ] += 1;
      for (let [seatI, seatJ] of seatsInRow.slice(1, seatsInRow.length - 1)) {
        seenSeats[seatI][seatJ] += 2;
      }
    }

    // each column
    for (let j = 0; j < previousState[0].length; j++) {
      let seatsInColumn = [];
      for (let i = 0; i < previousState.length; i++) {
        if (previousState[i][j] === '#') seatsInColumn.push([i, j]);
      }
      if (seatsInColumn.length === 0 || seatsInColumn.length === 1) continue;
      const [firstSeatI, firstSeatJ] = seatsInColumn[0];
      const [lastSeatI, lastSeatJ] = seatsInColumn[seatsInColumn.length - 1];
      seenSeats[firstSeatI][firstSeatJ] += 1;
      seenSeats[lastSeatI][lastSeatJ] += 1;
      for (let [seatI, seatJ] of seatsInColumn.slice(
        1,
        seatsInColumn.length - 1
      )) {
        seenSeats[seatI][seatJ] += 2;
      }
    }

    // down left diagonal
    for (
      let i = 0;
      i <= previousState.length + previousState[0].length - 1;
      i++
    ) {
      let seatsInDiagonal = [];
      for (let j = 0; j < previousState[0].length; j++) {
        const seat = previousState[i - j]?.[j];
        if (seat === '#') seatsInDiagonal.push([i - j, j]);
      }

      if (seatsInDiagonal.length === 0 || seatsInDiagonal.length === 1)
        continue;
      const [firstSeatI, firstSeatJ] = seatsInDiagonal[0];
      const [lastSeatI, lastSeatJ] = seatsInDiagonal[
        seatsInDiagonal.length - 1
      ];
      seenSeats[firstSeatI][firstSeatJ] += 1;
      seenSeats[lastSeatI][lastSeatJ] += 1;
      for (let [seatI, seatJ] of seatsInDiagonal.slice(
        1,
        seatsInDiagonal.length - 1
      )) {
        seenSeats[seatI][seatJ] += 2;
      }
    }

    // down right diagonal
    for (let i = 0; i <= (previousState.length - 1) * 2; i++) {
      let seatsInDiagonal = [];
      for (let j = previousState[0].length - 1; j >= 0; j--) {
        const offset = previousState[0].length - 1 - j;
        const seat = previousState[i - offset]?.[j];
        if (seat === '#') seatsInDiagonal.push([i - offset, j]);
      }

      if (seatsInDiagonal.length === 0 || seatsInDiagonal.length === 1)
        continue;
      const [firstSeatI, firstSeatJ] = seatsInDiagonal[0];
      const [lastSeatI, lastSeatJ] = seatsInDiagonal[
        seatsInDiagonal.length - 1
      ];
      seenSeats[firstSeatI][firstSeatJ] += 1;
      seenSeats[lastSeatI][lastSeatJ] += 1;
      for (let [seatI, seatJ] of seatsInDiagonal.slice(
        1,
        seatsInDiagonal.length - 1
      )) {
        seenSeats[seatI][seatJ] += 2;
      }
    }
  }

  return nextState.reduce((acc, cur) => acc + cur.split('#').length - 1, 0);
}
