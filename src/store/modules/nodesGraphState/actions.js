import {resolveNode} from '../../../nodeBehaviours/behaviours';

export const actions = {
    updateFormElem({commit}, e){
        commit('updateFormElem', e);
    },
    createNode({commit}, blueprintKey) {
        commit('createNode', blueprintKey);
    },
    deleteNode({commit}, node) {
        commit('deleteNode', node);
    },
    connect({commit}, plugs) {
        commit('connect', plugs)
    },
    disconnect({commit}, input) {
        commit('disconnect', input);
    },
    moveNode({commit}, e) {
        commit('moveNode', e);
    },
};
