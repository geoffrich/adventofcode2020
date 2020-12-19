import { testInput2, finalInput as inputArr } from '../inputs/14';

export default function solvePuzzle() {
  return [solvePart1(), solvePart2()];
}

function solvePart1() {
  let mask1 = [];
  let mask0 = [];
  let mem = [];
  for (const line of inputArr) {
    const [part1, part2] = line.split(' = ');
    if (part1 === 'mask') {
      const mask = part2;
      mask1 = getIndices([...mask], '1');
      mask0 = getIndices([...mask], '0');
    } else {
      const loc = +part1.substring(4, part1.length - 1);
      const val = +part2;
      mem[loc] = applyMask(val);
    }
  }
  return mem.reduce((prev, curr) => (curr ? prev + curr : prev), 0);

  function applyMask(val) {
    const bin = [...toBinary(val)];
    for (const i of mask1) {
      bin[i] = 1;
    }
    for (const i of mask0) {
      bin[i] = 0;
    }
    return toDecimal(bin.join(''));
  }
}

function solvePart2() {
  let mask;
  let mem = new Map();
  for (const line of inputArr) {
    const [part1, part2] = line.split(' = ');
    if (part1 === 'mask') {
      mask = part2;
    } else {
      const loc = +part1.substring(4, part1.length - 1);
      const val = +part2;
      const locations = getLocations(mask, loc);
      for (const l of locations) {
        mem.set(l, val);
      }
    }
  }
  let total = 0;
  mem.forEach((val) => {
    total += val;
  });
  return total;
}

function getLocations(mask, loc) {
  const binary = [...toBinary(loc)];
  let locations = [];
  for (let i = 0; i < mask.length; i++) {
    const bit = mask[i];
    binary[i] = bit === '0' ? binary[i] : bit;
  }

  const base = binary.reduce(
    (acc, curr, i) => (curr === '1' ? acc + 2 ** (binary.length - 1 - i) : acc),
    0
  );
  locations.push(base);

  for (let i = 0; i < binary.length; i++) {
    if (binary[i] === 'X') {
      locations = [
        ...locations,
        ...locations.map((l) => l + 2 ** (binary.length - 1 - i))
      ];
    }
  }

  return locations;
}

function toBinary(num) {
  return num.toString(2).padStart(36, '0');
}

function toDecimal(bin) {
  return parseInt(bin, 2);
}

function getIndices(arr, target) {
  return arr
    .map((x, idx) => [x, idx])
    .filter(([x]) => x === target)
    .map(([_, idx]) => idx);
}
