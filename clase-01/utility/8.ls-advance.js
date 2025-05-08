/* eslint-disable array-callback-return */
const fs = require('node:fs/promises')
const path = require('node:path')
const ls = require('./ls.js')
const picocolors = require('picocolors')

const folder = process.argv[2] || '.'

// fs.readdir(folder)
//     .then(files => {

//         console.log('Files in directory:', files);

//         files.forEach(async file => {
//             const filePath = path.join('./',folder, file);
//             // console.log(filePath);
//             // fs.stat(filePath, (err, stats) => {
//             //     if (err) {
//             //         // console.error('Error getting file stats:', err);
//             //         // return;
//             //         console.log(`File: ${file}`);
//             //         return
//             //     }
//             //     console.log(`File: ${file}, Size: ${stats.size} bytes`);
//             // });
//             const statFile = await ls(filePath);
//             console.log(`File: ${file}, Size: ${statFile.size} bytes`);
//         });
//     })
//     .catch(err => {
//         console.error('Error reading directory:', err);
//         return;
//     });

async function lsFile (folder) {
  let files
  try {
    files = await fs.readdir(folder)
  } catch (error) {
    console.error(picocolors.red('Error reading directory:', error.message))
    process.exit(1)
  }

  const filesPromises = files.map(async (file) => {
    try {
      const filePath = path.join(folder, file)
      const stats = await ls(filePath)
      return { file, size: stats.size }
    } catch (error) {
      console.error('Error getting file stats:', error.message)
      return { file, size: 'N/A' }
    }
  })

  const filesStats = await Promise.allSettled(filesPromises)

  filesStats.map((result) => {
    if (result.status === 'fulfilled') {
      const fileInfo = result.value
      console.log(`File: ${fileInfo.file}, Size: ${fileInfo.size} bytes`)
      return
    }
    if (result.status === 'rejected') {
      console.error('Error getting file stats:', result.reason?.message)
    }
  })
}

// (async () => {
//     try {
//         await lsFile(folder);
//         console.log('All files processed');
//     } catch (error) {
//         console.error('Error processing files:', error.message);
//     }
// }
// )();

lsFile(folder)
