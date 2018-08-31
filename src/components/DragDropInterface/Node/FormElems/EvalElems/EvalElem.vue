<template>
    <div>
        <component v-if="formElem.node.value!=null"
                   :is="formElem.node.value.type+'Eval'"
                   :value="formElem.node.value.value"></component>
    </div>
</template>

<script>
    import Btn from '../../../../Shared/Btn';
    import TextEval from './EvalSubelements/TextEval';
    import NumEval from './EvalSubelements/TextEval';
    import TableEval from './EvalSubelements/TableEval';
    import Spiner from '../../../../Shared/Misc/Spiner';

    export default {
        props: ['formElem'],
        computed: {
            FormElemType() {
                return String.prototype.concat(this.formElem.node.value.type[0].toUpperCase(),
                    this.formElem.node.value.type.substring(1), 'Elem');
            }
        },
        components: {
            Btn,
            TextEval,
            NumEval,
            TableEval,
            Spiner,
        }
    }
</script>

<style>
    .mono-field {
        display: flex;
        flex-direction: column;
        margin: 5px 0;
        position: relative;
    }

    input {
        border-radius: 3px;
        border: solid 1px grey;
        font-size: 15px;
        color: rgb(50, 50, 50);
        padding: 0 3px;
        width: 80px;
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
