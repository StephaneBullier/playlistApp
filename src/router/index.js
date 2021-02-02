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
        meta: {
            title: 'Page d\'accueil - Ninja Playlist App',
            metaTags: [
                {
                    name: 'description',
                    content: "Application Ninja playlist, l'appli qui vous permet d'enregistrer vos playlists"
                }
            ]
        },
        beforeEnter: requireAuth
    },
    {
        path: '/login',
        name: 'Login',
        meta: {
            title: 'Page de connexion - Ninja Playlist App',
            metaTags: [
                {
                    name: 'description',
                    content: "Utiliser ce formulaire pour vous connecter à votre compte utilisateur"
                }
            ]
        },
        component: () => import(/* webpackChunkName: "login" */ '@/views/auth/Login')
    },
    {
        path: '/signup',
        name: 'Signup',
        meta: {
            title: 'Page d\'inscription - Ninja Playlist App',
            metaTags: [
                {
                    name: 'description',
                    content: "Utiliser ce formulaire pour créer votre compte utilisateur"
                }
            ]
        },
        component: () => import(/* webpackChunkName: "signup" */ '@/views/auth/Signup')
    },
    {
        path: '/playlists/create',
        name: 'CreatePlaylist',
        meta: {
            title: 'Création d\'une playlist - Ninja Playlist App',
            metaTags: [
                {
                    name: 'description',
                    content: "Utiliser ce formulaire créer une playlist"
                }
            ]
        },
        component: () => import(/* webpackChunkName: "createPlaylist" */ '@/views/playlists/CreatePlaylist'),
        beforeEnter: requireAuth
    },
    {
        path: '/playlists/:id',
        name: 'PlaylistDetails',
        meta: {
            title: 'Détails d\'une playlist - Ninja Playlist App',
        },
        component: () => import(/* webpackChunkName: "playlistDetails" */ '@/views/playlists/PlaylistDetails'),
        beforeEnter: requireAuth,
        props: true
    },
    {
        path: '/playlists/user',
        name: 'UserPlaylists',
        meta: {
            title: 'Compte utilisateur - Ninja Playlist App',
        },
        component: () => import(/* webpackChunkName: "userPlaylists" */ '@/views/playlists/UserPlaylists'),
        beforeEnter: requireAuth,
    }
]

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes
})

router.beforeEach((to, from, next) => {
    const nearestWithTitle = to.matched.slice().reverse().find(r => r.meta && r.meta.title);
    const nearestWithMeta = to.matched.slice().reverse().find(r => r.meta && r.meta.metaTags);
    if (nearestWithTitle) document.title = nearestWithTitle.meta.title;

    Array.from(document.querySelectorAll('[data-vue-router-controlled]')).map(el => el.parentNode.removeChild(el));

    if (!nearestWithMeta) return next();

    nearestWithMeta.meta.metaTags.map(tagDef => {
        const tag = document.createElement('meta');
        Object.keys(tagDef).forEach(key => {
            tag.setAttribute(key, tagDef[key]);
        });
        tag.setAttribute('data-vue-router-controlled', '');

        return tag;
    })
        .forEach(tag => document.head.appendChild(tag));
    next();
});

export default router
