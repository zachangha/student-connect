import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import { connectToDatabase } from './database.mjs';
import User from './models/User.mjs';

const app = express(); 
app.use(express.json());

const port = process.env.PORT || 3000;

app.get('/', (req, res) => {

res.send('Hello World!');
});

app.get('/users', async (req, res) => {
    try {
        const users = await User.find();
        res.json(users);
    } catch (err) {
        res.status(500).send(err);    
    }
});

app.post('/users', async (req, res) => {
    const user = new User(req.body);
    try{
        const newUser = await user.save();
        res.status(201).json(newUser);
    } catch (err) {
        res.status(400).send(err);
    }
});

app.get('/users/:id', async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if (!user) res.status(404).send("No user found");
        res.json(user);
    } catch (err) {
        res.status(500).send(err);
    }
    
});

app.put('/users/:id', async (req, res) => {
    try {
        const updatedUser = await User.findByIdAndUpdate(req.params.id, req.body, { new: true});
        res.json(updatedUser);
    } catch (err) {
        res.status(400).send(err);
    }
});

app.delete('/users/:id', async (req, res) => {
    try {
        const deletedUser = await User.findByIdAndDelete(req.params.id);
        if (!deletedUser) res.status(404).send("No user found");
        res.status(200).send("User deleted");
    } catch (err) {
        res.status(500).send(err)
    }
})

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
    connectToDatabase(); 
});