<template>
    <v-app id="inspire">
        <drawer :toggle-drawer="drawer" @toggleDrawerState="toggleDrawerState" :showItems="showItems"></drawer>
        <v-toolbar color="amber" app absolute clipped-left>
            <v-toolbar-side-icon v-if="true" @click="drawer = !drawer"></v-toolbar-side-icon>
            <a @click="goHome" style="color: black;"><span class="title">H2E&nbsp;<span class="text">ABSENT CHECK</span></span></a>
        </v-toolbar>
    
        <v-content>
            <v-container fluid fill-height class="grey lighten-4">

                <v-layout>
                    <transition name="component-transition" mode="out-in">
    
                        {{user}}
                        <slot v-if="loading">
                            <v-layout justify-center align-center>
                                <v-progress-circular indeterminate v-bind:size="70" v-bind:width="7" color="purple"></v-progress-circular>
                            </v-layout>
                        </slot>
                        <slot v-else>
                            <router-view></router-view>
                        </slot>
                    </transition>
    
                </v-layout>
    
            </v-container>
        </v-content>
    
    </v-app>
</template>

<script>
    import Drawer from "./Drawer.vue";
    import {
        Meteor
    } from 'meteor/meteor';
    
    export default {
        components: {
            Drawer,
        },
        data() {
            return {
                loading: true,
                drawer: null,
                showItems: true
            };
        },
        watch: {
            '$route' (to, from) {
                if (!this.$store.state.auth.user) {
                    if (to.name === 'register') {
                        this.$router.push('/register')
                    } else {
                        this.$router.push('/login')
    
                    }
                }
            }
        },
        computed: {
            user() {
                let user = this.$store.state.auth.user;
                if (!user) {
                    this.$router.push('/login');
                    this.showItems = false;
    
                } else {
                    this.showItems = true;
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
        mounted() {
            let vm = this;
            this.$subscribe('user', {
                onReady() {
                        vm.$store.commit('UPDATE_USER');
                }
            });
            setTimeout(() => {
                this.loading = false;
            }, 1200);
        }
    };
</script>

<style>
    .component-transition-enter-active,
    .component-transition-leave-active {
        transition: all .3s cubic-bezier(.25, .8, .25, 1);
        /* aka 'swing' */
    }
    
    .component-transition-enter,
    .component-transition-leave-to {
        opacity: 0;
    }
    
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