<template>
    <v-dialog v-model="dialog" max-width="800">
        <v-card>
            <v-card-title>Asignar Empleados a Proyecto</v-card-title>
            <v-card-text>
                <v-container>
                    <v-row>
                        <v-col cols="12">
                            <v-select v-model="selectedProject" :items="activeProjects" label="Seleccionar Proyecto"
                                item-text="txDescripcion" item-value="idProyecto" @change="fetchEmployees"></v-select>
                        </v-col>
                    </v-row>
                    <v-row>
                        <v-col cols="12">
                            <v-checkbox v-for="employee in filteredEmployees" :key="employee.idEmpleado"
                                v-model="employee.checked"
                                :label="`${employee.txNombre} ${employee.txApellido1} ${employee.txApellido2}`"
                                @change="updateEmployeeProjectRelation(employee)"></v-checkbox>
                        </v-col>
                    </v-row>
                </v-container>
            </v-card-text>
            <v-card-actions>
                <v-btn color="blue darken-1" text @click="closeDialog">Cerrar</v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
</template>

<script>
import axios from 'axios';

export default {
    props: {
        dialog: Boolean,
        projects: Array,
        employees: Array
    },
    data() {
        return {
            selectedProject: null,
            activeProjects: [],
            filteredEmployees: [],
        };
    },
    computed: {
        assignedEmployees() {
            axios.get('http://localhost:8080/employees')
                .then(response => {
                    const allEmployees = response.data;

                    // Filtrar solo los empleados asignados al proyecto seleccionado
                    const assigned = allEmployees.filter(employee => {
                        // Comprobar si hay una asignación para este empleado en el proyecto seleccionado
                        return this.assignments.some(assignment => assignment.idEmpleado === employee.idEmpleado && assignment.idProyecto === this.selectedProject);
                    });

                    // Marcar los empleados asignados
                    assigned.forEach(employee => {
                        employee.assigned = true;
                    });

                    // Devolver la lista de empleados asignados
                    return assigned;
                })
                .catch(error => {
                    console.error('Error fetching assigned employees:', error);
                    return [];
                });
        }
    },
    methods: {
        closeDialog() {
            this.$emit('close-dialog');
        },
        fetchEmployees() {
            if (!this.selectedProject) return;

            // Filter assignments based on the selected project ID
            const assignments = this.projects.filter(assignment => assignment.id.idProyecto === this.selectedProject);

            // Get the employee IDs from the assignments
            const assignedEmployeeIds = assignments.map(assignment => assignment.id.idEmpleado);

            // Filter employees based on assignedEmployeeIds
            this.filteredEmployees = this.employees.filter(employee => !assignedEmployeeIds.includes(employee.idEmpleado));
        },
        updateEmployeeProjectRelation(employee) {
            const assignment = {
                idEmpleado: employee.idEmpleado,
                idProyecto: this.selectedProject
            };

            const existingAssignment = this.assignments.find(a => a.idEmpleado === employee.idEmpleado && a.idProyecto === this.selectedProject);

            if (existingAssignment) {
                // Relationship exists, delete it
                axios.delete(`http://localhost:8080/assignments/eliminar/${this.selectedProject}/${employee.idEmpleado}`)
                    .then(response => {
                        // Remove the assignment from the assignments array
                        const index = this.assignments.indexOf(existingAssignment);
                        if (index > -1) {
                            this.assignments.splice(index, 1);
                        }
                        console.log('Assignment deleted successfully');
                    })
                    .catch(error => {
                        console.error('Error deleting assignment:', error);
                    });
            } else {
                // Relationship does not exist, add it
                axios.post(`http://localhost:8080/assignments`, assignment)
                    .then(response => {
                        // Add the new assignment to the assignments array
                        this.assignments.push(assignment);
                        console.log('Assignment added successfully');
                    })
                    .catch(error => {
                        console.error('Error adding assignment:', error);
                    });
            }
        }
    },
    watch: {
        dialog(val) {
            if (!val) {
                this.selectedProject = null;
                this.activeProjects = [];
                this.filteredEmployees = [];
            }
        }
    }
};
</script>
