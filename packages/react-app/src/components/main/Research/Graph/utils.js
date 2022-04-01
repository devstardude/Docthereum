export const occurrencesCalculator = (array) => {
  const occurrences = array.reduce(function (acc, curr) {
    return acc[curr] ? ++acc[curr] : (acc[curr] = 1), acc;
  }, {});
  return occurrences;
};

export const checkOccuranceValue = (object, key) => {
  if (object[key]) {
    return String(object[key]);
  } else {
    return "0";
  }
};

export const nameGenerator = (number) => {
  if (number < 10) {
    return "0" + String(number);
  } else {
    return String(number);
  }
};
