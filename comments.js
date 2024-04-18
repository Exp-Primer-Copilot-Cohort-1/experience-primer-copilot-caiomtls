// Create web server
const express = require('express');
const app = express();
const PORT = 3000;
const bodyParser = require('body-parser');
const comments = require('./comments');

app.use(bodyParser.json());

// Get all comments
app.get('/comments', (req, res) => {
    res.json(comments);
});

// Get comment by id
app.get('/comments/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const comment = comments.find((comment) => comment.id === id);
    if (comment) {
        res.json(comment);
    } else {
        res.status(404).json({ message: 'Comment not found' });
    }
});

// Create a new comment
app.post('/comments', (req, res) => {
    const comment = req.body;
    comments.push(comment);
    res.status(201).json(comment);
});

// Update comment by id
app.put('/comments/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const commentIndex = comments.findIndex((comment) => comment.id === id);
    if (commentIndex !== -1) {
        const comment = { ...comments[commentIndex], ...req.body };
        comments[commentIndex] = comment;
        res.json(comment);
    } else {
        res.status(404).json({ message: 'Comment not found' });
    }
});

// Delete comment by id
app.delete('/comments/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const commentIndex = comments.findIndex((comment) => comment.id === id);
    if (commentIndex !== -1) {
        comments.splice(commentIndex, 1);
        res.status(204).send();
    } else {
        res.status(404).json({ message: 'Comment not found' });
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

// Path: comments.js
// Create comments
let comments = [
    {
        id: 1,
        username: 'Alice',
        comment: 'Hello World',
    },
    {
        id: 2,
        username: 'Bob',
        comment: 'Hi there',
    },
    {
        id: 3,
        username: 'Charlie',
        comment: 'How are you?',
    },]