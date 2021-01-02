import { createStore } from 'vuex'

const store = createStore({
    state: {
        loggedUser : null
    },
    mutations: {
        LoginUser(state, payload) {
            let name = payload.name 
            payload.name = name[0].toUpperCase() + name.slice(1)
            state.loggedUser = payload
        },
        LogOutUser(state) {
            state.loggedUser = null
        }
    },

    actions: {},
    modules: {},

    getters: {
        GetUserInfo(state) {
            return state.loggedUser
        },
        
        GetUserName(state) {
            if(!state.loggedUser) {
                return "Stranger"
            }

            return state.loggedUser.name;          
        },

        GetUserPhone(state) {
            return state.loggedUser.phone
        },

        GetUserCity(state) {
            return state.loggedUser.city
        },
        
        GetUserEmail(state) {
            return state.loggedUser.email
        },

        isLoggedIn(state) {
            return state.loggedUser ? true : false; 
        }

    }
});

export default store