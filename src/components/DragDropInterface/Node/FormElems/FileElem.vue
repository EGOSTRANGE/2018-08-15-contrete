<template>
    <input type="file"
           :id="'form-elem-'+formElem.id+'-in-node-'+formElem.node.id"
           @change="Change"
           class="file-input">
</template>

<script>
    import {mapActions} from 'vuex';
    import XLSX from 'xlsx/xlsx';

    export default {
        props: ['formElem'],
        methods: {
            ...mapActions(['updateFormElem']),
            Change(e) {
                this.updateFormElem({formElem: this.formElem, value: e.target.files[0]});
            },
        },
    }
</script>

<style>
    .file-input {
        width: 200px;
    }
</style>
