//4. Use Template Literals for String Concatenation
export const greet = (name) => `Hello, ${name}`;

// 5. Organize Code with Functions and Modules
// Type annotations can only be used in TypeScript files.
export const calculateTotal = (price, tax) => {
    return price + (price * tax);
};

// without ES6 modules
//module.exports = { greet, calculateTotal }; // Exporting the greet function 

// to use by default greet function withot { }
export default greet; // Exporting the greet function