<template>
    <div class="home">
        <div class="error" v-if="error">Les données ne peuvent pas être récupérées.</div>
        <div v-if="documents">
            <div v-for="playlist in documents" :key="playlist.id">
                <h2>{{ playlist.title }}</h2>
            </div>
        </div>
    </div>

</template>

<script>
import getCollection from '@/composables/getCollection'
export default {
    name: 'Home',
    setup() {
        const { documents, error } = getCollection('playlists')

        return { documents, error }
    }
}
</script>
