<script setup>
import { ref, onMounted, computed } from 'vue';
import { collection, getDocs, doc, deleteDoc, addDoc } from "firebase/firestore";
import { db } from '../main';

// 定义表单输入的变量
const doctorName = ref('');
const doctorID = ref('');
const doctorEmail = ref('');
const message = ref('');
const error = ref('');  // 错误信息
const doctors = ref([]);  // 存储医生数据
const globalFilter = ref('');  // 搜索框的绑定变量

// 获取所有医生信息
const fetchDoctors = async () => {
  try {
    const querySnapshot = await getDocs(collection(db, "doctors"));
    doctors.value = querySnapshot.docs.map(doc => ({
      firestoreId: doc.id,  // Firestore 自动生成的文档 ID
      ...doc.data(),
    }));

    // 按照 ID 进行排序
    doctors.value.sort((a, b) => parseInt(a.id) - parseInt(b.id));
    console.log("Doctors fetched and sorted by ID: ", doctors.value);
  } catch (e) {
    console.error("Error fetching doctors:", e);
  }
};

// 添加医生到 Firestore
const addDoctor = async () => {
  // 验证输入

  // 1. 检查 ID 是否为数字
  if (isNaN(doctorID.value)) {
    error.value = 'The doctor ID must be a valid number.';
    return;
  }

  // 2. 验证 ID 是否重复
  if (doctors.value.some(doctor => doctor.id === doctorID.value)) {
    error.value = 'The doctor ID already exists. Please use a different ID.';
    return;
  }

  // 3. 验证姓名格式 (只能包含字母和空格)
  const nameRegex = /^[A-Za-z\s]+$/;
  if (!nameRegex.test(doctorName.value)) {
    error.value = 'Invalid name format. Please enter a valid name (letters and spaces only).';
    return;
  }

  // 4. 验证邮箱格式
  const emailRegex = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;
  if (!emailRegex.test(doctorEmail.value)) {
    error.value = 'Invalid email format. Please enter a valid email.';
    return;
  }

  // 清除错误消息
  error.value = '';

  try {
    await addDoc(collection(db, "doctors"), {
      name: doctorName.value,
      id: doctorID.value,
      email: doctorEmail.value,
    });
    message.value = 'Doctor added successfully!';
    doctorName.value = '';
    doctorID.value = '';
    doctorEmail.value = '';
    fetchDoctors();  // 重新获取医生信息
  } catch (e) {
    console.error("Error adding doctor:", e);
    message.value = 'Error adding doctor: ' + e.message;
  }
};

// 删除医生
const deleteDoctor = async (firestoreId) => {
  try {
    await deleteDoc(doc(db, "doctors", firestoreId));
    message.value = `Doctor with Firestore ID ${firestoreId} deleted successfully!`;
    fetchDoctors();  // 删除后重新获取医生信息并排序
  } catch (e) {
    console.error(`Error deleting doctor with Firestore ID: ${firestoreId}`, e);
    message.value = `Error deleting doctor: ${e.message}`;
  }
};

// 搜索功能，过滤医生信息
const filteredDoctors = computed(() => {
  if (!globalFilter.value) {
    return doctors.value;
  }
  return doctors.value.filter((doctor) =>
    doctor.name.toLowerCase().includes(globalFilter.value.toLowerCase()) ||
    doctor.email.toLowerCase().includes(globalFilter.value.toLowerCase())
  );
});

// 在组件挂载时获取医生数据
onMounted(fetchDoctors);
</script>

<template>
  <div class="admin-dashboard">
    <h1>Admin Dashboard</h1>

    <!-- 添加医生的功能 -->
    <div class="add-doctor">
      <h2>Add Doctor</h2>
      <form @submit.prevent="addDoctor">
        <div class="form-group">
          <label for="doctorName">Doctor Name:</label>
          <input type="text" id="doctorName" v-model="doctorName" required />
        </div>

        <div class="form-group">
          <label for="doctorID">Doctor ID:</label>
          <input type="text" id="doctorID" v-model="doctorID" required />
        </div>

        <div class="form-group">
          <label for="doctorEmail">Doctor Email:</label>
          <input type="email" id="doctorEmail" v-model="doctorEmail" required />
        </div>

        <button type="submit">Add Doctor</button>
      </form>

      <!-- 错误消息显示 -->
      <p v-if="error" class="error">{{ error }}</p>
      <p v-if="message">{{ message }}</p>
    </div>

    <!-- 医生列表，带删除功能 -->
    <div class="doctor-table">
      <h2>Doctors List</h2>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>ID</th>
            <th>Email</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="doctor in filteredDoctors" :key="doctor.firestoreId">
            <td>{{ doctor.name }}</td>
            <td>{{ doctor.id }}</td>
            <td>{{ doctor.email }}</td>
            <td>
              <!-- 删除按钮 -->
              <button @click="deleteDoctor(doctor.firestoreId)">Delete</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<style scoped>
.admin-dashboard {
  padding: 20px;
}

.add-doctor {
  margin-top: 20px;
}

.form-group {
  margin-bottom: 15px;
}

.doctor-table {
  margin-top: 20px;
  border: 1px solid #ddd;  /* 添加边框 */
  padding: 20px;  /* 增加内边距 */
  border-radius: 8px;  /* 圆角边框 */
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);  /* 添加阴影 */
}

.doctor-table table {
  width: 100%;
  border-collapse: collapse;
}

.doctor-table th, .doctor-table td {
  padding: 10px;
  border: 1px solid #ddd;
  text-align: left;
}

button {
  padding: 8px 12px;
  background-color: #ff4c4c;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

button:hover {
  background-color: #ff1c1c;
}

.error {
  color: red;
}

p {
  font-size: 14px;
}
</style>
