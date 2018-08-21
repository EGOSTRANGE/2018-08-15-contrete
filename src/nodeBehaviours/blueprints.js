export default {
    load: {
        label: 'Load',
        inputs: [],
        outputs: [{
            label: 'out',
        }],
        formElems: [
            {
                label: 'FileAddress',
                type: 'file',
            }
        ],
        evaluator: 'table',
    },
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
                label: 'preview...',
                type: 'eval',
            }
        ],
        evaluator: 'eval',
    },
};