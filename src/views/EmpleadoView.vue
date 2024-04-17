<template>
    <div class="empleados pa-8">
        <AddButton :color="'#7170E6'" @click="showFormDialog = true" />

        <AddEmpleadoDialog :showFormDialog="showFormDialog" @add-empleado="addNewEmpleado"
            @close-dialog="showFormDialog = false" />

        <div class="empleado-grid">
            <EmpleadoCard v-for="(employee, index) in employees" :key="index" :employee="employee"
                @show-employee-dialog="showEmployeeDialog(employee)" />
        </div>

        <EmployeeDialog :dialog="dialog" :selectedEmployee="selectedEmployee" @close-dialog="dialog = false"
            @unlist-empleado="unlistEmpleado" />
    </div>
</template>

<script>
import axios from 'axios';
import EmpleadoCard from '../components/EmpleadoCard.vue';
import EmployeeDialog from '../components/EmpleadoDialog.vue';
import AddButton from '../components/AddButton.vue';
import AddEmpleadoDialog from '../components/AddEmpleadoDialog.vue';

export default {
    name: 'Empleados',
    components: {
        AddButton,
        AddEmpleadoDialog,
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
        addNewEmpleado(newEmpleado) {
            newEmpleado.cxEdocivil = newEmpleado.cxEdocivil == 'Casado/a' ? 'C' : 'S'
            newEmpleado.bServmilitar = newEmpleado.bServmilitar == 'Sí' ? 'S' : 'N';
            axios
                .post('http://localhost:8080/empleados', newEmpleado)
                .then(response => {
                    this.employees.push(response.data);
                    this.showFormDialog = false;
                })
                .catch(error => {
                    console.error('Error adding new employee:', error);
                });
        },
        unlistEmpleado(id) {
            axios
                .put(`http://localhost:8080/empleados/baja/${id}`)
                .then(response => {
                    this.fetchEmployees();
                })
                .catch(error => {
                    console.error('Error unlisting employee:', error);
                });

        }
    }
};
</script>

<style scoped>
.empleado-grid {
    display: flex;
    flex-wrap: wrap;
}
</style>
