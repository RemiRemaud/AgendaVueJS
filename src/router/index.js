import { createRouter, createWebHistory } from 'vue-router'
import HomePage from '../components/HomePage.vue'
import ListEvents from '../components/ListEvents.vue'
import EventDetailPage from '../components/EventDetailPage.vue'
import Favoris from '../components/Favoris.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: HomePage
  },
  {
    path: '/event-detail/:id',
    name: 'EventDetails',
    props: true,
    component: EventDetailPage
  },
  {
    path:'/events',
    name: 'ListEvents',
    component: ListEvents
  },
  {
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