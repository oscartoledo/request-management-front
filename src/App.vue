<template>
  <v-app>
    <v-app-bar app>
      <v-toolbar-title class="headline text-uppercase">
        <span>Request Management</span>
        <span> | </span>
        <span class="font-weight-light">REQUESTS CONTROL</span>
      </v-toolbar-title>
      <v-spacer></v-spacer>
    </v-app-bar>

    <v-content>
      <RequestTable/>
    </v-content>
  </v-app>
</template>

<script>
import RequestTable from './components/RequestTable'

export default {
  name: 'App',
  components: {
    RequestTable
  },
  data: () => ({
    //
  })
}
</script>
