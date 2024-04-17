<template>
    <v-dialog v-model="dialog" width="650" @input="dialogClosed">
        <v-card v-if="selectedEmployee">
            <v-card-title class="text-h5 grey lighten-2">
                {{ selectedEmployee.txNombre }} {{ selectedEmployee.txApellido1 }} {{ selectedEmployee.txApellido2 }}
            </v-card-title>
            <v-container>
                <v-row>
                    <v-col cols="6">
                        <div>
                            <v-card-text class="mt-3">
                                <p class="info-line"><v-icon class="mr-3">mdi-card-account-details</v-icon>
                                    {{ selectedEmployee.txNif }}</p>
                                <p class="info-line"><v-icon class="mr-3">mdi-cake</v-icon>
                                    {{ formatDate(selectedEmployee.fNacimiento) }}</p>
                                <p class="info-line"><v-icon class="mr-3">mdi-phone</v-icon>
                                    {{ selectedEmployee.nTelefono1 }}</p>
                                <p class="info-line"><v-icon class="mr-3">mdi-email</v-icon>
                                    {{ selectedEmployee.email }}</p>
                                <p class="info-line"><v-icon class="mr-3">mdi-calendar-clock</v-icon>
                                    {{ formatDate(selectedEmployee.fAlta) }}</p>
                                <p class="info-line"><v-icon class="mr-3">mdi-ring</v-icon>
                                    {{ formatCivilStatus(selectedEmployee.cxEdocivil) }}</p>
                                <p class="info-line"><v-icon class="mr-3">mdi-shield-half-full</v-icon>
                                    {{ formatMilitaryService(selectedEmployee.bServmilitar) }}</p>
                            </v-card-text>
                        </div>
                    </v-col>
                    <v-col cols="6">
                        <div class="employee-pic">
                            <img :src="selectedEmployee.imageDataUrl ? selectedEmployee.imageDataUrl : require(`../assets/placeholder.png`)"
                                :alt="selectedEmployee.txNombre" style="max-height: 350px;">
                        </div>
                    </v-col>
                </v-row>
            </v-container>
            <v-divider></v-divider>
            <v-card-actions>
                <v-btn color="primary" text @click="closeDialog">
                    <v-icon>mdi-close</v-icon>
                    Cerrar
                </v-btn>
                <v-btn color="error" text @click="darDeBaja">
                    <v-icon>mdi-account-remove</v-icon>
                    Dar de baja
                </v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
</template>

<script>
export default {
    props: {
        dialog: {
            type: Boolean,
            required: true
        },
        selectedEmployee: {
            type: Object,
            required: true
        }
    },
    methods: {
        closeDialog() {
            this.$emit('close-dialog');
        },
        dialogClosed(value) {
            if (!value) {
                this.$emit('close-dialog', false);
            }
        },
        formatCivilStatus(service) {
            return service === 'C' ? 'En un matrimonio' : 'Sin matrimonio';
        },
        formatDate(date) {
            const options = { year: 'numeric', month: 'long', day: 'numeric' };
            return new Date(date).toLocaleDateString(undefined, options);
        },
        formatMilitaryService(service) {
            return service === 'S' ? 'Ha completado el servicio militar' : 'No ha completado el servicio militar';
        },
        darDeBaja() {
            this.$emit('unlist-empleado', this.selectedEmployee.idEmpleado);
            this.$emit('close-dialog', false);
        }
    }
}
</script>

<style scoped>
.employee-pic {
    display: flex;
    flex-direction: column;
    align-items: center;
}

.v-card-text p {
    margin-bottom: 4px;
}

.info-line {
    margin-bottom: 6px;
}
</style>
