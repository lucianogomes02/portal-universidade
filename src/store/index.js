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
    modelDataToEdit: null,
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
        modelDataToEdit: (state) => {
            return state.modelDataToEdit;
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
        deleteEntity(context, { entityName, userIdToRemove }) {
            context.commit("removeEntityFromEntities", { entityName, userIdToRemove });
        },
        setModelDataToEdit: (context, modelDataToEdit) => {
            context.commit("modelDataToEdit", modelDataToEdit);
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
        removeEntityFromEntities(state, { entityName, userIdToRemove }) {
            if (state.entities[entityName]) {
                state.entities[entityName] = state.entities[entityName].filter(user => user.id !== userIdToRemove);
            }
        },
        modelDataToEdit(state, modelDataToEdit) {
            state.modelDataToEdit = modelDataToEdit;
        },
        queryUrlForEntity(state, queryUrlForEntity) {
            state.queryUrlForEntity = queryUrlForEntity;
        }
    },
});

export default store;
