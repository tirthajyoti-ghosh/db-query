const {
    insertFile,
    getFilesReverseSortedByDate,
    getTotalSizeOfFolder,
    deleteFolder,
    searchByFileName,
    searchWithNameAndFormat,
    renameFolder,
} = require('./db-operations');

// Uncomment any one of the console logs to test
async function run () {
    // ---------------------2.a---------------------
    // console.log(await insertFile(
    //     {
    //         name: 'NewerFile1.jpg',
    //         format: 'PNG',
    //         sizeInKB: 32,
    //         width: 50,
    //         height: 50,
    //     },
    //     'Folder3',
    //     'SubFolder3',
    // ));

    // ---------------------2.b---------------------
    // console.log(await getFilesReverseSortedByDate());

    // ---------------------2.c---------------------
    // console.log(await getTotalSizeOfFolder(
    //     'Folder3',
    //     'SubFolder3',
    // ));

    // ---------------------2.d---------------------
    // console.log(await deleteFolder(
    //     'Folder1',
    //     'SubFolder1',
    // ));

    // ---------------------2.e---------------------
    // console.log(await searchByFileName(
    //     'File32.png',
    // ));

    // ---------------------2.f---------------------
    // console.log(await searchWithNameAndFormat(
    //     /NewFile/,
    //     /^(PNG)|(png)$/,
    // ));

    // ---------------------2.g---------------------
    // console.log(await renameFolder(
    //     'subFolder',
    //     'SubFolder3',
    //     'NestedFolder3',
    // ));
}

run()
