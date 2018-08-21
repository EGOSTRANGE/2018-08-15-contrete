<template>
    <input type="file"
           :id="'form-elem-'+formElem.id+'-in-node-'+formElem.node.id"
           @change="Change"
           class="file-input">
</template>

<script>
    import {mapActions} from 'vuex';

    export default {
        props: ['formElem'],
        methods: {
            ...mapActions(['updateFormElem']),
            Change(e) {
                console.log(e.target.value);
                this.updateFormElem({
                    formElem: this.formElem,
                    newValue: e.target.files.item(0)
                });
            },
        },
        beforeMount() {
            this.formElem.value = '';
        },
    }
</script>

<style>
    .file-input {
        width: 200px;
    }
</style>
