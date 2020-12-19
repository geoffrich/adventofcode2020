import { testInput2, finalInput as inputArr } from '../inputs/16';

export default function solvePuzzle() {
  let state = 'rules';
  const rules = {};
  let myTicket;
  const nearbyTickets = [];
  parseInput();

  let invalidSum = 0;
  const validTickets = [];
  for (const ticket of nearbyTickets) {
    let valid = true;
    for (const val of ticket) {
      if (getValidRules(val).length === 0) {
        invalidSum += val;
        valid = false;
      }
    }
    if (valid) {
      validTickets.push(ticket);
    }
  }

  console.log(validTickets);

  const ruleMatches = [];

  for (let i = 0; i < validTickets[0].length; i++) {
    let possibleRules = new Set(Object.keys(rules));
    for (const ticket of validTickets) {
      const matchingRules = getValidRules(ticket[i]);
      possibleRules = new Set(
        [...possibleRules].filter((x) => matchingRules.includes(x))
      );
    }
    ruleMatches.push(possibleRules);
  }

  const determinedRules = new Set();
  const ruleMappings = [];

  let iter = 0;
  while (determinedRules.size < Object.keys(rules).length) {
    iter++;
    if (iter > 300) {
      console.log('breaking');
      break;
    }

    for (let i = 0; i < ruleMatches.length; i++) {
      ruleMatches[i] = new Set(
        [...ruleMatches[i]].filter((x) => !determinedRules.has(x))
      );
      if (ruleMatches[i].size === 1) {
        const rule = ruleMatches[i].values().next().value;
        determinedRules.add(rule);
        ruleMappings[i] = rule;
      }
    }
  }

  let product = 1;
  for (let i = 0; i < ruleMappings.length; i++) {
    if (ruleMappings[i].includes('departure')) {
      product *= myTicket[i];
    }
  }

  return [invalidSum, product];

  function getValidRules(val) {
    const matchingRules = [];
    for (const [rule, [low1, high1, low2, high2]] of Object.entries(rules)) {
      if ((val >= low1 && val <= high1) || (val >= low2 && val <= high2)) {
        matchingRules.push(rule);
      }
    }
    return matchingRules;
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
        nearbyTickets.push(line.split(',').map((x) => +x));
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
