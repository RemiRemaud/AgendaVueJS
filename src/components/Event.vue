<template>
  <div class="event">
      <div class="card-content">
        <div class="media">
          <div class="media-left">
            <figure class="image is-48x48">
              <img :src="image" v-on:mouseover="removeFirstOpeningSchedule" />
            </figure>
          </div>
          <div class="media-content">
            <p class="title is-4">{{ event.fields.nom }}</p>
            <p class="subtitle is-6">{{ event.fields.rubrique }}</p>
          </div>
        </div>

        <div class="content">
          <p>
            {{ event.fields.ville }} <br />
            {{ event.fields.lieu_quartier }} <br />
            {{ event.fields.adresse }} <br />
            {{ event.fields.lieu }}
          </p>

          <a :href="event.fields.lien" target="out">
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
</template>

<script>
export default {
  name: "Event",
  props: {
    event: {},
  },
  data() {
    return {
      image: "./assets/event.png",
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
</style>
