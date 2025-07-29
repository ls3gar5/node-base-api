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

const personNames = persons.map(person => { return { name: person.name} } );
const totalOfYears = persons.reduce((acc, person) => acc + person.age, 0 ); 
// Finding the first person older than 30
const firstPersonOver30 = persons.find(person => person.age > 30); 
if(firstPersonOver30) {
    // Output: First person older than 30: Charlie
    console.log(`First person older than 30: ${firstPersonOver30.name}`);
}

// Checking if there is someone older than 30
//falsy values are: false, 0, '' (empty string), null, undefined, NaN
const someoneOlderThan30 = persons.some(person => person.age > 30); 
if (someoneOlderThan30 && someoneOlderThan30 === true) {
    console.log("There is someone older than 30"); // Output: There is someone older than 30
}
// Output: Person older than 30: [{"name":"Charlie","age":35}]
console.log(`Person older than 30: ${JSON.stringify(personNames)}`); 

const copyPerson = {
    ...person, // Spread operator to copy properties
    age: 31 // Overriding the age property
};

// Modifying a nested property in the copy and the original will also be modified
copyPerson.details.city = "Los Angeles"; 
// Output: { name: 'John', age: 31, details: { address: '123 Main St', city: 'Los Angeles' }, greet: [Function] }
console.log(person.details.city); 

// RESPONSE WHY IS THE ANSWER?
///Answer is B because shallow copy duplicates only the top-level properties of an object. 
// If those properties hold references (like nested objects or arrays), 
// the copy will still reference the same memory location as the original.


// 2. Write Clear and Descriptive Variable names


// 3.Use Arrow Functions for Simple Callbacks
// Arrow function for addition
const add = (a, b) => a + b; 

function calculateTotalPriceWithTax(price, tax) {
    try {
        const priceWithTax = price + (price * tax);
        return priceWithTax + add(price, tax); // Calculate total with tax

    } catch (error) {
        console.error("Error calculating total:", error);
        return null; // Return null in case of an error        
    }
}

console.log(`Total: ${calculateTotalPriceWithTax('Maria', 0.2)}`); // Output: 120

console.log(greet('John')); // Output: Hello, John

const total = calculateTotal(100, 0.2); // Using the imported function
console.log(`Total: ${total}`); // Output: Total: 120


const numbers = [1, 2, 3, 4, 1, 2, 3, 4]; // Array of numbers

const doubled = numbers.map(num => num * 2); // Doubling each number in the array
const evenNumbers = numbers.filter(num => num > 2);
const sum = numbers.reduce((acc, num) => acc + num, 0); // Reducing the array to a sum

const slice = numbers.slice(2, 5); // Slicing the array
console.log(`Slice: ${slice}`); // Output: Slice: 3,4,1
numbers.push(5); // Adding a new number to the array
numbers.unshift(9); // Adding a number at the beginning of the array
const first = numbers.find(num => num > 2); // Finding the first number greater than 2
console.log(`First number greater than 2: ${first}`); // Output: First number greater than 2: 3


console.log(`Doubled: ${doubled}`); // Output: Doubled: 2,4,6,8
console.log(`Even Numbers: ${evenNumbers}`); // Output: Even Numbers: []        
console.log(`Sum: ${sum}`); // Output: Sum: 10
console.log(`Slice: ${slice}`); // Output: Slice: 3,4,1

const unique = [...new Set(numbers)].sort((a, b) => a - b); // Using Set to get unique values and sort them
console.log(`Unique Numbers: ${unique}`); // Output: Unique Numbers: 1,2,3,4,5,9
const isTrue = !(0 === 0);
console.log(`Is ${isTrue} and typeof: ${typeof(isTrue)}`); // Output: Is True: false



