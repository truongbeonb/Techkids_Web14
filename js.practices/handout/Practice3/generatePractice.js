'use strict';

function getRandomInRange(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

function generate(testLengthArray) {
  var result = [];
  const rangeMax = 10000;
  var numberOfIndex, arr, target;
  for (let i = 0; i < testLengthArray.length; i++) {
    arr = [];
    numberOfIndex = testLengthArray[i];
    while (arr.length < numberOfIndex)
      arr.push(getRandomInRange(-rangeMax, rangeMax));
    arr.sort((a, b) => a - b);
    var temp = Math.random() * 10;
    target = temp > 9.5 ? 12345 : arr[getRandomInRange(0, numberOfIndex - 1)];

    if (i === 1)
      result.push({
        input: arr,
        target: 12345,
        output: -1
      });
    // Not found: input doesn't contain target.
    else if (i === 2)
      result.push({
        input: arr,
        target: arr[0],
        output: 0
      });
    // First index: target is at index 0.
    else if (i === 3)
      result.push({
        input: arr,
        target: arr[arr.length - 1],
        output: arr.length - 1
      });
    // Last index: target is at index input.length - 1.
    else if (i === 4)
      result.push({
        input: arr,
        target: arr[Math.floor(arr.length / 2)],
        output: Math.floor(arr.length / 2)
      });
    // Middle index: target is at index Math.floor(input.length/2).
    else
      result.push({
        input: arr,
        target: target,
        output: arr.indexOf(target)
      }); // Normal test case
  }
  return result;
  // return Array.from({length : testLengthArray.length})
  //   .map(item => ({
  //     input: Array.from({length: item}).map(item => []),
  //     target: 0,
  //     output: -1
  //   })
  // ); // Remove this line and change to your own algorithm
}

module.exports = generate;