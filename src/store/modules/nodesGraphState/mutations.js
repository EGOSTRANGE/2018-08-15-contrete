import {blueprints} from '../../../nodeBehaviours/blueprints';
import {behaviours} from '../../../nodeBehaviours/blueprints';

export const mutations = {
    createInput(state, blueprint) {
        return {
            connectedOutput: null,
            node: null,
            position: {x: 0, y: 0},
            id: state.inputId++,
            blueprint,
        };
    },
    deleteInput(state, input) {
        mutations.disconnect(state, input);
        let inputs = input.node.inputs;
        inputs.splice(inputs.indexOf(input), 1);
    },
    createOutput(state, blueprint) {
        return {
            connectedInputs: [],
            node: null,
            position: {x: 0, y: 0},
            id: state.outputId++,
            blueprint,
        };
    },
    deleteOutput(state, output) {
        while (output.connectedInputs.length > 0)
            mutations.disconnect(state, output.connectedInputs[0]);
        let outputs = output.node.outputs;
        outputs.splice(outputs.indexOf(output), 1);
    },
    createFormElem(state, blueprint) {
        return {
            value: null,
            id: state.formElemId++,
            blueprint,
        };
    },
    deleteFormElem(state, formElem) {
        let formElems = formElem.node.formElems;
        formElems.splice(formElems.indexOf(formElem), 1);
    },
    createNode(state, blueprintKey) {
        let blueprint = blueprints[blueprintKey];
        let newNode = {};
        newNode.blueprint = blueprint;
        let inputs = [];
        blueprint.inputs.map((inputBlueprint) => {
            let input = mutations.createInput(state, inputBlueprint);
            input.node = newNode;
            inputs.push(input);
        });

        let outputs = [];
        blueprint.outputs.map((outputBlueprint) => {
            let output = mutations.createOutput(state, outputBlueprint);
            output.node = newNode;
            outputs.push(output);
        });

        let formElems = [];
        blueprint.formElems.map((formElem) => {
            let newFormElem = mutations.createFormElem(state, formElem);
            newFormElem.node = newNode;
            formElems.push(newFormElem);
        });
        newNode.inputs = inputs;
        newNode.outputs = outputs;
        newNode.formElems = formElems;
        newNode.position = {x: 0, y: 0};
        newNode.id = state.nodeId++;
        newNode.value = null;
        state.nodes.push(newNode);
        return newNode;
    },

    deleteNode(state, node) {
        while (node.inputs.length > 0) {
            mutations.deleteInput(state, node.inputs[0]);
        }
        while (node.outputs.length > 0) {
            mutations.deleteOutput(state, node.outputs[0]);
        }
        while (node.formElems.length > 0) {
            mutations.deleteFormElem(state, node.formElems[0]);
        }
        state.nodes.splice(state.nodes.indexOf(node), 1);
    },

    connect(state, {input, output}) {
        input.connectedOutput = output;
        output.connectedInputs.push(input);
        state.connections.push({input: input, output: output});
        mutations.updateState(state, input.node);
    },

    disconnect(state, input) {
        mutations.updateState(state, input.node);
        console.log(input.node);
        state.connections.splice(state.connections.findIndex(connection => {
            return connection.input === input;
        }), 1);
        if (input.connectedOutput != null) {
            let inputs = input.connectedOutput.connectedInputs;
            inputs.splice(inputs.indexOf(input), 1);
            input.connectedOutput = null;
        }
    },
    updateState(state, node) {
        //update
        node.value = null;

        //spread the word
        node.outputs.map(output => {
            output.connectedInputs.map(({nextNode}) => {
                mutations.updateState(nextNode);
            });
        })
    }
};
