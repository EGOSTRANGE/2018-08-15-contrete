<template>
    <input type="number"
           :id="'form-elem-'+formElem.id+'-in-node-'+formElem.node.id"
           v-model="formElem.value">
</template>

<script>
    export default {
        props: ['formElem'],
        data() {
            return {
                val: 0,
            };
        },
        methods: {
            Change(event) {
                console.log('Changing');
                this.$emit('change', event);
            },
        },
        beforeMount() {
            this.formElem.value = 0;
        }
    }
</script>

<style>


</style>
