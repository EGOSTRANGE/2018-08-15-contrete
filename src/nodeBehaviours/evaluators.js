import XLSX from 'xlsx/xlsx';
import {csvParse} from 'd3/dist/d3';
import Sheet2JSONOpt from 'xlsx/xlsx';

// const outerUnionPiece = (row_0, row_1, body, length) => {
//     body.push(row_0.concat([length].fill('NaN')));
// };
// const innerUnionPiece = (row_0, row_1, body, rejectFuntion) => {
//     body.push(row_0.concat(row_1.filter(rejectFuntion)));
// };
// const innerJoinFunction = (row_0, row_1, columnIndex_0, columnIndex_1, body) => {
//     if (row_0[columnIndex_0] === row_1[columnIndex_1])
//         innerUnionPiece()
// };
// const outerJoinFunction = (row_0, row_1, columnIndex_0, columnIndex_1, body, rejectFunction, length) => {
//     if (row_0[columnIndex_0] === row_1[columnIndex_1])
//         innerUnionPiece(row_0, row_1, body, rejectFunction);
//     else outerUnionPiece(row_0, row_1, body);
// };
export default {
    merge: (inputsEvaluations, formElemsValues, node, outputIndex, success, fail) => {


        node.state = 'wait';
        // let isInner = formElemsValues[3];

        // let isInner = true;
        let dataset_0 = inputsEvaluations[0].value;
        let dataset_1 = inputsEvaluations[1].value;

        let columnIndex_0 = formElemsValues[0];
        let columnIndex_1 = formElemsValues[1];

        // let length_1 = dataset_1.body[0].length;

        let rejectRedundantLine = (row, index) => {
            return index !== columnIndex_1;
        };
        let body = [];
        dataset_0.body.forEach(row_0 => {
            dataset_1.body.forEach(row_1 => {
                if (row_0[columnIndex_0] === row_1[columnIndex_1])
                    body.push(row_0.concat(row_1.filter(rejectRedundantLine)));

                // else if (!isInner)
                //     body.push(row_0.concat([length_1].fill('NaN')));
            });
        });
        let headers = dataset_0.headers.concat(dataset_1.headers.filter((header, index) => {
            return index !== columnIndex_1;
        }));
        node.value = {
            type: 'table',
            value: {
                headers,
                body
            }
        };
        node.state = 'ok';
        success();
    },
    table: (inputsEvaluations, formElemsValues, node, outputIndex, success, fail) => {
        if (!formElemsValues[0]) {
            fail();
            return;
        }
        let reader = new FileReader();
        reader.onload = () => {
            let fileData = reader.result;
            let wb = XLSX.read(fileData, {type: 'binary'});
            let sheets = [];
            // console.log(a);
            // let rowObj = readXlsxFile(fileData);
            wb.SheetNames.forEach(function (sheetName) {
                // let rowObj = csvParse(XLSX.utils.sheet_to_csv(wb.Sheets[sheetName]));
                let rowObj = XLSX.utils.sheet_to_json(wb.Sheets[sheetName]);
                let headers = [];
                let rows = [];

                for (let prop in rowObj[0])
                    headers.push(prop);

                rowObj.map(elem => {
                    let row = [];
                    for (let prop in elem) {
                        row.push(elem[prop]);
                    }
                    rows.push(row);
                });
                sheets.push({headers, body: rows});
            });
            node.state = 'ok';
            node.value = {type: 'table', value: sheets[0]};
            success();
        };
        reader.onerror = () => {
            fail();
        };
        node.state = 'wait';
        // let g = readXlsxFile(formElemsValues[0]);
        // console.log(g);
        // node.value={}
        reader.readAsBinaryString(formElemsValues[0]);
    },
    add: (inputsEvaluations, formElemsValues, node, outputIndex, success, fail) => {
        //TODO: EVALUAR EL TIPO DE LOS INPUTS Y ACTUAR DE ACUERDO A LO PERCIBIDO
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