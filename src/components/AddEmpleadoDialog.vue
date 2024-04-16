<template>
    <div>
        <v-dialog v-model="showFormDialog" max-width="500" @input="dialogClosed">
            <v-card>
                <v-card-title>Alta de empleado</v-card-title>
                <v-card-text>
                    <form @submit.prevent="submitForm">
                        <v-text-field v-model="newEmpleado.txNif" label="NIF" :error-messages="nifErrors"
                            @input="validateNif"></v-text-field>
                        <v-text-field v-model="newEmpleado.txNombre" label="Nombre" :error-messages="nameErrors"
                            @input="validateName"></v-text-field>
                        <v-text-field v-model="newEmpleado.txApellido1" label="Primer apellido"
                            :error-messages="surname1Errors" @input="validateSurname1"></v-text-field>
                        <v-text-field v-model="newEmpleado.txApellido2" label="Segundo apellido"
                            :error-messages="surname2Errors" @input="validateSurname2"></v-text-field>
                        <v-text-field v-model="newEmpleado.fNacimiento" type="date" label="Fecha de nacimiento"
                            :min="minDOB" :max="maxDOB"></v-text-field>
                        <v-text-field v-model="newEmpleado.fAlta" type="date" label="Fecha de alta" :min="minAlta"
                            :max="maxAlta"></v-text-field>
                        <v-text-field v-model="newEmpleado.nTelefono1" label="Primer teléfono de contacto"
                            :error-messages="telephone1Errors" @input="validateTelephone1"></v-text-field>
                        <v-text-field v-model="newEmpleado.nTelefono2" label="Segundo teléfono de contacto"
                            :error-messages="telephone2Errors" @input="validateTelephone2"></v-text-field>
                        <v-text-field v-model="newEmpleado.email" label="Dirección de correo electrónico"
                            :error-messages="emailErrors" @input="validateEmail"></v-text-field>
                        <v-select v-model="newEmpleado.cxEdocivil" :items="['Soltero/a', 'Casado/a']"
                            label="Estado civil"></v-select>
                        <v-select v-model="newEmpleado.bServmilitar" :items="['Sí', 'No']"
                            label="Servicio militar"></v-select>
                        <v-btn type="submit" color="primary" :disabled="!isFormValid">Agregar</v-btn>
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
            },
            nifErrors: [],
            nameErrors: [],
            surname1Errors: [],
            surname2Errors: [],
            telephone1Errors: [],
            telephone2Errors: [],
            emailErrors: [],
        };
    },
    computed: {
        isFormValid() {
            return this.nifErrors.length +
                this.nameErrors.length +
                this.surname1Errors.length +
                this.surname2Errors.length +
                this.telephone1Errors.length +
                this.telephone2Errors.length +
                this.emailErrors.length === 0;
        },
        minDOB() {
            // Calculate the minimum date of birth (e.g., 100 years ago)
            const today = new Date();
            const minYear = today.getFullYear() - 100;
            return `${minYear}-${this.formatDate(today.getMonth() + 1)}-${this.formatDate(today.getDate())}`;
        },
        maxDOB() {
            // Calculate the maximum date of birth (e.g., today)
            const today = new Date();
            const maxYear = today.getFullYear() - 18;
            return `${maxYear}-${this.formatDate(today.getMonth() + 1)}-${this.formatDate(today.getDate())}`;
        },
        minAlta() {
            if (!this.newEmpleado.fNacimiento) {
                return this.minDOB; // If no date of birth is selected, return the minimum date of birth
            }

            // Calculate the minimum "Fecha de alta" as date of birth + 18 years
            const minDate = new Date(this.newEmpleado.fNacimiento);
            minDate.setFullYear(minDate.getFullYear() + 18);
            return minDate.toISOString().slice(0, 10); // Format the date as YYYY-MM-DD
        }
    },
    methods: {
        submitForm() {
            // Ensure all required fields are filled
            if (this.validateForm()) {
                this.addNewEmpleado();
            }
        },
        validateNif() {
            const inputNif = this.newEmpleado.txNif;
            if (!inputNif) {
                this.nifErrors = ['El NIF no puede estar vacío.'];
                return;
            }

            // Regex patterns
            const DNI_REGEX = /^\d{8}[A-Z]$/;
            const NIE_REGEX = /^[XYZ]\d{7}[A-Z]$/;
            const CONTROL_DIGITS = 'TRWAGMYFPDXBNJZSQVHLCKE';

            let nif = inputNif;

            // Decode NIE prefix if necessary
            if (nif.match(NIE_REGEX)) {
                nif = this.decodeNiePrefix(nif);
            }

            if (nif.match(DNI_REGEX)) {
                const number = parseInt(nif.substring(0, 8));
                const expectedControlDigit = CONTROL_DIGITS.charAt(number % 23);
                const actualControlDigit = nif.charAt(8);
                if (actualControlDigit === expectedControlDigit) {
                    this.nifErrors = [];
                } else {
                    this.nifErrors = ['El NIF es inválido.'];
                }
            } else {
                this.nifErrors = ['El NIF es inválido.'];
            }
        },
        decodeNiePrefix(nie) {
            switch (nie.charAt(0)) {
                case 'X':
                    return "0" + nie.substring(1);
                case 'Y':
                    return "1" + nie.substring(1);
                case 'Z':
                    return "2" + nie.substring(1);
                default:
                    throw new Error("NIE no válido");
            }
        },
        validateName() {
            if (this.newEmpleado.txNombre.length < 2) {
                this.nameErrors = ['El nombre no puede ser solo una letra.'];
            } else {
                this.nameErrors = [];
            }
        },
        validateSurname1() {
            if (this.newEmpleado.txApellido1.length < 2) {
                this.surname1Errors = ['El primer apellido no puede ser solo una letra.'];
            } else {
                this.surname1Errors = [];
            }
        },
        validateSurname2() {
            if (this.newEmpleado.txApellido2.length < 2) {
                this.surname2Errors = ['El segundo apellido no puede ser solo una letra.'];
            } else {
                this.surname2Errors = [];
            }
        },
        formatDate(value) {
            // Format the date value to ensure it has leading zeros if necessary
            return value < 10 ? `0${value}` : value.toString();
        },
        validateTelephone(telephone) {
            return /^\d+$/.test(telephone);
        },
        validateTelephone1() {
            if (!this.validateTelephone(this.newEmpleado.nTelefono1)) {
                this.telephone1Errors = ['El primer teléfono solo puede, y debe, contener números.'];
            } else {
                this.telephone1Errors = [];
            }
        },
        validateTelephone2() {
            if (!this.validateTelephone(this.newEmpleado.nTelefono2)) {
                this.telephone2Errors = ['El segundo teléfono solo puede, y debe, contener números.'];
            } else {
                this.telephone2Errors = [];
            }
        },
        validateEmail() {
            const email = this.newEmpleado.email;
            if (!email) {
                this.emailErrors = ['El correo electrónico no puede estar vacío.'];
                return;
            }

            // Regex pattern for email validation
            const EMAIL_REGEX = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

            if (email.match(EMAIL_REGEX)) {
                this.emailErrors = [];
            } else {
                this.emailErrors = ['El correo electrónico es inválido.'];
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
            this.$emit('add-empleado', this.newEmpleado);
            this.resetForm();
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
