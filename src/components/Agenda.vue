<template>
  <div class="composter">
    <div
      class="card"
      :class="{
        'composter-residence':
          composter.fields.categorie.indexOf('idence') > -1,
        'composter-quartier':
          composter.fields.categorie.indexOf('uartier') > -1,
      }"
    >
      <div class="card-image">
        <figure class="image is-4by3">
          <img
            src="https://bulma.io/images/placeholders/1280x960.png"
            alt="Placeholder image"
          />
        </figure>
      </div>
      <div class="card-content">
        <div class="media">
          <div class="media-left">
            <figure class="image is-48x48">
              <img :src="image" v-on:mouseover="removeFirstOpeningSchedule" />
            </figure>
          </div>
          <div class="media-content">
            <p class="title is-4">{{ composter.fields.nom }}</p>
            <p class="subtitle is-6">{{ composter.fields.categorie }}</p>
          </div>
        </div>

        <div class="content">
          <p>
            {{ composter.fields.adresse }} <br />
            {{ composter.fields.lieu }}
          </p>
          <h3 v-if="userLocation && userLocation.latitude != 0">
            {{
              calcDistance(
                userLocation.latitude,
                userLocation.longitude,
                composter.fields.location[0],
                composter.fields.location[1]
              )
            }}km
          </h3>
          <a :href="composter.fields.lien" target="out">
            <button class="button is-primary">
              Consulter site web
            </button>
          </a>
          <br />
          <a :href="googleMapsLink" target="out">
            <button class="button is-info">
              Ouvrir dans Google Maps
            </button>
          </a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Composter",
  props: {
    composter: {},
    userLocation: {},
  },
  data() {
    return {
      image: "./assets/img/compost1.png",
    };
  },
  computed: {
    googleMapsLink() {
      return (
        "https://maps.google.com/?q=" +
        this.composter.fields.location[0] +
        "," +
        this.composter.fields.location[1]
      );
    },
  },
  methods: {
    //This function takes in latitude and longitude of two location and returns the distance between them as the crow flies (in km)
    calcDistance(lat1, lon1, lat2, lon2) {
      var R = 6371; // km
      var dLat = this.toRad(lat2 - lat1);
      var dLon = this.toRad(lon2 - lon1);
      lat1 = this.toRad(lat1);
      lat2 = this.toRad(lat2);
      var a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.sin(dLon / 2) *
          Math.sin(dLon / 2) *
          Math.cos(lat1) *
          Math.cos(lat2);
      var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
      var d = R * c;
      return Math.round(d);
    },
    // Converts numeric degrees to radians
    toRad(Value) {
      return (Value * Math.PI) / 180;
    },
  },
};
</script>

<style scoped>
.composter {
  padding: 10px;
}
.composter-quartier {
  background-color: #7ab2df;
  margin: 10px;
}
.composter-residence {
  background-color: #39a079;
  margin: 10px;
}
</style>