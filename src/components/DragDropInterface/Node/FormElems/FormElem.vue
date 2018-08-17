<template>
    <div class="mono-field">
        <label :for="'form-elem-'+formElem.id+'-in-node-'+formElem.node.id">
            {{ formElem.blueprint.label }}
        </label>
        <component :is="FormElemType"
                   :formElem="formElem">
        </component>
    </div>
</template>

<script>
    import NumElem from './NumElem';
    import EvalElem from './EvalElem';

    export default {
        props: ['formElem'],
        computed: {
            FormElemType() {
                return String.prototype.concat(this.formElem.blueprint.type[0].toUpperCase(), this.formElem.blueprint.type.substring(1), 'Elem');
            }
        },
        components: {
            NumElem,
            EvalElem,
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