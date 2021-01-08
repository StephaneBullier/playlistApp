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
        <input type="file" id="cover" @change="handleChange">
        <div class="error" v-if="fileError">{{ fileError }}</div>
        <div class="error" v-if="error"></div>
        <button v-if="!isPending">Create</button>
        <button v-else disabled>Saving...</button>
    </form>
</template>

<script>
import {ref} from 'vue'
import useStorage from '@/composables/useStorage'
import useCollection from '@/composables/useCollection'
import getUser from '@/composables/getUser'
import { timestamp } from '@/firebase/config'

export default {
    name: 'CreatePlaylist',
    setup() {
        const { url, filePath, uploadImage } = useStorage()
        const { error, addDoc } = useCollection('playlists')
        const { user } = getUser()

        const title = ref('')
        const description = ref('')
        const file = ref(null)
        const fileError = ref(null)
        const isPending = ref(false)

        const handleSubmit = async () => {
            if (file.value) {
                isPending.value = true
                await uploadImage(file.value)
                await addDoc({
                    title: title.value,
                    description: description.value,
                    userId: user.value.uid,
                    userName: user.value.displayName,
                    coverUrl: url.value,
                    filePath: filePath.value,
                    songs: [],
                    createdAt: timestamp
                })
                isPending.value = false
                if (!error.value) {
                    console.log('playlist ')
                }
            }
        }

        // Allow file types
        const types = ['image/png', 'image/jpeg']

        const handleChange = (event) => {
            const selectedImage = event.target.files[0]
            if (selectedImage && types.includes(selectedImage.type)) {
                file.value = selectedImage
                fileError.value = null
            } else {
                file.value = null
                fileError.value = 'Please select an image file (png or jpg)'
            }
        }

        return { title, description, fileError, handleSubmit, handleChange, isPending }
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
