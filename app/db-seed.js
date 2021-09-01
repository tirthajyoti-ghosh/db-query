const connectToDatabase = require('./db-connect');

async function seed() {
    const formats = ['png', 'jpg', 'jpeg', 'txt', 'doc'];
    let lastFolderNo = 0;
    let lastSubFolderNo = 0;
    
    const data = [];
    
    for (let i = 0; i < 50; i++) {
        const format = formats[Math.floor(Math.random() * formats.length) + 0];

        const fileProperties = {
            name: `File${i}.${format}`,
            format,
            sizeInKB: Math.floor(Math.random() * 50) + 0,
            width: 50,
            height: 50,
        };

        if (i % 10 === 0) {
            data.push({
                ...fileProperties,
                folder: `Folder${lastFolderNo}`,
            });

            lastFolderNo += 1;
        } else if (i % 5 === 0) {
            data.push({
                ...fileProperties,
                folder: `Folder${lastFolderNo}`,
                subFolder: `SubFolder${lastSubFolderNo}`,
            });

            lastSubFolderNo += 1;
        } else if (i % 2 === 0) {
            data.push({
                ...fileProperties,
                folder: `Folder${lastFolderNo}`,
                subFolder: `SubFolder${lastSubFolderNo}`,
            });
        } else {
            data.push(fileProperties);
        }
    }
    
    const { File } = await connectToDatabase();

    await File.insertMany(data);
}

seed();
