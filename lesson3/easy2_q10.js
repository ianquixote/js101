let title = "Flintstone Family Members";

console.log(title.padStart((Math.floor((40 - title.length) / 2) + title.length), ' '));

let string = '';
for (let iter = 0; iter <= 40; iter++) {
  string += '-';
}
console.log(string);
