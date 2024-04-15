<template>
    <div>
        <v-dialog v-model="showFormDialog" max-width="500" @input="dialogClosed">
            <v-card>
                <v-card-title>Alta de empleado</v-card-title>
                <v-card-text>
                    <form @submit.prevent="submitForm">
                        <v-text-field v-model="newEmpleado.txNif" label="NIF"></v-text-field>
                        <v-text-field v-model="newEmpleado.txNombre" label="Nombre"></v-text-field>
                        <v-text-field v-model="newEmpleado.txApellido1" label="Primer apellido"></v-text-field>
                        <v-text-field v-model="newEmpleado.txApellido2" label="Segundo apellido"></v-text-field>
                        <v-text-field v-model="newEmpleado.fNacimiento" type="date"
                            label="Fecha de nacimiento"></v-text-field>
                        <v-text-field v-model="newEmpleado.fAlta" type="date" label="Fecha de alta"></v-text-field>
                        <v-text-field v-model="newEmpleado.nTelefono1"
                            label="Primer teléfono de contacto"></v-text-field>
                        <v-text-field v-model="newEmpleado.nTelefono2"
                            label="Segundo teléfono de contacto"></v-text-field>
                        <v-text-field v-model="newEmpleado.email"
                            label="Dirección de correo electrónico"></v-text-field>
                        <v-select v-model="newEmpleado.cxEdocivil" :items="['Soltero/a', 'Casado/a']"
                            label="Estado civil"></v-select>
                        <v-select v-model="newEmpleado.bServmilitar" :items="['Sí', 'No']"
                            label="Servicio militar"></v-select>
                        <v-btn type="submit" color="primary">Agregar</v-btn>
                    </form>
                </v-card-text>
            </v-card>
        </v-dialog>
    </div>
</template>

<script>
export default {
    props: {
        showFormDialog: {
            type: Boolean,
            required: true
        }
    },
    data() {
        return {
            newEmpleado: {
                txNif: '',
                txNombre: '',
                txApellido1: '',
                txApellido2: '',
                fNacimiento: '',
                fAlta: '',
                nTelefono1: '',
                nTelefono2: '',
                email: '',
                cxEdocivil: '',
                bServmilitar: ''
            }
        };
    },
    methods: {
        submitForm() {
            // Ensure all required fields are filled
            if (this.validateForm()) {
                this.addNewEmpleado();
            }
        },
        validateForm() {
            // Validate all required fields
            return (
                this.newEmpleado.txNif &&
                this.newEmpleado.txNombre &&
                this.newEmpleado.txApellido1 &&
                this.newEmpleado.txApellido2 &&
                this.newEmpleado.fNacimiento &&
                this.newEmpleado.fAlta &&
                this.newEmpleado.nTelefono1 &&
                this.newEmpleado.nTelefono2 &&
                this.newEmpleado.email &&
                this.newEmpleado.cxEdocivil &&
                this.newEmpleado.bServmilitar
            );
        },
        addNewEmpleado() {
            // Emit 'add-empleado' event with newEmpleado data
            this.$emit('add-empleado', this.newEmpleado);
            // Reset form fields
            this.resetForm();
            // Close dialog
            this.$emit('close-dialog', false);
        },
        resetForm() {
            // Reset all form fields
            this.newEmpleado = {
                txNif: '',
                txNombre: '',
                txApellido1: '',
                txApellido2: '',
                fNacimiento: '',
                fAlta: '',
                nTelefono1: '',
                nTelefono2: '',
                email: '',
                cxEdocivil: '',
                bServmilitar: ''
            };
        },
        dialogClosed(value) {
            if (!value) {
                this.$emit('close-dialog', false);
            }
        }
    }
};
</script>
