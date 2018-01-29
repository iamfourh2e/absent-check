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
      var video = this.$el.querySelector('#video');
      if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
        // Not adding `{ audio: true }` since we only want video now
        navigator.mediaDevices.getUserMedia({
          video: true
        }).then(function(stream) {
          video.src = window.URL.createObjectURL(stream);
          video.play();
        });
      }
    },
    data() {
      return {
        photo: null
      };
    },
    methods: {
      take_photo() {
        this.photo = this.$refs.webcam.getPhoto();
      }
    }
  };
</script>
