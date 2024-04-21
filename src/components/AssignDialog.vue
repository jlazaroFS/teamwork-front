<template>
    <v-dialog v-model="dialog" max-width="500" persistent>
        <v-card>
            <v-card-title>Asignaciones</v-card-title>
            <v-card-text>
                <v-select v-model="selectedProject" :items="projectOptions" label="Proyecto" outlined
                    @change="fetchEmployeesForProject(selectedProject)"></v-select>

                <v-list v-if="employees.length > 0">
                    <v-subheader>Empleados</v-subheader>
                    <v-list-item v-for="(employee, index) in employees" :key="index">
                        <v-list-item-content>
                            <v-list-item-title>{{ employee.txNombre }} {{ employee.txApellido1 }} {{
        employee.txApellido2 }}</v-list-item-title>
                        </v-list-item-content>
                        <v-list-item-action>
                            <v-checkbox v-model="selectedEmployees[index]" />
                        </v-list-item-action>
                    </v-list-item>
                </v-list>
                <v-alert v-else>No hay empleados disponibles.</v-alert>
            </v-card-text>
            <v-card-actions>
                <v-btn color="primary" @click="assignProject">Asignar</v-btn>
                <v-btn color="secondary" @click="closeDialog">Cerrar</v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
</template>

<script>
import axios from 'axios';

export default {
    props: {
        dialog: {
            type: Boolean,
            default: false
        }
    },
    data() {
        return {
            selectedProject: null,
            projectOptions: [],
            employees: [],
            selectedEmployees: [],
            currAssignedEmployees: [],
        };
    },
    created() {
        this.fetchProjectOptions();
    },
    methods: {
        fetchProjectOptions() {
            axios
                .get(`http://localhost:8080/proyectos`)
                .then(response => {
                    this.projectOptions = response.data
                        .filter(project => project.fBaja === null)
                        .map(project => ({
                            text: project.txDescripcion,
                            value: project.idProyecto
                        }));
                })
                .catch(error => {
                    console.error('Error fetching project options:', error);
                });
        },
        fetchEmployeesForProject(projectId) {
            axios
                .get(`http://localhost:8080/assignments/${projectId}`)
                .then(response => {
                    this.currAssignedEmployees = response.data;

                    axios
                        .get(`http://localhost:8080/empleados`)
                        .then(response => {
                            // Filter employees that are not deactivated
                            this.employees = response.data.filter(employee => employee.fBaja === null);

                            // Map selectedEmployees based on whether employee is assigned
                            this.selectedEmployees = this.employees.map(employee => {
                                return this.currAssignedEmployees.some(id => id === employee.idEmpleado);
                            });
                        })
                        .catch(error => {
                            console.error('Error fetching employees:', error);
                        });
                })
                .catch(error => {
                    console.error('Error al obtener las asignaciones:', error);
                });
        },
        assignProject() {
            // Crear un array de IDs de empleados seleccionados (casilla marcada) y otro de no seleccionados (casilla no marcada)
            const selectedEmployeeIds = [];
            const deselectedEmployeeIds = [];

            this.selectedEmployees.forEach((isSelected, index) => {
                const employeeId = this.employees[index].idEmpleado;
                if (isSelected && !this.currAssignedEmployees.includes(employeeId)) {
                    selectedEmployeeIds.push(employeeId);
                } else if (!isSelected && this.currAssignedEmployees.includes(employeeId)) {
                    deselectedEmployeeIds.push(employeeId);
                }
            });

            // Realizar una petición POST para cada ID de empleado marcado que no esté en this.currAssignedEmployees
            selectedEmployeeIds.forEach(employeeId => {
                axios
                    .post(`http://localhost:8080/assignments`, {
                        idEmpleado: employeeId,
                        idProyecto: this.selectedProject
                    })
                    .then(response => {
                        console.log('Asignación exitosa:', response.data);
                    })
                    .catch(error => {
                        console.error('Error al asignar proyecto:', error);
                    });
            });

            // Realizar una petición DELETE para cada ID de empleado no marcado que esté en this.currAssignedEmployees
            deselectedEmployeeIds.forEach(employeeId => {
                axios
                    .delete(`http://localhost:8080/assignments/eliminar/${this.selectedProject}/${employeeId}`)
                    .then(response => {
                        console.log('Asignación eliminada:', response.data);
                    })
                    .catch(error => {
                        console.error('Error al eliminar asignación:', error);
                    });
            });

            this.closeDialog();
        },
        closeDialog() {
            this.selectedProject = null;
            this.selectedEmployees = [];
            this.currAssignedEmployees = [];
            this.employees = [];
            this.$emit('close-dialog');
        }
    }
};
</script>
