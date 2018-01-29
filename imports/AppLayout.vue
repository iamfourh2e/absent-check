<template>
  <v-app id="inspire">
    <drawer :toggle-drawer="drawer" @toggleDrawerState="toggleDrawerState"></drawer>
    <v-toolbar color="amber" app absolute clipped-left>
      <v-toolbar-side-icon v-if="$vuetify.breakpoint.width <= 1264" @click="drawer = !drawer"></v-toolbar-side-icon>
      <a @click="goHome" style="color: black;"><span class="title">H2E&nbsp;<span class="text">ABSENT CHECK</span></span></a>
    </v-toolbar>
    <v-content>
      <v-container fluid fill-height class="grey lighten-4">
        <v-layout>
          <router-view></router-view>
        </v-layout>
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
  import Drawer from "./Drawer.vue";
  export default {
    components: {
      Drawer
    },
    data() {
      return {
        drawer: null
      };
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
    }
  };
</script>

<style>
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