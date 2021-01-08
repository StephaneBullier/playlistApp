<template>
    <form @submit.prevent="handleSubmit">
        <h3>Login</h3>
        <input type="email" placeholder="email" v-model="email">
        <input type="password" placeholder="password" v-model="password">
        <div class="error" v-if="error">{{error}}</div>
        <button v-if="!isPending">Log in</button>
        <button v-if="isPending" disabled>Loading</button>
    </form>
</template>

<script>
import useLogin from '@/composables/useLogin';
import {ref} from 'vue';

export default {
    name: "Login",
    setup() {
        const { error, isPending, login } = useLogin()

        const email = ref('')
        const password = ref('')

        const handleSubmit = async () => {
            return await login(email.value, password.value)
        }

        return { error, email, password, isPending, handleSubmit }
    }
}
</script>


