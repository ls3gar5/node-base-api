
// const { promisify } = require('node:util');
// const readFilePromise = promisify(require('node:fs').readFile);
import { readFile } from 'node:fs/promises';

console.log('Starting...');

Promise.allSettled([
    readFile('../archivo.txt', 'utf-8'),
    readFile('../archivo2.txt', 'utf-8')
]).then(([data, data2]) => {
    console.log('First file:', JSON.stringify(data));
    console.log('Second file', JSON.stringify(data2));
}).catch(err => {
    console.error('Error reading file:', err.message);
}).finally(() => {
    console.log('All done!');
});


// try {
//     const data = await readFile('./archivo.txt', 'utf-8')
//     console.log('File read:', data);
    
// } catch (error) {
//     console.error('Error reading file archivo:', error.message);
// }

// console.log('Doing anything else...');

// try {
//     const data2 = await readFile('./archivo2.txt', 'utf-8')
//     console.log('Second file', data);
// } catch (error) {
//     console.error('Error reading file archivo2:', error.message);
// }


// ➜  node-base-api git:(main) ✗ node 2.fs-async-await.js 
// (node:72337) Warning: To load an ES module, set "type": "module" in the package.json or use the .mjs extension.
// (Use `node --trace-warnings ...` to show where the warning was created)
// /Users/leonardosegars/RepoTest/node-base-api/2.fs-async-await.js:5
// import { readFile } from 'node:fs/promises';