<template>
    <div class="empleados pa-8">
        <AddButton :color="'#7170E6'" @click="showFormDialog = true" />

        <div class="empleado-grid">
            <EmpleadoCard v-for="(employee, index) in employees" :key="index" :employee="employee"
                @show-employee-dialog="showEmployeeDialog(employee)" />
        </div>

        <EmployeeDialog :dialog="dialog" :selectedEmployee="selectedEmployee" @close-dialog="dialog = false" />
    </div>
</template>

<script>
import axios from 'axios';
import EmpleadoCard from '../components/EmpleadoCard.vue';
import EmployeeDialog from '../components/EmpleadoDialog.vue';
import AddButton from '../components/AddButton.vue';

export default {
    name: 'Empleados',
    components: {
        AddButton,
        EmpleadoCard,
        EmployeeDialog,
    },
    data() {
        return {
            employees: [],
            dialog: false,
            selectedEmployee: null,
            showFormDialog: false,
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
                    // Filter out employees with fBaja as null
                    this.employees = response.data.filter(employee => employee.fBaja === null);
                })
                .catch(error => {
                    console.error('Error fetching employees:', error);
                });
        },
        showEmployeeDialog(employee) {
            this.selectedEmployee = employee;
            this.dialog = true;
        },
        openAddDialog() {
            // Handle opening add dialog here
            // For example:
            // this.$router.push('/add-employee');
        },
    }
};
</script>

<style scoped>
.empleado-grid {
    display: flex;
    flex-wrap: wrap;
}
</style>
