import { testInput1, testInput2, finalInput as inputArr } from '../inputs/10';

/*
Input: output joltage (requires input joltage no more than 3 jolts lower)
Also have built in adapter rated 3 jolts higher than highest-rated adapter in the bag
Charging outlet has rating of 0
*/
export default function solvePuzzle() {
  const sorted = inputArr.sort((a, b) => a - b);
  sorted.push(sorted[sorted.length - 1] + 3);
  sorted.unshift(0);

  function getDifferences() {
    const differences = [0, 0, 0];
    let lastJoltage = 0;
    for (let joltage of sorted) {
      const diff = joltage - lastJoltage;
      differences[diff - 1]++;
      lastJoltage = joltage;
    }

    return differences[0] * differences[2];
  }

  function getPermutations() {
    let permutations = 1;
    let groupSize = 1;
    for (let i = 1; i < sorted.length; i++) {
      // if they're not 1 apart, they're 3 apart
      // can only remove two consecutive numbers at a time
      // if single number -- solutions *= 2
      if (sorted[i] === sorted[i - 1] + 1) {
        groupSize++;
      } else {
        if (groupSize > 2) {
          if (groupSize === 3) {
            permutations *= 2;
          } else {
            permutations *= 3 * 2 ** (groupSize - 4) + 1;
          }
        }

        groupSize = 1;
      }
    }
    return permutations;
  }

  return [getDifferences(), getPermutations()];
}
