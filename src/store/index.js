import { createStore } from 'vuex';
import createPersistedState from 'vuex-persistedstate';

const state = {
    user: null,
    userDataToEdit: null,
    queryUrlForEntity: null
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
        },
        queryUrlForEntity: (state) => {
            return state.queryUrlForEntity;
        }
    },
    actions: {
        setUser(context, user){
            context.commit("user", user);
        },
        setUserDataToEdit: (context, userDataToEdit) => {
            context.commit("userDataToEdit", userDataToEdit);
        },
        setQueryUrlForEntity: (context, queryUrlForEntity) => {
            context.commit("queryUrlForEntity", queryUrlForEntity);
        }
    },
    mutations: {
        user(state, user) {
            state.user = user;
        },
        userDataToEdit(state, userDataToEdit) {
            state.userDataToEdit = userDataToEdit;
        },
        queryUrlForEntity(state, queryUrlForEntity) {
            state.queryUrlForEntity = queryUrlForEntity;
        }
    },
});

export default store;
