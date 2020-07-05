let obj = {
  grape: { type: 'fruit', colors: ['red', 'green'], size: 'small' },
  carrot: { type: 'vegetable', colors: ['orange'], size: 'medium' },
  apple: { type: 'fruit', colors: ['red', 'green'], size: 'medium' },
  apricot: { type: 'fruit', colors: ['orange'], size: 'medium' },
  marrow: { type: 'vegetable', colors: ['green'], size: 'large' },
};

let objects = Object.values(obj);
let array = [];

objects.forEach(object => {
  if (object.type === 'fruit') {
    array.push(object.colors.map(color => color[0].toUpperCase() + color.slice(1)));
  } else {
    array.push(object.size.toUpperCase());
  }
});

console.log(array);
