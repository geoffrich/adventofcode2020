import { testInput, finalInput as inputArr } from '../inputs/19';

export default function solvePuzzle() {
  const rules = [];
  let rulesParsed = false;
  let matched = 0;
  const memo = new Map();
  for (let i = 0; i < inputArr.length; i++) {
    if (rulesParsed) {
      const [didMatch, remaining] = matchesRule(inputArr[i], 0);
      if (didMatch && remaining === '') {
        matched++;
      }
    } else if (!inputArr[i]) {
      rulesParsed = true;
    } else {
      const [idx, subrules] = inputArr[i].split(': ');
      rules[idx] = subrules
        .replaceAll('"', '')
        .split(' | ')
        .map((r) => r.split(' '));
    }
  }
  return matched;

  function matchesRule(message, ruleIndex) {
    if (message === '') return [true];

    const matchingRules = memo.get(message);
    if (matchingRules && matchingRules.includes(ruleIndex)) {
      return true;
    }

    const singleRule = rules[ruleIndex][0][0];

    if (singleRule === 'a' || singleRule === 'b') {
      const didMatch = singleRule === message[0];
      return [didMatch, message.substring(1)];
    }

    for (const ruleset of rules[ruleIndex]) {
      let successfulMatch = true;
      let remainingMessage = message;
      for (const rule of ruleset) {
        const [didMatch, nextSubstr] = matchesRule(remainingMessage, +rule);
        if (!didMatch) {
          successfulMatch = false;
          break;
        }
        remainingMessage = nextSubstr;
      }
      if (successfulMatch) {
        return [true, remainingMessage];
      }
    }

    return [false, message];
  }
}
