import {createWebHistory, createRouter} from 'vue-router'
import HomePage from '../pages/HomePage.vue';
import EditPage from '../pages/EditPage.vue';
import ViewPage from '../pages/ViewPage.vue';
import SignUpPage from '../pages/SignUpPage.vue';
import LoginPage from '../pages/LoginPage.vue';

const routes = [
    {
        name: 'Home',
        path: '/',
        component: HomePage
    },
    {
        name: 'Edit',
        path: '/edit/:id',
        component: EditPage
    },
    {
        name: 'View',
        path: '/view/:id',
        component: ViewPage
    },
    {
        name: 'SignUp',
        path: '/sign-up',
        component: SignUpPage
    },
    {
        name: 'Login',
        path: '/login',
        component: LoginPage
    }
];

const router = createRouter({
    history: createWebHistory(),
    routes
});

export default router