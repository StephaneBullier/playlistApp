<template>
    <nav class="navbar">
        <img src="@/assets/ninja.png" alt="ninja">
        <h1><router-link :to="{ name: 'Home' }">Ninja Playlist App</router-link></h1>
        <div class="links">
            <div v-if="user">
                <router-link :to="{ name: 'CreatePlaylist' }">Create playlist</router-link>
                <router-link :to="{ name: 'UserPlaylists' }">My playlists</router-link>
                <span>Hi here, {{ user.displayName }}</span>
                <button @click="handleLogout" >Logout</button>
            </div>
            <div v-else>
                <router-link class="btn" :to="{ name: 'Signup' }">Sign up</router-link>
                <router-link class="btn" :to="{ name: 'Login' }">Login</router-link>
            </div>
        </div>
    </nav>
</template>

<script>
import getUser from '@/composables/getUser'
import useLogout from '@/composables/useLogout'
import { useRouter } from 'vue-router'

export default {
    name: 'Navbar',
    setup() {
        const { user } = getUser()
        const { logout } = useLogout()
        const router = useRouter()
        const handleLogout = async () => {
            await logout()
            await router.push({name: 'Login'})
        }

        return { handleLogout, user }
    }
}
</script>

<style scoped>
.navbar {
    padding: 16px 10px;
    margin-bottom: 60px;
    background: white;
}
nav {
    display: flex;
    align-items: center;
    max-width: 1200px;
    margin: 0 auto;
}
nav img {
    max-height: 60px;
}
nav h1 {
    margin-left: 20px;
}
nav .links {
    margin-left: auto;
}
nav .links a, button {
    margin-left: 16px;
    font-size: 14px;
}
span {
    font-size: 0.9rem;
    display: inline-block;
    margin-left: 1rem;
    padding-left: 1rem;
    border-left: 1px solid #eee;
}
</style>
