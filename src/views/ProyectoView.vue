<template>
    <div>
        <ProyectosTable :projects="projects" :headers="headers" @unlist-project="unlistProject" />
        <AddButton color="#BB0000" @click="openDialog" />
        <AssignButton color="secondary" @click="openAssignments" />
        <AddProyectoDialog :dialog="dialog" @close-dialog="dialog = false" @save-project="saveProject" />
        <AssignDialog :dialog="assignments" @close-dialog="assignments = false" />
    </div>
</template>

<script>
import axios from 'axios';
import AddButton from '../components/AddButton.vue';
import AddProyectoDialog from '../components/AddProyectoDialog.vue';
import ProyectosTable from '../components/ProyectosTable.vue';
import AssignButton from '../components/AssignButton.vue';
import AssignDialog from '../components/AssignDialog.vue';

export default {
    name: 'Proyectos',
    components: {
        AddButton,
        AddProyectoDialog,
        ProyectosTable,
        AssignButton,
        AssignDialog
    },
    data() {
        return {
            headers: [
                { text: 'ID del proyecto', align: 'start', sortable: false, value: 'idProyecto' },
                { text: 'Descripción', value: 'txDescripcion' },
                { text: 'Fecha de inicio', value: 'fInicio' },
                { text: 'Fecha de finalización', value: 'fFin' },
                { text: 'Lugar', value: 'txLugar' },
                { text: 'Observaciones', value: 'txObservaciones' },
                { text: '', sortable: false, value: 'unlist' },
            ],
            projects: [],
            dialog: false,
            assignments: false,
        };
    },
    created() {
        this.fetchProjects();
    },
    mounted() {
        this.$emit('updateTitle', this.$options.name);
    },
    methods: {
        fetchProjects() {
            axios
                .get(`http://localhost:8080/proyectos`)
                .then(response => {
                    this.projects = response.data.filter(project => project.fBaja === null);
                })
                .catch(error => {
                    console.error('Error fetching projects:', error);
                });
        },
        saveProject(projectData) {
            axios
                .post(`http://localhost:8080/proyectos`, projectData)
                .then(response => {
                    this.fetchProjects();
                    this.dialog = false;
                })
                .catch(error => {
                    console.error('Error saving project:', error);
                });
        },
        openDialog() {
            this.dialog = true;
        },
        openAssignments() {
            this.assignments = true;
        },
        unlistProject(project) {
            const projectId = project.idProyecto;
            axios
                .put(`http://localhost:8080/proyectos/baja/${projectId}`)
                .then(response => {
                    this.fetchProjects();
                })
                .catch(error => {
                    console.error('Error unlisting project:', error);
                    alert("Error al dar de baja el proyecto " + project.txDescripcion + ". El proyecto tiene empleados asignados.")
                });
        }
    },
};
</script>
