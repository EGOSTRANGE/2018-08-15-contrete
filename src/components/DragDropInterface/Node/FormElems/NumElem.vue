<template>
    <input type="number"
           :id="'form-elem-'+formElem.id+'-in-node-'+formElem.node.id"
           @change="Change">
</template>

<script>
    import FormElemMixin from './Mixins/FormElemMixin';

    export default {
        mixins: [FormElemMixin],
    }
</script>

<style>


</style>
