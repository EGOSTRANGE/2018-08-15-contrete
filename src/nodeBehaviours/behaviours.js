import evaluators from "./evaluators";

export const resolveNode = (node, outputIndex) => {
    if (node.value)
        return new Promise((success, fail) => {
            success(node.value);
            fail();
        });

    node.prompt = '';

    let inputsEvaluations = [];
    let crash = false;
    for (let i = 0; i < node.inputs.length; i++) {
        let input = node.inputs[i];
        if (input.connectedOutput) {
            let nextOutput = input.connectedOutput;
            let nextOutputIndex = nextOutput.node.outputs.indexOf(nextOutput);
            inputsEvaluations.push(resolveNode(nextOutput.node, nextOutputIndex));
        }
        else {
            crash = true;
            break;
        }
    }

    if (crash) return new Promise((success, fail) => {
        fail();
    });

    let formElemsValues = node.formElems.map(formElem => {
        return formElem.value;
    });

    Promise.all(inputsEvaluations).then(() => {
        return new Promise((success, fail) => {
            let evalFnc = evaluators[node.blueprint.evaluator];
            let promise=evalFnc(inputsEvaluations,formElemsValues,outputIndex);
            promise.then(result=>{node.prompt = 'Yay!';
                node.value = result;
                success(node.value);
            })
        });
    });
};
