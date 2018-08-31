const mergeSelect = (formElem, formIndex) => {
    if (formElem.node) {
        const correspOutput = formElem.node.inputs[formIndex].connectedOutput;
        if (correspOutput && correspOutput.node.state === 'ok') {
            formElem.options = correspOutput.node.value.value.headers;
        }
    }
    else {
        formElem.options = ['-'];
        formElem.value = 0;
    }
};
const constTypes = (formElem, index) => {
    if (!formElem.node) {
        formElem.value = 0;
    }
    formElem.options = ['inner', 'outer', 'left', 'right'];
};
export default {
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
            label: 'Columna A',
            type: 'select',
            init: mergeSelect,
        },
        {
            label: 'Columna B',
            type: 'select',
            init: mergeSelect,
        },
        {
            label: 'Tipo de Union',
            type: 'select',
            init: constTypes,
        }
    ],
    evaluator: 'merge',
};