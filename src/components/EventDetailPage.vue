<template>
  <div >
    <h1 class="title is-2">Détails de l'évènement</h1>
    <Event v-if="!isLoading" :event="event" />
    <p v-else>Chargement en cours...</p>
  </div>
</template>

<script>
import Event from "./Event.vue";
import axios from "axios";

export default {
  name: "EventDetailPage",
  props: {
    id: String,
  },
  data() {
    return {
      isLoading: true,
      isDetailPage: true,
      event: {},
    };
  },
  components: {
    Event,
  },
  mounted() {
    axios
      .get(
        "https://data.nantesmetropole.fr/api/records/1.0/search/?dataset=244400404_agenda-evenements-nantes-nantes-metropole&q=&rows=100"
      )
      .then((response) => {
        var eventWithId = response.data.records.filter(
          (record) => record.recordid == this.id
        );
        if (eventWithId.length > 0) {
          this.event = eventWithId[0];
          this.isLoading = false;
        }
      })
      .catch((error) => {
        console.log(error);
      });
  },
};
</script>
