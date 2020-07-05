let munstersDescription = "The Munsters are creepy and spooky.";

let array = munstersDescription.split('');
let newArray = [];

array.forEach(letter => {
  if (letter === letter.toUpperCase()) {
    newArray.push(letter.toLowerCase());
  } else {
    newArray.push(letter.toUpperCase());
  }
});

console.log(newArray.join(''));
