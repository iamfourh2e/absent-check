<template>
    <div>
        <div id="mapid"></div>
    </div>
</template>

<script>
export default {
  props: {
    //user for query propertie.ADMIN_ID inside wb_village collection
    reRender: {
      type: Boolean,
      default: false
    },
    adminId: {
      type: String,
      optional: true
    }
  },
  data() {
    return {
      mapOptions: {
        center: {
          lat: 13.094769984560811,
          lng: 103.18824063475529
        },
        zoom: 15
      }
    };
  },
  methods: {
    lookupAdminId() {},
    placeMarker(location, marker) {
      this.mapOptions.center = {
        lat: location.lat(),
        lng: location.lng()
      };
      this.$emit('location', location); //emit location
      if (marker == null) {
        marker = new google.maps.Marker({
          position: location,
          map: map
        });
      } else {
        marker.setPosition(location);
      }
    },
    renderMap() {
      let el = this.$el.querySelector("#mapid");
      let vm = this;
      setTimeout(() => {
        this.$_GoogleMapsLoader.load(google => {
          let infowindow = new google.maps.InfoWindow();
          let map = new google.maps.Map(el, this.mapOptions);
          let marker = new google.maps.Marker({
            position: this.mapOptions.center,
            map: map
          });
          google.maps.event.addListener(map, "click", event => {
            this.placeMarker(event.latLng, marker);
          });
        }, 500);
      });
    }
  },
  created() {},

  watch: {
    reRender(val) {
      if (val) {
        this.renderMap();
      }
    }
  },
  mounted() {
    this.renderMap();
  }
};
</script>

<style scoped>
#mapid {
  height: 500px;
}
</style>