<template>
    <div class="admin-dashboard">
      <h1>Admin Dashboard</h1>
  
      <div v-if="users.length">
        <h2>Registered Users</h2>
        <table class="user-table">
          <thead>
            <tr>
              <th>Email</th>
              <th>UID</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="user in users" :key="user.uid">
              <td>{{ user.email }}</td>
              <td>{{ user.uid }}</td>
            </tr>
          </tbody>
        </table>
      </div>
  
      <p v-else>No users found.</p>
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted } from 'vue';
  import axios from 'axios'; // Assuming you're using Axios to call your backend
  
  const users = ref([]); // Store users data
  
  // Fetch registered users from backend
  const fetchUsers = async () => {
    try {
      const response = await axios.get('/api/users'); // Assuming this endpoint returns the users list
      users.value = response.data;
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };
  
  // Fetch users when the component is mounted
  onMounted(fetchUsers);
  </script>
  
  <style scoped>
  .admin-dashboard {
    padding: 20px;
  }
  
  .user-table {
    width: 100%;
    border-collapse: collapse;
  }
  
  .user-table th, .user-table td {
    padding: 10px;
    border: 1px solid #ddd;
    text-align: left;
  }
  
  .user-table th {
    background-color: #f4f4f4;
  }
  </style>
  