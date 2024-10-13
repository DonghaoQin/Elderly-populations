<template>
  <div class="email-form">
    <h2>Send Bulk Emails</h2>
    <form @submit.prevent="sendEmail">
      <div class="form-group">
        <label for="to">Recipient Emails (comma separated):</label>
        <input v-model="to" type="text" id="to" placeholder="email1@example.com, email2@example.com">
        <small class="form-text text-muted">Multiple addresses are separated by ","</small> <!-- 提示信息xx -->
      </div>
      <div class="form-group">
        <label for="subject">Subject:</label>
        <input v-model="subject" type="text" id="subject" placeholder="Subject">
      </div>
      <div class="form-group">
        <label for="message">Message:</label>
        <textarea v-model="message" id="message" placeholder="Message"></textarea>
      </div>
      <div class="form-group">
        <label for="attachment">Attachment:</label>
        <input type="file" @change="handleFileUpload">
      </div>
      <button type="submit">Send Email</button>
    </form>
    <div v-if="emailSent" class="success-message">
      Email sent successfully!
    </div>
    <div v-if="error" class="error-message">
      Failed to send email: {{ error }}
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      to: '',
      subject: '',
      message: '',
      emailSent: false,
      error: null,
    };
  },
  methods: {
    validateEmails(emails) {
      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // 简单的邮箱格式验证正则
      return emails.every(email => emailPattern.test(email.trim()));
    },
    async sendEmail() {
      const toArray = this.to.split(',').map(email => email.trim()); // 将输入的字符串分割成多个收件人

      if (!this.validateEmails(toArray)) { // 如果输入的邮件地址不符合格式
        this.error = 'One or more email addresses are invalid.';
        this.emailSent = false;
        return;
      }

      try {
        await axios.post('http://localhost:3000/send-email', {
          to: toArray, // 发送多个收件人
          subject: this.subject,
          text: this.message,
        });
        this.emailSent = true;
        this.error = null;
      } catch (error) {
        this.error = error.response ? error.response.data.error : 'Unknown error';
        this.emailSent = false;
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

.small-text {
  font-size: 0.8rem;
  color: #6c757d;
}

.success-message {
  color: green;
}
.error-message {
  color: red;
}
</style>
