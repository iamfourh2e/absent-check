<template>
  <v-layout justify-center mt-5>
    <v-flex xs8>
      <v-card>
        <v-card-title>Camera</v-card-title>
        <v-card-text>
          <div id="video"></div>
        </v-card-text>
        <v-card-actions>
          <v-btn flat>Check mine</v-btn>
        </v-card-actions>
      </v-card>
    </v-flex>
  </v-layout>
</template>

<script>
  export default {
    mounted() {

    },
    data() {
      return {
        photo: null
      };
    },
    methods: {
      take_photo() {
      }
    }
  };
</script>
