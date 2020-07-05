let flintstones = ["Fred", "Barney", "Wilma", "Betty", "Pebbles", "Bambam"];

let obj = {};

for (let index = 0; index < flintstones.length; index++) {
  obj[flintstones[index]] = index;
}

console.log(obj);
