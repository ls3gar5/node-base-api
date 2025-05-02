
// const { promisify } = require('node:util');
// const readFilePromise = promisify(require('node:fs').readFile);

const fs = require('node:fs/promises');

console.log('Starting...');

fs.readFile('./archivo.txt', 'utf-8')
.then(data => {
        console.log('File read:', data);
 })
.catch(err => {
    console.error('Error reading file:', err);
})

console.log('Doing anything else...');

fs.readFile('./archivo2.txt', 'utf-8')
.then(data => {
    console.log('Second file', data);
})
.catch(err => {
    console.error('Error reading file:', err);
});  