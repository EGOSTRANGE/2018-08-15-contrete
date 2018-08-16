// import {serverRequest} from '../utils/serverInteraction';
// import {serverResponse} from '../utils/serverInteraction';

export const actions = {
    createNode({commit}, blueprint) {
        console.log('GGGGGGGGGGGGGGGG');
        console.log(blueprint);
        commit('createNode',blueprint);
        // serverResponse('createNode', {key}, blueprint, commit);
    },
    deleteNode({commit}, node) {
        commit('deleteNode', node);
        // serverRequest('deleteNode', {nodeId: node.id}, node, commit);
    },
    connect({commit}, plugs) {
        commit('connect',plugs)
        // serverRequest('connect', {
        // 	inputId: input.id,
        // 	outputId: output.id
        // }, {input, output}, commit);
    },
    disconnect({commit}, input) {
        commit('disconnect',input);
        // serverRequest('disconnect', {inputId: input.id}, input, commit);
    },
    moveNode({commit}, event) {
        commit('moveNode', event);
        // serverRequest('moveNode', {
        // 	nodeId: node.id,
        // 	newPosition
        // }, {node, newPosition}, commit);
    },
    // updateFormElem({commit}, {formElem, value, type}) {
    //     // serverRequest('updateFormElem', {
    //     // 	formElemId: formElem.id,
    //     // 	value: value,
    //     // 	type: type
    //     // }, {formElem, value, type}, commit);
    // },
    evaluate({commit}, node) {
        // serverResponse('evaluate', {
        // 	nodeId:node.id,
        // }, vueNode, commit);
        commit('evaluate',node);
    }
};
