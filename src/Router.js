import Vue from "vue";
import VueRouter from 'vue-router'

import Home from './components/layouts/Home.vue'
import HW2 from './components/layouts/HW2.vue'
import HW3 from './components/layouts/HW3.vue'
import Users from './components/layouts/Users.vue'

Vue.use(VueRouter);


export default new VueRouter({

    mode: "history",
    routes: [
        {
            path:'/',
            component: Home
        },
        {
            path:'/hw2',
            component: HW2
        },
        {
            path:'/hw3',
            component: HW3
        },
        {
            path:'/users',
            component: Users
        }
    ]
});