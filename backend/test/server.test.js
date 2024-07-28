const request = require('supertest');
const app = require('../server');  // Adjust the path as necessary

describe('Counter API', () => {
    describe('GET /counter', () => {
        it('should return the current counter value', async () => {
            const response = await request(app).get('/counter');
            expect(response.status).toBe(200);
            expect(response.body).toHaveProperty('counter');
        });
    });

    describe('POST /increment', () => {
        it('should increment the counter value', async () => {
            const newCounter = 1;
            const response = await request(app).post('/increment').send({ counter: newCounter });
            expect(response.status).toBe(200);
            expect(response.body).toHaveProperty('counter', newCounter);
        });

        it('should increment the counter value 5 times', async () => {
            const initialResponse = await request(app).get('/counter');
            const initialCounter = initialResponse.body.counter;

            let newCounter = initialCounter;
            for (let i = 0; i < 5; i++) {
                newCounter += 1;
                const response = await request(app).post('/increment').send({ counter: newCounter });
                expect(response.status).toBe(200);
                expect(response.body).toHaveProperty('counter', newCounter);
            }

            const finalResponse = await request(app).get('/counter');
            expect(finalResponse.body.counter).toBe(initialCounter + 5);
        });
    });

    describe('POST /decrement', () => {
        it('should decrement the counter value', async () => {
            const newCounter = -1;
            const response = await request(app).post('/decrement').send({ counter: newCounter });
            expect(response.status).toBe(200);
            expect(response.body).toHaveProperty('counter', newCounter);
        });
    });

    describe('Increment and Decrement Test', () => {
        it('should increment the counter by 2 and then decrement by 2', async () => {
            const initialResponse = await request(app).get('/counter');
            const initialCounter = initialResponse.body.counter;

            // Increment by 2
            let newCounter = initialCounter + 2;
            let response = await request(app).post('/increment').send({ counter: newCounter });
            expect(response.status).toBe(200);
            expect(response.body).toHaveProperty('counter', newCounter);

            // Decrement by 2
            newCounter -= 2;
            response = await request(app).post('/decrement').send({ counter: newCounter });
            expect(response.status).toBe(200);
            expect(response.body).toHaveProperty('counter', newCounter);

            const finalResponse = await request(app).get('/counter');
            expect(finalResponse.body.counter).toBe(initialCounter);
        });
    });
});
