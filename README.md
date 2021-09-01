# Database Query

Used MongoDB as the database and Mongoose as the ORM.

## The `database-queries.js`

In this file you will find an overall solution of task 1 and 2. Task 1 being the design of the database schema and task 2 being the various operations on the collection. Please note that the code for the database operations are just sample code to show the solution. Please use the instructions below if you want to test the solutions.

## The `app` directory

Here you will find an actual working app to test the solutions for task 2 in `database-queries.js`.

### Prerequisites

- Run `npm i` to install the packages required.
- Make sure to create a `.env` file with `MONGODB_CONNECTION_URI` and set the value to the database connection URI (`mongodb+srv://<username>:<password>@cluster0.7oztt.mongodb.net/<database-name>?retryWrites=true&w=majority`)
- Be sure to update the third argument on line 10 in `app/db-connect.js`. That represent the actual name of the collection in database which Mongoose will reference with the `File` model.
- Run `node app/db-seed.js` to seed the database with sample data. This will create files in the database with folders and sub folders.
- In `app/main.js`, uncomment one `console.log` statement at a time and run `node app/main.js` to test the tasks in 2 one by one.

## Roadblocks

Initially, used the latest version of Mongoose (6.0.3) but faced a strange error while testing task 2.c -

```bash
MongoInvalidArgumentError: Method "collection.aggregate()" accepts at most two arguments
```

Solved it by downgrading Mongoose to 5.13.8.
