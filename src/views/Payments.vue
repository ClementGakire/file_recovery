<template>
  <div>
    <v-toolbar flat color="white">
      <v-toolbar-title>Payments</v-toolbar-title>
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
        <v-btn slot="activator" color="primary" dark class="mb-2">New Payment</v-btn>
        <v-card>
          <v-card-title>
            <span class="headline">{{ formTitle }}</span>
          </v-card-title>

          <v-card-text>
            <v-container grid-list-md>
              <v-layout wrap>
               <v-flex xs12 sm6 d-flex>
	        <v-select v-model="editedItem.institution"
	          :items="institutions"
	          label="Institution"
	        ></v-select>
      </v-flex>
                <v-flex xs12 sm6 d-flex>
	        <v-select v-model="editedItem.invoiceNo"
	          :items="invoices"
	          label="Invoice No"
	        ></v-select>
      </v-flex>
                <v-flex xs12 sm6 md4>
                  <v-text-field v-model="editedItem.voucherNo" label="Voucher No"></v-text-field>
                </v-flex>
                <v-flex xs12 sm6 md4>
                  <v-text-field v-model="editedItem.amount" label="Amount(frw)"></v-text-field>
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
					          v-model="editedItem.paymentDate"
					          label="Payment Date"
					          prepend-icon="event"
					          readonly
					        ></v-text-field>
					        <v-date-picker v-model="editedItem.paymentDate" no-title scrollable>
					          <v-spacer></v-spacer>
					          <v-btn flat color="primary" @click="menu = false">Cancel</v-btn>
					          <v-btn flat color="primary" @click="$refs.menu.save(date)">OK</v-btn>
					        </v-date-picker>
					      </v-menu>
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
        <td>{{ props.item.institution }}</td>
        <td class="text-xs-right">{{ props.item.invoiceNo }}</td>
        <td class="text-xs-right">{{ props.item.voucherNo }}</td>
        <td class="text-xs-right">{{ props.item.amount }}</td>
        <td class="text-xs-right">{{ props.item.paymentDate }}</td>
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
    institutions: ['Foo', 'Bar', 'Fizz', 'Buzz'],
    invoices: ['1', '2', '3', '4'],
    date: new Date().toISOString().substr(0, 10),
      menu: false,
      modal: false,
      menu2: false,
      headers: [
        {
          text: 'Institution',
          align: 'left',
          sortable: true,
          value: 'institution'
        },
        { text: 'Invoice No', value: 'invoiceNo' },
        { text: 'Voucher No', value: 'voucherNo' },
        { text: 'Amount(frw)', value: 'amount' },
        { text: 'Payment Date', value: 'paymentDate' },
        { text: 'Actions', value: 'institution', sortable: false }
      ],
      desserts: [],
      editedIndex: -1,
      editedItem: {
        institution: '',
        invoiceNo: '',
        voucherNo: '',
        amount: '',
        paymentDate: ''
      },
      defaultItem: {
        institution: '',
        invoiceNo: '',
        voucherNo: '',
        amount: '',
        paymentDate: ''
      }
    }),

    computed: {
      formTitle () {
        return this.editedIndex === -1 ? 'New Payment' : 'Edit Item'
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
            institution: 'kLab',
            invoiceNo: '159',
            voucherNo: '68',
            amount: '24000',
            paymentDate: '28/01/2019'
          },
          {
            institution: 'Ice cream sandwich',
            invoiceNo: 237,
            voucherNo: 9.0,
            amount: 37,
            paymentDate: 4.3
          },
          {
            institution: 'Eclair',
            invoiceNo: 262,
            voucherNo: 16.0,
            amount: 23,
            paymentDate: 6.0
          },
          {
            institution: 'Cupcake',
            invoiceNo: 305,
            voucherNo: 3.7,
            amount: 67,
            paymentDate: 4.3
          },
          {
            institution: 'Gingerbread',
            invoiceNo: 356,
            voucherNo: 16.0,
            amount: 49,
            paymentDate: 3.9
          },
          {
            institution: 'Jelly bean',
            invoiceNo: 375,
            voucherNo: 0.0,
            amount: 94,
            paymentDate: 0.0
          },
          {
            institution: 'Lollipop',
            invoiceNo: 392,
            voucherNo: 0.2,
            amount: 98,
            paymentDate: 0
          },
          {
            institution: 'Honeycomb',
            invoiceNo: 408,
            voucherNo: 3.2,
            amount: 87,
            paymentDate: 6.5
          },
          {
            institution: 'Donut',
            invoiceNo: 452,
            voucherNo: 25.0,
            amount: 51,
            paymentDate: 4.9
          },
          {
            institution: 'KitKat',
            invoiceNo: 518,
            voucherNo: 26.0,
            amount: 65,
            paymentDate: 7
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