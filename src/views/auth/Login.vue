<template>
    <form @submit.prevent="handleSubmit">
        <h3>Login</h3>
        <label>
            <input type="email" placeholder="email" v-model="email">
        </label>
        <label>
            <input type="password" placeholder="password" v-model="password">
        </label>
        <div class="error" v-if="error">{{error}}</div>
        <button v-if="!isPending">Log in</button>
        <button v-if="isPending" disabled>Loading</button>
    </form>
</template>

<script>
import useLogin from '@/composables/useLogin'
import {ref} from 'vue'
import { useRouter } from 'vue-router'

export default {
    name: "Login",
    setup() {
        const { error, isPending, login } = useLogin()
        const router = useRouter()

        const email = ref('')
        const password = ref('')

        const handleSubmit = async () => {
            await login(email.value, password.value)
            if (!error.value) {
                await router.push({name: 'UserPlaylists'})
            }
        }

        return { error, email, password, isPending, handleSubmit }
    }
}
</script>


