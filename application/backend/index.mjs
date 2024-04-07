import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import { connectToDatabase } from './database.mjs';
import User from './models/User.mjs';
import Course from './models/Course.mjs';
import ClassChatter from './models/ClassChatter.mjs';
import QAForum from './models/QAForum.mjs';
import MessagingSystem from './models/MessagingSystem.mjs';
import InsightfulReactions from './models/InsightfulReactions.mjs';
import SecurityProtocol from './models/SecurityProtocol.mjs';


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

// Messaging System endpoints

app.get('/messaging', async (req, res) => {
    try {
        const messages = await MessagingSystem.find();
        res.json(messages);
    } catch (err) {
        res.status(500).send(err);
    }
});

app.post('/messaging', async (req, res) => {
    const message = new MessagingSystem(req.body);
    try {
        const newMessage = await message.save();
        res.status(201).json(newMessage);
    } catch (err) {
        res.status(400).send(err);
    }
});

app.get('/messaging/:id', async (req, res) => {
    try {
        const message = await MessagingSystem.findById(req.params.id);
        if (!message) {
            res.status(404).send('Message not found');
        } else {
            res.json(message);
        }
    } catch (err) {
        res.status(500).send(err);
    }
});

app.put('/messaging/:id', async (req, res) => {
    try {
        const updatedMessage = await MessagingSystem.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedMessage) {
            res.status(404).send('Message not found');
        } else {
            res.json(updatedMessage);
        }
    } catch (err) {
        res.status(400).send(err);
    }
});

app.delete('/messaging/:id', async (req, res) => {
    try {
        const deletedMessage = await MessagingSystem.findByIdAndDelete(req.params.id);
        if (!deletedMessage) {
            res.status(404).send('Message not found');
        } else {
            res.status(200).send('Message deleted');
        }
    } catch (err) {
        res.status(500).send(err);
    }
});

// Insightful Reactions endpoints
app.get('/insightfulreactions', async (req, res) => {
    try {
        const reactions = await InsightfulReactions.find();
        res.json(reactions);
    } catch (err) {
        res.status(500).send(err);
    }
});

app.post('/insightfulreactions', async (req, res) => {
    const reaction = new InsightfulReactions(req.body);
    try {
        const newReaction = await reaction.save();
        res.status(201).json(newReaction);
    } catch (err) {
        res.status(400).send(err);
    }
});

app.get('/insightfulreactions/:id', async (req, res) => {
    try {
        const reaction = await InsightfulReactions.findById(req.params.id);
        if (!reaction) res.status(404).send("Reaction not found");
        res.json(reaction);
    } catch (err) {
        res.status(500).send(err);
    }
});

app.put('/insightfulreactions/:id', async (req, res) => {
    try {
        const updatedReaction = await InsightfulReactions.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json(updatedReaction);
    } catch (err) {
        res.status(400).send(err);
    }
});

app.delete('/insightfulreactions/:id', async (req, res) => {
    try {
        const deletedReaction = await InsightfulReactions.findByIdAndDelete(req.params.id);
        if (!deletedReaction) res.status(404).send("Reaction not found");
        res.status(200).send("Reaction deleted");
    } catch (err) {
        res.status(500).send(err);
    }
});

// Security Protocol endpoints
app.get('/securityprotocol', async (req, res) => {
    try {
        const protocols = await SecurityProtocol.find();
        res.json(protocols);
    } catch (err) {
        res.status(500).send(err);
    }
});

app.post('/securityprotocol', async (req, res) => {
    const protocol = new SecurityProtocol(req.body);
    try {
        const newProtocol = await protocol.save();
        res.status(201).json(newProtocol);
    } catch (err) {
        res.status(400).send(err);
    }
});

app.get('/securityprotocol/:id', async (req, res) => {
    try {
        const protocol = await SecurityProtocol.findById(req.params.id);
        if (!protocol) res.status(404).send("Protocol not found");
        res.json(protocol);
    } catch (err) {
        res.status(500).send(err);
    }
});

app.put('/securityprotocol/:id', async (req, res) => {
    try {
        const updatedProtocol = await SecurityProtocol.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json(updatedProtocol);
    } catch (err) {
        res.status(400).send(err);
    }
});

app.delete('/securityprotocol/:id', async (req, res) => {
    try {
        const deletedProtocol = await SecurityProtocol.findByIdAndDelete(req.params.id);
        if (!deletedProtocol) res.status(404).send("Protocol not found");
        res.status(200).send("Protocol deleted");
    } catch (err) {
        res.status(500).send(err);
    }
});



app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
    connectToDatabase(); 
});