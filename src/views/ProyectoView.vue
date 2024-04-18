<template>
    <div>
        <ProyectosTable :projects="projects" :headers="headers" @unlist-project="unlistProject" />
        <AddButton color="primary" @click="openDialog" />
        <AddProyectoDialog :dialog="dialog" @close-dialog="dialog = false" @save-project="saveProject" />
    </div>
</template>

<script>
import axios from 'axios';
import AddButton from '../components/AddButton.vue';
import AddProyectoDialog from '../components/AddProyectoDialog.vue';
import ProyectosTable from '../components/ProyectosTable.vue';

export default {
    components: {
        AddButton,
        AddProyectoDialog,
        ProyectosTable
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
                { text: 'Acción', sortable: false, value: 'action' } // Columna para el botón de eliminar
            ],
            projects: [],
            dialog: false,
        };
    },
    created() {
        this.fetchProjects();
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
        unlistProject(project) {
            const projectId = project.idProyecto; // Suponiendo que existe una propiedad idProyecto
            axios
                .put(`http://localhost:8080/proyectos/baja/${projectId}`)
                .then(response => {
                    this.fetchProjects();
                })
                .catch(error => {
                    console.error('Error unlisting project:', error);
                });
        }
    },
};
</script>
