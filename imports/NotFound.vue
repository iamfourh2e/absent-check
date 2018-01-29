<template>
  <v-layout justify-center>
    <v-flex xs6>
      <v-card>
        <v-card-title>Path not found. <a @click="goHome">GO HOME</a></v-card-title>
      </v-card>
    </v-flex>
  </v-layout>
</template>
<script>
export default {
  methods: {
      goHome(){
          this.$router.push('/')
      }
  }
}
</script>
