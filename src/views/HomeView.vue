<template>
  <div class="home pa-8">
    <img src="~@/assets/logo.png" alt="Logo" class="logo">
    <p class="text-center slogan">La aplicación de gestión para todo(s).</p>
    <div class="options-container text-center">
      <v-btn icon to="emp">
        <v-icon>mdi-account</v-icon>
      </v-btn>
      <v-btn icon to="pro">
        <v-icon>mdi-lightbulb-on</v-icon>
      </v-btn>
    </div>

    <v-expansion-panels>
      <v-expansion-panel>
        <v-expansion-panel-header>
          ¿Qué es FutureSpace Teamwork?
        </v-expansion-panel-header>
        <v-expansion-panel-content>
          <p><b>FutureSpace Teamwork</b> es una aplicación de gestión de proyectos que permite ver y modificar
            fácilmente información sobre los empleados de la empresa y qué proyectos se están desarrollando.</p>
        </v-expansion-panel-content>
      </v-expansion-panel>
    </v-expansion-panels>
  </div>
</template>

<script>
export default {
  name: 'Inicio',
  mounted() {
    this.$emit('updateTitle', this.$options.name);
  }
}
</script>

<style>
.logo {
  display: block;
  margin-left: auto;
  margin-right: auto;
  width: 50%;
}

.slogan {
  color: #bb0000;
  font-style: italic;
}
</style>
