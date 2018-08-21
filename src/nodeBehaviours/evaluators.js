import DataFrame from "dataframe-js";
import * as d3 from "d3";

export default {
    table: (inputsEvaluations, formElemsValues, node, outputIndex, success, fail) => {
        node.state = 'wait';
        DataFrame.fromCSV(formElemsValues[0]).then(df => {
            node.value = {
                type: 'table',
                value: df,
            };
            df.show(5);
            node.state = 'ok';
            success();
        }).catch(() => {
            node.state = 'fail';
            fail();
        });
    },
    add: (inputsEvaluations, formElemsValues, node, outputIndex, success, fail) => {
        //TODO: EVALUAR EL TIPO DE LOS INPUTS Y ACTUAL DE ACUERDO A LO PERCIBIDO
        node.value = {
            type: 'num',
            value: inputsEvaluations[0].value + inputsEvaluations[1].value
        };
        node.state = 'ok';
        success();
    },
    num: (inputsEvaluations, formElemsValues, node, outputIndex, success, fail) => {
        node.value = {
            type: 'num',
            value: Number.parseFloat(formElemsValues[0]),
        };
        node.state = 'ok';
        success();
    },
    eval: (inputsEvaluations, formElemsValues, node, outputIndex, success, fail) => {
        node.value = {
            type: inputsEvaluations[0].type,
            value: inputsEvaluations[0].value,
        };
        node.state = 'ok';
        success();
    },
}