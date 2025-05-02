const fs = require('node:fs');

console.log('Starting...');

fs.readFile('./archivo.txt', 'utf-8', (err, data) => { 
    console.log('File read:', data);
    if (err) {
        console.error('Error reading file:', err);
    } else {
        console.log('File content:', data);
    }
});

console.log('Doing anything else...');

fs.readFile('./archivo2.txt', 'utf-8', (err, data) => { 
    console.log('Second file', data);
    if (err) {
        console.error('Error reading file:', err);
    } else {
        console.log('File content:', data);
    }
});