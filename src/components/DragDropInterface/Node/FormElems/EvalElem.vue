<template>
    <div>
    <component v-if="formElem.node.value!=null"
               :is="formElem.node.value.type+'Eval'"
               :value="formElem.node.value.value"></component>
        <br>
        <btn @click.stop="Evaluate">Evaluar</btn>
    </div>
</template>

<script>
    import {bus} from '../../../../main';
    import Btn from '../../../Shared/Btn';
    import {mapActions} from 'vuex';
    import TextEval from './EvalElems/TextEval';
    import NumEval from './EvalElems/TextEval';
    import Spiner from '../../../Shared/Misc/Spiner';

    export default {
        props: ['formElem'],
        data() {
            return {};
        },
        computed: {
            FormElemType() {
                return String.prototype.concat(this.formElem.node.value.type[0].toUpperCase(),
                    this.formElem.node.value.type.substring(1), 'Elem');
            }
        },
        methods: {
            ...mapActions(['evaluate']),
            Evaluate() {
                console.log(this.formElem.node);
                this.evaluate(this.formElem.node);
            }
        },
        components: {
            Btn,
            TextEval,
            NumEval,
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
