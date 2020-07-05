let statement = "The Flintstones Rock";
// { T: 1, h: 1, e: 2, F: 1, l: 1, ... }

//create empty object
//Iterate over each letter in the statement
//--split the string into an array of single characters
//--if the letter is not a key, add the letter as a key with value of 1
//--else, increment the value by 1

let freq = {};
let letters = statement.split('');
letters.forEach(letter => {
  if (!Object.keys(freq).includes(letter) && letter !== ' ') {
    freq[letter] = 1;
  } else if (Object.keys(freq).includes(letter)) {
    freq[letter] += 1;
  }
});

console.log(freq);
