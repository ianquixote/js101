let munsters = {
  herman: { age: 32, gender: 'male' },
  lily: { age: 30, gender: 'female' },
  grandpa: { age: 402, gender: 'male' },
  eddie: { age: 10, gender: 'male' },
  marilyn: { age: 23, gender: 'female'}
};

let arr = Object.entries(munsters);
let name;
let age;
let gender;

arr.forEach(entry => {
  name = entry[0][0].toUpperCase() + entry[0].slice(1);
  age = entry[1].age;
  gender = entry[1].gender;
  console.log(`${name} is a ${age}-year-old ${gender}.`);
});
