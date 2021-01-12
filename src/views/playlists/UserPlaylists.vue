<template>
    <div class="user-playlists">
        My playlists

    </div>
</template>

<script>

import getUser from '@/composables/getUser'
import getCollection from '@/composables/getCollection';

export default {
    name: "UserPlaylists",

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
