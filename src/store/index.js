import { createStore } from 'vuex';
import createPersistedState from 'vuex-persistedstate';

const state = {
    user: null,
    userDataToEdit: null,
};

const store = createStore({
    plugins: [createPersistedState({
        storage: window.sessionStorage,
    })],
    state,
    getters: {
        user: (state) => {
            return state.user;
        },
        userDataToEdit: (state) => {
            return state.userDataToEdit;
        }
    },
    actions: {
        setUser(context, user){
            context.commit("user", user);
        },
        setUserDataToEdit: (context, userDataToEdit) => {
            context.commit("userDataToEdit", userDataToEdit);
        }
    },
    mutations: {
        user(state, user) {
            state.user = user;
        },
        userDataToEdit(state, userDataToEdit) {
            state.userDataToEdit = userDataToEdit;
        }
    },
});

export default store;
