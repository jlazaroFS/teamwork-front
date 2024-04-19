<template>
    <v-data-table :headers="headers" :items="projects" :items-per-page="5" class="elevation-1">
        <template v-slot:item.view-employees="{ item }">
            <v-btn icon @click="openEmployeeDialog(item)">
                <v-icon icon color="primary">mdi-account-multiple</v-icon>
            </v-btn>
        </template>
        <template v-slot:item.unlist="{ item }">
            <v-btn icon color="error" @click="unlistProject(item)">
                <v-icon>mdi-close</v-icon>
            </v-btn>
        </template>
    </v-data-table>
</template>

<script>
export default {
    props: {
        projects: Array,
        headers: Array
    },
    methods: {
        unlistProject(project) {
            this.$emit('unlist-project', project);
        },
        openEmployeeDialog(project) {
            this.$emit('view-employees', project);
        }
    }
};
</script>
