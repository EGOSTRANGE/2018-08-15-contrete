import evaluators from '../../../nodeBehaviours/evaluators';
// import initiators from '../../../nodeBehaviours/initiators';

const initFormElem = (state, {formElem, index}) => {
    if (formElem.blueprint.init)
        formElem.blueprint.init(formElem, index);
};
const setDirty = (state, node) => {
    node.formElems.forEach((formElem, index) => {
        initFormElem(state, {formElem, index});
    });
    if (node.value) {
        //update
        node.value = null;
        node.state = 'fail';
        //spread the word
        node.outputs.map(output => {
            output.connectedInputs.forEach(nextInput => {
                setDirty(state, nextInput.node);
            });
        });
    }
};
const evaluate = (state, node) => {
    if (node.state === 'ok') return;

    let connectedNodesValues = [];
    let st = 'ok';
    node.inputs.find(input => {
        if (!input.connectedOutput) {
            st = 'fail';
            return true;
        }
        let connectedNode = input.connectedOutput.node;
        if (connectedNode.state !== 'ok') {
            st = connectedNode.state;
            return true;
        }
        connectedNodesValues.push(connectedNode.value);

        return false;
    });
    if (st !== 'ok')
        return;

    let formValues = node.formElems.map((formElem) => {
        return formElem.value;
    });

    let ev = evaluators[node.blueprint.evaluator];

    let success = () => {
        node.outputs.map(output => {
            if (output.connectedInputs.length > 0)
                output.connectedInputs.map(input => {
                    setDirty(state, input.node);
                    evaluate(state, input.node);
                });
        });
    };
    let fail = () => {
        setDirty(state, node);
    };
    ev(connectedNodesValues, formValues, node, 0, success, fail);
};
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
        if (input.connectedOutput)
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
        let formElem = {
            value: null,
            id: state.formElemId++,
            blueprint,
        };
        if (blueprint.init)
            blueprint.init(formElem);
        return formElem;
    },
    deleteFormElem(state, formElem) {
        let formElems = formElem.node.formElems;
        formElems.splice(formElems.indexOf(formElem), 1);
    },
    createNode(state, blueprint) {
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
        newNode.prompt = '';
        newNode.state = 'fail';
        state.nodes.push(newNode);
        return newNode;
    },

    deleteNode(state, node) {
        while (node.formElems.length > 0) {
            mutations.deleteFormElem(state, node.formElems[0]);
        }
        while (node.inputs.length > 0) {
            mutations.deleteInput(state, node.inputs[0]);
        }
        while (node.outputs.length > 0) {
            mutations.deleteOutput(state, node.outputs[0]);
        }
        state.nodes = state.nodes.filter(n => node.id !== n.id);
    },

    connect(state, {input, output}) {
        input.connectedOutput = output;
        output.connectedInputs.push(input);
        state.connections.push({input: input, output: output});
        setDirty(state, input.node);
        evaluate(state, input.node);
    },

    disconnect(state, input) {
        state.connections.splice(state.connections.findIndex(connection => {
            return connection.input === input;
        }), 1);
        if (input.connectedOutput != null) {
            let inputs = input.connectedOutput.connectedInputs;
            inputs.splice(inputs.indexOf(input), 1);
            input.connectedOutput = null;
        }
        setDirty(state, input.node);
    },

    updateFormElem(state, {formElem, value}) {
        formElem.value = value;
        setDirty(state, formElem.node);
        evaluate(state, formElem.node);
    },
};