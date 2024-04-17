<template>
    <v-dialog v-model="dialog" max-width="600px">
        <v-card>
            <v-card-title>
                <span class="headline">Alta de proyecto</span>
            </v-card-title>

            <v-card-text>
                <v-container>
                    <v-row>
                        <v-col cols="12" sm="6">
                            <v-text-field v-model="newProject.txDescripcion" label="Descripción"
                                prepend-inner-icon="mdi-text" :error-messages="descErrors" counter="35"
                                @input="validateDesc"></v-text-field>
                        </v-col>
                        <v-col cols="12" sm="6">
                            <v-text-field v-model="newProject.txLugar" label="Lugar" prepend-inner-icon="mdi-map-marker"
                                :error-messages="locErrors" @input="validateLoc"></v-text-field>
                        </v-col>
                        <v-col cols="12" sm="6">
                            <v-text-field v-model="newProject.fInicio" label="Fecha de inicio"
                                type="date"></v-text-field>
                        </v-col>
                        <v-col cols="12" sm="6">
                            <v-text-field v-model="newProject.fFin" label="Fecha de finalización"
                                type="date"></v-text-field>
                        </v-col>
                        <v-col cols="12">
                            <v-textarea v-model="newProject.txObservaciones" label="Observaciones" multi-line
                                rows="3"></v-textarea>
                        </v-col>
                    </v-row>
                </v-container>
            </v-card-text>

            <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="blue darken-1" text @click="closeDialog">Cancelar</v-btn>
                <v-btn color="blue darken-1" text @click="validateAndSave">Guardar</v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
</template>

<script>
export default {
    props: {
        dialog: {
            type: Boolean,
            required: true,
        },
    },
    data() {
        return {
            newProject: {
                txDescripcion: '',
                fInicio: '',
                fFin: '',
                txLugar: '',
                txObservaciones: '',
            },
            descErrors: [],
            locErrors: [],
        };
    },
    methods: {
        closeDialog() {
            this.$emit('close-dialog');
        },
        validateDesc() {
            if (this.newProject.txDescripcion.length < 3 || !this.newProject.txDescripcion) {
                this.descErrors = ['La descripción es demasiado corta.']
            } else if (this.newProject.txDescripcion.length > 35) {
                this.descErrors = ['La descripción es demasiado larga.'];
            } else {
                this.descErrors = [];
            }
        },
        validateAndSave() {
            // Validation logic for all fields
            if (this.validateForm()) {
                this.$emit('save-project', this.newProject);
            }
        },
        validateForm() {
            return (
                this.descErrors.length +
                this.locErrors.length === 0
            ) && (
                    this.newProject.txDescripcion &&
                    this.newProject.txLugar &&
                    this.newProject.txObservaciones &&
                    this.newProject.fInicio &&
                    this.newProject.fFin
                )

        },
    },
};
</script>
