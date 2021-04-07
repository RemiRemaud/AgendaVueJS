<template>
  <section class="hero">
    <div class="hero-body">
      <div class="container">
        <h1 class="title">
          Agenda des évènements de la ville de Nantes
        </h1>
        <!-- Image d'accueil -->
        <div class="card-image has-text-centered">
          <figure class="image is-256x256 is-inline-block">
            <img
              src = "../assets/homePageImage.jpg"
              alt = "../assets/event.png"
            />
          </figure>
        </div>
        <h2 class="subtitle">
          Accédez aux événements proche de chez vous !
        </h2>
        <!-- Bouton de redirection vers la liste des événements -->
        <v-btn
            class="button is-primary is-rounded"
            @click="showEvents()"
        >
            <span class="icon is-left is-small">
            </span>
            Consulter la liste d'événements
        </v-btn>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: "HomePage",
  methods: {
    //Redirige vers la liste des événements
    showEvents() {
      this.$router.push({
        name: "ListEvents",
      });
    },
  },
};
</script>