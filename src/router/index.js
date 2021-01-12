import {createRouter, createWebHistory} from 'vue-router'
import Home from '@/views/Home'

// route guard
import { projectAuth } from '@/firebase/config';

const requireAuth = (to, from, next) => {
    let user = projectAuth.currentUser

    if (!user) {
        next({ name: 'Login' })
    } else {
        next()
    }
}

const routes = [
    {
        path: '/',
        name: 'Home',
        component: Home,
        beforeEnter: requireAuth
    },
    {
        path: '/login',
        name: 'Login',
        component: () => import(/* webpackChunkName: "login" */ '@/views/auth/Login')
    },
    {
        path: '/signup',
        name: 'Signup',
        component: () => import(/* webpackChunkName: "signup" */ '@/views/auth/Signup')
    },
    {
        path: '/playlists/create',
        name: 'CreatePlaylist',
        component: () => import(/* webpackChunkName: "createPlaylist" */ '@/views/playlists/CreatePlaylist'),
        beforeEnter: requireAuth
    },
    {
        path: '/playlists/:id',
        name: 'PlaylistDetails',
        component: () => import(/* webpackChunkName: "playlistDetails" */ '@/views/playlists/PlaylistDetails'),
        beforeEnter: requireAuth,
        props: true
    },
    {
        path: '/playlists/user',
        name: 'UserPlaylists',
        component: () => import(/* webpackChunkName: "userPlaylists" */ '@/views/playlists/UserPlaylists'),
        beforeEnter: requireAuth,
    }
]

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes
})

export default router
