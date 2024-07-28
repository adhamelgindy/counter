const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json()); // Middleware to parse JSON bodies

const server = http.createServer(app);
const io = socketIo(server, {
    cors: {
        origin: '*', // ????????????????????
    }
});

let counter = 0;
let timestamps = [];

// Endpoint to get the current counter value
app.get('/counter', (req, res) => {
    res.json({ counter });
});

// Endpoint to increment the counter
app.post('/increment', (req, res) => {
    const { counter: newCounter } = req.body; // Destructure counter from the body
    if (typeof newCounter === 'number') {
        counter = newCounter; // Update the server-side counter with the new value from the request
        timestamps.push(new Date().toISOString());
        if (timestamps.length > 5) {
            timestamps.shift();
        }
        io.emit('counterUpdated', { counter }); // ?????????????????
        res.json({ counter });
    } else {
        res.status(400).json({ error: 'Invalid value' });
    }
});

// Endpoint to decrement the counter
app.post('/decrement', (req, res) => {
    const { counter: newCounter } = req.body; // Destructure counter from the body
    if (typeof newCounter === 'number') {
        counter = newCounter; // Update the server-side counter with the new value from the request
        timestamps.push(new Date().toISOString());
        if (timestamps.length > 5) {
            timestamps.shift();
        }
        io.emit('counterUpdated', { counter });
        res.json({ counter });
    } else {
        res.status(400).json({ error: 'Invalid value' });
    }
});

const PORT = process.env.PORT || 5000;
if (require.main === module) {
    server.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
    });
}

module.exports = app;  // Export app for testing
