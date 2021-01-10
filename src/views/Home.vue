<template>
    <div class="home">
        <div class="error" v-if="error">Les données ne peuvent pas être récupérées.</div>
        <div v-if="documents">
             <list-view :playlists="documents"></list-view>
        </div>
    </div>

</template>

<script>
import getCollection from '@/composables/getCollection'
import ListView from '@/components/ListView';

export default {
    name: 'Home',
    components: { ListView },
    setup() {
        const { documents, error } = getCollection('playlists')

        return { documents, error }
    }
}
</script>
