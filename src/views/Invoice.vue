<template>
  <div>
    <v-toolbar flat color="white">
      <v-toolbar-title>Invoice</v-toolbar-title>
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
        <v-btn slot="activator" color="primary" dark class="mb-2">New Invoice</v-btn>
        <v-card>
          <v-card-title>
            <span class="headline">{{ formTitle }}</span>
          </v-card-title>

          <v-card-text>
            <v-container grid-list-md>
              <v-layout wrap>
              	
                <v-flex xs12 sm6 md4>
                  <v-text-field v-model="editedItem.invoiceNo" label="Invoice No"></v-text-field>
                </v-flex>
                <v-flex xs12 sm6 md4>
                  <v-text-field v-model="editedItem.purchaseNo" label="Purchase Order No"></v-text-field>
                </v-flex>
                <v-flex xs12 sm6 md4>
                  <v-text-field v-model="editedItem.description" label="description"></v-text-field>
                </v-flex>
                <v-flex xs12 sm6 md4>
                  <v-text-field v-model="editedItem.institution" label="institution"></v-text-field>
                </v-flex>
                <v-flex xs12 sm6 md4>
                  <v-text-field v-model="editedItem.tin" label="tin"></v-text-field>
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
					          v-model="editedItem.billingDate"
					          label="Billing Date"
					          prepend-icon="event"
					          readonly
					        ></v-text-field>
					        <v-date-picker v-model="editedItem.billingDate" no-title scrollable>
					          <v-spacer></v-spacer>
					          <v-btn flat color="primary" @click="menu = false">Cancel</v-btn>
					          <v-btn flat color="primary" @click="$refs.menu.save(date)">OK</v-btn>
					        </v-date-picker>
					      </v-menu>
   			 </v-flex>
                  <v-text-field v-model="editedItem.deliveryDate" label="deliveryDate"></v-text-field>
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
        <td>{{ props.item.invoiceNo }}</td>
        <td class="text-xs-right">{{ props.item.purchaseNo }}</td>
        <td class="text-xs-right">{{ props.item.description }}</td>
        <td class="text-xs-right">{{ props.item.institution }}</td>
        <td class="text-xs-right">{{ props.item.tin }}</td>
        <td class="text-xs-right">{{ props.item.billingDate }}</td>
        <td class="text-xs-right">{{ props.item.deliveryDate }}</td>
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
      search: '',
      dialog: false,
      date: new Date().toISOString().substr(0, 10),
      menu: false,
      modal: false,
      menu2: false,
      headers: [
        {
          text: 'Invoice No',
          align: 'left',
          sortable: true,
          value: 'invoiceNo'
        },
        { text: 'Purchase Order No', value: 'purchaseNo' },
        { text: 'Description', value: 'description' },
        { text: 'Institution', value: 'institution' },
        { text: 'Tin', value: 'tin' },
        { text: 'Billing Date', value: 'billingDate' },
        { text: 'Delivery Date', value: 'deliveryDate' },
        { text: 'Actions', value: 'invoiceNo', sortable: false }
      ],
      desserts: [],
      editedIndex: -1,
      editedItem: {
        invoiceNo: '',
        purchaseNo: '',
        description: '',
        institution: '',
        tin: '',
        billingDate: '',
        deliveryDate: ''
      },
      defaultItem: {
        invoiceNo: '',
        purchaseNo: '',
        description: '',
        institution: '',
        tin: '',
        billingDate: '',
        deliveryDate: ''
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
            invoiceNo: 'Frozen Yogurt',
            description: 159,
            institution: 6.0,
            tin: 24,
            billingDate: 4.0
          },
          {
            invoiceNo: 'Ice cream sandwich',
            description: 237,
            institution: 9.0,
            tin: 37,
            billingDate: 4.3
          },
          {
            invoiceNo: 'Eclair',
            description: 262,
            institution: 16.0,
            tin: 23,
            billingDate: 6.0
          },
          {
            invoiceNo: 'Cupcake',
            description: 305,
            institution: 3.7,
            tin: 67,
            billingDate: 4.3
          },
          {
            invoiceNo: 'Gingerbread',
            description: 356,
            institution: 16.0,
            tin: 49,
            billingDate: 3.9
          },
          {
            invoiceNo: 'Jelly bean',
            description: 375,
            institution: 0.0,
            tin: 94,
            billingDate: 0.0
          },
          {
            invoiceNo: 'Lollipop',
            description: 392,
            institution: 0.2,
            tin: 98,
            billingDate: 0
          },
          {
            invoiceNo: 'Honeycomb',
            description: 408,
            institution: 3.2,
            tin: 87,
            billingDate: 6.5
          },
          {
            invoiceNo: 'Donut',
            description: 452,
            institution: 25.0,
            tin: 51,
            billingDate: 4.9
          },
          {
            invoiceNo: 'KitKat',
            description: 518,
            institution: 26.0,
            tin: 65,
            billingDate: 7
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