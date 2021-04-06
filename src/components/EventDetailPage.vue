<template>
  <div>
    <h1 class="title is-2">Détails de l'évènement</h1>
    <div>
        <Event v-if="!isLoading" :event="event" />
        <p v-else>Chargement en cours...</p>
    </div>
    <div class="field has-addons">
        <v-btn
            class="button is-primary is-rounded control has-icons-right"
            @click="showFavoris()"
        >
            <span class="icon is-left is-small">
                <i class="fas fa-lock"></i>
            </span>
            Ajouter aux favoris ! 
        </v-btn>
    </div>
    <div class="field has-addons">
        <v-btn
            class="button is-primary is-rounded control has-icons-right"
            @click="$router.go(-1)"
        >
            <span class="icon is-left is-small">
                <i class="fas fa-lock"></i>
            </span>
            Retour à la liste d'évènements
        </v-btn>
    </div>
  </div>
</template>

<script>
import Event from "./Event.vue";
import axios from "axios";
import {ArrayOfId} from "../variables/variables.js"
import { Plugins } from "@capacitor/core";
const { LocalNotifications } = Plugins;

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
      fav: new Array(),
    };
  },
  methods: {
    showFavoris() {
       ArrayOfId.push(this.id)
       this.localNotifs()
       this.$router.push({
        name: 'Favoris'
      });
    },
    async localNotifs(){
      await LocalNotifications.requestPermission();
      await LocalNotifications.schedule({
        notifications: [{
          title: 'Evènement ajouté aux favoris',
          body: 'N\'oubliez pas votre masque et le respect des consignes sanitaires !',
          id: '1',
        }]
      });
    }
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
