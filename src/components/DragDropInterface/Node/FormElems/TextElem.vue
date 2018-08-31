<template>
    <input type="text"
           :id="'form-elem-'+formElem.id+'-in-node-'+formElem.node.id"
           @change="Change">
</template>

<script>
    import FormElemMixin from './Mixins/FormElemMixin';

    export default {
        props: ['formElem'],
        mixins:[FormElemMixin]
    }
</script>

<style>


</style>
