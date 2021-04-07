<template>
 <div>
  <div>
    <label for="uname"> Supprimer le favori N°  :</label>
    <input type="text" id="uname" name="name" @keypress.enter="deleteFavoris()">
  </div>
  <div class="columns is-multiline">
    <Event
      v-for="event in events"
      :key="event.id"
      class="column is-half-tablet is-one-third-desktop is-one-quarter-widescreen"
      :event="event"
    />
   </div> 
  </div>
</template>

<script>

import axios from "axios";
import Event from "./Event.vue"
import {ArrayOfId} from "../variables/variables.js"
import { Plugins } from "@capacitor/core";
const { LocalNotifications } = Plugins;

export default {
  name: "EventsList",
  components: {
    Event,
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
        this.events = response.data.records.filter((record) => ArrayOfId.indexOf(record.recordid) > -1)
      }) 
      .catch((error) => {
        console.log(error);
      });
  },
  methods: {
    deleteFavoris () {
      
      if (parseInt(document.getElementById('uname').value) >= 0 && parseInt(document.getElementById('uname').value) <= ArrayOfId.length) {
        ArrayOfId.splice(parseInt(document.getElementById('uname').value) - 1, 1)
        this.localNotifsSuppr()
        this.$router.push({
          name: 'ListEvents'
        });
      } else {
        alert('Suppression impossible, vérifier le N° renseigné')
      }
    },
    async localNotifsSuppr(){
      await LocalNotifications.requestPermission();
      await LocalNotifications.schedule({
        notifications: [{
          title: 'Evènement supprimé des favoris',
          body: 'Dommage, vous finirez par trouver un évènement qui vous plait',
          id: '1',
        }]
      });
    }
  }
};
</script>
