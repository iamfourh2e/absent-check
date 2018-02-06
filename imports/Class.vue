<template>
    <v-layout justify-left mt-1 row wrap>
        <!--start modal-->
        <v-layout justify-center >
            <v-dialog v-model="dialog" persistent max-width="600px">
                <v-card>
                    <v-toolbar color="amber">
                        <v-btn icon @click.native="dialog = false" >
                            <v-icon>close</v-icon>
                        </v-btn>
                        <v-toolbar-title>Add New Class</v-toolbar-title>
                        <v-spacer></v-spacer>
                        <v-toolbar-items>
                            <v-btn  flat @click="submit">Save</v-btn>
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
        </v-layout>
        <!--end modal-->
        <v-container style="margin-top: -10px;">
            <v-layout row wrap>
                <v-flex xs12>
                    <v-subheader>My class</v-subheader>
                </v-flex>
                <v-flex xs2 class="m3">
                    <v-card :ripple="true" @click.native="dialog = !dialog">
                        <v-card-text
                                class="text-xs-center cursor-pointer">
                            Create new class
                            <v-icon style="font-size: 30px">add_circle</v-icon>
                        </v-card-text>
                    </v-card>
                </v-flex>
                <v-flex xs2 class="m3">
                    <v-card :ripple="true">
                        <v-card-text
                                class="text-xs-center cursor-pointer">
                            Import class
                            <v-icon style="font-size: 30px">file_download</v-icon>
                        </v-card-text>
                    </v-card>
                </v-flex>
            </v-layout>
            <v-layout row wrap>
                <v-flex xs2 v-for="item in items" :key="item._id" class="m3" @click="showClass(item)">
                    <v-card :ripple="true" class="cursor-pointer">
                        <v-card-media
                                src="img/linus-torvald.jpeg"
                                height="100px"
                        >
                        </v-card-media>
                        <v-card-title primary-title>
                            <div>
                                <div class="headline">{{item.name}}</div>
                                <span class="grey--text">{{formatNum(item.studentCount)}}</span>
                            </div>
                        </v-card-title>
                        <v-card-actions>
                            <v-btn flat>Share</v-btn>
                            <v-spacer></v-spacer>
                            <v-menu bottom left>
                                <v-btn icon slot="activator">
                                    <v-icon>more_vert</v-icon>
                                </v-btn>
                                <v-list>
                                    <v-list-tile v-for="item in menuItems" :key="item.title" @click="">
                                        <v-list-tile-title @click.ative="handleMenuClick(item)">{{ item.title }}
                                        </v-list-tile-title>
                                    </v-list-tile>
                                </v-list>
                            </v-menu>
                        </v-card-actions>
                    </v-card>
                </v-flex>
            </v-layout>
        </v-container>
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
</template>
<style>
    .m3 {
        margin: 3px;
    }

    .cursor-pointer {
        cursor: pointer;
    }
</style>
<script>
    import numeral from 'numeral';

    export default {
        components: {},
        data() {
            return {
                menuItems: [
                    {title: 'Edit'},
                    {title: 'Remove'},
                    {title: 'Add Collaborator'}
                ],
                snackbar: {
                    state: false,
                    timeout: 3000,
                    mode: "",
                    text: "",
                    color: ""
                },
                valid: true,
                dialog: false,
                name: "",
                lat: "",
                lng: "",
                nameRules: [
                    v => !!v || "Name is required",
                    v => (v && v.length <= 10) || "Name must be less than 10 characters"
                ],
                max25chars: v => v.length <= 25 || "Input too long!",
                tmp: "",
                search: "",
                pagination: {},
                headers: [
                    {
                        text: "Class Name",
                        align: "left",
                        sortable: false,
                        value: "name"
                    },
                    {
                        text: "Lat",
                        align: "center",
                        sortable: true,
                        value: "lat"
                    },
                    {
                        text: "Lng",
                        align: "center",
                        sortable: true,
                        value: "lng"
                    }
                ],
                items: []
            };
        },

        methods: {
            showClass(item){
              this.$router.push({name: 'showClass', params: {klassId: item._id}});
            },
            formatNum(val) {
                let num = val ? numeral(val).format('0,00') : 0;
                return num + ' ' + (val > 0 ? 'students' : 'student');
            },
            handleMenuClick(item) {
                console.log(item.title)
            },
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
                this.upsertClass(querySelector, selector);
            },
            fetchClasses() {
                Meteor.call("klass_fetch", {}, (err, result) => {
                    if (!err) {
                        this.items = result;
                    }
                });
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
                    this.upsertClass(querySelector, selector,);
                }
            },
            toggleAll() {
                if (this.selected.length) this.selected = [];
                else this.selected = this.items.slice();
            },
            upsertClass(querySelector, selector) {
                Meteor.call("klass_upsert", querySelector, selector, (err, result) => {
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
            let params = this.$route.params.id;
            let user = this.$store.state.auth.user;
            if(user && user.tag === params){
                this.fetchClasses();
            }else{
                this.$router.push('/');
            }
        }
    };
</script>