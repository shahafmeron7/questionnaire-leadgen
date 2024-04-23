const fs = require('fs');
const path = require('path');

// Recursive function to get files and folders
function getFilesAndFoldersRecursive(dirPath) {
    let entries = fs.readdirSync(dirPath, { withFileTypes: true });
    let filesDirs = [];

    entries.forEach(entry => {
        let fullPath = path.join(dirPath, entry.name);
        if (entry.isDirectory()) {
            filesDirs.push({ type: 'directory', name: fullPath });
            filesDirs = filesDirs.concat(getFilesAndFoldersRecursive(fullPath));
        } else {
            filesDirs.push({ type: 'file', name: fullPath });
        }
    });

    return filesDirs;
}

// Starting directory path
const rootDirPath = './'; // Adjust this path as needed

// Get all files and folders recursively starting from the current directory
const allFilesFolders = getFilesAndFoldersRecursive(rootDirPath);
console.dir(allFilesFolders, { maxArrayLength: null, depth: null });
