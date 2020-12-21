import { testInput, finalInput as inputArr } from '../inputs/18';

export default function solvePuzzle() {
  let sum1 = 0,
    sum2 = 0;
  for (const line of inputArr) {
    sum1 += evaluateExpression(line)[0];
    sum2 += evaluateExpressionWithOrderOfOp(line);
  }

  return [sum1, sum2];
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

// help from https://runestone.academy/runestone/books/published/cppds/LinearBasic/InfixPrefixandPostfixExpressions.html
function evaluateExpressionWithOrderOfOp(expression) {
  const postfix = toPostfix(expression);
  console.log(postfix);
  const stack = [];
  for (let i = 0; i < postfix.length; i++) {
    const symbol = postfix[i];
    if (symbol === '+' || symbol === '*') {
      const op1 = stack.pop();
      const op2 = stack.pop();
      stack.push(symbol === '+' ? op1 + op2 : op1 * op2);
    } else {
      stack.push(symbol);
    }
  }
  return stack.pop();
}

function toPostfix(expression) {
  const output = [];
  const opstack = [];
  for (let i = 0; i < expression.length; i++) {
    let val = expression[i];
    if (val === '+') {
      opstack.push(val);
    } else if (val === '*') {
      while (opstack[opstack.length - 1] === '+') {
        output.push('+');
        opstack.pop();
      }
      opstack.push(val);
    } else if (val === ' ') {
      continue;
    } else if (val === '(') {
      opstack.push(val);
    } else if (val === ')') {
      let top = opstack.pop();
      while (top !== '(') {
        output.push(top);
        top = opstack.pop();
      }
    } else {
      output.push(+val);
    }
  }

  while (opstack[0]) {
    output.push(opstack.pop());
  }
  return output;
}
