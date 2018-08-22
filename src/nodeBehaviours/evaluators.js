import XLSX from 'xlsx/xlsx';
import Sheet2JSONOpt from 'xlsx/xlsx';

export default {
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
            wb.SheetNames.forEach(function (sheetName) {
                let rowObj = XLSX.utils.sheet_to_json(wb.Sheets[sheetName]);
                let header = [];
                let rows = [];

                for (let prop in rowObj[0])
                    header.push(prop);

                rowObj.map(elem => {
                    let row = [];
                    for (let prop in elem) {
                        row.push(elem[prop]);
                    }
                    rows.push(row);
                });
                sheets.push({header, rows});
            });
            node.state = 'ok';
            node.value = {type: 'table', value: sheets[0]};
            success();
        };
        reader.onerror = () => {
            fail();
        };
        node.state = 'wait';
        reader.readAsBinaryString(formElemsValues[0]);
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