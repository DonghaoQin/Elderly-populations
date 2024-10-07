<template>
  <div class="service-page-container">
    <div v-if="!isAuthenticated">
      <p>You need to log in</p>
      <button @click="goToLogin" class="btn btn-primary">Go to Login</button>
    </div>
    <div v-else>
      <button @click="goBack" class="btn btn-secondary">Back to Homepage</button>
      <p>This is your service</p>
    
      <!-- Add the information cards here -->
      <div class="info-cards">
        <div class="card">
          <div class="card-header">Clinical trial</div>
          <div class="card-body">
            <h3>A trial comparing electronic cigarettes with nicotine replacement therapy to stop smoking (TEC)</h3>
            <p>The trial compared electronic cigarettes with nicotine replacement therapy. To determine if they were as helpful or more helpful to stop smoking.</p>
            <p><strong>Status:</strong> Results</p>
            <p><strong>Cancer type(s):</strong> All cancer types</p>
            <p><strong>Locations:</strong> East Sussex, Leicester, London</p>
          </div>
        </div>
        <div class="card">
          <div class="card-header">Cancer information</div>
          <div class="card-body">
            <h3>NHS treatment for people from overseas </h3>
            <p>Some people from overseas might be able to have National Health Service treatment in certain situations.</p>
          </div>
        </div>
        <div class="card">
          <div class="card-header">Cancer information</div>
          <div class="card-body">
            <h3>Where do I start looking for mental health support? </h3>
            <p>An information and support service is often a good place to start when you’re newly diagnosed and struggling with your mental health.</p>
          </div>
        </div>
        <div class="card">
          <div class="card-header">Terms and conditions</div>
          <div class="card-body">
            <h3>Legal Guidance Service</h3>
            <p>Your use of our Legal Guidance Service (the “Services”) is governed by the following Terms and Conditions: • You must be aged 18 or over to use the Services.</p>
          </div>
        </div>
        <div class="card">
          <div class="card-header">Terms and conditions</div>
          <div class="card-body">
            <h3 class="highlight">Free Will Service - solicitors</h3>
            <p>Your use of our Free Will Service is governed by the following Terms and Conditions. You must be aged 18 or over to use the Service. There is no obligation...</p>
          </div>
        </div>
        <div class="card">
          <div class="card-header">Cancer information</div>
          <div class="card-body">
            <h3>Wigs | Coping with health</h3>
            <p>Read about the different types of wigs, whether you can get one through your health service, and tips on how to wear them.</p>
          </div>
        </div>
        <div class="card">
          <div class="card-header">Get involved</div>
          <div class="card-body">
            <h3>Our Free Will Service in the South East</h3>
            <p>Our Free Will Service allows anyone 18+ to easily write or update a simple Will for free. Most people who use the service leave a gift to Cancer Research UK...</p>
          </div>
        </div>
        <div class="card">
          <div class="card-header">Get involved</div>
          <div class="card-body">
            <h3>Our Free Will Service in East Anglia</h3>
            <p>Our Free Will Service allows anyone 18+ to easily write or update a simple Will for free. Most people who use the service leave a gift to Cancer Research UK...</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>



<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();
const isAuthenticated = ref(false);

const checkAuthentication = () => {
  const user = localStorage.getItem('authenticatedUser');
  isAuthenticated.value = !!user; // Converts the result to a boolean
};

const goToLogin = () => {
  router.push('/login');
};

const goBack = () => {
  router.push('/');
};

checkAuthentication();
</script>

<style scoped>
.service-page-container {
  text-align: center;
  margin-top: 50px;
}

.btn {
  margin: 10px;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

.btn-primary {
  background-color: #007bff;
  color: white;
}

.btn-primary:hover {
  background-color: #0056b3;
}

.btn-secondary {
  background-color: #6c757d;
  color: white;
}

.btn-secondary:hover {
  background-color: #5a6268;
}

.info-cards {
  margin-top: 20px;
  display: grid;
  gap: 20px;
  grid-template-columns: 1fr;
  justify-items: center;
}

.card {
  border: 1px solid #ddd;
  border-radius: 8px;
  max-width: 600px;
  padding: 20px;
  box-shadow: 2px 2px 10px rgba(0, 0, 0, 0.1);
}

.card-header {
  background-color: #dde1e6;
  color: #333;
  font-weight: bold;
  padding: 5px 10px;
  border-radius: 8px 8px 0 0;
  margin-bottom: 15px;
}

.card-body h3 {
  font-size: 1.2rem;
  margin-bottom: 10px;
}

.card-body p {
  font-size: 0.9rem;
  color: #555;
}

.highlight {
  color: #d3396d; /* Matches the pink text style in the screenshot */
}
</style>
