import { testInput, finalInput as inputArr } from '../inputs/17';

const ACTIVE = '#';

export default function solvePuzzle() {
  return [solvePart1(), solvePart2()];
}

function solvePart1() {
  let activeNodes = new Map();

  for (let i = 0; i < inputArr.length; i++) {
    for (let j = 0; j < inputArr[i].length; j++) {
      if (inputArr[i][j] === ACTIVE) {
        activeNodes.set(`0,${i},${j}`, [0, i, j]);
      }
    }
  }

  for (let cycle = 0; cycle < 6; cycle++) {
    let activeCount = new Map();
    let newActiveNodes = new Map();
    for (const [strCoords, [x, y, z]] of activeNodes.entries()) {
      const neighbors = getNeighbors(x, y, z);

      let activeNeighbors = 0;
      for (const coords of neighbors) {
        if (activeNodes.has(coords)) {
          activeNeighbors++;
        }
        let val = activeCount.get(coords);
        if (val !== undefined) {
          activeCount.set(coords, val + 1);
        } else {
          activeCount.set(coords, 1);
        }
      }

      if (activeNeighbors === 2 || activeNeighbors === 3) {
        newActiveNodes.set(
          strCoords,
          strCoords.split(',').map((x) => +x)
        );
      }
    }

    for (let [key, value] of activeCount.entries()) {
      if (value === 3) {
        newActiveNodes.set(
          key,
          key.split(',').map((x) => +x)
        );
      }
    }

    activeNodes = newActiveNodes;
  }

  return activeNodes.size;

  function getNeighbors(x, y, z) {
    let neighbors = [];
    for (let i = -1; i <= 1; i++) {
      for (let j = -1; j <= 1; j++) {
        for (let k = -1; k <= 1; k++) {
          if (i === 0 && j === 0 && k === 0) {
            continue;
          }
          neighbors.push(`${x + i},${y + j},${z + k}`);
        }
      }
    }
    return neighbors;
  }
}

// copy + paste + add 4th dimension!
function solvePart2() {
  let activeNodes = new Map();

  for (let i = 0; i < inputArr.length; i++) {
    for (let j = 0; j < inputArr[i].length; j++) {
      if (inputArr[i][j] === ACTIVE) {
        activeNodes.set(`0,0,${i},${j}`, [0, 0, i, j]);
      }
    }
  }

  for (let cycle = 0; cycle < 6; cycle++) {
    let activeCount = new Map();
    let newActiveNodes = new Map();
    for (const [strCoords, [x, y, z, w]] of activeNodes.entries()) {
      const neighbors = getNeighbors(x, y, z, w);

      let activeNeighbors = 0;
      for (const coords of neighbors) {
        if (activeNodes.has(coords)) {
          activeNeighbors++;
        }
        let val = activeCount.get(coords);
        if (val !== undefined) {
          activeCount.set(coords, val + 1);
        } else {
          activeCount.set(coords, 1);
        }
      }

      if (activeNeighbors === 2 || activeNeighbors === 3) {
        newActiveNodes.set(
          strCoords,
          strCoords.split(',').map((x) => +x)
        );
      }
    }

    for (let [key, value] of activeCount.entries()) {
      if (value === 3) {
        newActiveNodes.set(
          key,
          key.split(',').map((x) => +x)
        );
      }
    }

    activeNodes = newActiveNodes;
  }

  return activeNodes.size;

  function getNeighbors(x, y, z, w) {
    let neighbors = [];
    for (let i = -1; i <= 1; i++) {
      for (let j = -1; j <= 1; j++) {
        for (let k = -1; k <= 1; k++) {
          for (let l = -1; l <= 1; l++) {
            if (i === 0 && j === 0 && k === 0 && l === 0) {
              continue;
            }
            neighbors.push(`${x + i},${y + j},${z + k},${w + l}`);
          }
        }
      }
    }
    return neighbors;
  }
}
