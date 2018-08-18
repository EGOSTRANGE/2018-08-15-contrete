export default {
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
                label: 'in a',
            },
            {
                label: 'in b'
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