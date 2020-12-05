import inputArr from '../inputs/3';

export default function solvePuzzle() {
  return (
    getTrees(3, 1) *
    getTrees(1, 1) *
    getTrees(5, 1) *
    getTrees(7, 1) *
    getTrees(1, 2)
  );
}

function getTrees(right, down) {
  let x = down;
  let y = right;
  let lineLength = inputArr[0].length;
  let numTrees = 0;
  while (x < inputArr.length) {
    const currentTile = inputArr[x][y];
    if (currentTile === '#') {
      numTrees++;
    }
    x += down;
    y = (y + right) % lineLength;
  }
  return numTrees;
}
