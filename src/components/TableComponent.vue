<template>
    <div>
      <!-- Table 1 -->
      <h2>Table 1: User Data</h2>
      <div class="search-bar">
        <span class="p-input-icon-left">
          <i class="pi pi-search"></i>
          <input type="text" pInputText placeholder="Search by ID or Name" v-model="userFilter" />
        </span>
      </div>
      <DataTable :value="filteredUsers" paginator :rows="10">
        <Column field="id" header="ID" sortable></Column>
        <Column field="name" header="Name" sortable></Column>
        <Column field="email" header="Email"></Column>
      </DataTable>
  
      <!-- Table 2 -->
      <h2>Table 2: Product Data</h2>
      <div class="search-bar">
        <span class="p-input-icon-left">
          <i class="pi pi-search"></i>
          <input type="text" pInputText placeholder="Search by Product ID or Name" v-model="productFilter" />
        </span>
      </div>
      <DataTable :value="filteredProducts" paginator :rows="10">
        <Column field="id" header="Product ID" sortable></Column>
        <Column field="name" header="Product Name" sortable></Column>
        <Column field="price" header="Price" sortable></Column>
      </DataTable>
    </div>
  </template>
  
  <script setup>
  import { ref, computed } from 'vue';
  import DataTable from 'primevue/datatable';
  import Column from 'primevue/column';
  import InputText from 'primevue/inputtext';
  
  // 30 rows of User Data
  const users = ref([
    { id: 1, name: 'John Doe', email: 'john@example.com' },
    { id: 2, name: 'Jane Roe', email: 'jane@example.com' },
    { id: 3, name: 'Paul Smith', email: 'paul@example.com' },
    { id: 4, name: 'Sara Connor', email: 'sara@example.com' },
    { id: 5, name: 'Mark Johnson', email: 'mark@example.com' },
    { id: 6, name: 'Anna Bell', email: 'anna@example.com' },
    { id: 7, name: 'David Lee', email: 'david@example.com' },
    { id: 8, name: 'Emily Green', email: 'emily@example.com' },
    { id: 9, name: 'Michael Brown', email: 'michael@example.com' },
    { id: 10, name: 'Jessica White', email: 'jessica@example.com' },
    { id: 11, name: 'Samuel King', email: 'samuel@example.com' },
    { id: 12, name: 'Grace Wilson', email: 'grace@example.com' },
    { id: 13, name: 'Daniel Carter', email: 'daniel@example.com' },
    { id: 14, name: 'Sophia Black', email: 'sophia@example.com' },
    { id: 15, name: 'Olivia Davis', email: 'olivia@example.com' },
    { id: 16, name: 'Mason Hall', email: 'mason@example.com' },
    { id: 17, name: 'Ethan Young', email: 'ethan@example.com' },
    { id: 18, name: 'Lucas Martinez', email: 'lucas@example.com' },
    { id: 19, name: 'Benjamin Lewis', email: 'benjamin@example.com' },
    { id: 20, name: 'Ava Walker', email: 'ava@example.com' },
    { id: 21, name: 'Amelia Moore', email: 'amelia@example.com' },
    { id: 22, name: 'Ella Thompson', email: 'ella@example.com' },
    { id: 23, name: 'James Scott', email: 'james@example.com' },
    { id: 24, name: 'Madison Adams', email: 'madison@example.com' },
    { id: 25, name: 'Liam Baker', email: 'liam@example.com' },
    { id: 26, name: 'Zoe Parker', email: 'zoe@example.com' },
    { id: 27, name: 'William Turner', email: 'william@example.com' },
    { id: 28, name: 'Alexander Hill', email: 'alexander@example.com' },
    { id: 29, name: 'Charlotte Martin', email: 'charlotte@example.com' },
    { id: 30, name: 'Tony Stark', email: 'tony@example.com' }
  ]);
  
  // 30 rows of Product Data
  const products = ref([
    { id: 1, name: 'Laptop', price: 1000 },
    { id: 2, name: 'Smartphone', price: 700 },
    { id: 3, name: 'Tablet', price: 400 },
    { id: 4, name: 'Headphones', price: 100 },
    { id: 5, name: 'Keyboard', price: 50 },
    { id: 6, name: 'Monitor', price: 200 },
    { id: 7, name: 'Mouse', price: 30 },
    { id: 8, name: 'Speaker', price: 120 },
    { id: 9, name: 'Webcam', price: 80 },
    { id: 10, name: 'Charger', price: 25 },
    { id: 11, name: 'Camera', price: 500 },
    { id: 12, name: 'Smartwatch', price: 250 },
    { id: 13, name: 'Drone', price: 900 },
    { id: 14, name: 'Fitness Tracker', price: 150 },
    { id: 15, name: 'External Hard Drive', price: 100 },
    { id: 16, name: 'Flash Drive', price: 20 },
    { id: 17, name: 'Router', price: 60 },
    { id: 18, name: 'Printer', price: 150 },
    { id: 19, name: 'Scanner', price: 100 },
    { id: 20, name: 'USB Cable', price: 10 },
    { id: 21, name: 'Portable Speaker', price: 80 },
    { id: 22, name: 'Gaming Console', price: 400 },
    { id: 23, name: 'TV', price: 600 },
    { id: 24, name: 'Blu-ray Player', price: 100 },
    { id: 25, name: 'Projector', price: 300 },
    { id: 26, name: 'Soundbar', price: 200 },
    { id: 27, name: 'Smart Light', price: 30 },
    { id: 28, name: 'Smart Lock', price: 150 },
    { id: 29, name: 'Smart Thermostat', price: 250 },
    { id: 30, name: 'VR Headset', price: 400 }
  ]);
  
// Individual filters
const userFilter = ref('');
const productFilter = ref('');

// Computed filtered lists
const filteredUsers = computed(() => {
  return users.value.filter(user => {
    return (
      user.id.toString().includes(userFilter.value) ||
      user.name.toLowerCase().includes(userFilter.value.toLowerCase())
    );
  });
});

const filteredProducts = computed(() => {
  return products.value.filter(product => {
    return (
      product.id.toString().includes(productFilter.value) ||
      product.name.toLowerCase().includes(productFilter.value.toLowerCase())
    );
  });
});
</script>

<style scoped>
.search-bar {
  margin: 20px 0;
}
</style>