<template>
  <div>
     <v-select v-model="model" :items="devices" readonly label="Device"></v-select>
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
                    <v-text-field v-model="editedItem.name" label="Name"></v-text-field>
                  </v-flex>
                  <v-flex xs12 sm6 md4>
                    <v-text-field v-model="editedItem.heading" label="Heading"></v-text-field>
                  </v-flex>
                  <v-flex xs12 sm6 md4>
                    <v-text-field v-model="editedItem.body" label="Body"></v-text-field>
                  </v-flex>
                  <v-flex xs12 sm6 md4>
                    <v-select v-model="editedItem.device" :items="devices" readonly label="Device"></v-select>
                  </v-flex>
                  <v-flex xs12 sm6 md4>
                    <v-text-field v-model="editedItem.priority" label="Priority"></v-text-field>
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
    model: null,
    devices: [
      { text: 'State 1', value: 0 },
      { text: 'State 2', value: 1 }
    ],
    requests: [],
    editedIndex: -1,
    editedItem: {
      name: '',
      heading: '',
      body: '',
      device: '',
      priority: 0
    },
    defaultItem: {
      name: '',
      heading: '',
      body: '',
      device: '',
      priority: 0
    }
  }),

  computed: {
    formTitle () {
      return this.editedIndex === -1 ? 'New Request' : 'Edit Request'
    }
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
          name: 'A',
          heading: 'A',
          body: 'A',
          device: 'A',
          priority: 0
        },
        {
          name: 'S',
          heading: 'S',
          body: 'S',
          device: 'S',
          priority: 0
        },
        {
          name: 'S',
          heading: 'S',
          body: 'S',
          device: 'S',
          priority: 0
        }
      ]
    },
    editItem (item) {
      this.editedIndex = this.requests.indexOf(item)
      this.editedItem = Object.assign({}, item)
      this.dialog = true
    },
    close () {
      this.dialog = false
      setTimeout(() => {
        this.editedItem = Object.assign({}, this.defaultItem)
        this.editedIndex = -1
      }, 300)
    },
    save () {
      if (this.editedIndex > -1) {
        Object.assign(this.requests[this.editedIndex], this.editedItem)
      } else {

        // this.requests.push(this.editedItem)
      }
      this.close()
    }
  }
}
</script>
