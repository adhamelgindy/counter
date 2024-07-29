<script setup>
import { ref, onMounted } from 'vue';

const counter = ref(0);

const fetchCounter = async () => {
  try {
    const response = await fetch('http://localhost:2019/counter');
    const data = await response.json();
    counter.value = data.counter;
  } catch (e) {
    console.error('Error:', e
    );
  }
};

onMounted(() => {
  fetchCounter();
});

const incrementCounter = async () => {
  counter.value++;

  try {
    await fetch('http://localhost:2019/increment', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ counter: counter.value })
    });
  } catch (e) {
    console.error('Error:', e)
  }
};

const decrementCounter = async () => {
  counter.value--;

  try {
    await fetch('http://localhost:2019/decrement', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ counter: counter.value })
    });
  } catch (e) {
    console.error('Error:', e
    );
  }

};

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
