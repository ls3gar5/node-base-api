import { ERROR_TYPES } from "./type/commonType";

const add = (number1: number, number2: number): number => {
    return number1 + number2;
};

const result = add(2, 3);
console.log(result);

//array of arrays with specific string values
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

///Example with enum usage
const showMessage = (message: ERROR_TYPES): void => {
    if (message === ERROR_TYPES.INVALID_ID) {
        console.error("Error: Invalid ID format");
    } else if (message === ERROR_TYPES.MISSING_NAME) {
        console.error("Error: Name is required");
    } else if (message === ERROR_TYPES.INVALID_AGE) {
        console.error("Error: Age must be a positive number");
    } else if (message === ERROR_TYPES.INVALID_BIRTH_DATE) {
        console.error("Error: Birth date must be a valid date");
    }
}

///Example with HTMLCanvasElement where we check if the element is an instance of HTMLCanvasElement
const canvas = document.getElementById('canvas') as HTMLCanvasElement;

if (canvas instanceof HTMLCanvasElement) {
    const ctx = canvas.getContext('2d');
    if (ctx) {
        ctx.fillStyle = 'blue';
        ctx.fillRect(10, 10, 100, 100);
    } else {
        console.error("Failed to get canvas context");
    }
}


