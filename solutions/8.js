import inputArr from '../inputs/8';

export default function solvePuzzle() {
  return [getAccBeforeLoop()[0], getAccAfterTermination()];
}

function getAccBeforeLoop(swapIndex) {
  let acc = 0;
  let i = 0;
  let visited = new Set();
  while (!visited.has(i)) {
    visited.add(i);
    if (i >= inputArr.length) return [acc, true];
    let [instruction, arg] = inputArr[i].split(' ');
    if (i === swapIndex) {
      instruction = instruction === 'nop' ? 'jmp' : 'nop';
    }
    switch (instruction) {
      case 'nop':
        i++;
        break;
      case 'acc':
        acc += Number(arg);
        i++;
        break;
      case 'jmp':
        i += Number(arg);
        break;
    }
  }
  return [acc, false];
}

function getAccAfterTermination() {
  for (let i = 0; i < inputArr.length; i++) {
    if (inputArr[i] === 'acc') continue;
    const [acc, finished] = getAccBeforeLoop(i);
    if (finished) return acc;
  }
  return -1;
}
