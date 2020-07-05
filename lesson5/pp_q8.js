let obj = {
  first: ['the', 'quick'],
  second: ['brown', 'fox'],
  third: ['jumped'],
  fourth: ['over', 'the', 'lazy', 'dog'],
};

let strings = Object.values(obj);
let vowels = [];

strings.forEach(arr => {
  arr.forEach(string => {
    string.split('').forEach(letter => {
      if ('aeiou'.includes(letter)) {
        vowels.push(letter);
      }
    });
  });
});

console.log(vowels.join(''));
