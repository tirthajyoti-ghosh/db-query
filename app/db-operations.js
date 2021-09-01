const connectToDatabase = require('./db-connect');

module.exports = {
    insertFile: async (fileProperties, folder, subFolder) => {
        const { File } = await connectToDatabase();

        await File.create({
            ...fileProperties,
            folder,
            subFolder,
        });
    },
    getFilesReverseSortedByDate: async () => {
        const { File } = await connectToDatabase();

        const files = await File.find({}).sort({ createdAt: 'desc'});

        return files;
    },
    getTotalSizeOfFolder: async (folder, subFolder = undefined) => {
        const { File } = await connectToDatabase();

        const result = await File.aggregate(
            [
                {
                    $match: {
                        folder,
                        subFolder,
                    },
                },
                {
                    $group: {
                        _id: '',
                        totalSize: {
                            $sum: '$sizeInKB',
                        },
                    },
                },
            ]
        );

        return result[0] ? result[0].totalSize : 0;
    },
    deleteFolder: async (folder, subFolder) => {
        if (subFolder && !folder) {
            throw new Error('Folder must be specified');
        }

        const { File } = await connectToDatabase();

        await File.deleteMany(
            {
                folder,
                subFolder,
            }
        );
    },
    searchByFileName: async (name) => {
        const { File } = await connectToDatabase();

        const files = await File.findOne({ name });

        return files;
    },
    searchWithNameAndFormat: async (name, format) => { // arguments have to of Regex data type
        if (!name instanceof RegExp || !format instanceof RegExp) {
            throw new Error('Name and format must be RegExp');
        }

        const { File } = await connectToDatabase();

        const files = await File.find(
            {
                name,
                format,
            }
        );

        return files;
    },
    renameFolder: async (type, oldName, newName) => {
        if (!type || !oldName || !newName) {
            throw new Error('Type, old name and new name all three must specified');
        }

        const { File } = await connectToDatabase();

        await File.updateMany(
            {
                [type]: oldName,
            },
            {
                [type]: newName,
            }
        );
    },
};
