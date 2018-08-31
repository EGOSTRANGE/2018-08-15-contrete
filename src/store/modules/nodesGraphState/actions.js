export const actions = {
    createNode({commit}, blueprintKey) {
        commit('createNode', blueprintKey);
    },
    deleteNode({commit}, node) {
        commit('deleteNode', node);
    },
    connect({commit}, plugs) {
        commit('connect', plugs);
    },
    disconnect({commit}, input) {
        commit('disconnect', input);
    },
    moveNode({commit}, e) {
        commit('moveNode', e);
    },
    updateFormElem({commit}, e) {
        commit('updateFormElem', e);
    },
};
