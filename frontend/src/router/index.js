import { createWebHistory, createRouter } from "vue-router";
import MainContainer from '../components/MainContainer'
import Authorization from '../components/Authorization'
import Registration from '../components/Registration'
import UserPage from '../components/UserPage'
import AdvertisementPage from '../components/AdvertisementPage'
import ReviewPage from '../components/ReviewPage'
import EditAdvertisement from '../components/EditAdvertisement'

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
},

{
    path: '/advertisement/edit/:id',
    name : 'edit_page',
    component : EditAdvertisement
}
];


const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;