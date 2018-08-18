import DataFrame from "dataframe-js";

// From a collection (easier)
const df = new DataFrame([
    {c1: 1, c2: 6}, // <------- A row
    {c4: 1, c3: 2}
], ['c1', 'c2', 'c3', 'c4']);

export default {
    add: (inputsEvaluations, formElemsValues, outputIndex) => {
        df.show(3);
        return {
            type: 'num',
            value: inputsEvaluations[0].value + inputsEvaluations[1].value,
        };
    },
    num: (inputsEvaluations, formElemsValues, outputIndex) => {
        console.log(formElemsValues[0]);
        return {
            type: 'num',
            value: Number.parseFloat(formElemsValues[0]),
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