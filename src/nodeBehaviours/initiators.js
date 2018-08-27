export default {
    none() {
    },

    num(form, formIndex) {
        if (form.value === null || form.value === undefined)
            form.value = 0;
    },

    mergeSelect(formElem, formIndex) {
        const correspOutput = formElem.node.inputs[formIndex].connectedOutput;
        if (correspOutput && correspOutput.node.state === 'ok') {
            formElem.options = correspOutput.node.value.value.headers;
            console.log('accepted');
            console.log(formElem.options);
            // call(formElem.options);
            formElem.i='kkkk';
        }
        else {
            console.log('rejected');
            formElem.options = ['-'];
            // call(formElem.options);
            console.log(formElem.options);
        }
        formElem.value = 0;
    },
}