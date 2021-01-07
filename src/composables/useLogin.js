import { ref } from 'vue';
import { projectAuth } from '@/firebase/config';

const error = ref(null)
const isPending = ref(false)

const login = async (email, password) => {
    error.value = null
    isPending.value = true
    try {
        const response = await projectAuth.signInWithEmailAndPassword(email, password)
        error.value = null
        isPending.value = false

        return response
    } catch (err) {
        if (err.code === 'auth/user-not-found') {
            error.value = 'Il n\'y a pas d\'enregistrement d\'utilisateur correspondant à cet identifiant.'
        }
        else {
            error.value = err.message
        }
        isPending.value = false
    }
}

const useLogin = () => {
    return { error, isPending, login }
}

export default useLogin
