import { createWebHistory, createRouter } from "vue-router";
import MainContainer from '../components/MainContainer.vue'
import Authorization from '../components/Authorization.vue'
import Registration from '../components/Registration.vue'
import UserPage from '../components/UserPage.vue'
import AdvertisementPage from '../components/AdvertisementPage.vue'
import ReviewPage from '../components/ReviewPage'

const routes = [{
    path: '/', 
    name: 'main_page',
    component: MainContainer
},

{
    path: '/login',
    name: 'authorization',
    component: Authorization
},
{
    path: '/registration',
    name: 'registration',
    component: Registration
},
{
    path: '/user_page',
    name: 'user_page',
    component : UserPage
},
{
    path: '/user_page',
    name: 'user_page',
    component : UserPage
},

{
    path: '/advertisement/:id',
    name: 'advertisement',
    component : AdvertisementPage,
},

{
    path: '/renterReview/:phone',
    name: 'review_page',
    component : ReviewPage,
}
];


const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;