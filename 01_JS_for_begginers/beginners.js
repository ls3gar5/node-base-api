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

const persons = [
    { name: "Alice", age: 25 },
    { name: "Bob", age: 28 },
    { name: "Charlie", age: 35 }
];

const personOlderThan30 = persons.map(person => { return { name: person.name} } ); // Filtering persons older than 30
const totalofyears = persons.reduce((acc, person) => acc + person.age, 0 ); 
const firstPersonOver30 = persons.find(person => person.age > 30); // Finding the first person older than 30
if(firstPersonOver30) {
    console.log(`First person older than 30: ${firstPersonOver30.name}`); // Output: First person older than 30: Charlie
}
const someoneOlderThan30 = persons.some(person => person.age > 30); // Checking if there is someone older than 30
if (someoneOlderThan30) {
    console.log("There is someone older than 30"); // Output: There is someone older than 30
}
console.log(`Person older than 30: ${JSON.stringify(personOlderThan30)}`); // Output: Person older than 30: [{"name":"Charlie","age":35}]

const copy = {
    ...person, // Spread operator to copy properties
    age: 31 // Overriding the age property
};

copy.details.city = "Los Angeles"; // Modifying a nested property
console.log(person.details.city); // Output: { name: 'John', age: 31, details: { address: '123 Main St', city: 'Los Angeles' }, greet: [Function] }
// RESPONSE WHY IS THE ANSWER?
///Answer is B because shallow copy duplicates only the top-level properties of an object. 
// If those properties hold references (like nested objects or arrays), 
// the copy will still reference the same memory location as the original.

// 2. Write Clear and Descriptive Variable names


// 3.Use Arrow Functions for Simple Callbacks
const add = (a, b) => a + b; // Arrow function for addition

const calculateTotal2 = (price, tax) => {
    try {
        const priceWithTax = price + (price * tax); 
        return priceWithTax + add(price, tax); // Calculate total with tax
    
    } catch (error) {
        console.error("Error calculating total:", error);
        return null; // Return null in case of an error        
    }
}


console.log(`Total: ${calculateTotal2('Maria', 0.2)}`); // Output: 120

// function greet(name) {
//     return `Hello, ${name}`; // Regular function for greeting
// }
// const greet = (name) => `Hello, ${name}`; // Arrow function for greeting
console.log(greet('John')); // Output: Hello, John

// const total = calculateTotal(100, 0.2); // Using the imported function
// console.log(`Total: ${total}`); // Output: Total: 120


const numbers = [1, 2, 3, 4, 1, 2, 3, 4]; // Array of numbers

const doubled = numbers.map(num => num * 2);
const evenNumbers = numbers.filter(num => num > 2);
const sum = numbers.reduce((acc, num) => acc + num, 0); // Reducing the array to a sum

const sliece = numbers.slice(2, 5); // Slicing the array   
numbers.push(5); // Adding a new number to the array
numbers.unshift(9); // Adding a number at the beginning of the array
const pp = numbers.find(num => num > 2); // Finding the first number greater than 2



console.log(`Doubled: ${doubled}`); // Output: Doubled: 2,4,6,8
console.log(`Even Numbers: ${evenNumbers}`); // Output: Even Numbers: []        
console.log(`Sum: ${sum}`); // Output: Sum: 10
console.log(`Slice: ${sliece}`); // Output: Slice: 3,4,1

const unique = [...new Set(numbers)]; // Using Set to get unique values
console.log(`Unique Numbers: ${unique}`); // Output: Unique Numbers: 1,2,3,4

const isTrue = !(0 === 0);
console.log(`Is ${isTrue} and typeof: ${typeof(isTrue)}`); // Output: Is True: false



