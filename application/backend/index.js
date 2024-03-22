require('dotenv').config();
const express = require('express');
const { connectToDatabase } = require('./database');
const app = express(); 

app.use(express.json());

const port = process.env.PORT || 3000;

mongoose.connect(process.env.DB_URI, { useNewUrlParser: true, useUnifiedTopology: true });
mongoose.connection.on('open', () => console.log('Connected to MongoDB'));

app.get('/', (req, res) => {

res.send('Hello World!');
});

app.get('/users', (req, res) => {
    res.json({ message: 'Fetching users...'});
});

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
    connectToDatabase(); 
});