let ages = {
  Herman: 32,
  Lily: 30,
  Grandpa: 5843,
  Eddie: 10,
  Marilyn: 22,
  Spot: 237
};

//create array of all values - Object.values
//use reduce function to add all elements together

let agesArray = Object.values(ages);

let total = agesArray.reduce((accumulator, currentValue) => {
  return accumulator + currentValue;
});

console.log(total);
