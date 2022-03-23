import { compileTemplate } from "@vue/compiler-sfc"

export default {
    login() {

    },
    async signup(context, payload) {
        const response = await fetch(
            'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyB7w8XRlWq2EswROuXZFSKuiW7_RbjL2Kg',{
                method: 'POST',
                body: JSON.stringify({
                    email: payload.email,
                    password: payload.password,
                    returnSecureToken: true
                })
            }
        )

        const responseData = await response.json

        if (!response.ok) {
            const error = new Error(responseData.message || 'Failed to authenticate')
            throw error
        }

        context/compileTemplate('setUser', {
            token: responseData.idToken,
            userId: responseData.localId,
            tokenExpiration: responseData.tokenExpiration
        })
    }
}