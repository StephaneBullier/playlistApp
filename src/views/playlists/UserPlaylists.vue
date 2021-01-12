<template>
    <div class="user-playlists">
        <h2>My playlists</h2>
        <div v-if="playlists">
            <list-view :playlists="playlists" />
        </div>
    </div>
</template>

<script>
import ListView from '@/components/ListView';
import getUser from '@/composables/getUser'
import getCollection from '@/composables/getCollection';

export default {
    name: "UserPlaylists",
    components: { ListView },
    setup() {
        const { user } = getUser()
        const { documents: playlists } = getCollection(
            'playlists',
            ['userId', '==', user.value.uid]
        )

        return { playlists }
    }
}
</script>

<style scoped>

</style>
