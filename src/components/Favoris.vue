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

// Import pour récupérer les données de l'API Rest
import axios from "axios";
// Import du composant Event.vue
import Event from "./Event.vue"
// Import de la variable globale ArrayOFId servant à stocker l'ensemble des id 
// des événements ajoutés aux favoris
import {ArrayOfId} from "../variables/variables.js"
// Import du plugin LocalNotifications via Capacitor
import { Plugins } from "@capacitor/core";
const { LocalNotifications } = Plugins;

export default {
  name: "EventsList",
  components: {
    Event,
  },
  data() {
    return {
      // Tableau contenant les événements à afficher
      events: new Array(),
    };
  },
  mounted() {
    axios
      .get(
        "https://data.nantesmetropole.fr/api/records/1.0/search/?dataset=244400404_agenda-evenements-nantes-nantes-metropole&q=&rows=100"
      )
      .then((response) => {
        // Affectation des événements correspondant à l'ensemble des id (ArrayOfId)
        this.events = response.data.records.filter((record) => ArrayOfId.indexOf(record.recordid) > -1)
      }) 
      .catch((error) => {
        console.log(error);
      });
  },
  methods: {
    // Suppression d'un favori
    deleteFavoris () {
      // Si la valeur saisie est comprise entre 0 et le nombre de favoris 
      if (parseInt(document.getElementById('uname').value) >= 1 && parseInt(document.getElementById('uname').value) <= ArrayOfId.length) {
        // Suppression de l'id du tableau servant à contenir les id des événements à afficher
        ArrayOfId.splice(parseInt(document.getElementById('uname').value) - 1, 1)
        // Appel de la fonction localNotfsSuppr pour notifier la suppression
        this.localNotifsSuppr()
        // Redirection vers la page ListEvents
        this.$router.push({
          name: 'ListEvents'
        });
      } else {
        // Message d'erreur pour avertir sur l'erreur de saisie
        alert('Suppression impossible, vérifier le N° renseigné')
      }
    },
    // Fonction pour faire apparaître une notification
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
