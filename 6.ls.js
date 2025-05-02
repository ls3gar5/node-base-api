const fs= require('node:fs/promises');
const path = require('node:path');

//const fs= require('node:fs');
//first version using callback

// fs.readdir('./', (err, files) => { 
//     if (err) {
//         console.error('Error reading directory:', err);
//         return;
//     }
//     console.log('Files in directory:', files);

//     files.forEach(file => {
//         fs.stat(file, (err, stats) => { 
//             if (err) {
//                 console.error('Error getting file stats:', err);
//                 return;
//             }
//             console.log(`File: ${file}, Size: ${stats.size} bytes`);
//         })
//     });
// });

const folder = process.argv[2] || '.';

fs.readdir(folder)
    .then(files => {

        console.log('Files in directory:', files);

        files.forEach(file => {
//           console.log(`File: ${file}`);
            const pathFile = path.join('./',folder, file);
            console.log(pathFile);
            fs.stat(pathFile, (err, stats) => { 
                if (err) {
                    // console.error('Error getting file stats:', err);
                    // return;
                    console.log(`File: ${file}`);
                    return
                }
                console.log(`File: ${file}, Size: ${stats.size} bytes`);
            });
        });
    })
    .catch(err => { 
        console.error('Error reading directory:', err);
        return;
    });