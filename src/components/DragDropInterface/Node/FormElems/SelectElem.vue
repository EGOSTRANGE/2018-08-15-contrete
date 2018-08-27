<template>
    <!--<select :id="'form-elem-'+formElem.id+'-in-node-'+formElem.node.id"-->
    <!--v-model="formElem.value"-->
    <!--@change="Change">-->
    <!--<option v-for="(option,index) in formElem.options"-->
    <!--:value="index"-->
    <!--:selected="formElem.value===index"-->
    <!--:key="index">-->
    <!--{{option}}-->
    <!--</option>-->
    <!--</select>-->
    <div>
        <input type="text" v-model="a">
        {{formElem.options[0]}}
        {{formElem.options[1]}}
    </div>
</template>

<script>
    import FormElemMixin from './Mixins/FormElemMixin';
    import {mapActions} from 'vuex';

    export default {
        data() {
            return {a: 0};
        },
        mixins: [FormElemMixin],
        watch: {
            formElem() {
                this.$forceUpdate();
            }
        },
        methods: {
            ...mapActions(['initFormElem']),
        },
        // beforeMount() {
        //     this.initFormElem({formElem: this.formElem, index: this.index});
        // }
    }
</script>

<style>


</style>
