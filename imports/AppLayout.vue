<template>
    <v-app id="inspire">
        <drawer :toggle-drawer="drawer" @toggleDrawerState="toggleDrawerState"  ></drawer>
        <v-toolbar color="amber" app absolute clipped-left>
            <v-toolbar-side-icon v-if="$vuetify.breakpoint.width <= 1264"
                                 @click="drawer = !drawer"></v-toolbar-side-icon>
            <a @click="goHome" style="color: black;"><span class="title">H2E&nbsp;<span class="text">ABSENT CHECK</span></span></a>
        </v-toolbar>
        <v-content>
            <v-container fluid fill-height class="grey lighten-4">
                <v-layout>
                    {{user}}
                    <slot v-if="loading">
                        <v-layout justify-center align-center>
                            <v-progress-circular indeterminate v-bind:size="70" v-bind:width="7" color="purple"></v-progress-circular>
                        </v-layout>
                    </slot>
                    <slot v-else>
                        <router-view></router-view>
                    </slot>
                </v-layout>
            </v-container>
        </v-content>
    </v-app>
</template>

<script>
    import Drawer from "./Drawer.vue";
    import {Meteor} from 'meteor/meteor';
    export default {
        components: {
            Drawer,
        },
        data() {
            return {
                clipped: this.$vuetify.breakpoint.width <= 1264,
                loading: true,
                drawer: null,
            };
        },
        watch: {
          '$route'(to,from){
              if(!this.$store.state.auth.user){
                  this.$router.push('/register')
              }
          }
        },
        computed: {
            showDrawer(){
                let user = this.$store.state.auth.user;
                if(!!user){
                    this.clipped = this.$vuetify.breakpoint.width <= 1264;
                }else{
                    this.clipped = false;
                    this.drawer = true;
                }
              return !!user;
            },
            user(){
               let user = this.$store.state.auth.user;
               if(!user){
                   this.$router.push('/register');
               }else{
                   this.$router.push('/');
               }
            }
        },
        methods: {
            toggleDrawerState(val) {
                this.drawer = val;
            },
            goHome() {
                this.$router.push('/')
            }
        },
        props: {
            source: String
        },
        mounted(){
            let vm = this;
            this.$subscribe('user', {
                onReady(){

                }
            });
            setTimeout(()=>{
              this.loading = false;
            },1200);
        }
    };
</script>

<style>
    [v-cloak] {
        display: none;
    }
    #keep main .container {
        height: 660px;
    }

    .navigation-drawer__border {
        display: none;
    }

    .text {
        font-weight: 400;
    }
</style>