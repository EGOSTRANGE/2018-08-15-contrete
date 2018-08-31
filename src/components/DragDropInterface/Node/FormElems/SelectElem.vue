<template>
    <select :id="'form-elem-'+formElem.id+'-in-node-'+formElem.node.id"
            v-model="formElem.value"
            @change="Change">
        <option v-for="(option,index) in formElem.options"
                :value="index"
                :selected="formElem.value===index"
                :key="index">
            {{option}}
        </option>
    </select>
</template>

<script>
    import FormElemMixin from './Mixins/FormElemMixin';
    import {mapActions} from 'vuex';

    export default {
        data() {
            return {a: 0};
        },
        mixins: [FormElemMixin],
    }
</script>

<style>


</style>
