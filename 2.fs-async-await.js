const { readFile } = require('node:fs/promises');

console.log('Starting...');

// async function readFiles() {
//     try {
//         const data = await readFile('./archivo.txt', 'utf-8');
//         console.log('File read:', data);
//     } catch (err) {
//         console.error('Error reading file:', err);
//     }
// }
// readFiles();

//IIFE
(async () => {
    const data = await readFile('./archivo.txt', 'utf-8');
    console.log('First file:', data);
    console.log('Doing anything else...');
    const data2 = await readFile('./archivo2.txt', 'utf-8');
    console.log('Second file:', data2);
})();

