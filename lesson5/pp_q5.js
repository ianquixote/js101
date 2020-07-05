let munsters = {
  Herman: { age: 32, gender: 'male' },
  Lily: { age: 30, gender: 'female' },
  Grandpa: { age: 402, gender: 'male' },
  Eddie: { age: 10, gender: 'male' },
  Marilyn: { age: 23, gender: 'female'}
};

let arr = Object.values(munsters);
let totalMaleAge = 0;

arr.forEach(obj => {
  if (obj.gender === 'male') {
    totalMaleAge += obj.age;
  }
});

console.log(totalMaleAge);
