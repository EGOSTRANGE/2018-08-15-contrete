export default {
    merge: {
        label: 'Combinar',
        inputs: [
            {
                label: 'tabla A',
            },
            {
                label: 'tabla B'
            }
        ],
        outputs: [{
            label: 'out',
        }],
        formElems: [
            {
                label: 'Columna de A',
                type: 'select',
                init: 'mergeSelect',
            },
            {
                label: 'Columna de B',
                type: 'select',
                init: 'mergeSelect',
            }
        ],
        evaluator: 'merge',
    },
    load: {
        label: 'Cargar Excel',
        inputs: [],
        outputs: [{
            label: 'out',
        }],
        formElems: [
            {
                label: 'Archivo',
                type: 'file',
                init: 'none',
            }
        ],
        evaluator: 'table',
    },
    num: {
        label: 'Número',
        inputs: [],
        outputs: [{
            label: 'out',
        }],
        formElems: [
            {
                label: 'Número',
                type: 'Num',
                init: 'num',
            }
        ],
        evaluator: 'num',
    },
    sum: {
        label: 'Suma',
        inputs: [
            {
                label: 'a',
            },
            {
                label: 'b'
            }
        ],
        outputs: [
            {
                label: 'c',
            }
        ],
        formElems: [],
        evaluator: 'add',
    },
    eval: {
        label: 'Vista Previa',
        inputs: [{label: 'in'}],
        outputs: [],
        formElems: [
            {
                label: 'preview...',
                type: 'eval',
                init: 'none',
            }
        ],
        evaluator: 'eval',
    },
};