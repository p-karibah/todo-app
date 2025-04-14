const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());
app.use(express.static('public'));

let tasks = [];
let id = 1;

// Get all tasks
app.get('/tasks', (req, res) => {
    res.json(tasks);
});

// Add a task
app.post('/tasks', (req, res) => {
    const { title } = req.body;
    if (title) {
        const task = { id: id++, title };
        tasks.push(task);
        res.status(201).json(task);
    } else {
        res.status(400).json({ error: 'Title is required' });
    }
});

// Delete a task
app.delete('/tasks/:id', (req, res) => {
    const id = parseInt(req.params.id);
    tasks = tasks.filter(task => task.id !== id);
    res.status(204).send();
});

app.listen(3000, () => {
    console.log('Server running on http://localhost:3000');
});