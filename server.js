const express = require('express');

const db = require('./config/connections');

const app = express();

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.use(require('./routes'));

db.once('open', () => {
    app.listen(3001, () => {
        console.log(`API server running on port 3001!`);
    });
});


