import {behaviours} from '../../../nodeBehaviours/blueprints';

export const actions = {
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
    moveNode({commit}, event) {
        commit('moveNode', event);
    },
    evaluate({commit}, node) {
        behaviours.node(node);
    },
};
