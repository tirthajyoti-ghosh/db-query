const { createConnection } = require('mongoose');
require('dotenv').config();

const fileSchema = require('./models/File');

module.exports = async () => {
    const connection = await createConnection(process.env.MONGODB_CONNECTION_URI, {useNewUrlParser: true, useUnifiedTopology: true});

    // Be sure to update the third argument here. The third argument represents the collection name in the database.
    const File = connection.model('File', fileSchema, 'db-query');

    return { File };
};

