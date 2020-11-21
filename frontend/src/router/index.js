import { createWebHistory, createRouter } from "vue-router";
import MainContainer from '../components/MainContainer.vue'
import Authorization from '../components/Authorization.vue'
import Registration from '../components/Registration.vue'

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
}
];


const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;