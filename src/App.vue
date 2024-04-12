<template>
  <v-app id="inspire">
    <NavigationDrawer :drawer="drawer" :items="items" @toggleDrawer="toggleDrawer" />
    
    <v-app-bar app>
      <v-app-bar-nav-icon @click="toggleDrawer"></v-app-bar-nav-icon>
      <v-toolbar-title>{{ pageTitle }}</v-toolbar-title>
    </v-app-bar>
    
    <v-main>
      <router-view @updateTitle="updateTitle"></router-view>
    </v-main>
  </v-app>
</template>

<script>
import NavigationDrawer from './components/NavigationDrawer.vue';

export default {
  components: {
    NavigationDrawer,
  },
  data: () => ({
    drawer: null,
    pageTitle: 'Application'
  }),
  methods: {
    toggleDrawer() {
      this.drawer = !this.drawer;
    },
    updateTitle(title) {
      this.pageTitle = title;
    }
  }
};
</script>
