const numberTranslations = require('./numbers');

const getDigitInfo = (input) => {
  const accountInfo = input.splice(0,4);
  accountInfo.pop();
  return accountInfo;
};

const splitInputIntoAccountNumbers = ({input, result=[]}) => {
  result.push(getDigitInfo(input));
  if(input.length > 2) {
    splitInputIntoAccountNumbers({input, result});
  };
  return result;
};

const splitLinesIntoArrays = (lines) => lines.map((line) => line.split(''));

const arrayToString = (array) => array.toString().replace(/,/g,'');

const getDigitPieces = (arrays) => arrays.map((array) => arrayToString(array.splice(0,3)));

const groupArraysIntoDigits = ({arrays, group = []}) => {
  if(arrays[0].length > 0) {
    const number = getDigitPieces(arrays);
    group.push(number);
    return groupArraysIntoDigits({arrays, group});
  };
  return group;
};

const translateDigitsToNumbers = (digits) => {
  return digits.map((digit) => {
    const foundNumber = numberTranslations.find(currNum => {
      const match = digit.toString() === currNum.key.toString();
      return match;
    });
    if (foundNumber) {
      return foundNumber.number;
    };
  });
};

const getAccountNumber = (lines) => {
  const linesAsArrays = splitLinesIntoArrays(lines);
  const digits = groupArraysIntoDigits({arrays: linesAsArrays});
  const accountNum = translateDigitsToNumbers(digits);
  return arrayToString(accountNum);
};

const bank = (input) => {
  const rawAccountNumbers = splitInputIntoAccountNumbers({input: input.split('\n')});
  return rawAccountNumbers.map(accountLines => getAccountNumber(accountLines));
};

module.exports = bank;