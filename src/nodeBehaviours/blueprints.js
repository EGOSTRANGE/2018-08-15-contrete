export const evaluators = {
    add: (inputsEvaluations, formElemsValues, outputIndex) => {
        return {
            type: 'num',
            value: inputsEvaluations[0].value + inputsEvaluations[1].value,
        };
    },
    num: (inputsEvaluations, formElemsValues, outputIndex) => {
        console.log(formElemsValues[0]);
        return {
            type: 'num',
            value: formElemsValues[0],
        };
    },
    eval: (inputsEvaluations, formElemsValues, outputIndex) => {
        console.log(inputsEvaluations);
        return {
            type: 'num',
            value: inputsEvaluations[0].value,
        };
    },
};
export const behaviours = {
    input: (input) => {
        console.log('evaluatingInput:');
        console.log(input);
        return behaviours.output(input.connectedOutput);
    },
    output: (output) => {
        let index = output.node.outputs.indexOf(output);
        console.log(behaviours.node(output.node, index));
        console.log('index: ' + index);

        return behaviours.node(output.node, index);
    },
    formElem: (formElem) => {
        console.log('evaluating formElem:');
        console.log(formElem);
        return formElem.value;
    },
    node: (node, outputIndex) => {
        console.log('evaluating node:');
        console.log(node);
        if (node.value)
            return node.value;

        let inputsEvaluations = node.inputs.map(input => {
            return behaviours.input(input);
        });

        let formElemsValues = node.formElems.map(formElem => {
            return formElem.value;
        });
        node.value = evaluators[node.blueprint.evaluator](inputsEvaluations, formElemsValues, outputIndex);
        return node.value;
    },
};
export const blueprints = {
    num: {
        label: 'Number',
        inputs: [],
        outputs: [{
            label: 'out',
        }],
        formElems: [
            {
                label: 'Number',
                type: 'Num',
            }
        ],
        evaluator: 'num',
    },
    sum: {
        label: 'Sum',
        inputs: [
            {
                label: 'A',
            },
            {
                label: 'B'
            }
        ],
        outputs: [
            {
                label: 'out',
            }
        ],
        formElems: [],
        evaluator: 'add',
    },
    eval: {
        label: 'Evaluation',
        inputs: [{label: 'in'}],
        outputs: [],
        formElems: [
            {
                label: 'Eval',
                type: 'eval',
            }
        ],
        evaluator: 'eval',
    },
};