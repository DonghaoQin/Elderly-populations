<template>
    <div class="genai-container">
      <h2>Ask Gemini AI</h2>
      <textarea v-model="userInput" placeholder="Enter your question or message"></textarea>
      <button @click="generateResponse" :disabled="loading">
        {{ loading ? 'Processing...' : 'Ask Gemini AI' }}
      </button>
  
      <div v-if="response" class="response">
        <h3>Gemini AI's Response:</h3>
        <p>{{ response }}</p>
      </div>
  
      <div v-if="error" class="error">
        <p>{{ error }}</p>
      </div>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  
  export default {
    data() {
      return {
        userInput: '',
        response: null,
        loading: false,
        error: null,
      };
    },
    methods: {
  async generateResponse() {
    if (!this.userInput) {
      this.error = 'Please enter a question or message!';
      return;
    }
    this.loading = true;
    this.error = null;
    this.response = null;

    try {
      // Replace with the correct API URL and your actual API key
      const apiUrl = 'https://api.openai.com/v1/chat/completions';
      const apiKey = ''; // Add your API key here

      const requestBody = {
        model: 'gpt-3.5-turbo', // Use 'gpt-4' if you have access
        messages: [
          {
            role: 'user',
            content: this.userInput,
          },
        ],
        max_tokens: 150,
        temperature: 0.7,
      };

      const result = await axios.post(apiUrl, requestBody, {
        headers: {
          Authorization: `Bearer ${apiKey}`,
        },
      });

      this.response = result.data.choices[0].message.content.trim();
    } catch (error) {
      this.error = 'Something went wrong! Please try again later.';
      console.error('Error during API request:', error);
    } finally {
      this.loading = false;
    }
  },
}

  };
  </script>
  
  <style scoped>
  .genai-container {
    max-width: 600px;
    margin: 0 auto;
    padding: 20px;
    text-align: center;
  }
  
  textarea {
    width: 100%;
    height: 100px;
    padding: 10px;
    margin-bottom: 20px;
    border: 1px solid #ccc;
    border-radius: 5px;
  }
  
  button {
    padding: 10px 20px;
    background-color: #0074D9;
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
  }
  
  button:disabled {
    background-color: #cccccc;
  }
  
  .response {
    margin-top: 20px;
    font-size: 18px;
  }
  
  .error {
    color: red;
    margin-top: 20px;
  }
  </style>
  