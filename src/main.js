import { createApp } from 'vue';
import App from './App.vue';
import { io } from 'socket.io-client';

const app = createApp(App);

// Initialize socket connection
const socket = io('http://localhost:2019');

// Add socket to global properties
app.config.globalProperties.$socket = socket;

app.mount('#app');
