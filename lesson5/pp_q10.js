let arr = [['b', 'c', 'a'], [2, 1, 3], ['blue', 'black', 'green']];

let sortedArray = arr.map(subArray => {
  if (typeof subArray[0] === 'number') {
    return subArray.slice().sort((a, b) => Number(b) - Number(a));
  } else {
    return subArray.slice().sort((a, b) => {
      if (a < b) {
        return 1;
      } else if (a === b) {
        return 0;
      } else {
        return -1;
      }
    });
  }
});

console.log(sortedArray);
