function uuid() {
  const DIGITS = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 'a', 'b', 'c', 'd', 'e', 'f'];
  let string = '';
  for (let count = 1; count <= 32; count++) {
    let index = Math.floor(Math.random() * 16);
    let digit = DIGITS[index];
    string += digit;
  }
  let uuidParts = [];
  uuidParts.push(string.slice(0, 9));
  uuidParts.push(string.slice(9, 13));
  uuidParts.push(string.slice(13, 17));
  uuidParts.push(string.slice(17, 21));
  uuidParts.push(string.slice(21));
  let uuidString = uuidParts.join('-');
  console.log(uuidString);
}

uuid();
