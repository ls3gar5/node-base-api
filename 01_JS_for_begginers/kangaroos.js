const kangarooStep = (startPosition, steps, jumps) => {
    return startPosition + (steps * jumps);
}

const checkValues = (x1, v1, x2, v2) => {
    if (x1 >= 0 && x1 < x2 && x2 <= 10000 && v1 >= 1 && v1 <= 10000 && v2 > 1 && v2 <= 10000) 
    {
        if (v1 < v2) return false; // Kangaroo 1 must be faster than Kangaroo 2
        return true;
    }
        
}

const kangarooJump = (x1, v1, x2, v2) => {
    checkValues(x1, v1, x2, v2);
    if (!checkValues(x1, v1, x2, v2)) {
        return "Invalid input values. Please ensure x1 < x2 and all values are within the specified ranges.";
    }
    const jumps = x2 - x1;
    const kangaroo1Position = kangarooStep(x1, v1, jumps);
    const kangaroo2Position = kangarooStep(x2, v2, jumps);

    if (kangaroo1Position === kangaroo2Position) {
        return `YES: Kangaroos meet at position: ${kangaroo1Position}`;
    } else {
        return "NO: Kangaroos do not meet.";
    }
} 
// Get parameters from command line
const [, , x1, v1, x2, v2] = process.argv;

console.log(kangarooJump(+x1, +v1, +x2, +v2));
