import { render, fireEvent } from '@testing-library/vue';
import '@testing-library/jest-dom';
import App from '../src/App.vue';

describe('App', () => {
    it('Has counter and buttons', async () => {
        const { getByText, findByText } = render(App);

        expect(await findByText('Count: 0')).toBeInTheDocument();
        expect(getByText('Increment')).toBeInTheDocument();
        expect(getByText('Decrement')).toBeInTheDocument();
    });

    it('increments the counter by 1', async () => {
        const { getByText, findByText } = render(App);
        const incrementButton = getByText('Increment');

        await fireEvent.click(incrementButton);
        expect(await findByText('Count: 1')).toBeInTheDocument();
    });

    it('decrements the counter by 1', async () => {
        const { getByText, findByText } = render(App);
        const decrementButton = getByText('Decrement');

        await fireEvent.click(decrementButton);
        expect(await findByText('Count: -1')).toBeInTheDocument();
    });

    it('increments the counter by 5', async () => {
        const { getByText, findByText } = render(App);
        const incrementButton = getByText('Increment');

        for (let i = 0; i < 5; i++) {
            await fireEvent.click(incrementButton);
        }
        expect(await findByText('Count: 5')).toBeInTheDocument();
    });

    it('decrements the counter by 3', async () => {
        const { getByText, findByText } = render(App);
        const decrementButton = getByText('Decrement');

        for (let i = 0; i < 3; i++) {
            await fireEvent.click(decrementButton);
        }
        expect(await findByText('Count: -3')).toBeInTheDocument();
    });

    it('increments the counter by 2 and then decrements by 2', async () => {
        const { getByText, findByText } = render(App);
        const incrementButton = getByText('Increment');
        const decrementButton = getByText('Decrement');

        for (let i = 0; i < 2; i++) {
            await fireEvent.click(incrementButton);
        }
        for (let i = 0; i < 2; i++) {
            await fireEvent.click(decrementButton);
        }
        expect(await findByText('Count: 0')).toBeInTheDocument();
    });
});
