<template>
  <div>
    <v-data-table
    :headers="headers"
    :items="requests"
    sort-by="calories"
    class="elevation-1">
    <template v-slot:top>
      <v-toolbar flat color="white">
        <v-toolbar-title>REQUESTS</v-toolbar-title>
        <v-divider
          class="mx-4"
          inset
          vertical></v-divider>
        <v-spacer></v-spacer>
        <v-dialog v-model="dialog" max-width="500px">
          <template v-slot:activator="{ on }">
            <v-btn color="primary" dark class="mb-2" v-on="on">New Request</v-btn>
          </template>
          <v-card>
            <v-card-title>
              <span class="headline">{{ formTitle }}</span>
            </v-card-title>

            <v-card-text>
              <v-container grid-list-md>
                <v-layout wrap>
                  <v-flex xs12 sm6 md4>
                    <v-text-field v-model="editedRequest.name" label="Name"></v-text-field>
                  </v-flex>
                  <v-flex xs12 sm6 md4>
                    <v-text-field v-model="editedRequest.heading" label="Heading"></v-text-field>
                  </v-flex>
                  <v-flex xs12 sm6 md4>
                    <v-text-field v-model="editedRequest.body" label="Body"></v-text-field>
                  </v-flex>
                  <v-flex xs12 sm6 md4>
                    <v-select v-model="editedRequest.deviceId" :items="deviceItems" filled label="Device"></v-select>
                  </v-flex>
                  <v-flex xs12 sm6 md4>
                    <v-text-field v-model="editedRequest.priority" label="Priority"></v-text-field>
                  </v-flex>
                  <v-flex v-if="editedRequest.id">
                    <v-switch v-model="editedRequest.open" class="ma-2" label="Open"></v-switch>
                  </v-flex>
                </v-layout>
              </v-container>
            </v-card-text>

            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue darken-1" text @click="close">Cancel</v-btn>
              <v-btn color="blue darken-1" text @click="save">Save</v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-toolbar>
    </template>
    <template v-slot:item.action="{ item }">
      <v-icon small
        class="mr-2"
        @click="editItem(item)" >
        edit
      </v-icon>
    </template>
    <template v-slot:no-data>
      <v-btn color="primary" @click="initialize">Reset</v-btn>
    </template>
  </v-data-table>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'

export default {
  data: () => ({
    dialog: false,
    headers: [
      { text: 'Name', value: 'name' },
      { text: 'Heading', value: 'heading', sortable: false },
      { text: 'Device', value: 'device', sortable: false },
      { text: 'Priority', value: 'priority' },
      { text: 'Actions', value: 'action', sortable: false }
    ],
    requests: [],
    editedIndex: -1,
    editedRequest: {
      id: null,
      name: '',
      heading: '',
      body: '',
      priority: 0,
      open: null,
      deviceId: null
    },
    defaultRequest: {
      id: null,
      name: '',
      heading: '',
      body: '',
      priority: 0,
      open: true,
      deviceId: null
    }
  }),

  computed: {
    formTitle () {
      return this.editedIndex === -1 ? 'New Request' : 'Edit Request'
    },

    deviceItems () {
      return this.devices.map(device => {
        return { value: device.id, text: device.name }
      })
    },

    ...mapGetters({
      devices: 'getDevices'
    })
  },

  watch: {
    dialog (val) {
      val || this.close()
    }
  },
  created () {
    this.initialize()
  },

  methods: {
    initialize () {
      this.requests = [
        {
          id: 1,
          name: 'A',
          heading: 'A',
          body: 'A',
          priority: 0,
          deviceId: 1,
          open: true
        },
        {
          id: 2,
          name: 'S',
          heading: 'S',
          body: 'S',
          priority: 0,
          deviceId: 0,
          open: false
        },
        {
          id: 3,
          name: 'S',
          heading: 'S',
          body: 'S',
          priority: 0,
          open: true,
          deviceId: 0
        }
      ]

      this.$store.dispatch('GET_DEVICES')
    },
    editItem (item) {
      this.editedIndex = this.requests.indexOf(item)
      this.editedRequest = Object.assign({}, item)
      this.dialog = true
    },
    close () {
      this.dialog = false
      setTimeout(() => {
        this.editedRequest = Object.assign({}, this.defaultRequest)
        this.editedIndex = -1
      }, 300)
    },
    save () {
      if (this.editedIndex > -1) {
        Object.assign(this.requests[this.editedIndex], this.editedRequest)
      } else {
        let request = this.editedRequest
        this.$store.dispatch('SAVE_REQUEST', { request })
      }
      this.close()
    }
  }
}
</script>
