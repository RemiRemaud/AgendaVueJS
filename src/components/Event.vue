<template>
  <div class="event">
    <div
      class="card"
      :class="{
        'event-normal':
          event.fields.annule.indexOf('on') > -1,
        'event-report':
          event.fields.reporte.indexOf('ui') > -1,
        'event-cancel':
          event.fields.annule.indexOf('ui') > -1,
      }"
    >
      <div class="card-image has-text-centered">
        <figure class="image is-256x256 is-inline-block">
          <img
            :src = event.fields.media_url
            :alt = image
          />
        </figure>
      </div>
      <div class="card-content">
        <div class="media">
          <div class="media-content">
            <p class="title is-4">{{ event.fields.nom }}</p>
            <p class="subtitle is-6">{{ event.fields.rubrique }}</p>
          </div>
        </div>

        <div class="content">
          <p>
            {{ event.fields.ville }} <br />
            {{ event.fields.lieu_quartier }} <br />
            {{ event.fields.lieu }}
          </p>
          <p v-if="event.fields.adresse.indexOf('.')">
            {{ event.fields.adresse }} 
          </p>
          <p> 
            {{ event.fields.date }} : {{ event.fields.heure_debut }}
          </p>

          <h3 v-if="userLocation && userLocation.latitude != 0">
            {{
              calcDistance(
                userLocation.latitude,
                userLocation.longitude,
                event.fields.location
              )
            }}km
          </h3>

          <a :href="event.fields.lien_agenda" target="out">
            <button class="button is-link is-outlined">
              Consulter site web
            </button>
          </a>
          <br />
          <a :href="googleMapsLink" target="out">
            <button class="button is-link is-outlined">
              Ouvrir dans Google Maps
            </button>
          </a>
          <br />
          <a :href="$router" target="out">
            <button class="button is-link is-outlined">
              Ajouter aux favoris
            </button>
          </a>
        </div>
      </div>
    </div>
  </div>  
</template>

<script>
export default {
  name: "Event",
  props: {
    event: {},
    userLocation: {},
  },
  data() {
    return {
      image: "../assets/event.png",
    };
  },
  computed: {
    googleMapsLink() {
      return (
        "https://maps.google.com/?q=" +
        this.event.fields.location
      );
    },
  },
  methods: {
    //This function takes in latitude and longitude of two location and returns the distance between them as the crow flies (in km)
    calcDistance(lat1, lon1, coord) {
      var R = 6371; // km
      var tab = coord.split(",");
      var lat2 = tab[0];
      var lon2 = tab [1];
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
.event {
  padding: 10px;
}
.event-normal {
  background-color: #a5ec6a;
  margin: 10px;
}
.event-report {
  background-color: #ffbe32;
  margin: 10px;
}
.event-cancel {
  background-color: #ff0000;
  margin: 10px;
}
</style>
