<template>
  <div @mouseenter="hover = true" @mouseleave="hover = false" @click="showEmployeeDialog" class="employee-button">
    <img v-if="employee.imageDataUrl" :src="employee.imageDataUrl" :alt="employee.txNombre" class="employee-image">
    <img v-else src="../assets/placeholder.png" alt="Sin foto de perfil" class="employee-image">
    <p :class="{ 'employee-name': true, 'employee-name-hover': hover }">{{ employee.txNombre }}</p>
  </div>
</template>

<script>
export default {
  props: {
    employee: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      hover: false
    }
  },
  methods: {
    showEmployeeDialog() {
      this.$emit('show-employee-dialog', this.employee);
    }
  }
}
</script>

<style scoped>
.employee-button img {
  max-width: 200px;
  max-height: 200px;
  filter: grayscale(100%);
  transition: filter 0.3s ease;
}

.employee-button:hover img {
  filter: grayscale(0%);
}

.employee-button {
  margin: 8px;
  width: auto;
  height: auto;
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
  overflow: hidden;
}

.employee-name {
  text-align: center;
  background-color: #7170E6;
  color: white;
  border-bottom-left-radius: 10px;
  border-bottom-right-radius: 10px;
  transition: color 0.3s ease, background-color 0.3s ease;
}

.employee-name-hover {
  color: black;
  background-color: #ccc;
}
</style>
