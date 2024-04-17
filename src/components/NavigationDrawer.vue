<template>
  <v-navigation-drawer v-model="drawer" app>
    <v-list dense nav>
      <v-list-item :to="homeItem.to" link>
        <v-list-item-icon>
          <v-icon>{{ homeItem.icon }}</v-icon>
        </v-list-item-icon>
        <v-list-item-content>
          <v-list-item-title>{{ homeItem.title }}</v-list-item-title>
        </v-list-item-content>
      </v-list-item>

      <v-divider></v-divider>

      <v-list-item v-for="item in items" :key="item.title" :to="item.to" link>
        <v-list-item-icon>
          <v-icon>{{ item.icon }}</v-icon>
        </v-list-item-icon>
        <v-list-item-content>
          <v-list-item-title>{{ item.title }}</v-list-item-title>
        </v-list-item-content>
      </v-list-item>
    </v-list>
  </v-navigation-drawer>
</template>

<script>
export default {
  props: {
    drawer: Boolean
  },
  data: () => ({
    homeItem: { title: 'Inicio', icon: 'mdi-home', to: '/' },
    items: [
      { title: 'Empleados', icon: 'mdi-account', to: '/emp' },
      { title: 'Proyectos', icon: 'mdi-lightbulb-on', to: '/pro' }
    ],
  }),
};
</script>
