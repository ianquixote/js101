let advice = "Few things in life are as important " +
"as house training your pet dinosaur.";

let array = advice.split(' ');
let newArray = array.map(word => {
  if (word === 'important') {
    return 'urgent';
  } else {
    return word;
  }
});

console.log(newArray.join(' '));

//or

console.log(advice.replace('important', 'urgent'));

//or

let regex = /important/gi;
console.log(advice.replace(regex, 'urgent'));
