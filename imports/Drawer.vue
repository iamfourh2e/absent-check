<template>
    <div>
        <v-navigation-drawer fixed :clipped="$vuetify.breakpoint.width > 1264" v-model="drawer" class="grey lighten-4" app>
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
        methods: {
            displayItems(val){
                 if(!val){
                    this.items = [];
                }else{
                    this.items = this.$store.state.drawer.items
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
                items: [
                ]
            };
        }
    };
</script>
