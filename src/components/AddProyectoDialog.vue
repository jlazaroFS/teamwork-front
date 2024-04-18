<template>
    <div>
        <v-dialog v-model="dialog" max-width="600px">
            <v-card>
                <v-card-title>Alta de proyecto</v-card-title>
                <v-card-text>
                    <form @submit.prevent="validateAndSave">
                        <v-row>
                            <v-col cols="12" sm="6">
                                <v-text-field v-model="newProject.txDescripcion" label="Descripción"
                                    prepend-inner-icon="mdi-text" :error-messages="descErrors" counter="35"
                                    @input="validateDesc"></v-text-field>
                            </v-col>
                            <v-col cols="12" sm="6">
                                <v-text-field v-model="newProject.txLugar" label="Lugar"
                                    prepend-inner-icon="mdi-map-marker" :error-messages="locErrors"
                                    @input="validateLoc"></v-text-field>
                            </v-col>
                            <v-col cols="12" sm="6">
                                <v-text-field v-model="newProject.fInicio" label="Fecha de inicio" :min="minStartDate"
                                    :max="maxStartDate" :error-messages="dateErrors" type="date"></v-text-field>
                            </v-col>
                            <v-col cols="12" sm="6">
                                <v-text-field v-model="newProject.fFin" label="Fecha de finalización" :min="minEndDate"
                                    :error-messages="dateErrors" type="date"></v-text-field>
                            </v-col>
                            <v-col cols="12">
                                <v-textarea v-model="newProject.txObservaciones" label="Observaciones" multi-line
                                    rows="3"></v-textarea>
                            </v-col>
                        </v-row>
                    </form>
                </v-card-text>

                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="blue darken-1" text @click="closeDialog">Cancelar</v-btn>
                    <v-btn color="blue darken-1" text @click="validateAndSave">Guardar</v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
    </div>
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
            dateErrors: [],
        };
    },
    computed: {
        minStartDate() {
            const today = new Date();
            const minYear = today.getFullYear() - 30; // Arbitrary
            return `${minYear}-${this.formatDate(today.getMonth() + 1)}-${this.formatDate(today.getDate())}`;
        },
        maxStartDate() {
            const today = new Date();
            const maxYear = today.getFullYear() + 10; // Arbitrary
            return `${maxYear}-${this.formatDate(today.getMonth() + 1)}-${this.formatDate(today.getDate())}`;
        },
        minEndDate() {
            return this.minStartDate;
        },
    },
    methods: {
        closeDialog() {
            this.$emit('close-dialog');
        },
        validateDesc() {
            if (this.newProject.txDescripcion.length < 3 || !this.newProject.txDescripcion) {
                this.descErrors = ['La descripción es demasiado corta.'];
            } else if (this.newProject.txDescripcion.length > 35) {
                this.descErrors = ['La descripción es demasiado larga.'];
            } else {
                this.descErrors = [];
            }
        },
        validateLoc() {
            if (this.newProject.txLugar.length < 3) {
                this.locErrors = ['La descripción del lugar es demasiado corta.'];
            } else {
                this.locErrors = [];
            }
        },
        validateDates() {
            const startDate = new Date(this.newProject.fInicio);
            const endDate = new Date(this.newProject.fFin);
            const minStartDate = new Date(this.minStartDate);
            const maxStartDate = new Date(this.maxStartDate);
            if (startDate < minStartDate || startDate > maxStartDate || endDate < minStartDate || endDate > maxStartDate) {
                this.dateErrors = ['Las fechas deben estar dentro del rango permitido.'];
            }
            else {
                this.dateErrors = [];
            }
        },
        validateAndSave() {
            // Validation logic for all fields
            this.validateDesc();
            this.validateLoc();
            this.validateDates();

            if (this.validateForm()) {
                this.$emit('save-project', this.newProject);
            }
        },
        validateAndSave() {
            this.validateDesc();
            this.validateDates();

            if (this.validateForm()) {
                this.$emit('save-project', this.newProject);
            }
        },
        validateForm() {
            return (
                this.descErrors.length +
                this.locErrors.length +
                this.dateErrors.length === 0
            ) && (
                    this.newProject.txDescripcion &&
                    this.newProject.txLugar &&
                    this.newProject.txObservaciones &&
                    this.newProject.fInicio &&
                    this.newProject.fFin
                );
        },
        formatDate(value) {
            // Format the date value to ensure it has leading zeros if necessary
            return value < 10 ? `0${value}` : value.toString();
        },
    },
};
</script>
