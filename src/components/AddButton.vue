<template>
  <v-btn :color="color" elevation="2" class="floating-btn" fab @click="onClick">
    <v-icon color="white">
      mdi-plus
    </v-icon>
  </v-btn>
</template>

<script>
export default {
  props: {
    color: String
  },
  methods: {
    onClick() {
      this.$emit('click');
    }
  }
}
</script>

<style scoped>
.floating-btn {
  position: fixed;
  bottom: 20px;
  right: 20px;
}
</style>
