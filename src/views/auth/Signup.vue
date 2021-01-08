<template>
    <form @submit.prevent="handleSubmit">
        <h3>Signup</h3>
        <label>
            <input type="text" placeholder="Display name" v-model="displayName">
        </label>
        <label>
            <input type="email" placeholder="Email" v-model="email">
        </label>
        <label>
            <input type="password" placeholder="Password" v-model="password">
        </label>
        <div class="error" v-if="error">{{error}}</div>
        <button v-if="!isPending">Sign up</button>
        <button v-if="isPending" disabled>Loading</button>
    </form>
</template>

<script>
import useSignup from '@/composables/useSignup';
import {ref} from 'vue';

export default {
    name: "Signup",
    setup() {
        const { error, isPending, signup } = useSignup()
        const displayName = ref('')
        const email = ref('')
        const password = ref('')

        const handleSubmit = async () => {
            await signup(email.value, password.value, displayName.value)
        }

        return { error, isPending, displayName, email, password, handleSubmit }
    }
}
</script>

<style scoped>

</style>
