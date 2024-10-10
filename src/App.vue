<template>
  <div id="app">
    <header>
      <nav>
        <ul>
          <li><router-link to="/">Home</router-link></li>
          <li v-if="!user"><router-link to="/login">Login</router-link></li>
          <li v-if="user"><router-link to="/service">Service</router-link></li>
          <li v-if="user"><button @click="logout">Logout</button></li>

          <!-- Export Buttons -->
          <li style="float:right; margin-left: 20px;">
            Export as:
            <button @click="exportAsCSV">CSV</button>
            <button @click="exportAsPDF">PDF</button>
            <button @click="exportAsPNG">PNG</button>
          </li>
        </ul>
      </nav>
    </header>
    <router-view />
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";
import { useRouter } from 'vue-router';
import html2canvas from 'html2canvas'; // For PNG export
import jsPDF from 'jspdf'; // For PDF export

const auth = getAuth();
const router = useRouter();
const user = ref(null);

// Firebase authentication
onMounted(() => {
  onAuthStateChanged(auth, (currentUser) => {
    user.value = currentUser;
  });
});

// logout
const logout = async () => {
  await signOut(auth);
  user.value = null;
  router.push('/login'); 
};

// Export as CSV
const exportAsCSV = () => {
  const content = document.querySelector('main').innerText; // Export specific content
  const csvContent = 'data:text/csv;charset=utf-8,' + encodeURIComponent(content);
  const link = document.createElement("a");
  link.setAttribute("href", csvContent);
  link.setAttribute("download", "export.csv");
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link); // Clean up
};

// Export as PDF
const exportAsPDF = () => {
  const doc = new jsPDF();
  const content = document.querySelector('main').innerText; // Export specific content
  doc.text(content, 10, 10);
  doc.save('export.pdf');
};

// Export as PNG
const exportAsPNG = () => {
  html2canvas(document.querySelector('main')).then((canvas) => {
    const link = document.createElement('a');
    link.href = canvas.toDataURL();
    link.download = 'export.png';
    link.click();
  });
};
</script>

<style scoped>
nav ul {
  list-style-type: none;
  padding: 0;
}

nav ul li {
  display: inline;
  margin-right: 20px;
}

nav ul li a {
  text-decoration: none;
  color: #333;
}

nav ul li a:hover {
  text-decoration: underline;
}

header {
  background-color: #f0f2f5;
  padding: 10px;
  margin-bottom: 20px;
}

button {
  background-color: #f4f4f4;
  border: 1px solid #ccc;
  padding: 5px 10px;
  margin-left: 5px;
  cursor: pointer;
}

button:hover {
  background-color: #e0e0e0;
}

/* 响应式样式 */
@media (max-width: 600px) {
  nav ul li {
    display: block;
    margin-bottom: 10px;
  }
}
</style>
