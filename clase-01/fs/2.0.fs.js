import { readFile } from 'node:fs';

console.log('Starting...');

readFile('./archivo.txt', 'utf-8', (err, data) => { 
    if (err) {
        console.error('Error reading file:', err);
    } else {
        console.log('File content:', data);
    }
});

console.log('Doing anything else...');

readFile('./archivo2.txt', 'utf-8', (err, data) => { 
    console.log('Second file', data);
    if (err) {
        console.error('Error reading file: archivo2.txt', err);
    } else {
        console.log('File content:', data);
    }
});