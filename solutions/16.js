import { testInput, finalInput as inputArr } from '../inputs/16';

export default function solvePuzzle() {
  let state = 'rules';
  const rules = {};
  let myTicket;
  const nearby = [];
  parseInput();

  let invalidSum = 0;
  for (const ticket of nearby) {
    for (const val of ticket) {
      if (!isValid(val)) {
        invalidSum += val;
      }
    }
  }

  return invalidSum;

  function isValid(val) {
    for (const [low1, high1, low2, high2] of Object.values(rules)) {
      if ((val >= low1 && val <= high1) || (val >= low2 && val <= high2)) {
        return true;
      }
    }
    return false;
  }

  function parseInput() {
    for (const line of inputArr) {
      if (line === '') {
        state = nextState(state);
        continue;
      }
      if (state === 'rules') {
        const [key, value] = line.split(': ');
        const [range1, range2] = value.split(' or ');
        rules[key] = [...range1.split('-'), ...range2.split('-')].map(
          (x) => +x
        );
      } else if (state === 'ticket1') {
        if (line.includes('your')) continue;
        myTicket = line.split(',');
      } else {
        if (line.includes('nearby')) continue;
        nearby.push(line.split(',').map((x) => +x));
      }
    }
  }
}

function nextState(current) {
  if (current === 'rules') {
    return 'ticket1';
  } else if (current === 'ticket1') {
    return 'ticket2';
  }
}
