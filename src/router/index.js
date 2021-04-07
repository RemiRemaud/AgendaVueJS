// Ensemble des imports nécessaire au fichier
import { createRouter, createWebHistory } from 'vue-router'
import HomePage from '../components/HomePage.vue'
import ListEvents from '../components/ListEvents.vue'
import EventDetailPage from '../components/EventDetailPage.vue'
import Favoris from '../components/Favoris.vue'

const routes = [
  {
    // Route pour la page d'accueil
    path: '/',
    name: 'Home',
    component: HomePage
  },
  {
    // Route pour la page EventDetailPage / L'id sera affiché dans l'url
    path: '/event-detail/:id',
    name: 'EventDetails',
    props: true,
    component: EventDetailPage
  },
  {
    // Route pour la page ListEvents
    path:'/events',
    name: 'ListEvents',
    component: ListEvents
  },
  {
    // Route pour la page favoris
    path:'/favoris',
    name: 'Favoris',
    props: true,
    component: Favoris
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})
export default router