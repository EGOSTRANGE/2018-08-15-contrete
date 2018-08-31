const num = (form, formIndex) => {
    if (!form.value)
        form.value = 0;
};
export default {
    label: 'Número',
    inputs: [],
    outputs: [{
        label: 'out',
    }],
    formElems: [
        {
            label: 'Número',
            type: 'num',
            init: num,
        }
    ],
    evaluator: 'num',
};