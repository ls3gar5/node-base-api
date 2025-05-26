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
};

const greetPerson = (person: Person): string => {
    return `Hello, ${person.name}, you are ${person.age} years old`;
};

