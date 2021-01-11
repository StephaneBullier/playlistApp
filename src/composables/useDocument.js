import { ref } from 'vue'
import { projectFirestore } from '@/firebase/config'

const useDocument = (collection, id) => {
    const error = ref(null)
    const isPending = ref(false)

    let docRef = projectFirestore.collection(collection).doc(id)

    const deleteDoc = async () => {
        isPending.value = true
        error.value = null

        try {
            const response = await docRef.delete()
            isPending.value = false
            return response
        } catch (err) {
            isPending.value = false
            error.value = err.message
        }
    }

    const updateDoc = async (updates) => {
        isPending.value = true
        error.value = null

        try {
            const response = await docRef.update(updates)
            isPending.value = false
            return response
        } catch (err) {
            isPending.value = false
            error.value = err.message
        }
    }

    return { error, isPending, deleteDoc, updateDoc }
}

export default useDocument
