const request = require('supertest');
const app = require('../server');

describe('Counter API', () => {

    it('GET /counter should return the current counter value', async () => {
        const response = await request(app).get('/counter');
        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty('counter');
    });

    it('POST /increment should increment the counter value 5 times', async () => {
        const initialResponse = await request(app).get('/counter');
        const initialCounter = initialResponse.body.counter;
        console.log('initialResponse.body.counter', initialResponse.body.counter);

        let newCounter = initialCounter;
        for (let i = 0; i < 5; i++) {
            newCounter += 1;
            const response = await request(app).post('/increment').send({ counter: newCounter });
            expect(response.status).toBe(200);
            console.log('newCounter', newCounter);
            expect(response.body).toHaveProperty('counter', newCounter);
        }

        const finalResponse = await request(app).get('/counter');
        expect(finalResponse.body.counter).toBe(5);
    });

    it('POST /increment should increment the counter value', async () => {
        const newCounter = 1;
        const response = await request(app).post('/increment').send({ counter: newCounter });
        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty('counter', newCounter);
    });

    it('POST /decrement should decrement the counter value', async () => {
        const newCounter = -1;
        const response = await request(app).post('/decrement').send({ counter: newCounter });
        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty('counter', newCounter);
    });

    it('should increment the counter by 2 and then decrement by 2', async () => {
        const initialResponse = await request(app).get('/counter');
        const initialCounter = initialResponse.body.counter; // -1

        let newCounter = initialCounter + 2; // 1
        let response = await request(app).post('/increment').send({ counter: newCounter });
        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty('counter', 1);

        newCounter -= 2; // -1
        response = await request(app).post('/decrement').send({ counter: newCounter });
        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty('counter', -1);

        const finalResponse = await request(app).get('/counter');
        expect(finalResponse.body.counter).toBe(-1);
    });
});
