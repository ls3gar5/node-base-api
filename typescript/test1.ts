const nombre: string[]  = ["Juan", "Leo"];

type Person = {
    name: string;
    age: number;
};

const person: Person = {
    name: "Juan",
    age: 30,
};

console.log(nombre.splice(0, 1, "Leo"));

const greet = (name: string): string => {

    nombre.splice(0, 1, "Leo");
    return `Hello, ${name}`;

    for (let i = 0; i < 10; i++) {
        console.log(i);
    }
};

const greetPerson = (person: Person): string => {
    return `Hello, ${person.name}, you are ${person.age} years old`;
};


const countingValleys = (steps: number, path: string): number => {
    // Write your code here
    let lastValue = 0;
    let currentValue = 0;
    let valleys = 0;

    const U = 1; 
    const D = -1;
    
    const arrayPath = path.split('').map((step) => step === 'U' ? 1 : -1);    
    for (let i = 0; i< steps; i++){
        currentValue =+ arrayPath[i];
        if (currentValue < 0  && lastValue >= 0 )  {
            valleys++;
        } 
        lastValue = currentValue;
    }

    return valleys;
} 
