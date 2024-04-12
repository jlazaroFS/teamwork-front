<template>
    <div class="empleados pa-8">
        <div class="empleado-grid">
            <EmpleadoCard v-for="(employee, index) in employees" :key="index" :employee="employee" />
        </div>
    </div>
</template>

<style scoped>
.empleado-grid {
    display: flex;
    flex-wrap: wrap;
}
</style>

<script>
import axios from 'axios';
import EmpleadoCard from '../components/EmpleadoCard.vue';

export default {
    name: 'Empleados',
    components: {
        EmpleadoCard,
    },
    data() {
        return {
            employees: [],
        };
    },
    mounted() {
        this.fetchEmployees();
        this.$emit('updateTitle', this.$options.name);
    },
    methods: {
        fetchEmployees() {
            axios
                .get(`http://localhost:8080/empleados`)
                .then(response => {
                    this.employees = response.data;
                })
                .catch(error => {
                    console.error('Error fetching employees:', error);
                })
        }
    }
};
</script>
