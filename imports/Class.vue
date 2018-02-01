<template>
    <v-layout justify-center>
        <v-flex xs12>
            <v-card>
                <v-card-title>
                    <v-btn @click="dialog = !dialog" dark color="deep-purple darken-1
                            
                              ">
                        <v-icon>add</v-icon> Add New</v-btn>
                    <v-spacer></v-spacer>
                    <v-text-field append-icon="search" label="Search" single-line hide-details v-model="search"></v-text-field>
                </v-card-title>
                <v-data-table  v-bind:headers="headers" v-bind:items="items" v-bind:search="search">
                    <template slot="items" slot-scope="props" >
                                    <td>
                                      <v-edit-dialog
                                        lazy
                                      > {{ props.item.name }}
                                        <v-text-field
                                          slot="input"
                                          label="Edit"
                                          v-model="props.item.name"
                                          @keyup.enter="editClass(props.item)"
                                          single-line
                                          counter
                                          :rules="[max25chars]"
                                        ></v-text-field>
                                      </v-edit-dialog>
                                    </td>
                                    <td class="text-xs-right">{{ props.item.calories }}</td>
                                    <td class="text-xs-right">{{ props.item.fat }}</td>
                                    <td class="text-xs-right">{{ props.item.carbs }}</td>
                                    <td class="text-xs-right">{{ props.item.protein }}</td>
                                    <td class="text-xs-right">{{ props.item.sodium }}</td>
                                    <td class="text-xs-right">{{ props.item.calcium }}</td>
                                    <td class="text-xs-right">
                                      <v-edit-dialog
                                        @open="tmp = props.item.iron"
                                        @save="props.item.iron = tmp || props.item.iron"
                                        large
                                        lazy
                                      >
                                        <div>{{ props.item.iron }}</div>
                                        <div slot="input" class="mt-3 title">Update Iron</div>
                                        <v-text-field
                                          slot="input"
                                          label="Edit"
                                          v-model="tmp"
                                          single-line
                                          counter
                                          autofocus
                                          :rules="[max25chars]"
                                        ></v-text-field>
                                      </v-edit-dialog>
                                    </td>
                                    <td align="right">
                                         <a><v-icon>remove_red_eye</v-icon></a>
                                            <a><v-icon>delete</v-icon></a>
                                    </td>
                                     
</template>

<template slot="pageText" slot-scope="{ pageStart, pageStop }">
     From {{ pageStart }} to {{ pageStop }}
</template>
    </v-data-table>
  </v-card>
    <v-layout row justify-center>
    <v-dialog v-model="dialog"  fullscreen transition="dialog-bottom-transition" :overlay=false>
      <v-card>
              <v-toolbar dark color="primary">
          <v-btn icon @click.native="dialog = false" dark>
            <v-icon>close</v-icon>
          </v-btn>
          <v-toolbar-title>Add New Class</v-toolbar-title>
          <v-spacer></v-spacer>
          <v-toolbar-items>
            <v-btn dark flat @click="submit">Save</v-btn>
          </v-toolbar-items>
        </v-toolbar>
       
                              <v-form v-model="valid" @submit.prevent="submit" ref="form" lazy-validation>

        <v-card-text>
          <v-container grid-list-md>
            <v-layout wrap>
                <v-flex xs6>
                            <v-text-field
                                label="Name"
                                v-model="name"
                                :rules="nameRules"
                                :counter="10"
                                required
                                ></v-text-field>
                                          <small>*indicates required field</small>

                </v-flex>

            </v-layout>
          </v-container>
        </v-card-text>
       
                              </v-form>

      </v-card>
    </v-dialog>
    <v-snackbar
      :timeout="snackbar.timeout"
      :multi-line="snackbar.mode === 'multi-line'"
      :vertical="snackbar.mode === 'vertical'"
      :color="snackbar.color"
      v-model="snackbar.state"
    >
      {{ snackbar.text }}
      <v-btn flat dark color="pink" @click.native="snackbar.state = false">Close</v-btn>
    </v-snackbar>
    </v-layout>

</v-flex>
</v-layout>
</template>


<script>
    export default {
        components: {
        },
        data() {
            return {
                snackbar: {
                    state: false,
                    timeout: 3000,
                    mode: '',
                    text: '',
                    color: ''
                },
                valid: true,
                dialog: false,
                name: '',
                lat: '',
                lng: '',
                nameRules: [
                    (v) => !!v || 'Name is required',
                    (v) => v && v.length <= 10 || 'Name must be less than 10 characters'
                ],
                max25chars: v => v.length <= 25 || "Input too long!",
                tmp: "",
                search: "",
                pagination: {},
                headers: [{
                    text: "Class Name",
                    align: "left",
                    sortable: false,
                    value: "name"
                }, {
                    text: "Lat",
                    align: "center",
                    sortable: true,
                    value: "lat"
                }, {
                    text: "Lng",
                    align: "center",
                    sortable: true,
                    value: "lng"
                }],
                items: []
            };
        },
    
        methods: {
            location(location) {
                this.lat = location.lat();
                this.lng = location.lng();
            },
            editClass(item) {
                let selector = {
                    $set: item
                };
                let querySelector = {
                    _id: item._id
                };
                this.upsertClass(querySelector, selector)
            },
            fetchClasses() {
                Meteor.call('klass_fetch', {}, (err, result) => {
                    if (!err) {
                        this.items = result;
                    }
                })
            },
            submit() {
                if (this.$refs.form.validate()) {
                    let selector = {
                        $set: {
                            lat: this.lat,
                            lng: this.lng,
                            name: this.name
                        }
                    };
                    let querySelector = {
                        name: this.name
                    };
                    this.upsertClass(querySelector, selector);
    
                }
            },
            toggleAll() {
                if (this.selected.length) this.selected = []
                else this.selected = this.items.slice()
            },
            upsertClass(querySelector, selector) {
                Meteor.call('klass_upsert', querySelector, selector, (err, result) => {
                    if (!err) {
                        this.snackbar.text = "Operation successfully";
                        this.snackbar.color = "success";
                        this.snackbar.state = true;
                        this.fetchClasses();
                    } else {
                        this.snackbar.text = err.message;
                        this.snackbar.color = "error";
                        this.snackbar.state = true;
                    }
                });
            }
        },
        created() {
            this.fetchClasses();
        },
    };
</script>