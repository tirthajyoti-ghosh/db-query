// In this task, you get an opportunity to work on a database design similar to the one that is
// currently being used in ImageKit’s media library as well.
// We need to create a directory structure with folders and files in it. For creating this, you need to
// store the information about these folders and files in any database of your choice. The folder
// structure would look something like this
// / (root)
//      - Folder1
//          - File1.png
//          - File2.png
//      - Folder2
//          - SubFolder1
//          - SubFolder2
//              - File3.jpg
//              - File4.txt

// Along with the above directory structure information, we should also be able to store information
// about a file, like
//  - Format
//  - Size in KBs
//  - Dimensions
// Expectations
//  A. No UI implementation or APIs are needed, just the design and queries is sufficient
// at this stage
//  B. If you are not familiar with databases, you can skip writing the queries, but we do
// expect you to provide a logically correct solution to perform the tasks “2.a” to
// “2.g”.
//      1. The database design / schema
//      2. The queries or any other code or logic that would need to be run on that database to
// achieve the following tasks
//          a. Insert a new folder or file at any level (root or inside a folder)
//          b. Get list of all files reverse sorted by date
//          c. Find the total size of a folder (like total size of files contained in Folder2 which
// would include size of files File3.jpg and File4.txt)
//          d. Delete a folder
//          e. Search by filename
//          f. Search for files with name “File1” and format = PNG
//          g. Rename SubFolder2 to NestedFolder2


// 1. - The database design / schema

// Assumptions when inserting a file:
// 1. Dimensions is broken down into two separate properties - width and height, both having integer data-type. The width and height is in pixels.
// 2. If the folder is empty then the file is in the root folder
// 3. If the subfolder is empty and only folder is mentioned then the file goes inside the folder
// 4. If the subfolder is specified then the folder MUST NOT be empty

const { Schema } = require('mongoose');

const fileSchema = new Schema({
    name: {
        type: String,
        required: true,
        minLength: 1,
    },
    format: {
        type: String,
        required: true,
    },
    sizeInKB: {
        type: Number,
        required: true,
    },
    width: {
        type: Number,
        required: true,
    },
    height: {
        type: Number,
        required: true,
    },
    folder: {
        type: String,
        required: [() => this.subFolder, 'Folder MUST be mentioned if inserting in a sub folder'], // folder MUST be mentioned if subFolder is mentioned
    },
    subFolder: {
        type: String,
        required: false,
    },
}, { timestamps: true });

// Connect to database
const connection = await connectToDatabase();
const File = connection.model('File', fileSchema, 'db-query');


// 2.a - Insert a new folder or file at any level (root or inside a folder)
// Assumptions:
// 1. Since I am using MongoDB, a NO-SQL database, there wouldn't be a need to write a separate query for adding a new folder or subfolder because when adding a file, we can specify which folder and/or subfolder this file will go in. So specifying a new folder name and/or subfolder name when inserting a file will automatically "add" that folder/subfolder

// Abstracting the required properties
const fileProperties = {
    name: 'File1.png',
    format: 'PNG',
    sizeInKB: 32,
    width: 50,
    height: 50,
};

// -----------------Inserting a file in root folder-----------------
// Notice no folder or subfolder mentioned, meaning this file will "go into" the root folder
await File.create(fileProperties);

// --------------------Inserting file in folder--------------------
// Notice no subfolder is mentioned and only folder is mentioned, meaning the file will "go into" the folder and not into any subfolder
await File.create({
    ...fileProperties,
    folder: 'Folder1',
});

// ------------------Inserting file in subfolder------------------
// Notice both folder and subfolder is mentioned, meaning the file will "go into" the specified sub folder. The operation will fail if no folder is mentioned
await File.create({
    ...fileProperties,
    folder: 'Folder2',
    subFolder: 'SubFolder1',
});

// 2.b - Get list of all files reverse sorted by date
await File.find({}).sort({ createdAt: 'desc'});

// 2.c - Find the total size of a folder (like total size of files contained in Folder2 which would include size of files File3.jpg and File4.txt)

// ----------------Finding total size of a folder----------------
await File.aggregate([
    {
        $match: {
          folder: 'Folder2'
        },
        $group: {
            _id: '',
            totalSize: {
                $sum: '$sizeInKB',
            },
        },
    },
]);

// ----------------Finding total size of a subfolder----------------
// When finding total size of a subfolder, folder must be mentioned
await File.aggregate([
    {
        $match: {
          folder: 'Folder2',
          subFolder: 'SubFolder1'
        },
        $group: {
            _id: '',
            totalSize: {
                $sum: '$sizeInKB',
            },
        },
    },
]);

// 2.d - Delete a folder
// Assumptions: deleting a folder/subfolder means deleting all files in that folder/subfolder

// ----------------Deleting all files in a folder----------------
await File.deleteMany({ folder: 'Folder1' });

// ----------------Deleting all files in a subfolder----------------
// When deleting all files in a subfolder, folder must be mentioned
await File.deleteMany(
    {
        folder: 'Folder1',
        subFolder: 'SubFolder2',
    }
);

// 2.e - Search by filename
const fileName = 'File2.png';
await File.find({ name: fileName });

// 2.f - Search for files with name “File1” and format = PNG
await File.find(
    {
        name: /File1/,
        format: /^(PNG)|(png)$/,
    }
);

// 2.g - Rename SubFolder2 to NestedFolder2
await File.updateMany(
    {
        subFolder: 'SubFolder2',
    },
    {
        subFolder: 'NestedFolder2',
    }
);
