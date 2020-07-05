let ages = {
  Herman: 32,
  Lily: 30,
  Grandpa: 5843,
  Eddie: 10,
  Marilyn: 22,
  Spot: 237
};

//create array of ages
//initialize minimumAge variable as the first element in the array
//for each element in the array:
//if the age is less than the previous age, reassign the age to the lesser age

let agesArray = Object.values(ages);

let minimumAge = agesArray[0];

agesArray.forEach(age => {
  if (age < minimumAge) {
    minimumAge = age;
  }
});

console.log(minimumAge);
