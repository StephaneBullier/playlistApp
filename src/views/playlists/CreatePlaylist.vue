<template>
    <form @submit.prevent="handleSubmit">
        <h4>Create new playlist</h4>
        <label>
            <input type="text" required placeholder="Playlist title" v-model="title">
        </label>
        <label>
            <textarea required placeholder="Playlist description" v-model="description"></textarea>
        </label>
        <label for="cover">Upload playlist cover image</label>
        <input type="file" id="cover">
        <div class="error" v-if="error">{{ error }}</div>
        <button>Create</button>
    </form>
</template>

<script>
import {ref} from 'vue';

export default {
    name: 'CreatePlaylist',
    setup() {
        const title = ref('')
        const description = ref('')

        const handleSubmit = () => {
            console.log(title.value, description.value)
        }

        return { title, description, handleSubmit }
    }
}
</script>

<style scoped>
form {
    background: white;
}
input[type="file"] {
    border: 0;
    padding: 0;
}
label {
    font-size: 12px;
    display: block;
    margin-top: 30px;
}
button {
    margin-top: 20px;
}
</style>
