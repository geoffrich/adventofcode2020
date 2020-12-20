import { testInput, finalInput as inputArr } from '../inputs/18';

export default function solvePuzzle() {
  let sum = 0;
  for (const line of inputArr) {
    const [result, _] = evaluateExpression(line);
    sum += result;
  }

  return sum;
}

function evaluateExpression(expression) {
  let result = 0;
  let operator = '+';
  for (let i = 0; i < expression.length; i++) {
    let val = expression[i];
    if (val === '+' || val === '*') {
      operator = val;
    } else if (val === ' ') {
      continue;
    } else if (val === '(') {
      const [subresult, iOffset] = evaluateExpression(
        expression.substring(i + 1)
      );
      result = operator === '+' ? result + subresult : result * subresult;
      i += iOffset + 1;
    } else if (val === ')') {
      return [result, i];
    } else {
      result = operator === '+' ? result + +val : result * +val;
    }
  }
  return [result, -1];
}
