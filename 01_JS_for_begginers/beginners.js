const { greet, calculateTotal }= require('./utilities/greet'); // Importing the greet function
// 1. Use const and let Instead of var
const name = "John"; // This is a constant variable
let age = 30; // This is a block-scoped variable

// 2. Write Clear and Descriptive Variable names


// 3.Use Arrow Functions for Simple Callbacks
const add = (a, b) => a + b; // Arrow function for addition
// function greet(name) {
//     return `Hello, ${name}`; // Regular function for greeting
// }
// const greet = (name) => `Hello, ${name}`; // Arrow function for greeting
console.log(greet('John')); // Output: Hello, John

const total = calculateTotal(100, 0.2); // Using the imported function
console.log(`Total: ${total}`); // Output: Total: 120

