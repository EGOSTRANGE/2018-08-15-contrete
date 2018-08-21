<template>
    <input type="text"
           :id="'form-elem-'+formElem.id+'-in-node-'+formElem.node.id"
           v-model="formElem.value"
           @change="Change">
</template>

<script>
    import FormElemMixin from './Mixins/FormElemMixin';

    export default {
        props: ['formElem'],
        beforeMount() {
            this.formElem.value = '';
        },
        mixins:[FormElemMixin]
    }
</script>

<style>


</style>
