const express = require('express');
const socketIo = require('socket.io');
const http = require('http');
const cors = require('cors'); // Cross-Origin Resource Sharing for handling requests

const app = express();
app.use(cors());
app.use(express.json());

const server = http.createServer(app);
const io = socketIo(server, {
    cors: {
        origin: '*', // accept sockets from any origin
    }
});

let counter = 0;
let timestamps = [];

app.get('/counter', (req, res) => {
    res.json({ counter });
});

app.post('/increment', (req, res) => {
    const { counter: newCounter } = req.body;
    if (typeof newCounter === 'number') {
        counter = newCounter;
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

app.post('/decrement', (req, res) => {
    const { counter: newCounter } = req.body;
    if (typeof newCounter === 'number') {
        counter = newCounter;
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


if (require.main === module) { //current module
    server.listen(2019, () => {
        console.log(`Server running on port 2019`);
    });
}

module.exports = app; 
