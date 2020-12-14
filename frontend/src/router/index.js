import { createWebHistory, createRouter } from "vue-router";
import MainContainer from '../components/MainContainer.vue'
import Authorization from '../components/Authorization.vue'
import Registration from '../components/Registration.vue'
import UserPage from '../components/UserPage.vue'
import AdvertisementPage from '../components/AdvertisementPage.vue'

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
    path: '/advertisement',
    name: 'advertisement',
    component : AdvertisementPage,
    props: true 
}
];


const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;