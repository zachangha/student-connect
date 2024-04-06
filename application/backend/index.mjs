import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import { connectToDatabase } from './database.mjs';
import User from './models/User.mjs';
import Course from './models/Course.mjs';
import ClassChatter from './models/ClassChatter.mjs';
import QAForum from './models/QAForum.mjs';


const app = express(); 
app.use(express.json());

const port = process.env.PORT || 3000;

app.get('/', (req, res) => {

res.send('Hello World!');
});

// Users endpoints

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

// Courses endpoints

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

// Class Chatter endpoints

app.get('/classchatter', async (req, res) => {
    try {
      const chatter = await ClassChatter.find();
      res.json(chatter);
    } catch (err) {
      res.status(500).send(err);
    }
});

app.post('/classchatter', async (req, res) => {
    const newChatter = new ClassChatter(req.body);
    try {
      const savedChatter = await newChatter.save();
      res.status(201).json(savedChatter);
    } catch (err) {
      res.status(400).send(err);
    }
  });
  
  app.get('/classchatter/:id', async (req, res) => {
    try {
      const chatter = await ClassChatter.findById(req.params.id);
      if (!chatter) res.status(404).send("Chatter not found");
      res.json(chatter);
    } catch (err) {
      res.status(500).send(err);
    }
  });
  
  app.put('/classchatter/:id', async (req, res) => {
    try {
      const updatedChatter = await ClassChatter.findByIdAndUpdate(req.params.id, req.body, { new: true });
      res.json(updatedChatter);
    } catch (err) {
      res.status(400).send(err);
    }
  });
  
  app.delete('/classchatter/:id', async (req, res) => {
    try {
      const deletedChatter = await ClassChatter.findByIdAndDelete(req.params.id);
      if (!deletedChatter) res.status(404).send("Chatter not found");
      res.status(200).send("Chatter deleted");
    } catch (err) {
      res.status(500).send(err);
    }
  });

  // Q&A Forum endpoints

app.get('/qaforum', async (req, res) => {
    try {
        const qaPosts = await QAForum.find();
        res.json(qaPosts);
    } catch (err) {
        res.status(500).send(err);
    }
});

app.post('/qaforum', async (req, res) => {
    const qaPost = new QAForum(req.body);
    try {
        const newQAPost = await qaPost.save();
        res.status(201).json(newQAPost);
    } catch (err) {
        res.status(400).send(err);
    }
});

app.get('/qaforum/:id', async (req, res) => {
    try {
        const qaPost = await QAForum.findById(req.params.id);
        if (!qaPost) {
            res.status(404).send('Q&A Forum post not found');
        } else {
            res.json(qaPost);
        }
    } catch (err) {
        res.status(500).send(err);
    }
});

app.put('/qaforum/:id', async (req, res) => {
    try {
        const updatedQAPost = await QAForum.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedQAPost) {
            res.status(404).send('Q&A Forum post not found');
        } else {
            res.json(updatedQAPost);
        }
    } catch (err) {
        res.status(400).send(err);
    }
});

app.delete('/qaforum/:id', async (req, res) => {
    try {
        const deletedQAPost = await QAForum.findByIdAndDelete(req.params.id);
        if (!deletedQAPost) {
            res.status(404).send('Q&A Forum post not found');
        } else {
            res.status(200).send('Q&A Forum post deleted');
        }
    } catch (err) {
        res.status(500).send(err);
    }
});


app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
    connectToDatabase(); 
});