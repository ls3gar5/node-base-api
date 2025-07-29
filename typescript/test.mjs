const countingValleys = (steps, path) => {
    // Write your code here
    let lastValue = 0;
    let currentValue = 0;
    let valleys = 0;

    const U = 1; 
    const D = -1;
    
    const arrayPath = path.split('').map((step) => step === 'U' ? 1 : -1);    
    for (let i = 0; i< steps; i++){
        currentValue += arrayPath[i];
        if (currentValue < 0  && lastValue >= 0 )  {
            valleys++;
        } 
        lastValue = currentValue;
    }

    return valleys;
} 
countingValleys(8, 'UDDUUDDU'); // 1

