function sum (a, b) {
  console.log('The total is: ' + (a + b))
  return a + b
};

export function resta (a, b) {
  console.log('The total is: ' + (a - b))
  return a - b
};

 // module.exports = { sum } //const { sum } = require('./sum.js')
export default sum; // import sum from './sum.js';

