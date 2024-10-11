// src/api/api.js
import axios from 'axios';

const apiClient = axios.create({
  baseURL: 'https://jsonplaceholder.typicode.com', // 这里是你的API baseURL
  headers: {
    'Content-Type': 'application/json'
  }
});

export default {
  // 获取帖子数据的API
  getPosts() {
    return apiClient.get('/posts');
  },
  // 获取用户数据的API
  getUsers() {
    return apiClient.get('/users');
  }
};
