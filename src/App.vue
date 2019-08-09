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
      <v-layout wrap>
        <v-flex xs12>
          <v-alert v-if="system.error.show" type="error">{{ system.error.message }}</v-alert>
        </v-flex>
      </v-layout>

      <RequestTable/>

    </v-content>

  </v-app>
</template>

<script>
import RequestTable from './components/RequestTable'

import { mapGetters } from 'vuex'

export default {
  name: 'App',
  components: {
    RequestTable
  },
  data: () => ({
  }),
  computed: {
    ...mapGetters({
      system: 'getSystem'
    })
  }
}
</script>
