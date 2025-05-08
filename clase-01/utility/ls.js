const fs = require('node:fs/promises')

async function ls (directory) {
  try {
    const statFile = await fs.stat(directory, 'utf-8')
    return {
      ...statFile
    }
  } catch (err) {
    console.error('Error reading file:', err)
  }
}

module.exports = ls
