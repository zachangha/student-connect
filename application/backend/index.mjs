import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import { connectToDatabase } from './database.mjs';
import User from './models/User.mjs';
import Course from './models/Course.mjs';


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

app.get('/courses', async (req, res) => {
    try {
        const courses = await Course.find();
        res.json(courses);
    } catch (err) {
        res.status(500).send(err);
    }
});

app.post('/courses', async (req, res) => {
    const course = new Course(req.body);
    try {
        const newCourse = await course.save();
        res.status(201).json(newCourse);
    } catch (err) {
        res.status(400).send(err);
    }

});

app.get('/courses/:id', async (req, res) => {
    try {
        const course = await Course.findById(req.params.id);
        if (!course) res.status(404).send("No course found");
        res.json(course);
    } catch (err) {
        res.status(500).send(err)

    }

});

app.put('/courses/:id', async (req, res) => {
    try {
        const updatedCourse = await Course.findByIdAndUpdate(req.params.id, req.body, {new: true});
        res.json(updatedCourse);
    } catch (err) {
        res.status(400).send(err);
    }
});

app.delete('/courses/:id', async (req, res) => {
    try {
        const deletedCourse = await Course.findByIdAndDelete(req.params.id);
        if (!deletedCourse) res.status(404).send("No course found");
        res.status(200).send("Course deleted");
    } catch (err) {
        res.status(500).send(err);
    }
});

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
    connectToDatabase(); 
});