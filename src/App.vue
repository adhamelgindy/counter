<script setup>
import { ref, onMounted } from 'vue';
import { io } from 'socket.io-client';

// Define a reactive reference for the counter
const counter = ref(0);

// Initialize socket connection
const socket = io('http://localhost:5000');

// Function to increment the counter
const incrementCounter = async () => {
  counter.value++;
  // console.log('counter', counter.value);

  try {
    await fetch('http://localhost:5000/increment', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ counter: counter.value }) // Serialize to JSON
    });
  } catch (e) {
    console.error('Error:', e)
  }
};

// Function to decrement the counter
const decrementCounter = async () => {
  counter.value--;
  console.log('counter', counter.value);
  try {
    await fetch('http://localhost:5000/decrement', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ counter: counter.value }) // Serialize to JSON
    });
  } catch (e) {
    console.error('Error:', e
    );
  }

};

// Function to fetch the current counter value
const fetchCounter = async () => {
  try {
    const response = await fetch('http://localhost:5000/counter');
    const data = await response.json();
    counter.value = data.counter;
  } catch (e) {
    console.error('Error:', e
    );
  }
};

// Handle socket events and initial fetch when component mounts
onMounted(() => {
  socket.on('counterUpdated', (data) => {
    counter.value = data.counter;
  });
  fetchCounter();
});
</script>

<template>
  <div id="app">
    <h1 class="counter">Count: {{ counter }}</h1>
    <button @click="decrementCounter" class="button">Decrement</button>
    <button @click="incrementCounter" class="button">Increment</button>
  </div>
</template>

<style scoped>
#app {
  text-align: center;
}

.button {
  padding: 10px 20px;
  margin: 5px;
  background-color: #007BFF;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

.counter {
  color: #0056b3;
}

.button:hover {
  background-color: #0056b3;
}
</style>
