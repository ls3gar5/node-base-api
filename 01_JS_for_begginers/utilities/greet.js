
//4.Use Template Literals for String Concatenation
const greet = (name) => `Hello, ${name}`;

// 5.Organize Code with Functions and Modules
const calculateTotal = (price, tax) => {
    return price + (price * tax);
};

module.exports = { greet, calculateTotal }; // Exporting the greet function