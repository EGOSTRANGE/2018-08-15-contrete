export const mutations = {
    createInput(state, blueprint) {
        return {
            label: blueprint.label,
            connectedOutput: null,
            node: null,
            position: {x: 0, y: 0},
            id: state.inputId++,
        };
    },
    deleteInput(state, input) {
        mutations.disconnect(state, input);
        let inputs = input.node.inputs;
        inputs.splice(inputs.indexOf(input), 1);
    },
    createOutput(state, blueprint) {
        return {
            label: blueprint.label,
            connectedInputs: [],
            node: null,
            position: {x: 0, y: 0},
            id: state.outputId++,
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
            label: blueprint.label,
            type: blueprint.type,
            data: null,
            form: null,
            value: null,
            id: state.formElemId++,
        };
    },
    deleteFormElem(state, formElem) {
        let formElems = formElem.node.formElems;
        formElems.splice(formElems.indexOf(formElem), 1);
    },
    createNode(state, blueprint) {
        let newNode = {};
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
        newNode.label = blueprint.label;
        newNode.inputs = inputs;
        newNode.outputs = outputs;
        newNode.formElems = formElems;
        newNode.position = {x: 0, y: 0};
        newNode.id = state.nodeId++;
        state.nodes.push(newNode);

        return newNode;
    },

    deleteNode(state, node) {
        console.log(node);
        node.inputs.map(input => {
            mutations.deleteInput(state, input);
        });
        node.outputs.map(output => {
            mutations.deleteOutput(state, output);
        });
        while (node.formElems.length > 0) {
            mutations.deleteFormElem(state, node.formElems[0]);
        }
        state.nodes.splice(state.nodes.indexOf(node), 1);
    },

    connect(state, {input, output}) {
        input.connectedOutput = output;
        output.connectedInputs.push(input);
        state.connections.push({input: input, output: output});
    },

    disconnect(state, input) {
        state.connections.splice(state.connections.findIndex(connection => {
            return connection.input === input;
        }), 1);
        if (input.connectedOutput != null) {
            let output = input.connectedOutput;
            output.connectedInputs.splice(output.connectedInputs.indexOf(input), 1);
            input.connectedOutput = null;
        }
    },

    // moveNode(state, {node, newPosition}) {
    //     node.position = newPosition;
    // },
    // updateFormElem(state, {formElem, value}) {
    //     formElem.value = value;
    // },
    // evaluate(state, blueprint) {
    //     blueprint.$data.evaluation = traceback;
    // }
};
