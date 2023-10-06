import { createStore } from 'vuex';
import createPersistedState from 'vuex-persistedstate';

const state = {
    user: null,
    entities: {
        students: null,
        professors: null,
        coordinators: null,
        courses: null,
        grades: null,
    },
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
        getEntityData: (state) => (entityName) => {
            return state.entities[entityName];
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
        setEntityData(context, { entityName, data }) {
            context.commit("setEntityData", { entityName, data });
        },
        deleteUser(context, { entityName, userIdToRemove }) {
            context.commit("removeUserFromEntity", { entityName, userIdToRemove });
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
        setEntityData(state, { entityName, data }) {
            state.entities[entityName] = data;
        },
        removeUserFromEntity(state, { entityName, userIdToRemove }) {
            if (state.entities[entityName]) {
                state.entities[entityName] = state.entities[entityName].filter(user => user.id !== userIdToRemove);
            }
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
