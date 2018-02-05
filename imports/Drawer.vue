<template>
    <div>
        <v-navigation-drawer fixed :clipped="$vuetify.breakpoint.width > 1264" v-model="drawer" class="grey lighten-4" app>
            <v-list>
                <v-list-group v-for="user in users"  v-bind:key="user._id" style="padding: 10px 10px 10px 0px;">
                    <v-list-tile slot="item">
                        <v-list-tile-avatar avatar>
                            <img src="img/linus-torvald.jpeg">
                        </v-list-tile-avatar>
                        <v-list-tile-content>
                            <v-list-tile-title>{{ user.username || user && user.emails[countIndexLenghth(user.emails)].address }}</v-list-tile-title>
                            <v-list-tile-sub-title>online</v-list-tile-sub-title>
                        </v-list-tile-content>
                        <v-list-tile-action>
                            <v-icon>keyboard_arrow_down</v-icon>
                        </v-list-tile-action>
                    </v-list-tile>
                    <v-list-tile @click="becomeATeacher" v-if="isNotATeacher">
                        <v-list-tile-content >
                            <v-list-tile-title>I am teacher</v-list-tile-title>
                        </v-list-tile-content>
                        <v-list-tile-action>
                            <v-icon>class</v-icon>
                        </v-list-tile-action>
                    </v-list-tile>
                    <v-list-tile @click="">
                        <v-list-tile-content>
                            <v-list-tile-title>My Profile</v-list-tile-title>
                        </v-list-tile-content>
                        <v-list-tile-action>
                            <v-icon>account_circle</v-icon>
                        </v-list-tile-action>
                    </v-list-tile>
                    <v-list-tile @click="handleLogout">
                        <v-list-tile-content>
                            <v-list-tile-title>Logout</v-list-tile-title>
                        </v-list-tile-content>
                        <v-list-tile-action>
                            <v-icon>cloud_off</v-icon>
                        </v-list-tile-action>
                    </v-list-tile>
                </v-list-group>
            </v-list>
            <v-list dense class="grey lighten-4">
                <template v-for="(item, i) in items">
                    <v-layout
                            row
                            v-if="item.heading"
                            align-center
                            :key="i"
                    >
                        <v-flex xs6>
                            <v-subheader v-if="item.heading">
                                {{ item.heading }}
                            </v-subheader>
                        </v-flex>
                        <v-flex xs6 class="text-xs-right">
                            <v-btn small flat>edit</v-btn>
                        </v-flex>
                    </v-layout>
                    <v-divider
                            dark
                            v-else-if="item.divider"
                            class="my-4"
                            :key="i"
                    ></v-divider>
                    <v-list-tile
                            :key="i"
                            v-else
                            @click="toggleAction(item)"
                    >
                        <v-list-tile-action>
                            <v-icon>{{ item.icon }}</v-icon>
                        </v-list-tile-action>
                        <v-list-tile-content>
                            <v-list-tile-title class="grey--text">
                                {{ item.text }}
                            </v-list-tile-title>
                        </v-list-tile-content>
                    </v-list-tile>
                </template>
            </v-list>

        </v-navigation-drawer>
        <!--<v-snackbar-->
                <!--:timeout="snackbar.timeout"-->
                <!--:top="snackbar.y === 'top'"-->
                <!--v-model="snackbar.state"-->
                <!--:color="snackbar.color"-->
        <!--&gt;      {{ snackbar.text }}-->
            <!--<v-btn flat dark color="white" @click.native="snackbar.state = false">Close</v-btn>-->
        <!--</v-snackbar>-->
    </div>
</template>


<script>
    export default {
        props: {
            toggleDrawer: null,
            showItems: {
                type: Boolean,
                default: true
            }
        },
        watch: {
            toggleDrawer(val) {
                this.drawer = val;
            },
            drawer(val) {
                if (!val) {
                    this.$emit("toggleDrawerState", val);
                }
            },
            showItems(val){
                this.displayItems(val);
            }
        },
        computed: {
            isNotATeacher(){
                let user = this.$store.state.auth.user;
                if(user && user.profile.classEngaged){
                    this.snackbar.state = true;
                }
                return user && !user.profile.classEngaged;
            }
        },
        methods: {
            handleLogout(){
                this.$store.dispatch('logout');
            },
            becomeATeacher(){
                this.$store.dispatch('becomeATeacher');
            },
            countIndexLenghth(val){
                return val.length - 1;
            },
            displayItems(val){
                 if(!val){
                    this.items = [];
                    this.users = [];
                }else{
                    this.items = this.$store.state.drawer.items;
                    this.users = this.$store.state.auth.users;
                }
            },
            toggleAction(item) {
                item.link ? this.$router.push({
                    path: item.link
                }) : "";
            }
        },
        data() {
            return {
                drawer: false,
                snackbar: {
                    state: false,
                    color: 'green',
                    timeoute: 3000,
                    y: 'top',
                    text: 'You are a teacher now'
                },
                users: [],
                items: [
                ]
            };
        }
    };
</script>
