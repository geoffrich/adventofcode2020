import inputArr from '../inputs/1';

export default function solvePuzzle() {
  return [getTwoEntries(2020), getThreeEntries()];
}

function getTwoEntries(goal) {
  const numbersToLookFor = new Set();

  for (let i = 0; i < inputArr.length; ++i) {
    const num = inputArr[i];
    const distanceFromGoal = goal - num;
    if (numbersToLookFor.has(num)) {
      console.log(numbersToLookFor);
      return num * distanceFromGoal;
    }
    numbersToLookFor.add(distanceFromGoal);
  }
  return -1;
}

function getThreeEntries() {
  for (let num of inputArr) {
    const solution = getTwoEntries(2020 - num);
    if (solution !== -1) {
      return solution * num;
    }
  }
  return -1;
}
