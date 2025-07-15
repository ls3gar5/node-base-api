const add = (number1: number, number2: number): number => {
    return number1 + number2;
};

const result = add(2, 3);
console.log(result);
type cellValue = 'X' | 'O' | '';

const arrayString3x3: [
    [cellValue, cellValue, cellValue],
    [cellValue, cellValue, cellValue],
    [cellValue, cellValue, cellValue]
] = [
    ["X", "O", ""],
    ["", "X", ""],
    ["", "", "X"]
];  
