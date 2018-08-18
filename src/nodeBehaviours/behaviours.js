import evaluators from "./evaluators";

const behaviours = {
    input: (input) => {
        return behaviours.output(input.connectedOutput);
    },
    output: (output) => {
        let index = output.node.outputs.indexOf(output);
        return behaviours.node(output.node, index);
    },
    formElem: (formElem) => {
        return formElem.value;
    },
    node: (node, outputIndex) => {
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
export default behaviours;
