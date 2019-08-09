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
                <v-form ref="form" v-model="validations.status" :lazy-validation="validations.lazy" >
                  <v-layout wrap>
                    <v-flex xs12 sm6 md4>
                      <v-text-field v-model="editedRequest.name" label="Name"
                        :rules="validations.textRules" required></v-text-field>
                    </v-flex>
                    <v-flex xs12 sm6 md4>
                      <v-text-field v-model="editedRequest.heading" label="Heading"
                        :rules="validations.textRules" required></v-text-field>
                    </v-flex>
                    <v-flex xs12 sm6 md4>
                      <v-text-field v-model="editedRequest.body" label="Body"
                        :rules="validations.textRules" required></v-text-field>
                    </v-flex>
                    <v-flex xs12 sm6 md4>
                      <v-select v-model="editedRequest.deviceId" :items="deviceItems" label="Device"
                        :rules="validations.deviceIdRules" required filled></v-select>
                    </v-flex>
                    <v-flex xs12 sm6 md4>
                      <v-text-field v-model="editedRequest.priority" label="Priority"
                        type="number" min="1" step="1"
                        :rules="validations.priorityRules" required></v-text-field>
                    </v-flex>
                    <v-flex v-if="editedRequest.id">
                      <v-switch v-model="editedRequest.open" class="ma-2" label="Open" readonly></v-switch>
                    </v-flex>
                  </v-layout>
                </v-form>
              </v-container>
            </v-card-text>

            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue darken-1" text @click="close">Cancel</v-btn>
              <v-btn v-if="!editedRequest.id" color="blue darken-1" text @click="save" :disabled="!validations.status">Save</v-btn>
              <v-btn v-if="editedRequest.id && editedRequest.open" color="blue darken-1" text @click="closeRequest">Close</v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-toolbar>
    </template>
    <template v-slot:item.action="{ item }">
      <v-icon small
        class="mr-2"
        @click="editItem(item)" >
        view
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
    editedIndex: -1,
    editedRequest: {
      id: null,
      name: '',
      heading: '',
      body: '',
      priority: null,
      open: true,
      deviceId: null
    },
    defaultRequest: {
      id: null,
      name: '',
      heading: '',
      body: '',
      priority: null,
      open: true,
      deviceId: null
    },
    validations: {
      status: true,
      lazy: false,
      textRules: [
        v => !!v || 'This field is required',
        v => (v && v.length >= 5) || 'This field must be more than 5 characters'
      ],
      deviceIdRules: [
        v => !!v || 'You must select a Device to create a Request'
      ],
      priorityRules: [
        v => !!v || 'Priority is required',
        v => (v && v >= 1) || 'Priority must be a value equal or over than 1'
      ]
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
      devices: 'getDevices',
      requests: 'getRequests'
    })
  },

  watch: {
    dialog (val) {
      this.resetValidation()
      val || this.close()
    }
  },
  created () {
    this.initialize()
  },

  methods: {
    initialize () {
      this.$store.dispatch('GET_DEVICES')
      this.$store.dispatch('GET_REQUESTS')
    },

    editItem (item) {
      this.editedIndex = this.requests.indexOf(item)
      this.editedRequest = Object.assign({}, item)
      this.dialog = true
    },

    resetValidation () {
      this.$refs.form.resetValidation()
    },

    close () {
      this.dialog = false
      setTimeout(() => {
        this.editedRequest = Object.assign({}, this.defaultRequest)
        this.editedIndex = -1
      }, 300)
    },

    save () {
      if (this.editedIndex < 0) {
        this.$store.dispatch('SAVE_REQUEST', { request: this.editedRequest })
        this.close()
      }
    },

    closeRequest () {
      if (this.editedIndex > 0) {
        this.$store.dispatch('ClOSE_REQUEST', { request: this.editedRequest, index: this.editedIndex })
          .then(request => {
            this.editedRequest.open = request.open
          })
      }
    }
  }
}
</script>
