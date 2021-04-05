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
    isDetailPage: Boolean,
  },
  created: function () {
            console.log('user data from parent component:')
            console.log(this.isDetailPage) //prints out an empty string
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
        this.event.fields.location[0] +
        "," +
        this.event.fields.location[1]
      );
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
