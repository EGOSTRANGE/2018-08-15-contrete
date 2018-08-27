<template>
    <input type="file"
           :id="'form-elem-'+formElem.id+'-in-node-'+formElem.node.id"
           @change="Change"
           class="file-input">
</template>

<script>
    export default {
        props: ['formElem'],
        methods: {
            Change(e) {
                this.$emit('change', e.target.files[0]);
            }
        }
    }
</script>

<style>
    .file-input {
        width: 200px;
    }
</style>
