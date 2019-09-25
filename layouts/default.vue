<template>
  <v-app light id="task-timer-app">
    <v-content>
      <v-container fluid class="app-container">
        <nuxt />
      </v-container>
    </v-content>
    <v-footer :fixed="fixed" app>
      <span>&copy; Task Timer</span>
    </v-footer>
  </v-app>
</template>

<script>
export default {
  data() {
    return {
      fixed: false
    };
  }
};
</script>

<style>
#task-timer-app {
  font-family: inherit;
}

@media only screen and (min-width: 960px){
.app-container {
  max-width: 1200px;
}
}

</style>
