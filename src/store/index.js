import { createStore } from 'vuex';
import createPersistedState from 'vuex-persistedstate';

const state = {
    user: null
};

const store = createStore({
    plugins: [createPersistedState({
        storage: window.sessionStorage,
    })],
    state,
    getters: {
        user: (state) => {
            return state.user;
        }
    },
    actions: {
        setUser(context, user){
            context.commit("user", user);
        }
    },
    mutations: {
        user(state, user) {
            state.user = user;
        }
    },
});

export default store;
