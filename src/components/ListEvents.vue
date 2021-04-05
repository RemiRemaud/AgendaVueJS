<template>
  <div class="columns is-multiline">
    <input class="input is-medium"  type="text"  v-on:keyup="searchEvent" v-model="recherche" placeholder="Rechercher un évènement">
    <Event
      v-for="event in events"
      :key="event.id"
      class="column is-half-tablet is-one-third-desktop is-one-quarter-widescreen"
      :event="event"
      @click="showEventDetails(event)"
    />
  </div>
  
</template>

<script>
import Event from "./Event.vue";
import axios from "axios";

export default {
  name: "EventsList",
  components: {
    Event,
  },
  data() {
    return {
      nextEventId: 1,
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
        this.events = response.data.records;
        this.rechercheEvent = response.data.records;
      })
      .catch((error) => {
        console.log(error);
      });
  },
  methods: {
    showEventDetails(event) {
      this.$router.push({
        name: "EventDetails",
        params: { id: event.recordid },
      });
    },
    searchEvent:function(){
      if(this.recherche != ""){
        this.events = this.rechercheEvent.filter(event=>{
                          return event.fields.nom.toLowerCase().includes(this.recherche.toLowerCase());
                        }
                  );
      }else{
        axios
        .get(
        "https://data.nantesmetropole.fr/api/records/1.0/search/?dataset=244400404_agenda-evenements-nantes-nantes-metropole&q=&rows=100"
      )
      .then((response) => {
        this.events = response.data.records;
      })
      .catch((error) => {
        console.log(error);
      });
      }
    },
  },
};
</script>
