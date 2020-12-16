import { testInput, finalInput as inputArr } from '../inputs/12';

const directionMap = {
  N: [0, 1],
  S: [0, -1],
  E: [1, 0],
  W: [-1, 0]
};

const directions = ['N', 'E', 'S', 'W'];

export default function solvePuzzle() {
  return [solvePart1(), solvePart2()];
}

function solvePart1() {
  let x = 0,
    y = 0,
    directionIndex = 1;
  for (let ins of inputArr) {
    const action = ins[0];
    const amount = +ins.substring(1);

    if (Object.keys(directionMap).includes(action)) {
      const [xCo, yCo] = directionMap[action];
      x += xCo * +amount;
      y += yCo * +amount;
    } else if (action === 'F') {
      const [xCo, yCo] = directionMap[directions[directionIndex]];
      x += xCo * +amount;
      y += yCo * +amount;
    } else if (action === 'R') {
      directionIndex += +amount / 90;
    } else {
      directionIndex -= +amount / 90;
    }
    directionIndex = (directionIndex + 4) % 4;
  }
  return Math.abs(x) + Math.abs(y);
}

function solvePart2() {
  let sx = 0,
    sy = 0;
  // waypoint coordinates -- relative to the ship
  let wx = 10,
    wy = 1;
  for (let ins of inputArr) {
    const action = ins[0];
    const amount = +ins.substring(1);

    if (Object.keys(directionMap).includes(action)) {
      const [xCo, yCo] = directionMap[action];
      wx += xCo * amount;
      wy += yCo * amount;
    } else if (action === 'F') {
      // ship moves by waypoint amount
      sx += wx * amount;
      sy += wy * amount;
    } else {
      let deg = amount;
      if (action === 'L') {
        deg = 360 - deg;
      }
      while (deg > 0) {
        [wx, wy] = [wy, -wx];
        deg -= 90;
      }
    }
  }
  return Math.abs(sx) + Math.abs(sy);
}
