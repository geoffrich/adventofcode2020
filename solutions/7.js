import inputArr from '../inputs/7';

export default function solvePuzzle() {
  const map = {};
  for (let input of inputArr) {
    const [color, contents] = parseInput(input);
    map[color] = contents;
  }

  console.log(map);

  return [getBagsContainingGoldBag(), getBagCount('shiny gold')];

  function getBagsContainingGoldBag() {
    let goldBags = new Set();
    for (const [key, value] of Object.entries(map)) {
      if (goldBags.has(key) || key === 'shiny gold') {
        continue;
      }
      if (hasGold(key)) {
        goldBags.add(key);
      }
    }
    return goldBags.size;
  }

  function hasGold(color) {
    if (color === 'shiny gold') return true;
    for (const { type } of map[color]) {
      if (hasGold(type)) {
        return true;
      }
    }
    return false;
  }

  function getBagCount(color) {
    let count = 0;
    for (const { quantity, type } of map[color]) {
      const bagCount = getBagCount(type);
      count += quantity + bagCount * quantity;
    }
    return count;
  }
}

function parseInput(line) {
  const [part1, part2] = line.split(' contain ');
  const type = part1.substring(0, part1.indexOf('bag') - 1);
  const contains = [];

  for (let bag of part2.split(', ')) {
    if (bag.includes('other')) {
      continue;
    }
    const num = +bag[0];
    const type = bag.substring(2, bag.indexOf('bag') - 1);
    contains.push({ quantity: num, type });
  }

  return [type, contains];
}
