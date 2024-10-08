<template>
    <div class="email-form">
      <h2>Send an Email</h2>
      <form @submit.prevent="sendEmail">
        <div class="form-group">
          <label for="to">Recipient Email:</label>
          <input v-model="emailData.to" type="email" id="to" required />
        </div>
  
        
        <div class="form-group">
          <label for="subject">Subject:</label>
          <input v-model="emailData.subject" type="text" id="subject" required />
        </div>
  
        <div class="form-group">
          <label for="message">Message:</label>
          <textarea v-model="emailData.text" id="message" required></textarea>
        </div>
  
        <div class="form-group">
          <label for="attachment">Attachment:</label>
          <input type="file" @change="onFileChange" />
        </div>
  
        <button type="submit">Send Email</button>
      </form>
  
      <div v-if="statusMessage" class="status-message">
        {{ statusMessage }}
      </div>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  
  export default {
    data() {
      return {
        emailData: {
          to: '',
          subject: '',
          text: '',
        },
        attachment: null,
        statusMessage: '',
      };
    },
    methods: {
      onFileChange(e) {
        this.attachment = e.target.files[0];
      },
      async sendEmail() {
        try {
          const formData = new FormData();
          formData.append('to', this.emailData.to);
          formData.append('subject', this.emailData.subject);
          formData.append('text', this.emailData.text);
          if (this.attachment) {
            formData.append('attachment', this.attachment);
          }
  
          const response = await axios.post('http://localhost:3000/send-email', formData, {
            headers: {
              'Content-Type': 'multipart/form-data',
            },
          });
          this.statusMessage = response.data.message;
        } catch (error) {
          this.statusMessage = 'Failed to send email.';
        }
      },
    },
  };
  </script>
  
  <style scoped>
  .email-form {
    max-width: 600px;
    margin: 0 auto;
    padding: 20px;
    background-color: #f9f9f9;
    border-radius: 10px;
  }
  
  .form-group {
    margin-bottom: 20px;
  }
  
  label {
    display: block;
    margin-bottom: 8px;
    font-weight: bold;
  }
  
  input, textarea {
    width: 100%;
    padding: 10px;
    border-radius: 5px;
    border: 1px solid #ddd;
  }
  
  button {
    padding: 10px 20px;
    background-color: #4caf50;
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
  }
  
  .status-message {
    margin-top: 20px;
    font-size: 1.2rem;
    color: #4caf50;
  }
  </style>
  