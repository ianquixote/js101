let str1 = "Come over here!"; // true
let str2 = "What's up, Doc?"; // false

function lastCharacterIsExclamation (string) {
  console.log(string[string.length - 1] === '!');
}

lastCharacterIsExclamation(str1);
lastCharacterIsExclamation(str2);
