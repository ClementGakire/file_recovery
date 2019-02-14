<template>
  <div>
    <v-toolbar flat color="white">
      <v-toolbar-title>Purchase Order</v-toolbar-title>
      <v-divider
        class="mx-2"
        inset
        vertical
      ></v-divider>
      <v-spacer><v-text-field
        v-model="search"
        append-icon="search"
        label="Search"
        single-line
        hide-details
      ></v-text-field></v-spacer>
      <v-dialog v-model="dialog" max-width="500px">
        <v-btn slot="activator" color="primary" dark class="mb-2">New Purchase Order</v-btn>
        <v-card>
          <v-card-title>
            <span class="headline">{{ formTitle }}</span>
          </v-card-title>

          <v-card-text>
            <v-container grid-list-md>
              <v-layout wrap>
                <v-flex xs12 sm6 md4>
                  <v-text-field v-model="editedItem.purchaseNo" label="Purchase Order No"></v-text-field>
                </v-flex>
                <v-flex xs12 sm6 md4>
                  <v-text-field v-model="editedItem.institution" label="Institution"></v-text-field>
                </v-flex>
                <v-flex xs12 sm6 md4>
					      <v-menu
					        ref="menu"
					        v-model="menu"
					        :close-on-content-click="false"
					        :nudge-right="40"
					        :return-value.sync="date"
					        lazy
					        transition="scale-transition"
					        offset-y
					        full-width
					        min-width="290px"
					      >
					        <v-text-field
					          slot="activator"
					          v-model="editedItem.from"
					          label="From"
					          prepend-icon="event"
					          readonly
					        ></v-text-field>
					        <v-date-picker v-model="editedItem.from" no-title scrollable>
					          <v-spacer></v-spacer>
					          <v-btn flat color="primary" @click="menu = false">Cancel</v-btn>
					          <v-btn flat color="primary" @click="$refs.menu.save(date)">OK</v-btn>
					        </v-date-picker>
					      </v-menu>
   			 </v-flex>

   			 
                <v-flex xs12 sm6 md4>
					      <v-menu
					        ref="menu"
					        v-model="menu"
					        :close-on-content-click="false"
					        :nudge-right="40"
					        :return-value.sync="date"
					        lazy
					        transition="scale-transition"
					        offset-y
					        full-width
					        min-width="290px"
					      >
					        <v-text-field
					          slot="activator"
					          v-model="editedItem.to"
					          label="To"
					          prepend-icon="event"
					          readonly
					        ></v-text-field>
					        <v-date-picker v-model="editedItem.to" no-title scrollable>
					          <v-spacer></v-spacer>
					          <v-btn flat color="primary" @click="menu = false">Cancel</v-btn>
					          <v-btn flat color="primary" @click="$refs.menu.save(date)">OK</v-btn>
					        </v-date-picker>
					      </v-menu>
   			 </v-flex>
                <v-flex xs12 sm6 md4>
                  <v-text-field v-model="editedItem.days" label="Days"></v-text-field>
                </v-flex>
                <v-flex xs12 sm6 md4>
                  <v-text-field v-model="editedItem.uPrice" label="Unit Price"></v-text-field>
                </v-flex>
                <v-flex xs12 sm6 md4>
                  <v-text-field v-model="editedItem.tPrice" label="Total Price"></v-text-field>
                </v-flex>
              </v-layout>
            </v-container>
          </v-card-text>

          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="blue darken-1" flat @click="close">Cancel</v-btn>
            <v-btn color="blue darken-1" flat @click="save">Save</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-toolbar>
    <v-data-table
      :headers="headers"
      :items="desserts"
      class="elevation-1"
    >
      <template slot="items" slot-scope="props">
        <td>{{ props.item.purchaseNo }}</td>
        <td class="text-xs-right">{{ props.item.institution }}</td>
        <td class="text-xs-right">{{ props.item.from }}</td>
        <td class="text-xs-right">{{ props.item.to }}</td>
        <td class="text-xs-right">{{ props.item.days }}</td>
        <td class="text-xs-right">{{ props.item.uPrice }}</td>
        <td class="text-xs-right">{{ props.item.tPrice }}</td>
        <td class="justify-center layout px-0">
          <v-icon
            small
            class="mr-2"
            @click="editItem(props.item)"
          >
            edit
          </v-icon>
          <v-icon
            small
            @click="deleteItem(props.item)"
          >
            delete
          </v-icon>
        </td>
      </template>
      <template slot="no-data">
        <v-btn color="primary" @click="initialize">Reset</v-btn>
      </template>
    </v-data-table>
  </div>
</template>

<script>
  export default {
    data: () => ({
    	
      dialog: false,
      date: new Date().toISOString().substr(0, 10),
      menu: false,
      modal: false,
      menu2: false,
      headers: [
        {
          text: 'Purchase No',
          align: 'left',
          sortable: true,
          value: 'purchaseNo'
        },
        { text: 'Institution', value: 'institution' },
        { text: 'From', value: 'from' },
        { text: 'To', value: 'to' },
        { text: 'Days', value: 'days' },
        { text: 'Unit Price', value: 'uPrice' },
        { text: 'Total Price', value: 'tPrice' },
        { text: 'Actions', value: 'purchaseNo', sortable: false }
      ],
      desserts: [],
      editedIndex: -1,
      editedItem: {
        purchaseNo: '',
        institution: '',
        from: '',
        to: '',
        days: ''
      },
      defaultItem: {
        purchaseNo: '',
        institution: '',
        from: '',
        to: '',
        days: ''
      }
    }),

    computed: {
      formTitle () {
        return this.editedIndex === -1 ? 'New Item' : 'Edit Item'
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
        this.desserts = [
          {
            purchaseNo: 'Frozen Yogurt',
            institution: 159,
            from: 6.0,
            to: 24,
            days: 4.0
          },
          {
            purchaseNo: 'Ice cream sandwich',
            institution: 237,
            from: 9.0,
            to: 37,
            days: 4.3
          },
          {
            purchaseNo: 'Eclair',
            institution: 262,
            from: 16.0,
            to: 23,
            days: 6.0
          },
          {
            purchaseNo: 'Cupcake',
            institution: 305,
            from: 3.7,
            to: 67,
            days: 4.3
          },
          {
            purchaseNo: 'Gingerbread',
            institution: 356,
            from: 16.0,
            to: 49,
            days: 3.9
          },
          {
            purchaseNo: 'Jelly bean',
            institution: 375,
            from: 0.0,
            to: 94,
            days: 0.0
          },
          {
            purchaseNo: 'Lollipop',
            institution: 392,
            from: 0.2,
            to: 98,
            days: 0
          },
          {
            purchaseNo: 'Honeycomb',
            institution: 408,
            from: 3.2,
            to: 87,
            days: 6.5
          },
          {
            purchaseNo: 'Donut',
            institution: 452,
            from: 25.0,
            to: 51,
            days: 4.9
          },
          {
            purchaseNo: 'KitKat',
            institution: 518,
            from: 26.0,
            to: 65,
            days: 7
          }
        ]
      },

      editItem (item) {
        this.editedIndex = this.desserts.indexOf(item)
        this.editedItem = Object.assign({}, item)
        this.dialog = true
      },

      deleteItem (item) {
        const index = this.desserts.indexOf(item)
        confirm('Are you sure you want to delete this item?') && this.desserts.splice(index, 1)
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
          Object.assign(this.desserts[this.editedIndex], this.editedItem)
        } else {
          this.desserts.push(this.editedItem)
        }
        this.close()
      }
    }
  }
</script>