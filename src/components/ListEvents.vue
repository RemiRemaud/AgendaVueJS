<template>
  <div class="columns is-multiline">
    <!-- Barre de recherche -->
    <input class="input is-medium"  type="text"  v-on:keyup="searchEvent" v-model="recherche" placeholder="Rechercher un évènement">
    <!-- Boucle sur tous les événements pour les afficher -->
    <Event
      v-for="event in events"
      :key="event.id"
      class="column is-half-tablet is-one-third-desktop is-one-quarter-widescreen"
      :event="event"
      :userLocation="currentUserLocation"
      @click="showEventDetails(event)"
    />
  </div>
  
</template>

<script>
import Event from "./Event.vue";
import axios from "axios";
import { Plugins } from "@capacitor/core";
const { Geolocation } = Plugins;


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
      currentUserLocation: { latitude: 0, longitude: 0 },
    };
  },
  mounted() {
    // Permet de récupérer la liste des événements via un appel à l'API
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

      // Récupère la position de l'utilisateur
      Geolocation.getCurrentPosition().then((location) => {
        this.currentUserLocation = location.coords;
      });
  },
  methods: {
    // Amène sur la page EventDetails après un clique sur un Event
    showEventDetails(event) {
      this.$router.push({
        name: "EventDetails",
        params: { id: event.recordid },
      });
    },
    // Appel à l'API et filtrage sur les événements dont les titres matche avec la recherche
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
