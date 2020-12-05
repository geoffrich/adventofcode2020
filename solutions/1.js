import inputArr from '../inputs/1';

export default function solvePuzzle() {
  const numbersToLookFor = new Set();

  for (let i = 0; i < inputArr.length; ++i) {
    const num = inputArr[i];
    const distanceFrom2020 = 2020 - num;
    if (numbersToLookFor.has(num)) {
      return num * distanceFrom2020;
    }
    numbersToLookFor.add(distanceFrom2020);
  }

  console.log(numbersToLookFor);
}
