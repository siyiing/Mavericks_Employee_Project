# Mavericks: Employee Project

- `npx create-react-app . --template typescript`
- `npm install @mui/material @emotion/react @emotion/styled`
- `npm i react-redux @reactjs/toolkit`
- `npm redux-thunk @types/redux-thunk`
- `npm install @mui/icons-material @mui/material @emotion/styled @emotion/react`
- `npm i axois`
- `npm i react-router-dom`


IN BACKEND, FOR BACKEND 
- `npm install express-session`
- `npm install connect-session-sequelize`

In app, add: 
const session = require('expression-session');
const postgresStore = require('connect-session-sequelize')
... 
const postgresDBStore = postgresStore(session) // is a class object 
...
const sessionStore = new postgresDBStore({
    uri: 'localhost:27017',
    databaseName: 'sequelize_employee_db', 
    collections: 'sessions'
}) 


app.use(session(
    {
        secret: 'apple-banana-papaya',
        resave: false,  // to say session is only updated in the db if the data change 
        saveUninitialized: false,
        store: sessionStore 
    }
));  // execute as a function here




