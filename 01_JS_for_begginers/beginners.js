import { greet, calculateTotal } from './utilities/greet.js'; // Importing the greet function
// 1. Use const and let Instead of var
const name = "John"; // This is a constant variable
let age = 30; // This is a block-scoped variable

const person = {
    name: "John",
    age: 30,
    details: {
        address: "123 Main St",
        city: "New York"
    },
    greet: function() {
        console.log(`Hello, my name is ${this.name}`);
    }
};

const copy = {
    ...person, // Spread operator to copy properties
    age: 31 // Overriding the age property
};

copy.details.city = "Los Angeles"; // Modifying a nested property
console.log(person.details.city); // Output: { name: 'John', age: 31, details: { address: '123 Main St', city: 'Los Angeles' }, greet: [Function] }
// RESPONSE WHY IS THE ANSWER?
///Answer is B because shallow copy duplicates only the top-level properties of an object. If those properties hold references (like nested objects or arrays), the copy will still reference the same memory location as the original.

// 2. Write Clear and Descriptive Variable names


// 3.Use Arrow Functions for Simple Callbacks
const add = (a, b) => a + b; // Arrow function for addition
// function greet(name) {
//     return `Hello, ${name}`; // Regular function for greeting
// }
// const greet = (name) => `Hello, ${name}`; // Arrow function for greeting
console.log(greet('John')); // Output: Hello, John

// const total = calculateTotal(100, 0.2); // Using the imported function
// console.log(`Total: ${total}`); // Output: Total: 120

