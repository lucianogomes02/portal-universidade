import { createStore } from 'vuex';

const state = {
    user: null
};

const index = createStore({
    state,
    getters: {
        user: (state) => {
            return state.user;
        }
    },
    actions: {
        setUser(context, user){
            context.commit("user");
        }
    },
    mutations: {
        user(state, user) {
            state.user = user;
        }
    },
});

export default index;
