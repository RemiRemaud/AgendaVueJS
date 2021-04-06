<template>
   <Event
      v-for="event in events"
      :key="event.id"
      class="column is-half-tablet is-one-third-desktop is-one-quarter-widescreen"
      :event="event"
    />
</template>

<script>

import axios from "axios";
import Event from "./Event.vue"

export default {
  name: "EventsList",
  components: {
    Event,
  },
   props: {
    pref: Array()
  },
  data() {
    return {
      nextEventId: 1,
      isLoading: true,
      events: new Array(),
      isDetailPage: false,
      rechercheEvent: new Array(),
    };
  },
  mounted() {
    axios
      .get(
        "https://data.nantesmetropole.fr/api/records/1.0/search/?dataset=244400404_agenda-evenements-nantes-nantes-metropole&q=&rows=100"
      )
      .then((response) => {
        this.events = response.data.records.filter((record) => this.pref.indexOf(record.recordid) > -1)
      }) 
      .catch((error) => {
        console.log(error);
      });
  },
};
</script>
