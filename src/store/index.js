import { createStore } from 'vuex';

const state = {
    user: null
};

const store = createStore({
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
