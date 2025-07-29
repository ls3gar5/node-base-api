
// const { promisify } = require('node:util');
// const readFilePromise = promisify(require('node:fs').readFile);

import { readFile } from 'node:fs/promises';

console.log('Starting...');

readFile('./archivo.txt', 'utf-8')
.then(data => {
        console.log('FIRST File: ', data);
 })
.catch(err => {
    console.error('Error reading file:', err);
})

console.log('Doing anything else...');

readFile('./archivo2.txt', 'utf-8')
.then(data => {
    console.log('SECOND File: ', data);
})
.catch(err => {
    console.error('Error reading file:', err);
});  