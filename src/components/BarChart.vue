<template>
    <Bar :data="chartData" :options="chartOptions" />
  </template>
  
  <script setup>
  import { Bar } from 'vue-chartjs';
  import { computed } from 'vue';
  
  const props = defineProps({
    chartData: Object
  });
  
  const chartOptions = computed(() => ({
    responsive: true,
    scales: {
      y: {
        beginAtZero: true
      }
    }
  }));
  </script>
  