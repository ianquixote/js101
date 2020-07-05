// function isColorValid(color) {
//   if (color === "blue" || color === "green") {
//     return true;
//   } else {
//     return false;
//   }
// }

// function isColorValid(color) {
//   return (color === "blue" || color === "green");
// }
const isColorValid = color => color === "blue" || color === "green";
console.log(isColorValid('blue'));
console.log(isColorValid('green'));
console.log(isColorValid('red'));

const VALID_COLORS = ["blue", "green"];
function isColorValid2(color) {
  return (color === VALID_COLORS[0] || color === VALID_COLORS[1]);
}
console.log(isColorValid2('blue'));
console.log(isColorValid2('green'));
console.log(isColorValid2('red'));
