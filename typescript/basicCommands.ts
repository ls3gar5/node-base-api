import { Person, HeroId } from "./type/heroType";
//Recommend Pretty TypeScript Errors 
//to run this file, use the command: 
//          npx ts-node basicCommands.ts
// or if you have ts-node installed globally, use: 
//          ts-node basicCommands.ts

//This way we are setting to anyValue not take a type
//and we can assign any value to it, without type checking  
//but we lost the benefits of TypeScript's type system
const anyValue:any = "Hello, World!";
//This way we are setting to unknownValue to take a type
//and we can assign any value to it, but we need to check the type before using
//it, which is safer than using any
//but we still lose some benefits of TypeScript's type system
const unknownValue: unknown = "Hello, World!";

const nombre: string[]  = ["Juan", "Leo"];

const person: Person = {
    id: crypto.randomUUID() as HeroId,
    name: "Juan",
    age: 30,
    birth: new Date("1993-01-01")
};

console.log(nombre.splice(0, 1, "Leo"));

const greet = (name: string): string => {

    return `Hello, ${name}`;

};

const sayHello = (greetFuc: (name: string) => string) => {
    return greetFuc("Juan AAAAAA");
};  


console.log(sayHello(greet));

const greetPerson = (person: Person): string => {
    // const birthDate = person.birth ? person.birth.toDateString() : "Unknown";
    const birthDate = person.birth?.toDateString() ?? "Unknown";
    const newPerson = {...person, newAge: person.age + 1}; // Increment age by 1
    console.log(JSON.stringify(newPerson));
    return `Hello, ${person.name}, you are ${person.age} years old and your birth date is ${birthDate}`;
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

// console.log(greet("Juan"));
console.log(greetPerson(person));
// console.log(countingValleys(8, "UDDDUDUU"));


//Type Aliases
type StringOrNumber = string | number;

const printValue = (value: StringOrNumber): void => {
    console.log(`The value is: ${value}`);
};

printValue("Hello");
printValue(42);
