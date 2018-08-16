export const behaviours = {
    add: (inputs, outputs, formElems, outputIndex) => {
        return inputs[0].evaluate() + outputs.evaluate();
    },
    num: ({formElems}) => {
        return formElems[0].value;
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
        evaluation:'num',
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
        evaluation:'add',
    },
};