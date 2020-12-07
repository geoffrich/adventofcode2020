import inputArr from '../inputs/6';

export default function solvePuzzle() {
  let numQuestionsAnyone = 0,
    numQuestionsEveryone = 0;
  for (let i = 0; i < inputArr.length; i++) {
    const groupLines = [];
    while (inputArr[i]) {
      groupLines.push(inputArr[i]);
      i++;
    }

    const letters = new Set(groupLines.map((line) => line.split('')).flat());
    numQuestionsAnyone += letters.size;

    const letterSets = groupLines.map((line) => new Set(line.split('')));
    // calculate intersection of each set
    const commonLetters = letterSets.reduce(
      (acc, current) => new Set([...acc].filter((x) => current.has(x)))
    );

    numQuestionsEveryone += commonLetters.size;
  }
  return [numQuestionsAnyone, numQuestionsEveryone];
}
