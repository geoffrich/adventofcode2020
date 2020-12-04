import inputArr from './inputs/1';

function solvePuzzle() {
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

const node = document.querySelector('ol').children[0];
node.innerHTML = solvePuzzle();
