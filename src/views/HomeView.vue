<template>
  <div class="home pa-8">
    <h1 class="text-center">Home</h1>
    <p class="text-center">Welcome to my first Vue app! I used Vue.js, Vuetify, Vuex, and Axios to build this.</p>
    <div class="options-container text-center">
      <v-btn icon to="artists">
        <v-icon>mdi-account-music</v-icon>
      </v-btn>
      <v-btn icon to="albums">
        <v-icon>mdi-album</v-icon>
      </v-btn>
      <v-btn icon to="pokemon">
        <v-icon>mdi-pokeball</v-icon>
      </v-btn>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Home',
  mounted() {
    this.$emit('updateTitle', this.$options.name);
  }
}
</script>
