import inputArr from '../inputs/4';

export default function solvePuzzle() {
  let validPassports = 0;
  for (let i = 0; i < inputArr.length; i++) {
    const passportLines = [];
    while (inputArr[i]) {
      passportLines.push(inputArr[i]);
      i++;
    }

    const keyValues = [];
    for (const line of passportLines) {
      keyValues.push(...line.split(' '));
    }

    const keys = new Set();
    for (const kv of keyValues) {
      const [key, value] = kv.split(':');
      if (!validate(key, value)) {
        continue;
      }
      keys.add(key);
    }

    const numEntries = keys.size;
    if (numEntries === 8 || (numEntries === 7 && !keys.has('cid'))) {
      validPassports++;
    }
  }
  return validPassports;
}

/*
byr (Birth Year) - four digits; at least 1920 and at most 2002.
iyr (Issue Year) - four digits; at least 2010 and at most 2020.
eyr (Expiration Year) - four digits; at least 2020 and at most 2030.
hgt (Height) - a number followed by either cm or in:
    If cm, the number must be at least 150 and at most 193.
    If in, the number must be at least 59 and at most 76.
hcl (Hair Color) - a # followed by exactly six characters 0-9 or a-f.
ecl (Eye Color) - exactly one of: amb blu brn gry grn hzl oth.
pid (Passport ID) - a nine-digit number, including leading zeroes.
cid (Country ID) - ignored, missing or not.
*/
function validate(key, value) {
  switch (key) {
    case 'byr':
      return validateYear(value, 1920, 2002);
    case 'iyr':
      return validateYear(value, 2010, 2020);
    case 'eyr':
      return validateYear(value, 2020, 2030);
    case 'hgt':
      return validateHeight(value);
    case 'ecl':
      return validEyeColors.includes(value);
    case 'pid':
      return value.length === 9;
    case 'hcl':
      return validateHair(value);
    default:
      return true;
  }
}

function validateYear(year, min, max) {
  const asInt = parseInt(year, 10);
  return year.length === 4 && asInt >= min && asInt <= max;
}

function validateHeight(height) {
  const unitStart = height.length - 2;
  const units = height.substring(unitStart);
  if (units !== 'cm' && units !== 'in') {
    return false;
  }
  const value = parseInt(height.substring(0, unitStart), 10);
  return units === 'cm'
    ? value >= 150 && value <= 193
    : value >= 59 && value <= 76;
}

function validateHair(value) {
  return value.match(/^#[a-f0-9]{6}$/);
}

const validEyeColors = ['amb', 'blu', 'brn', 'gry', 'grn', 'hzl', 'oth'];
