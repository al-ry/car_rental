import { createStore } from 'vuex'

const store = createStore({
    state: {
        loggedUser : null
    },
    mutations: {
        LoginUser(state, payload) {
            state.loggedUser = payload
        },
        LogOutUser(state) {
            
            state.loggedUser = null
        }
    },

    actions: {},
    modules: {},

    getters: {
        GetUserName(state) {
            if(!state.loggedUser) {
                return "Stranger"
            }
            return state.loggedUser.name
        },

        GetUserPhone(state) {
            return state.loggedUser.phone
        },

        LoginState(state) {
            return state.loggedUser ? false : true; 
        }

    }
});

export default store