<template>
    <div class="mono-field">
        <label :for="'form-elem-'+formElem.id+'-in-node-'+formElem.node.id">
            {{ formElem.blueprint.label }}
        </label>
        <component :is="FormElemType"
                   :formElem="formElem"
                   @change="Change">
        </component>
    </div>
</template>

<script>
    import NumElem from './NumElem';
    import EvalElem from './EvalElems/EvalElem';
    import TextElem from './TextElem';
    import FileElem from './FileElem';
    import SelectElem from './SelectElem';
    import {mapActions} from 'vuex';

    export default {
        props: ['formElem'],
        methods: {
            ...mapActions(['updateFormElem']),
            Change(e) {
                this.updateFormElem({formElem: this.formElem, value: e});
            },
        },
        computed: {
            FormElemType() {
                return String.prototype.concat(this.formElem.blueprint.type[0].toUpperCase(), this.formElem.blueprint.type.substring(1), 'Elem');
            }
        },
        components: {
            NumElem,
            EvalElem,
            TextElem,
            FileElem,
            SelectElem,
        }
    }
</script>

<style>
    .mono-field {
        display: flex;
        flex-direction: column;
        margin: 5px 0 0 0;
        position: relative;
    }

    .mono-field:last-child {
        margin: 5px 0 0 0
    }

    input {
        border-radius: 3px;
        border: solid 1px lightgray;
        font-size: 15px;
        color: rgb(50, 50, 50);
        width: 80px;
        padding: 1px;
    }

    select {
        width: 80px;
        border-radius: 3px;
        border: solid 1px grey;
        font-size: 15px;
        color: rgb(50, 50, 50);
        /*padding: 0 3px;*/
        padding: 1px;
    }

    label {
        font-size: 17px;
        position: relative;
    }

    fieldset {
        border-radius: 3px;
        border: 1px solid lightgray;
        padding: 5px;
    }
</style>